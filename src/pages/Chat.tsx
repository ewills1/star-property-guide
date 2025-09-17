import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Send, MessageCircle, Home, ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";
import PropertyCard from "@/components/PropertyCard";

interface ChatMessage {
  id: string;
  text: string;
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
  "Studio apartments under £1400"
];

// Extended mock property data
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
  }
];

const Chat = () => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: "1",
      text: "Hello! I'm here to help you find the perfect property in London. To get started, I'll need to know your budget, number of bedrooms, and preferred location. What are you looking for?",
      sender: "bot",
      timestamp: new Date(),
    }
  ]);
  const [inputText, setInputText] = useState("");
  const [userPreferences, setUserPreferences] = useState<UserPreferences>({});

  const handleStarterClick = (question: string) => {
    handleSendMessage(question);
  };

  const extractPreferencesFromText = (text: string): Partial<UserPreferences> => {
    const prefs: Partial<UserPreferences> = {};
    
    // Extract budget
    const budgetMatch = text.match(/£(\d{1,3}(?:,\d{3})*|\d+)/);
    if (budgetMatch) {
      prefs.budget = parseInt(budgetMatch[1].replace(/,/g, ''));
    }
    
    // Extract bedrooms
    const bedroomMatch = text.match(/(\d+)[-\s]?bed/i) || text.match(/(\d+)\s?bedroom/i);
    if (bedroomMatch) {
      prefs.bedrooms = parseInt(bedroomMatch[1]);
    }
    
    // Extract location
    const locations = ['Camden', 'Shoreditch', 'Clapham', 'Canary Wharf', 'King\'s Cross', 'Islington', 'Hackney', 'Greenwich'];
    for (const location of locations) {
      if (text.toLowerCase().includes(location.toLowerCase())) {
        prefs.location = location;
        break;
      }
    }
    
    return prefs;
  };

  const findMatchingProperties = (prefs: UserPreferences) => {
    return mockProperties.filter(property => {
      const propertyPrice = parseInt(property.price.replace(/[£,/month]/g, ''));
      
      const budgetMatch = !prefs.budget || propertyPrice <= prefs.budget;
      const bedroomMatch = !prefs.bedrooms || property.bedrooms === prefs.bedrooms;
      const locationMatch = !prefs.location || property.location.toLowerCase().includes(prefs.location.toLowerCase());
      
      return budgetMatch && bedroomMatch && locationMatch;
    });
  };

  const getMissingPreferences = (prefs: UserPreferences): string[] => {
    const missing = [];
    if (!prefs.budget) missing.push('budget');
    if (!prefs.bedrooms) missing.push('number of bedrooms');
    if (!prefs.location) missing.push('preferred location');
    return missing;
  };

  const handleSendMessage = (text?: string) => {
    const messageText = text || inputText;
    if (!messageText.trim()) return;

    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      text: messageText,
      sender: "user",
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);
    setInputText("");

    // Extract and update preferences
    const newPrefs = extractPreferencesFromText(messageText);
    const updatedPrefs = { ...userPreferences, ...newPrefs };
    setUserPreferences(updatedPrefs);

    // Generate bot response
    setTimeout(() => {
      let botResponse = "";
      let properties: any[] = [];

      const missing = getMissingPreferences(updatedPrefs);
      
      if (missing.length === 0) {
        // All preferences collected, show matching properties
        const matches = findMatchingProperties(updatedPrefs);
        if (matches.length > 0) {
          botResponse = `Perfect! Based on your preferences (${updatedPrefs.budget ? `£${updatedPrefs.budget}/month budget, ` : ''}${updatedPrefs.bedrooms} bedroom${updatedPrefs.bedrooms !== 1 ? 's' : ''} in ${updatedPrefs.location}), here are ${matches.length} matching properties:`;
          properties = matches.slice(0, 3); // Show max 3 properties
        } else {
          botResponse = `I couldn't find any properties matching your exact criteria (${updatedPrefs.budget ? `£${updatedPrefs.budget}/month, ` : ''}${updatedPrefs.bedrooms} bedroom${updatedPrefs.bedrooms !== 1 ? 's' : ''} in ${updatedPrefs.location}). Let me show you some similar options:`;
          properties = mockProperties.slice(0, 3);
        }
      } else if (missing.length === 3) {
        // No preferences yet, general response
        botResponse = "I'd be happy to help you find the perfect property! Could you tell me your budget, how many bedrooms you need, and which area you prefer?";
      } else {
        // Some preferences collected, ask for missing ones
        const collected = [];
        if (updatedPrefs.budget) collected.push(`£${updatedPrefs.budget}/month budget`);
        if (updatedPrefs.bedrooms) collected.push(`${updatedPrefs.bedrooms} bedroom${updatedPrefs.bedrooms !== 1 ? 's' : ''}`);
        if (updatedPrefs.location) collected.push(`${updatedPrefs.location} area`);
        
        botResponse = `Great! I have your ${collected.join(' and ')}. To find the perfect match, could you also tell me your ${missing.join(' and ')}?`;
      }

      const botMessage: ChatMessage = {
        id: (Date.now() + 1).toString(),
        text: botResponse,
        sender: "bot", 
        timestamp: new Date(),
        properties: properties.length > 0 ? properties : undefined,
      };

      setMessages(prev => [...prev, botMessage]);
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-gradient-subtle">
      {/* Header */}
      <header className="bg-card border-b border-border shadow-soft">
        <div className="container mx-auto px-4 py-4 flex items-center">
          <Link to="/" className="flex items-center text-primary hover:text-primary-hover transition-colors mr-4">
            <ArrowLeft className="h-5 w-5 mr-2" />
            Back to Home
          </Link>
          <div className="flex items-center">
            <MessageCircle className="h-6 w-6 text-primary mr-2" />
            <h1 className="text-xl font-semibold text-foreground">Property Chat Assistant</h1>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-6 max-w-4xl">
        {/* Starter Questions */}
        {messages.length <= 1 && (
          <Card className="mb-6">
            <CardHeader>
              <CardTitle className="text-foreground">Quick Start Questions</CardTitle>
              <p className="text-muted-foreground text-sm">Click on any question to get started:</p>
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
            <div key={message.id} className={`flex ${message.sender === "user" ? "justify-end" : "justify-start"}`}>
              <div className={`max-w-[70%] ${message.sender === "user" ? "bg-primary text-primary-foreground" : "bg-card"} rounded-lg p-4 shadow-soft`}>
                <p className={message.sender === "user" ? "text-primary-foreground" : "text-foreground"}>
                  {message.text}
                </p>
                
                {/* Property Results */}
                {message.properties && message.properties.length > 0 && (
                  <div className="mt-4 space-y-3">
                    {message.properties.map((property, index) => (
                      <PropertyCard key={index} {...property} />
                    ))}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Input Area */}
        <Card>
          <CardContent className="p-4">
            <div className="flex space-x-2">
              <Input
                placeholder="Ask me about properties, areas, or anything else..."
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
                className="flex-1"
              />
              <Button onClick={() => handleSendMessage()} disabled={!inputText.trim()}>
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