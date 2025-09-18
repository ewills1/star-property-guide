import { useState } from "react";
import { Button } from "@/components/ui/button";
import Header from "@/components/Header";
import PropertyCard from "@/components/PropertyCard";
import { mockProperties } from "@/data/mockProperties";

const Properties = () => {
  const [filter, setFilter] = useState<"all" | "rent" | "sale">("all");

  const filteredProperties = mockProperties.filter(property => {
    if (filter === "all") return true;
    return property.type === filter;
  });

  return (
    <div className="min-h-screen bg-gradient-subtle">
      <Header />
      <section className="container mx-auto px-4 py-12">
        <h1 className="text-4xl font-bold text-foreground mb-8 text-center">All Properties</h1>
        
        {/* Filter Buttons */}
        <div className="flex justify-center gap-4 mb-8">
          <Button
            variant={filter === "all" ? "default" : "outline"}
            onClick={() => setFilter("all")}
          >
            All Properties
          </Button>
          <Button
            variant={filter === "rent" ? "default" : "outline"}
            onClick={() => setFilter("rent")}
          >
            For Rent
          </Button>
          <Button
            variant={filter === "sale" ? "default" : "outline"}
            onClick={() => setFilter("sale")}
          >
            For Sale
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProperties.map((property) => (
            <PropertyCard
              key={property.id}
              id={property.id}
              title={property.title}
              price={property.price}
              location={property.location}
              bedrooms={property.bedrooms}
              bathrooms={property.bathrooms}
              size={property.size}
              type={property.type}
              available={property.available}
              status={property.status}
              image={property.images?.[0]}
            />
          ))}
        </div>
      </section>
    </div>
  );
};

export default Properties;
