import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Check, Bed, Bath, Square, MapPin, Heart } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

interface PropertyCardProps {
  id?: string;
  title: string;
  price: string;
  location: string;
  bedrooms: number;
  bathrooms: number;
  size: string;
  type: "rent" | "sale";
  available: boolean;
  status?: "available" | "undergoing-viewings" | "taken";
  image?: string;
}

const PropertyCard = ({
  id,
  title,
  price,
  location,
  bedrooms,
  bathrooms,
  size,
  type,
  available,
  status,
  image,
}: PropertyCardProps) => {
  const navigate = useNavigate();
  const [isFavourite, setIsFavourite] = useState(false);

  useEffect(() => {
    if (!id) return;
    const favs = JSON.parse(localStorage.getItem("favouriteProperties") || "[]");
    setIsFavourite(favs.some((p: any) => p.id === id));
  }, [id]);

  const handleClick = () => {
    if (id) {
      navigate(`/property/${id}`);
    }
  };

  const handleFavourite = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!id) return;
    const favs = JSON.parse(localStorage.getItem("favouriteProperties") || "[]");
    if (isFavourite) {
      const updated = favs.filter((p: any) => p.id !== id);
      localStorage.setItem("favouriteProperties", JSON.stringify(updated));
      setIsFavourite(false);
    } else {
      const newFav = { id, title, price, location, bedrooms, bathrooms, size, type, available, image };
      favs.push(newFav);
      localStorage.setItem("favouriteProperties", JSON.stringify(favs));
      setIsFavourite(true);
    }
  };
  
  return (
    <Card 
      className={`relative overflow-hidden transition-all duration-300 hover:shadow-medium ${
        !available ? "opacity-75" : "hover:scale-[1.02]"
      } cursor-pointer`}
      onClick={handleClick}
    >
      
      {image && (
        <div className="h-48 bg-muted overflow-hidden">
          <img 
            src={image} 
            alt={title}
            className="w-full h-full object-cover"
          />
        </div>
      )}
      
      <CardContent className="p-4">
        {/* Favourite Button */}
        <button
          onClick={handleFavourite}
          className={`absolute top-3 left-3 z-10 rounded-full p-2 bg-white/80 hover:bg-white shadow ${isFavourite ? "text-red-500" : "text-muted-foreground"}`}
          aria-label={isFavourite ? "Remove from favourites" : "Add to favourites"}
        >
          <Heart fill={isFavourite ? "#ef4444" : "none"} className="h-5 w-5" />
        </button>
        <div className="flex items-center justify-between mb-2">
          <Badge variant={type === "rent" ? "default" : "secondary"}>
            For {type === "rent" ? "Rent" : "Sale"}
          </Badge>
          <span className="text-xl font-bold text-primary">{price}</span>
        </div>
        
        {status === "undergoing-viewings" && (
          <div className="mb-2">
            <Badge variant="secondary" className="bg-warning/10 text-warning border-warning/20">
              Undergoing Viewings
            </Badge>
          </div>
        )}
        {status === "taken" && (
          <div className="mb-2">
            <Badge variant="secondary" className="bg-unavailable text-unavailable-foreground">
              <Check className="h-3 w-3 mr-1" />
              Taken
            </Badge>
          </div>
        )}
        
        <h3 className="font-semibold text-foreground mb-1">{title}</h3>
        
        <div className="flex items-center text-muted-foreground text-sm mb-3">
          <MapPin className="h-4 w-4 mr-1" />
          {location}
        </div>
        
        <div className="flex items-center justify-between text-sm text-muted-foreground">
          <div className="flex items-center">
            <Bed className="h-4 w-4 mr-1" />
            {bedrooms} beds
          </div>
          <div className="flex items-center">
            <Bath className="h-4 w-4 mr-1" />
            {bathrooms} baths
          </div>
          <div className="flex items-center">
            <Square className="h-4 w-4 mr-1" />
            {size}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default PropertyCard;
