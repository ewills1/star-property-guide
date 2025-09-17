import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Check, Bed, Bath, Square, MapPin } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface PropertyCardProps {
  id?: string;
  title: string;
  price: string;
  location: string;
  bedrooms: number;
  bathrooms: number;
  size: string;
  type: "rent" | "buy";
  available: boolean;
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
  image,
}: PropertyCardProps) => {
  const navigate = useNavigate();

  const handleClick = () => {
    if (id) {
      navigate(`/property/${id}`);
    }
  };
  return (
    <Card 
      className={`relative overflow-hidden transition-all duration-300 hover:shadow-medium ${
        !available ? "opacity-75" : "hover:scale-[1.02] cursor-pointer"
      }`}
      onClick={handleClick}
    >
      {!available && (
        <div className="absolute top-3 right-3 z-10">
          <Badge variant="secondary" className="bg-unavailable text-unavailable-foreground">
            <Check className="h-3 w-3 mr-1" />
            Taken
          </Badge>
        </div>
      )}
      
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
        <div className="flex items-center justify-between mb-2">
          <Badge variant={type === "rent" ? "default" : "secondary"}>
            For {type === "rent" ? "Rent" : "Sale"}
          </Badge>
          <span className="text-xl font-bold text-primary">{price}</span>
        </div>
        
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