import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { MessageCircle, Users, Shield, Star, ArrowRight, Search, TrendingUp } from "lucide-react";
import { Link } from "react-router-dom";
import Header from "@/components/Header";
import heroImage from "@/assets/hero-image.jpg";

const Homepage = () => {
  const features = [
    {
      icon: Search,
      title: "Smart Search",
      description: "AI-powered property matching based on your lifestyle and preferences."
    },
    {
      icon: Users,
      title: "Expert Support",
      description: "Professional agents and AI assistance available 24/7 to help you find your perfect home."
    },
    {
      icon: Shield,
      title: "Verified Properties",
      description: "All listings are verified and up-to-date with transparent pricing and availability."
    },
    {
      icon: TrendingUp,
      title: "Market Insights",
      description: "Get real-time market data and neighborhood insights to make informed decisions."
    }
  ];

  const stats = [
    { number: "10,000+", label: "Properties Listed" },
    { number: "5,000+", label: "Happy Customers" },
    { number: "50+", label: "Areas Covered" },
    { number: "24/7", label: "AI Support" }
  ];

  return (
    <div className="min-h-screen bg-gradient-subtle">
      <Header />
      
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0">
          <img 
            src={heroImage} 
            alt="Modern living space"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-primary/80 via-primary/60 to-transparent"></div>
        </div>
        
        <div className="relative container mx-auto px-4 py-20 lg:py-32">
          <div className="max-w-2xl">
            <h1 className="text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
              Find the home that fits your life
            </h1>
            <p className="text-xl text-white/90 mb-8 leading-relaxed">
              Discover your perfect property with our AI-powered platform. Whether you're buying or renting, 
              we make finding your dream home simple and stress-free.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link to="/chat">
                <Button variant="hero" size="lg" className="group">
                  Start AI Chat
                  <MessageCircle className="ml-2 h-5 w-5 group-hover:scale-110 transition-transform" />
                </Button>
              </Link>
              <Button variant="outline" size="lg" className="bg-white/10 border-white/30 text-white hover:bg-white hover:text-primary">
                Browse Properties
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Company Intro */}
      <section className="py-16 lg:py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-6">
              Welcome to Star Homes
            </h2>
            <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
              We're revolutionizing the property search experience with cutting-edge AI technology 
              and personalized service. Our platform connects renters and buyers with their ideal 
              homes while providing transparent, up-to-date information about London's property market.
            </p>
            <div className="flex items-center justify-center space-x-1 mb-8">
              {[1, 2, 3, 4, 5].map((star) => (
                <Star key={star} className="h-6 w-6 text-secondary fill-current" />
              ))}
              <span className="ml-2 text-muted-foreground">Trusted by thousands</span>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-12 bg-primary">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 text-center">
            {stats.map((stat, index) => (
              <div key={index} className="text-primary-foreground">
                <div className="text-3xl lg:text-4xl font-bold mb-2">{stat.number}</div>
                <div className="text-primary-foreground/80">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 lg:py-20">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl lg:text-4xl font-bold text-center text-foreground mb-4">
            Why Choose Star Homes?
          </h2>
          <p className="text-lg text-muted-foreground text-center mb-12 max-w-2xl mx-auto">
            We combine advanced technology with human expertise to deliver an exceptional property search experience.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => (
              <Card key={index} className="group hover:shadow-medium transition-all duration-300 hover:-translate-y-1">
                <CardContent className="p-6 text-center">
                  <div className="mb-4 flex justify-center">
                    <div className="p-3 bg-gradient-primary rounded-full group-hover:scale-110 transition-transform duration-300">
                      <feature.icon className="h-6 w-6 text-primary-foreground" />
                    </div>
                  </div>
                  <h3 className="text-lg font-semibold text-foreground mb-2">{feature.title}</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 lg:py-20 bg-gradient-hero">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl lg:text-4xl font-bold text-primary-foreground mb-6">
            Ready to Find Your Dream Home?
          </h2>
          <p className="text-xl text-primary-foreground/90 mb-8 max-w-2xl mx-auto">
            Start your journey with our AI-powered chat assistant and discover properties 
            that match your lifestyle and budget.
          </p>
          <Link to="/chat">
            <Button variant="secondary" size="lg" className="group">
              Chat with AI Now
              <MessageCircle className="ml-2 h-5 w-5 group-hover:scale-110 transition-transform" />
            </Button>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-card border-t border-border py-12">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <div className="flex items-center justify-center space-x-3 mb-4">
              <div className="relative">
                <div className="h-8 w-8 bg-primary rounded-lg flex items-center justify-center">
                  <span className="text-primary-foreground font-bold text-lg">★</span>
                </div>
              </div>
              <span className="text-xl font-bold text-foreground">Star Homes</span>
            </div>
            <p className="text-muted-foreground mb-4">
              Making property search simple, transparent, and personal.
            </p>
            <p className="text-sm text-muted-foreground">
              © 2024 Star Homes. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Homepage;