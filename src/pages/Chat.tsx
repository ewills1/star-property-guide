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

const starterQuestions = [
  "Find properties under £1500",
  "Best areas for families", 
  "Shortest commute to City",
  "Properties near good schools",
  "Affordable areas in Zone 2",
  "Pet-friendly rentals"
];

// Mock property data for demonstration
const mockProperties = [
  {
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
    title: "Studio Apartment",
    price: "£1,200/month",
    location: "King's Cross, N1",
    bedrooms: 1,
    bathrooms: 1,
    size: "450 sq ft",
    type: "rent" as const,
    available: true,
  }
];

const Chat = () => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: "1",
      text: "Hello! I'm here to help you find the perfect property in London. How can I assist you today?",
      sender: "bot",
      timestamp: new Date(),
    }
  ]);
  const [inputText, setInputText] = useState("");

  const handleStarterClick = (question: string) => {
    handleSendMessage(question);
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

    // Simulate bot response with property results
    setTimeout(() => {
      let botResponse = "";
      let properties: any[] = [];

      if (messageText.toLowerCase().includes("under £1500") || messageText.toLowerCase().includes("1500")) {
        botResponse = "I found some great properties under £1500/month in London. Here are the available options:";
        properties = mockProperties.filter(p => parseInt(p.price.replace(/[£,/month]/g, "")) < 1500);
      } else if (messageText.toLowerCase().includes("families") || messageText.toLowerCase().includes("family")) {
        botResponse = "For families, I recommend these areas known for good schools and safe neighborhoods:";
        properties = mockProperties.filter(p => p.bedrooms >= 2);
      } else if (messageText.toLowerCase().includes("commute") || messageText.toLowerCase().includes("city")) {
        botResponse = "For the shortest commute to the City, these properties are well-connected:";
        properties = mockProperties.filter(p => p.location.includes("Canary Wharf") || p.location.includes("King's Cross"));
      } else {
        botResponse = "I'd be happy to help you with that! Could you tell me more about your specific requirements such as budget, preferred area, or number of bedrooms?";
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