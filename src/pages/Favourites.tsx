import { Card, CardContent } from "@/components/ui/card";
import Header from "@/components/Header";
import { MessageCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";

const Favourites = () => {
  const [favouriteProperties, setFavouriteProperties] = useState<any[]>([]);

  // Load favourites from localStorage on mount and when page regains focus
  useEffect(() => {
    const loadFavourites = () => {
      const favs = JSON.parse(localStorage.getItem("favouriteProperties") || "[]");
      setFavouriteProperties(favs);
    };
    loadFavourites();
    window.addEventListener("focus", loadFavourites);
    return () => window.removeEventListener("focus", loadFavourites);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-subtle">
      <Header />
      <section className="container mx-auto px-4 py-12">
        <h1 className="text-4xl font-bold text-foreground mb-8 text-center">Your Favourites</h1>
        {favouriteProperties.length === 0 ? (
          <div className="text-center text-muted-foreground text-lg">You have no favourite properties yet.</div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {favouriteProperties.map((property) => (
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
        )}
      </section>
    </div>
  );
};

export default Favourites;
