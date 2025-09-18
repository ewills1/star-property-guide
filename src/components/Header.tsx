import { Home, MapPin } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

const Header = () => {
  return (
    <header className="bg-card border-b border-border shadow-soft">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        {/* Logo and Brand */}
        <Link to="/" className="flex items-center space-x-3 group">
          <div className="relative">
            <Home className="h-8 w-8 text-primary" />
            <MapPin className="h-4 w-4 text-secondary absolute -top-1 -right-1" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-foreground group-hover:text-primary transition-colors duration-200">
              Star Homes
            </h1>
            <p className="text-xs text-muted-foreground">Find Your Perfect Home</p>
          </div>
        </Link>

        {/* Navigation */}
        <nav className="hidden md:flex items-center space-x-6">
          <Link to="/" className="text-foreground hover:text-primary transition-colors duration-200">
            Home
          </Link>
          <Link to="/properties" className="text-foreground hover:text-primary transition-colors duration-200">
            Properties
          </Link>
          <Link to="/favourites" className="text-foreground hover:text-primary transition-colors duration-200">
            Favourites
          </Link>
          <Link to="/about" className="text-foreground hover:text-primary transition-colors duration-200">
            About
          </Link>
          <Link to="/contact" className="text-foreground hover:text-primary transition-colors duration-200">
            Contact
          </Link>
        </nav>

        {/* Chat Button */}
        <Link to="/chat">
          <Button variant="hero" size="sm">
            Chat with AI
          </Button>
        </Link>
      </div>
    </header>
  );
};

export default Header;
