import { Card, CardContent } from "@/components/ui/card";
import Header from "@/components/Header";
import { MessageCircle } from "lucide-react";
import { Link } from "react-router-dom";

// Property data copied from Chat.tsx
const properties = [
  {
    id: "1",
    title: "Modern 2-bed Flat",
    price: "£1,400/month",
    location: "Canary Wharf, E14",
    bedrooms: 2,
    bathrooms: 1,
    size: "850 sq ft",
    type: "rent",
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
    type: "rent",
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
    type: "rent",
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
    type: "rent",
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
    type: "rent",
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
    type: "rent",
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
    type: "rent",
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
    type: "rent",
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
    type: "rent",
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
    type: "rent",
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
    type: "rent",
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
    type: "rent",
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
    type: "rent",
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
    type: "rent",
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
    type: "rent",
    available: true,
  },
];

const Properties = () => {
  return (
    <div className="min-h-screen bg-gradient-subtle">
      <Header />
      <section className="container mx-auto px-4 py-12">
        <h1 className="text-4xl font-bold text-foreground mb-8 text-center">All Properties</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {properties.map((property) => (
            <Card key={property.id} className="hover:shadow-medium transition-all duration-300">
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-2">
                  <h2 className="text-xl font-semibold text-foreground">{property.title}</h2>
                  {property.available ? (
                    <span className="text-xs px-2 py-1 bg-green-100 text-green-700 rounded">Available</span>
                  ) : (
                    <span className="text-xs px-2 py-1 bg-red-100 text-red-700 rounded">Let Agreed</span>
                  )}
                </div>
                <div className="text-muted-foreground mb-2">{property.location}</div>
                <div className="flex flex-wrap gap-2 text-sm mb-4">
                  <span>{property.bedrooms} bed</span>
                  <span>{property.bathrooms} bath</span>
                  <span>{property.size}</span>
                </div>
                <div className="text-lg font-bold text-primary mb-4">{property.price}</div>
                <Link to={`/property/${property.id}`} className="inline-flex items-center text-primary hover:underline">
                  View Details <MessageCircle className="ml-2 h-4 w-4" />
                </Link>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Properties;
