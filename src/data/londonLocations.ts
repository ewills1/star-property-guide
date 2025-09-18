export interface LocationInfo {
  name: string;
  transport: {
    tube: string[];
    bus: string[];
    overground?: string[];
    dlr?: string[];
    commuteTimes: {
      cityCenter: string;
      canaryWharf: string;
      heathrow: string;
    };
  };
  entertainment: string[];
  shopping: string[];
  highlights: string[];
  description: string;
}

export const londonLocations: LocationInfo[] = [
  {
    name: "Camden",
    description: "Vibrant alternative culture hub with markets, music venues, and canal-side charm.",
    transport: {
      tube: ["Northern Line (Camden Town)", "Northern Line (Mornington Crescent)"],
      bus: ["24", "27", "31", "46", "168", "214"],
      commuteTimes: {
        cityCenter: "15-20 minutes",
        canaryWharf: "35-45 minutes",
        heathrow: "60-75 minutes"
      }
    },
    entertainment: [
      "Camden Market (weekend markets)",
      "Roundhouse (live music venue)",
      "KOKO (nightclub and live music)",
      "Regent's Canal walks",
      "Camden Lock Village",
      "Proud Camden (club and gallery)"
    ],
    shopping: [
      "Camden Market (vintage, alternative fashion)",
      "Stables Market (antiques, crafts)",
      "Camden Lock Market (arts, crafts, food)",
      "Alternative fashion boutiques",
      "Record shops",
      "Vintage clothing stores"
    ],
    highlights: ["Alternative music scene", "Street food markets", "Canal boat trips", "Live music venues"]
  },
  {
    name: "Shoreditch",
    description: "Trendy East London district known for street art, tech startups, and nightlife.",
    transport: {
      tube: ["Central Line (Liverpool Street)", "Circle/Hammersmith & City/Metropolitan Lines (Liverpool Street)"],
      overground: ["Shoreditch High Street"],
      bus: ["8", "26", "35", "47", "78", "135", "205"],
      commuteTimes: {
        cityCenter: "10-15 minutes",
        canaryWharf: "20-30 minutes", 
        heathrow: "60-75 minutes"
      }
    },
    entertainment: [
      "Boxpark Shoreditch (pop-up mall)",
      "Brick Lane (curry houses, street art)",
      "Hoxton Square bars and clubs",
      "Rich Mix cinema and cultural center",
      "Comedy clubs and live venues",
      "Street art tours"
    ],
    shopping: [
      "Boxpark Shoreditch (independent brands)",
      "Brick Lane vintage shops", 
      "Spitalfields Market (fashion, antiques)",
      "Columbia Road Flower Market (Sundays)",
      "Independent boutiques",
      "Tech and design stores"
    ],
    highlights: ["Street art scene", "Tech startup hub", "Vibrant nightlife", "Sunday markets"]
  },
  {
    name: "King's Cross",
    description: "Regenerated transport hub with modern developments, parks, and cultural venues.",
    transport: {
      tube: ["Piccadilly Line", "Victoria Line", "Circle Line", "Hammersmith & City Line", "Metropolitan Line"],
      overground: ["King's Cross St. Pancras"],
      bus: ["17", "30", "46", "63", "73", "205", "214", "259"],
      commuteTimes: {
        cityCenter: "5-10 minutes",
        canaryWharf: "25-35 minutes",
        heathrow: "45-60 minutes (direct Piccadilly)"
      }
    },
    entertainment: [
      "Coal Drops Yard (shopping and dining)",
      "Granary Square (events and fountains)",
      "British Library",
      "The Lighterman (canal-side pub)",
      "King's Place (concerts and gallery)",
      "Regent's Canal walks"
    ],
    shopping: [
      "Coal Drops Yard (designer brands)",
      "St. Pancras International (shops)",
      "Waitrose and M&S",
      "Independent boutiques",
      "Tech and lifestyle stores"
    ],
    highlights: ["Major transport hub", "Modern development", "Excellent connectivity", "Cultural venues"]
  },
  {
    name: "Clapham",
    description: "Popular South London area known for its common, family-friendly atmosphere, and vibrant nightlife.",
    transport: {
      tube: ["Northern Line (Clapham North, Clapham Common, Clapham South)"],
      overground: ["Clapham Junction", "Clapham High Street"],
      bus: ["35", "37", "88", "155", "196", "322", "345"],
      commuteTimes: {
        cityCenter: "20-30 minutes",
        canaryWharf: "45-55 minutes",
        heathrow: "45-60 minutes"
      }
    },
    entertainment: [
      "Clapham Common (large park)",
      "Clapham Grand (live music venue)",
      "Infernos nightclub",
      "Two Brewers (pub and cabaret)",
      "Omnibus Theatre",
      "Numerous pubs and bars"
    ],
    shopping: [
      "Clapham High Street (chain stores)",
      "Northcote Road (boutiques and delis)",
      "Clapham Junction (major shopping)",
      "Independent shops and cafes",
      "Farmers markets",
      "Vintage stores"
    ],
    highlights: ["Large green spaces", "Family-friendly", "Active nightlife", "Good schools nearby"]
  },
  {
    name: "Canary Wharf",
    description: "Major financial district with skyscrapers, shopping centers, and waterside dining.",
    transport: {
      tube: ["Jubilee Line"],
      dlr: ["Canary Wharf DLR", "West India Quay DLR", "Heron Quays DLR"],
      bus: ["135", "D3", "D7", "D8"],
      commuteTimes: {
        cityCenter: "15-25 minutes",
        canaryWharf: "0 minutes (you're here!)",
        heathrow: "45-60 minutes"
      }
    },
    entertainment: [
      "Canary Wharf Shopping Centre",
      "Crossrail Place Roof Garden",
      "Museum of London Docklands", 
      "Waterside bars and restaurants",
      "West India Quay entertainment",
      "Thames Path walks"
    ],
    shopping: [
      "Canary Wharf Shopping Centre (200+ stores)",
      "Jubilee Place Shopping Centre",
      "Crossrail Place shops",
      "High-end fashion brands",
      "Electronics and tech stores",
      "Financial district services"
    ],
    highlights: ["Financial center", "Modern architecture", "Extensive shopping", "Riverside location"]
  }
];

export const getLocationInfo = (locationName: string): LocationInfo | null => {
  return londonLocations.find(loc => 
    loc.name.toLowerCase().includes(locationName.toLowerCase())
  ) || null;
};

export const searchLocations = (query: string): LocationInfo[] => {
  const searchTerm = query.toLowerCase();
  return londonLocations.filter(loc => 
    loc.name.toLowerCase().includes(searchTerm) ||
    loc.description.toLowerCase().includes(searchTerm) ||
    loc.entertainment.some(item => item.toLowerCase().includes(searchTerm)) ||
    loc.shopping.some(item => item.toLowerCase().includes(searchTerm)) ||
    loc.highlights.some(item => item.toLowerCase().includes(searchTerm))
  );
};