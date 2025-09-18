import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Send, MessageCircle, ArrowLeft, MapPin, Clock, ShoppingBag, Camera, RotateCcw } from "lucide-react";
import { Link } from "react-router-dom";
import PropertyCard from "@/components/PropertyCard";
import { mockProperties, Property } from "@/data/mockProperties";
import { londonLocations, getLocationInfo, searchLocations, LocationInfo } from "@/data/londonLocations";

interface ChatMessage {
  id: string;
  type: "text" | "properties" | "location";
  text?: string;
  sender: "user" | "bot";
  timestamp: Date;
  properties?: any[];
  locationInfo?: LocationInfo;
}

interface UserPreferences {
  budget?: number;
  bedrooms?: number;
  location?: string;
}

const starterQuestions = [
  "2 bedroom under £1800 in Camden",
  "Flats in Shoreditch",
  "3 bedroom under £2500",
  "1 bedroom near King's Cross",
  "Family homes in Clapham",
  "Studio apartments under £1400",
];

// Word-to-number mapping for bedroom extraction
const numberWords: Record<string, number> = {
  one: 1,
  two: 2,
  three: 3,
  four: 4,
  five: 5,
};

const Chat = () => {
  // Load saved state from localStorage or use default
  const loadSavedState = () => {
    try {
      const savedMessages = localStorage.getItem('chat-messages');
      const savedPreferences = localStorage.getItem('chat-preferences');
      
      return {
        messages: savedMessages 
          ? JSON.parse(savedMessages).map((msg: any) => ({
              ...msg,
              timestamp: new Date(msg.timestamp)
            }))
          : [
              {
                id: crypto.randomUUID(),
                type: "text",
                text: "Hello! I'm here to help you find the perfect property in London. To get started, I'll need to know your budget, number of bedrooms, and preferred location. I can also provide information about London areas including transport, entertainment, and shopping. What are you looking for?",
                sender: "bot",
                timestamp: new Date(),
              },
            ],
        preferences: savedPreferences ? JSON.parse(savedPreferences) : {}
      };
    } catch (error) {
      console.error('Error loading saved chat state:', error);
      return {
        messages: [
          {
            id: crypto.randomUUID(),
            type: "text",
            text: "Hello! I'm here to help you find the perfect property in London. To get started, I'll need to know your budget, number of bedrooms, and preferred location. I can also provide information about London areas including transport, entertainment, and shopping. What are you looking for?",
            sender: "bot",
            timestamp: new Date(),
          },
        ],
        preferences: {}
      };
    }
  };

  const savedState = loadSavedState();
  const [messages, setMessages] = useState<ChatMessage[]>(savedState.messages);
  const [inputText, setInputText] = useState("");
  const [userPreferences, setUserPreferences] = useState<UserPreferences>(savedState.preferences);
  const messagesEndRef = useRef<HTMLDivElement | null>(null);
  const botTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const handleStarterClick = (question: string) => {
    handleSendMessage(question);
  };

  // Clear chat function
  const clearChat = () => {
    const initialMessages = [
      {
        id: crypto.randomUUID(),
        type: "text" as const,
        text: "Hello! I'm here to help you find the perfect property in London. To get started, I'll need to know your budget, number of bedrooms, and preferred location. I can also provide information about London areas including transport, entertainment, and shopping. What are you looking for?",
        sender: "bot" as const,
        timestamp: new Date(),
      },
    ];
    
    setMessages(initialMessages);
    setUserPreferences({});
    localStorage.removeItem('chat-messages');
    localStorage.removeItem('chat-preferences');
  };

  // Detect if user is asking about location information
  const isLocationQuery = (text: string): boolean => {
    const locationKeywords = [
      "transport", "commute", "commuting", "travel", "train", "tube", "bus",
      "entertainment", "nightlife", "fun", "activities", "things to do",
      "shops", "shopping", "stores", "market", "retail",
      "area", "neighborhood", "location", "about", "tell me about",
      "what's in", "what is in", "information about"
    ];
    
    const lowerText = text.toLowerCase();
    return locationKeywords.some(keyword => lowerText.includes(keyword));
  };

  // Process location-based queries
  const processLocationQuery = (text: string): { response: string; locationInfo?: LocationInfo } => {
    const lowerText = text.toLowerCase();
    
    // Try to find specific location mentioned
    const mentionedLocation = londonLocations.find(loc => 
      lowerText.includes(loc.name.toLowerCase())
    );
    
    if (mentionedLocation) {
      if (lowerText.includes("transport") || lowerText.includes("commut") || lowerText.includes("travel")) {
        return {
          response: `Here's transport information for ${mentionedLocation.name}:`,
          locationInfo: mentionedLocation
        };
      } else if (lowerText.includes("entertainment") || lowerText.includes("fun") || lowerText.includes("nightlife")) {
        return {
          response: `Here's what ${mentionedLocation.name} offers for entertainment:`,
          locationInfo: mentionedLocation
        };
      } else if (lowerText.includes("shop") || lowerText.includes("retail") || lowerText.includes("market")) {
        return {
          response: `Here are the shopping options in ${mentionedLocation.name}:`,
          locationInfo: mentionedLocation
        };
      } else {
        return {
          response: `Here's comprehensive information about ${mentionedLocation.name}:`,
          locationInfo: mentionedLocation
        };
      }
    }
    
    // General location inquiry
    return {
      response: "I can provide information about London areas including Camden, Shoreditch, King's Cross, Clapham, and Canary Wharf. What would you like to know about transport, entertainment, or shopping in any of these areas?"
    };
  };

  const extractPreferencesFromText = (text: string): Partial<UserPreferences> => {
    const prefs: Partial<UserPreferences> = {};

    // Bedrooms
    const bedroomMatch =
      text.match(/(\d+)\s?(?:bed(?:room)?s?)/i) || text.match(/studio/i);
    if (bedroomMatch) {
      prefs.bedrooms = bedroomMatch[0].toLowerCase().includes("studio")
        ? 0 // you could set studio = 0 or 1 depending on your design
        : parseInt(bedroomMatch[1], 10);
    }

    // Budget extraction
    const budgetRegex =
      /(?:£\s?(\d+(?:,\d{3})*))|(?:(?:under|below|up to|upto|max(?:imum)?|budget)\s*£?(\d+(?:,\d{3})*))|(\d+(?:,\d{3})*)\s*(?:pcm|p\/m|per month|\/month|monthly|budget)\b/i;
    
    const budgetMatch = text.match(budgetRegex);
    if (budgetMatch) {
      const rawNumber = budgetMatch[1] || budgetMatch[2] || budgetMatch[3];
      prefs.budget = parseInt(rawNumber.replace(/,/g, ""), 10);
    }

    // Extract location (from property dataset dynamically)
    const locations = [
      ...new Set(mockProperties.map((p) => p.location.split(",")[0])),
    ];
    for (const location of locations) {
      if (text.toLowerCase().includes(location.toLowerCase())) {
        prefs.location = location;
        break;
      }
    }

    return prefs;
  };

  const findMatchingProperties = (prefs: UserPreferences) => {
    return mockProperties
      .map((property) => {
        const propertyPrice = parseInt(
          property.price.replace(/[£,]/g, "").replace("/month", "")
        );

        // Scoring system
        let score = 0;

        if (prefs.budget) {
          if (propertyPrice <= prefs.budget) score += 2;
          else if (propertyPrice <= prefs.budget * 1.2) score += 1; // allow 20% over budget
        }

        if (prefs.bedrooms) {
          if (property.bedrooms === prefs.bedrooms) score += 2;
          else if (Math.abs(property.bedrooms - prefs.bedrooms) === 1) score += 1;
        }

        if (prefs.location) {
          if (
            property.location.toLowerCase().includes(prefs.location.toLowerCase())
          )
            score += 2;
        }

        return { ...property, score };
      })
      .filter((p) => p.score > 0) // must meet at least one criteria
      .sort((a, b) => b.score - a.score); // highest score first
  };

  const getMissingPreferences = (prefs: UserPreferences): string[] => {
    const missing = [];
    if (!prefs.budget) missing.push("budget");
    if (!prefs.bedrooms) missing.push("number of bedrooms");
    if (!prefs.location) missing.push("preferred location");
    return missing;
  };

  const handleSendMessage = (text?: string) => {
    const messageText = text || inputText;
    if (!messageText.trim()) return;

    const userMessage: ChatMessage = {
      id: crypto.randomUUID(),
      type: "text",
      text: messageText,
      sender: "user",
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputText("");

    // Extract and update preferences (only if not a location query)
    let updatedPrefs = userPreferences;
    if (!isLocationQuery(messageText)) {
      const newPrefs = extractPreferencesFromText(messageText);
      updatedPrefs = { ...userPreferences, ...newPrefs };
      setUserPreferences(updatedPrefs);
    }

    // Cancel any pending bot reply
    if (botTimeoutRef.current) clearTimeout(botTimeoutRef.current);

    // Generate bot response
    botTimeoutRef.current = setTimeout(() => {
      let botResponse = "";
      let properties: any[] = [];
      let locationInfo: LocationInfo | undefined = undefined;
      let messageType: "text" | "properties" | "location" = "text";

      // Check if this is a location information query
      if (isLocationQuery(messageText)) {
        const locationResult = processLocationQuery(messageText);
        botResponse = locationResult.response;
        if (locationResult.locationInfo) {
          locationInfo = locationResult.locationInfo;
          messageType = "location";
        }
      } else {
        // Handle property search queries
        const missing = getMissingPreferences(updatedPrefs);

        if (missing.length === 0) {
          const matches = findMatchingProperties(updatedPrefs);
          if (matches.length > 0) {
            botResponse = `Here are the best matches for your preferences (£${updatedPrefs.budget}/month, ${updatedPrefs.bedrooms} bedroom${updatedPrefs.bedrooms !== 1 ? "s" : ""
              } in ${updatedPrefs.location}):`;
            properties = matches.slice(0, 3);
            messageType = "properties";
          } else {
            botResponse = `I couldn't find exact matches for (£${updatedPrefs.budget}/month, ${updatedPrefs.bedrooms} bedroom${updatedPrefs.bedrooms !== 1 ? "s" : ""
              } in ${updatedPrefs.location}). Here are some close alternatives:`;
            properties = findMatchingProperties(updatedPrefs).slice(0, 3);
            messageType = "properties";
          }
        } else if (missing.length === 3) {
          botResponse =
            "I'd be happy to help! Could you tell me your budget, number of bedrooms, and preferred location? I can also provide information about London areas including transport, entertainment, and shopping.";
        } else {
          const collected: string[] = [];
          if (updatedPrefs.budget)
            collected.push(`£${updatedPrefs.budget}/month budget`);
          if (updatedPrefs.bedrooms)
            collected.push(
              `${updatedPrefs.bedrooms} bedroom${updatedPrefs.bedrooms !== 1 ? "s" : ""
              }`
            );
          if (updatedPrefs.location) collected.push(`${updatedPrefs.location}`);

          botResponse = `Got it! I have your ${collected.join(
            " and "
          )}. Could you also tell me your ${missing.join(" and ")}?`;
        }
      }

      const botMessage: ChatMessage = {
        id: crypto.randomUUID(),
        type: messageType,
        text: botResponse,
        sender: "bot",
        timestamp: new Date(),
        properties: properties.length > 0 ? properties : undefined,
        locationInfo: locationInfo,
      };

      setMessages((prev) => [...prev, botMessage]);
    }, 1000);
  };

  // Auto scroll to latest message
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // Save messages to localStorage whenever they change
  useEffect(() => {
    try {
      localStorage.setItem('chat-messages', JSON.stringify(messages));
    } catch (error) {
      console.error('Error saving messages to localStorage:', error);
    }
  }, [messages]);

  // Save user preferences to localStorage whenever they change
  useEffect(() => {
    try {
      localStorage.setItem('chat-preferences', JSON.stringify(userPreferences));
    } catch (error) {
      console.error('Error saving preferences to localStorage:', error);
    }
  }, [userPreferences]);

  // Cleanup timeout on unmount
  useEffect(() => {
    return () => {
      if (botTimeoutRef.current) clearTimeout(botTimeoutRef.current);
    };
  }, []);

  return (
    <div className="min-h-screen bg-gradient-subtle">
      {/* Header */}
      <header className="bg-card border-b border-border shadow-soft">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center">
            <Link
              to="/"
              className="flex items-center text-primary hover:text-primary-hover transition-colors mr-4"
            >
              <ArrowLeft className="h-5 w-5 mr-2" />
              Back to Home
            </Link>
            <div className="flex items-center">
              <MessageCircle className="h-6 w-6 text-primary mr-2" />
              <h1 className="text-xl font-semibold text-foreground">
                Property Chat Assistant
              </h1>
            </div>
          </div>
          <Button 
            variant="ghost" 
            size="sm"
            onClick={clearChat}
            className="text-muted-foreground hover:text-foreground transition-colors"
            title="Reset chat"
          >
            <RotateCcw className="h-4 w-4" />
          </Button>
        </div>
      </header>

      <div className="container mx-auto px-4 py-6 max-w-4xl">
        {/* Starter Questions */}
        {messages.length <= 1 && (
          <Card className="mb-6">
            <CardHeader>
              <CardTitle className="text-foreground">
                Quick Start Questions
              </CardTitle>
              <p className="text-muted-foreground text-sm">
                Click on any question to get started:
              </p>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                {starterQuestions.map((question, index) => (
                  <Button
                    key={index}
                    variant="outline"
                    className="h-auto p-3 text-left justify-start"
                    onClick={() => handleStarterClick(question)}
                  >
                    {question}
                  </Button>
                ))}
              </div>
            </CardContent>
          </Card>
        )}

        {/* Chat Messages */}
        <div className="space-y-4 mb-6">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex ${message.sender === "user" ? "justify-end" : "justify-start"
                }`}
            >
              <div
                className={`max-w-[70%] ${message.sender === "user"
                  ? "bg-primary text-primary-foreground"
                  : "bg-card"
                  } rounded-lg p-4 shadow-soft`}
              >
                {message.text && (
                  <p
                    className={message.sender === "user"
                      ? "text-primary-foreground"
                      : "text-foreground"}
                  >
                    {message.text}
                  </p>
                )}

                {message.type === "properties" &&
                  message.properties &&
                  message.properties.length > 0 && (
                    <div className="mt-4 space-y-3">
                      {message.properties.map((property) => (
                        <PropertyCard 
                          key={property.id} 
                          {...property} 
                          status={property.status}
                        />
                      ))}
                    </div>
                  )}

                {message.type === "location" && message.locationInfo && (
                  <div className="mt-4 space-y-4">
                    <div className="bg-muted/50 rounded-lg p-4">
                      <h3 className="font-semibold text-foreground mb-2 flex items-center">
                        <MapPin className="h-4 w-4 mr-2 text-primary" />
                        {message.locationInfo.name}
                      </h3>
                      <p className="text-muted-foreground text-sm mb-4">
                        {message.locationInfo.description}
                      </p>
                      
                      {/* Transport Information */}
                      <div className="mb-4">
                        <h4 className="font-medium text-foreground mb-2 flex items-center">
                          <Clock className="h-4 w-4 mr-2 text-primary" />
                          Transport & Commute Times
                        </h4>
                        <div className="space-y-2 text-sm">
                          <div>
                            <span className="font-medium">Tube Lines:</span> {message.locationInfo.transport.tube.join(", ")}
                          </div>
                          <div>
                            <span className="font-medium">Bus Routes:</span> {message.locationInfo.transport.bus.join(", ")}
                          </div>
                          {message.locationInfo.transport.overground && (
                            <div>
                              <span className="font-medium">Overground:</span> {message.locationInfo.transport.overground.join(", ")}
                            </div>
                          )}
                          {message.locationInfo.transport.dlr && (
                            <div>
                              <span className="font-medium">DLR:</span> {message.locationInfo.transport.dlr.join(", ")}
                            </div>
                          )}
                          <div className="mt-2 pt-2 border-t border-border">
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-2 text-xs">
                              <div><span className="font-medium">City Center:</span> {message.locationInfo.transport.commuteTimes.cityCenter}</div>
                              <div><span className="font-medium">Canary Wharf:</span> {message.locationInfo.transport.commuteTimes.canaryWharf}</div>
                              <div><span className="font-medium">Heathrow:</span> {message.locationInfo.transport.commuteTimes.heathrow}</div>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Entertainment */}
                      <div className="mb-4">
                        <h4 className="font-medium text-foreground mb-2 flex items-center">
                          <Camera className="h-4 w-4 mr-2 text-primary" />
                          Entertainment & Activities
                        </h4>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-1 text-sm">
                          {message.locationInfo.entertainment.map((item, index) => (
                            <div key={index} className="flex items-center">
                              <span className="w-2 h-2 bg-primary rounded-full mr-2 flex-shrink-0"></span>
                              {item}
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Shopping */}
                      <div>
                        <h4 className="font-medium text-foreground mb-2 flex items-center">
                          <ShoppingBag className="h-4 w-4 mr-2 text-primary" />
                          Shopping & Retail
                        </h4>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-1 text-sm">
                          {message.locationInfo.shopping.map((item, index) => (
                            <div key={index} className="flex items-center">
                              <span className="w-2 h-2 bg-primary rounded-full mr-2 flex-shrink-0"></span>
                              {item}
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>

        {/* Input Area */}
        <Card>
          <CardContent className="p-4">
            <div className="flex space-x-2">
              <Input
                placeholder="Ask me about properties, areas, or anything else..."
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSendMessage()}
                className="flex-1"
              />
              <Button
                onClick={() => handleSendMessage()}
                disabled={!inputText.trim()}
              >
                <Send className="h-4 w-4" />
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Chat;