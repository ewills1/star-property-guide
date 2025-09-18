import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Send, MessageCircle, ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";
import PropertyCard from "@/components/PropertyCard";

interface ChatMessage {
  id: string;
  type: "text" | "properties";
  text?: string;
  sender: "user" | "bot";
  timestamp: Date;
  properties?: any[];
}

interface UserPreferences {
  budget?: number;
  bedrooms?: number;
  location?: string;
}

const starterQuestions = [
  "2-bed under £1800 in Camden",
  "Flats in Shoreditch",
  "3-bed under £2500",
  "1-bed near King's Cross",
  "Family homes in Clapham",
  "Studio apartments under £1400",
];

// Expanded property dataset
const mockProperties = [
  {
    id: "1",
    title: "Modern 2-bed Flat",
    price: "£1,400/month",
    location: "Canary Wharf, E14",
    bedrooms: 2,
    bathrooms: 1,
    size: "850 sq ft",
    type: "rent" as const,
    available: true,
  },
  {
    id: "2",
    title: "Victorian House",
    price: "£1,650/month",
    location: "Clapham, SW4",
    bedrooms: 3,
    bathrooms: 2,
    size: "1200 sq ft",
    type: "rent" as const,
    available: false,
  },
  {
    id: "3",
    title: "Studio Apartment",
    price: "£1,200/month",
    location: "King's Cross, N1",
    bedrooms: 1,
    bathrooms: 1,
    size: "450 sq ft",
    type: "rent" as const,
    available: true,
  },
  {
    id: "4",
    title: "Luxury 2-bed Apartment",
    price: "£2,200/month",
    location: "Shoreditch, E1",
    bedrooms: 2,
    bathrooms: 2,
    size: "950 sq ft",
    type: "rent" as const,
    available: true,
  },
  {
    id: "5",
    title: "Family House",
    price: "£2,800/month",
    location: "Camden, NW1",
    bedrooms: 3,
    bathrooms: 2,
    size: "1400 sq ft",
    type: "rent" as const,
    available: true,
  },
  {
    id: "6",
    title: "Compact Studio",
    price: "£1,350/month",
    location: "Shoreditch, E2",
    bedrooms: 1,
    bathrooms: 1,
    size: "400 sq ft",
    type: "rent" as const,
    available: false,
  },
  {
    id: "7",
    title: "Riverside Penthouse",
    price: "£3,200/month",
    location: "Battersea, SW11",
    bedrooms: 2,
    bathrooms: 2,
    size: "1100 sq ft",
    type: "rent" as const,
    available: true,
  },
  {
    id: "8",
    title: "Charming 1-bed Flat",
    price: "£1,600/month",
    location: "Islington, N1",
    bedrooms: 1,
    bathrooms: 1,
    size: "600 sq ft",
    type: "rent" as const,
    available: true,
  },
  {
    id: "9",
    title: "Modern Loft Apartment",
    price: "£2,500/month",
    location: "Hackney, E8",
    bedrooms: 2,
    bathrooms: 2,
    size: "950 sq ft",
    type: "rent" as const,
    available: true,
  },
  {
    id: "10",
    title: "Family Home with Garden",
    price: "£2,400/month",
    location: "Greenwich, SE10",
    bedrooms: 3,
    bathrooms: 2,
    size: "1300 sq ft",
    type: "rent" as const,
    available: true,
  },
  {
    id: "11",
    title: "Bright Studio Flat",
    price: "£1,100/month",
    location: "Wembley, HA9",
    bedrooms: 1,
    bathrooms: 1,
    size: "380 sq ft",
    type: "rent" as const,
    available: true,
  },
  {
    id: "12",
    title: "Luxury Townhouse",
    price: "£4,500/month",
    location: "Chelsea, SW3",
    bedrooms: 4,
    bathrooms: 3,
    size: "2000 sq ft",
    type: "rent" as const,
    available: true,
  },
  {
    id: "13",
    title: "Cozy 2-bed Apartment",
    price: "£1,800/month",
    location: "Hampstead, NW3",
    bedrooms: 2,
    bathrooms: 1,
    size: "750 sq ft",
    type: "rent" as const,
    available: true,
  },
  {
    id: "14",
    title: "Modern 1-bed Flat",
    price: "£1,450/month",
    location: "Brixton, SW2",
    bedrooms: 1,
    bathrooms: 1,
    size: "500 sq ft",
    type: "rent" as const,
    available: true,
  },
  {
    id: "15",
    title: "Spacious 3-bed Flat",
    price: "£2,100/month",
    location: "Westminster, SW1",
    bedrooms: 3,
    bathrooms: 2,
    size: "1150 sq ft",
    type: "rent" as const,
    available: true,
  },
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
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: crypto.randomUUID(),
      type: "text",
      text: "Hello! I'm here to help you find the perfect property in London. To get started, I'll need to know your budget, number of bedrooms, and preferred location. What are you looking for?",
      sender: "bot",
      timestamp: new Date(),
    },
  ]);
  const [inputText, setInputText] = useState("");
  const [userPreferences, setUserPreferences] = useState<UserPreferences>({});
  const messagesEndRef = useRef<HTMLDivElement | null>(null);
  const botTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const handleStarterClick = (question: string) => {
    handleSendMessage(question);
  };

  const extractPreferencesFromText = (text: string): Partial<UserPreferences> => {
    const prefs: Partial<UserPreferences> = {};

    // Extract budget
    const budgetMatch = text.match(/£?(\d+(?:,\d{3})*)/);
    if (budgetMatch) {
      prefs.budget = parseInt(budgetMatch[1].replace(/,/g, ""), 10);
    }


    // Extract bedrooms (digit or word form)
    const bedroomMatch = text.match(/(\d+)\s?bed(?:room)?s?/i);
    if (bedroomMatch) {
      prefs.bedrooms = parseInt(bedroomMatch[1]);
    } else {
      const wordMatch = text.match(
        /(one|two|three|four|five)\s?bed(?:room)?s?/i
      );
      if (wordMatch) {
        prefs.bedrooms = numberWords[wordMatch[1].toLowerCase()];
      }
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

    // Extract and update preferences
    const newPrefs = extractPreferencesFromText(messageText);
    const updatedPrefs = { ...userPreferences, ...newPrefs };
    setUserPreferences(updatedPrefs);

    // Cancel any pending bot reply
    if (botTimeoutRef.current) clearTimeout(botTimeoutRef.current);

    // Generate bot response
    botTimeoutRef.current = setTimeout(() => {
      let botResponse = "";
      let properties: any[] = [];

      const missing = getMissingPreferences(updatedPrefs);

      if (missing.length === 0) {
        const matches = findMatchingProperties(updatedPrefs);
        if (matches.length > 0) {
          botResponse = `Here are the best matches for your preferences (£${updatedPrefs.budget}/month, ${updatedPrefs.bedrooms} bedroom${updatedPrefs.bedrooms !== 1 ? "s" : ""
            } in ${updatedPrefs.location}):`;
          properties = matches.slice(0, 3);
        } else {
          botResponse = `I couldn’t find exact matches for (£${updatedPrefs.budget}/month, ${updatedPrefs.bedrooms} bedroom${updatedPrefs.bedrooms !== 1 ? "s" : ""
            } in ${updatedPrefs.location}). Here are some close alternatives:`;
          properties = findMatchingProperties(updatedPrefs).slice(0, 3);
        }
      } else if (missing.length === 3) {
        botResponse =
          "I'd be happy to help! Could you tell me your budget, number of bedrooms, and preferred location?";
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

      const botMessage: ChatMessage = {
        id: crypto.randomUUID(),
        type: properties.length > 0 ? "properties" : "text",
        text: botResponse,
        sender: "bot",
        timestamp: new Date(),
        properties: properties.length > 0 ? properties : undefined,
      };

      setMessages((prev) => [...prev, botMessage]);
    }, 1000);
  };

  // Auto scroll to latest message
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

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
        <div className="container mx-auto px-4 py-4 flex items-center">
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
                        <PropertyCard key={property.id} {...property} />
                      ))}
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
