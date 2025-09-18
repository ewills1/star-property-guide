import { useParams, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, MapPin, Bed, Bath, Square, Calendar, Car, Wifi, Utensils, Check, X, Phone, Mail, User } from "lucide-react";

// Extended mock property data with full details
const mockPropertiesDetailed = {
  "1": {
    id: "1",
    title: "Modern 2-bed Flat",
    price: "£1,400/month",
    location: "Canary Wharf, E14",
    bedrooms: 2,
    bathrooms: 1,
    size: "850 sq ft",
    type: "rent" as const,
    available: true,
    images: [
      "/placeholder.svg",
      "/placeholder.svg", 
      "/placeholder.svg"
    ],
    description: "A stunning modern 2-bedroom apartment in the heart of Canary Wharf. Features floor-to-ceiling windows with spectacular city views, contemporary kitchen with integrated appliances, and access to building amenities including gym and concierge.",
    features: [
      "Floor-to-ceiling windows",
      "City skyline views",
      "Modern kitchen with appliances",
      "Building gym & concierge",
      "24/7 security",
      "Balcony",
      "Underground parking available"
    ],
    amenities: {
      parking: true,
      wifi: true,
      kitchen: true,
      pets: false,
      furnished: true
    },
    availableFrom: "Immediately",
    deposit: "£2,800",
    council: "Tower Hamlets",
    transport: "Canary Wharf DLR & Underground (2 min walk)",
    agent: {
      name: "Sarah Johnson",
      company: "Prime London Properties",
      phone: "020 7123 4567",
      email: "sarah.j@primelondon.co.uk",
      photo: "/placeholder.svg"
    }
  },
  "2": {
    id: "2", 
    title: "Victorian House",
    price: "£1,650/month",
    location: "Clapham, SW4",
    bedrooms: 3,
    bathrooms: 2,
    size: "1200 sq ft",
    type: "rent" as const,
    available: false,
    images: ["/placeholder.svg", "/placeholder.svg"],
    description: "Beautiful Victorian house conversion with period features and modern amenities. Located on a quiet residential street just minutes from Clapham Common and excellent transport links.",
    features: [
      "Period features",
      "High ceilings", 
      "Garden access",
      "Modern bathroom",
      "Original wood floors",
      "Separate dining room"
    ],
    amenities: {
      parking: false,
      wifi: true,
      kitchen: true,
      pets: true,
      furnished: false
    },
    availableFrom: "Not available",
    deposit: "£3,300",
    council: "Lambeth",
    transport: "Clapham Common Underground (5 min walk)",
    agent: {
      name: "Michael Chen",
      company: "South London Estates",
      phone: "020 7234 5678",
      email: "m.chen@southlondon.co.uk",
      photo: "/placeholder.svg"
    }
  },
  "3": {
    id: "3",
    title: "Studio Apartment", 
    price: "£1,200/month",
    location: "King's Cross, N1",
    bedrooms: 1,
    bathrooms: 1,
    size: "450 sq ft",
    type: "rent" as const,
    available: true,
    images: ["/placeholder.svg"],
    description: "Stylish studio apartment in a converted warehouse building. Open plan living with high ceilings and large windows. Perfect for young professionals.",
    features: [
      "Open plan design",
      "High ceilings",
      "Large windows",
      "Modern bathroom",
      "Built-in storage"
    ],
    amenities: {
      parking: false,
      wifi: true,
      kitchen: true,
      pets: false,
      furnished: true
    },
    availableFrom: "1st Feb 2024",
    deposit: "£2,400",
    council: "Camden",
    transport: "King's Cross St Pancras (3 min walk)",
    agent: {
      name: "Emma Thompson",
      company: "Central London Lettings",
      phone: "020 7345 6789",
      email: "emma@centrallondon.co.uk",
      photo: "/placeholder.svg"
    }
  }
};

