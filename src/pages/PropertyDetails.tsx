import { useParams, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, MapPin, Bed, Bath, Square, Check, X, Phone, Mail } from "lucide-react";
import { mockProperties } from "@/data/mockProperties"; // import your earlier mock properties array

// Create a detailed map from the array
const getPropertyDetails = () => {
  const map: Record<string, any> = {};
  mockProperties.forEach((p) => {
    map[p.id] = {
      ...p,
      images: p.images || ["/placeholder.svg"],
      description: p.description || `Beautiful ${p.bedrooms}-bed property in ${p.location}.`,
      features: p.features || ["Spacious", "Great location"],
      amenities: p.amenities || {
        parking: false,
        wifi: true,
        kitchen: true,
        pets: false,
        furnished: false
      },
      availableFrom: p.availableFrom || "Immediately",
      deposit: p.deposit || "N/A",
      council: p.council || "N/A",
      transport: p.transport || "N/A",
      agent: p.agent || {
        name: "Agent Name",
        company: "Agency",
        phone: "020 0000 0000",
        email: "agent@example.com",
        photo: "/placeholder.svg"
      }
    };
  });
  return map;
};

const mockPropertiesDetailed = getPropertyDetails();

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
                  {Object.entries(property.amenities).map(([key, available]) => (
                    <div key={key} className="flex items-center">
                      {available ? 
                        <Check className="h-4 w-4 text-success mr-2" /> : 
                        <X className="h-4 w-4 text-muted-foreground mr-2" 
                      />}
                      <span className={available ? "text-foreground" : "text-muted-foreground"}>
                        {key.charAt(0).toUpperCase() + key.slice(1)}
                      </span>
                    </div>
                  ))}
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