const PropertyDetails = () => {
  const { id } = useParams();
  const property = mockPropertiesDetailed[id as keyof typeof mockPropertiesDetailed];

  if (!property) {
    return (
      <div className="min-h-screen bg-gradient-subtle flex items-center justify-center">
        <Card className="max-w-md">
          <CardContent className="p-6 text-center">
            <h2 className="text-xl font-semibold mb-2">Property Not Found</h2>
            <p className="text-muted-foreground mb-4">The property you're looking for doesn't exist.</p>
            <Link to="/chat">
              <Button>Back to Search</Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-subtle">
      {/* Header */}
      <header className="bg-card border-b border-border shadow-soft">
        <div className="container mx-auto px-4 py-4">
          <Link to="/chat" className="inline-flex items-center text-primary hover:text-primary-hover transition-colors">
            <ArrowLeft className="h-5 w-5 mr-2" />
            Back to Search
          </Link>
        </div>
      </header>

      <div className="container mx-auto px-4 py-6 max-w-6xl">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Image Gallery */}
            <Card>
              <CardContent className="p-0">
                <div className="aspect-[16/10] bg-muted rounded-lg overflow-hidden">
                  <img 
                    src={property.images[0]} 
                    alt={property.title}
                    className="w-full h-full object-cover"
                  />
                </div>
                {property.images.length > 1 && (
                  <div className="grid grid-cols-4 gap-2 p-4">
                    {property.images.slice(1, 4).map((image, index) => (
                      <div key={index} className="aspect-square bg-muted rounded overflow-hidden">
                        <img 
                          src={image} 
                          alt={`${property.title} ${index + 2}`}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    ))}
                    {property.images.length > 4 && (
                      <div className="aspect-square bg-muted rounded flex items-center justify-center text-sm font-medium text-muted-foreground">
                        +{property.images.length - 4} more
                      </div>
                    )}
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Description */}
            <Card>
              <CardHeader>
                <CardTitle>About this property</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-foreground leading-relaxed">{property.description}</p>
              </CardContent>
            </Card>

            {/* Features */}
            <Card>
              <CardHeader>
                <CardTitle>Key Features</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 gap-3">
                  {property.features.map((feature, index) => (
                    <div key={index} className="flex items-center">
                      <Check className="h-4 w-4 text-success mr-3 flex-shrink-0" />
                      <span className="text-foreground">{feature}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Property Info */}
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <Badge variant={property.type === "rent" ? "default" : "secondary"}>
                    For {property.type === "rent" ? "Rent" : "Sale"}
                  </Badge>
                  {!property.available && (
                    <Badge variant="secondary" className="bg-unavailable text-unavailable-foreground">
                      <Check className="h-3 w-3 mr-1" />
                      Taken
                    </Badge>
                  )}
                </div>

                <div className="text-3xl font-bold text-primary mb-4">{property.price}</div>
                
                <h1 className="text-xl font-semibold text-foreground mb-2">{property.title}</h1>
                
                <div className="flex items-center text-muted-foreground mb-6">
                  <MapPin className="h-4 w-4 mr-2" />
                  {property.location}
                </div>

                <div className="grid grid-cols-3 gap-4 mb-6">
                  <div className="text-center">
                    <Bed className="h-5 w-5 mx-auto mb-1 text-muted-foreground" />
                    <div className="text-sm font-medium">{property.bedrooms}</div>
                    <div className="text-xs text-muted-foreground">Beds</div>
                  </div>
                  <div className="text-center">
                    <Bath className="h-5 w-5 mx-auto mb-1 text-muted-foreground" />
                    <div className="text-sm font-medium">{property.bathrooms}</div>
                    <div className="text-xs text-muted-foreground">Baths</div>
                  </div>
                  <div className="text-center">
                    <Square className="h-5 w-5 mx-auto mb-1 text-muted-foreground" />
                    <div className="text-sm font-medium">{property.size}</div>
                    <div className="text-xs text-muted-foreground">Size</div>
                  </div>
                </div>

                <div className="flex gap-3">
                  <Button 
                    className="flex-1" 
                    disabled={!property.available}
                  >
                    {property.available ? "Arrange Viewing" : "Not Available"}
                  </Button>
                  {property.available && (
                    <Button variant="outline" className="flex-1" asChild>
                      <a href={`tel:${property.agent.phone}`}>
                        <Phone className="h-4 w-4 mr-2" />
                        Call Now
                      </a>
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Property Details */}
            <Card>
              <CardHeader>
                <CardTitle>Property Details</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Available from:</span>
                  <span className="font-medium">{property.availableFrom}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Deposit:</span>
                  <span className="font-medium">{property.deposit}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Council:</span>
                  <span className="font-medium">{property.council}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Transport:</span>
                  <span className="font-medium text-sm">{property.transport}</span>
                </div>
              </CardContent>
            </Card>

            {/* Agent Contact */}
            <Card>
              <CardHeader>
                <CardTitle>Your Estate Agent</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 rounded-full bg-muted overflow-hidden flex-shrink-0">
                    <img 
                      src={property.agent.photo} 
                      alt={property.agent.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div>
                    <div className="font-medium text-foreground">{property.agent.name}</div>
                    <div className="text-sm text-muted-foreground">{property.agent.company}</div>
                  </div>
                </div>
                
                <div className="space-y-3">
                  <Button variant="outline" className="w-full justify-start" asChild>
                    <a href={`tel:${property.agent.phone}`}>
                      <Phone className="h-4 w-4 mr-2" />
                      {property.agent.phone}
                    </a>
                  </Button>
                  
                  <Button variant="outline" className="w-full justify-start" asChild>
                    <a href={`mailto:${property.agent.email}?subject=Viewing Request - ${property.title}&body=Hi ${property.agent.name},%0D%0A%0D%0AI would like to arrange a viewing for the property: ${property.title} at ${property.location}.%0D%0A%0D%0APlease let me know your availability.%0D%0A%0D%0AThank you.`}>
                      <Mail className="h-4 w-4 mr-2" />
                      Send Email
                    </a>
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Amenities */}
            <Card>
              <CardHeader>
                <CardTitle>Amenities</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-3">
                  <div className="flex items-center">
                    {property.amenities.parking ? 
                      <Check className="h-4 w-4 text-success mr-2" /> : 
                      <X className="h-4 w-4 text-muted-foreground mr-2" />
                    }
                    <span className={property.amenities.parking ? "text-foreground" : "text-muted-foreground"}>
                      Parking
                    </span>
                  </div>
                  <div className="flex items-center">
                    {property.amenities.wifi ? 
                      <Check className="h-4 w-4 text-success mr-2" /> : 
                      <X className="h-4 w-4 text-muted-foreground mr-2" />
                    }
                    <span className={property.amenities.wifi ? "text-foreground" : "text-muted-foreground"}>
                      WiFi
                    </span>
                  </div>
                  <div className="flex items-center">
                    {property.amenities.kitchen ? 
                      <Check className="h-4 w-4 text-success mr-2" /> : 
                      <X className="h-4 w-4 text-muted-foreground mr-2" />
                    }
                    <span className={property.amenities.kitchen ? "text-foreground" : "text-muted-foreground"}>
                      Kitchen
                    </span>
                  </div>
                  <div className="flex items-center">
                    {property.amenities.pets ? 
                      <Check className="h-4 w-4 text-success mr-2" /> : 
                      <X className="h-4 w-4 text-muted-foreground mr-2" />
                    }
                    <span className={property.amenities.pets ? "text-foreground" : "text-muted-foreground"}>
                      Pets allowed
                    </span>
                  </div>
                  <div className="flex items-center col-span-2">
                    {property.amenities.furnished ? 
                      <Check className="h-4 w-4 text-success mr-2" /> : 
                      <X className="h-4 w-4 text-muted-foreground mr-2" />
                    }
                    <span className={property.amenities.furnished ? "text-foreground" : "text-muted-foreground"}>
                      Furnished
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PropertyDetails;