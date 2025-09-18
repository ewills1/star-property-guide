export interface Property {
  id: string;
  title: string;
  price: string;
  location: string;
  bedrooms: number;
  bathrooms: number;
  size: string;
  type: "rent" | "sale";
  available: boolean;
  status?: "available" | "undergoing-viewings" | "taken";
  images?: string[];
  description?: string;
  features?: string[];
  amenities?: {
    parking: boolean;
    wifi: boolean;
    kitchen: boolean;
    pets: boolean;
    furnished: boolean;
  };
  availableFrom?: string;
  deposit?: string;
  council?: string;
  transport?: string;
  agent?: {
    name: string;
    company: string;
    phone: string;
    email: string;
    photo: string;
  };
  // Buy-specific fields
  tenure?: "freehold" | "leasehold";
  serviceCharge?: string;
  groundRent?: string;
  councilTaxBand?: string;
  epcRating?: string;
  chainStatus?: "no-chain" | "chain" | "chain-free";
  stampDuty?: string;
}

export const mockProperties: Property[] = [
  {
    id: "1",
    title: "Modern 2-bed Flat",
    price: "£1,400/month",
    location: "Canary Wharf, E14",
    bedrooms: 2,
    bathrooms: 1,
    size: "850 sq ft",
    type: "rent" as const,
    available: true,
    images: ["/placeholder.svg"],
    description: "A stunning modern 2-bedroom flat in the heart of Canary Wharf with excellent transport links.",
    features: ["Modern kitchen", "Balcony", "Great transport links", "Secure building"],
    amenities: {
      parking: false,
      wifi: true,
      kitchen: true,
      pets: false,
      furnished: true
    },
    availableFrom: "Immediately",
    deposit: "£2,800",
    council: "Tower Hamlets",
    transport: "Canary Wharf DLR (2 min walk)",
    agent: {
      name: "Sarah Johnson",
      company: "Prime Properties",
      phone: "020 7123 4567",
      email: "sarah@primeproperties.com",
      photo: "/placeholder.svg"
    }
  },
  {
    id: "2",
    title: "Victorian House",
    price: "£1,650/month",
    location: "Clapham, SW4",
    bedrooms: 3,
    bathrooms: 2,
    size: "1200 sq ft",
    type: "rent" as const,
    available: false,
    status: "undergoing-viewings",
    images: ["/placeholder.svg"],
    description: "Beautiful Victorian house with period features and modern amenities in the heart of Clapham.",
    features: ["Period features", "Garden", "High ceilings", "Original fireplace"],
    amenities: {
      parking: true,
      wifi: true,
      kitchen: true,
      pets: true,
      furnished: false
    },
    availableFrom: "Early November",
    deposit: "£3,300",
    council: "Lambeth",
    transport: "Clapham Common Tube (5 min walk)",
    agent: {
      name: "Michael Brown",
      company: "Heritage Homes",
      phone: "020 7234 5678",
      email: "michael@heritagehomes.com",
      photo: "/placeholder.svg"
    }
  },
  {
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
    description: "Modern studio apartment near King's Cross station, perfect for young professionals.",
    features: ["Open plan", "High-speed internet", "Concierge", "Gym access"],
    amenities: {
      parking: false,
      wifi: true,
      kitchen: true,
      pets: false,
      furnished: true
    },
    availableFrom: "Mid October",
    deposit: "£2,400",
    council: "Camden",
    transport: "King's Cross St. Pancras (3 min walk)",
    agent: {
      name: "Emma Wilson",
      company: "City Living",
      phone: "020 7345 6789",
      email: "emma@cityliving.com",
      photo: "/placeholder.svg"
    }
  },
  {
    id: "4",
    title: "Luxury 2-bed Apartment",
    price: "£2,200/month",
    location: "Shoreditch, E1",
    bedrooms: 2,
    bathrooms: 2,
    size: "950 sq ft",
    type: "rent" as const,
    available: true,
    images: ["/placeholder.svg"],
    description: "Luxurious apartment in trendy Shoreditch with modern fixtures and great nightlife nearby.",
    features: ["Floor-to-ceiling windows", "Roof terrace", "Designer kitchen", "Air conditioning"],
    amenities: {
      parking: false,
      wifi: true,
      kitchen: true,
      pets: true,
      furnished: true
    },
    availableFrom: "Immediately",
    deposit: "£4,400",
    council: "Tower Hamlets",
    transport: "Shoreditch High Street (4 min walk)",
    agent: {
      name: "James Taylor",
      company: "Urban Properties",
      phone: "020 7456 7890",
      email: "james@urbanproperties.com",
      photo: "/placeholder.svg"
    }
  },
  {
    id: "5",
    title: "Family House",
    price: "£2,800/month",
    location: "Camden, NW1",
    bedrooms: 3,
    bathrooms: 2,
    size: "1400 sq ft",
    type: "rent" as const,
    available: true,
    images: ["/placeholder.svg"],
    description: "Spacious family house in Camden with garden and excellent schools nearby.",
    features: ["Private garden", "Off-street parking", "Period features", "Near good schools"],
    amenities: {
      parking: true,
      wifi: true,
      kitchen: true,
      pets: true,
      furnished: false
    },
    availableFrom: "December 1st",
    deposit: "£5,600",
    council: "Camden",
    transport: "Camden Town Tube (8 min walk)",
    agent: {
      name: "Lisa Chen",
      company: "Family Homes",
      phone: "020 7567 8901",
      email: "lisa@familyhomes.com",
      photo: "/placeholder.svg"
    }
  },
  {
    id: "6",
    title: "Compact Studio",
    price: "£1,350/month",
    location: "Shoreditch, E2",
    bedrooms: 1,
    bathrooms: 1,
    size: "400 sq ft",
    type: "rent" as const,
    available: false,
    status: "taken",
    images: ["/placeholder.svg"],
    description: "Cozy studio in the heart of Shoreditch's creative quarter.",
    features: ["Exposed brick", "High ceilings", "Near galleries", "Vibrant area"],
    amenities: {
      parking: false,
      wifi: true,
      kitchen: true,
      pets: false,
      furnished: true
    },
    availableFrom: "N/A",
    deposit: "£2,700",
    council: "Hackney",
    transport: "Bethnal Green Tube (6 min walk)",
    agent: {
      name: "David Kumar",
      company: "Creative Spaces",
      phone: "020 7678 9012",
      email: "david@creativespaces.com",
      photo: "/placeholder.svg"
    }
  },
  {
    id: "7",
    title: "Riverside Penthouse",
    price: "£3,200/month",
    location: "Battersea, SW11",
    bedrooms: 2,
    bathrooms: 2,
    size: "1100 sq ft",
    type: "rent" as const,
    available: true,
    images: ["/placeholder.svg"],
    description: "Stunning penthouse with river views and luxury finishes in Battersea.",
    features: ["River views", "Private terrace", "Concierge", "Gym and pool"],
    amenities: {
      parking: true,
      wifi: true,
      kitchen: true,
      pets: false,
      furnished: true
    },
    availableFrom: "November 15th",
    deposit: "£6,400",
    council: "Wandsworth",
    transport: "Battersea Power Station Tube (2 min walk)",
    agent: {
      name: "Oliver Smith",
      company: "Luxury Living",
      phone: "020 7789 0123",
      email: "oliver@luxuryliving.com",
      photo: "/placeholder.svg"
    }
  },
  {
    id: "8",
    title: "Charming 1-bed Flat",
    price: "£1,600/month",
    location: "Islington, N1",
    bedrooms: 1,
    bathrooms: 1,
    size: "600 sq ft",
    type: "rent" as const,
    available: true,
    images: ["/placeholder.svg"],
    description: "Charming converted warehouse flat in trendy Islington with original features.",
    features: ["Exposed beams", "High ceilings", "Original windows", "Quiet courtyard"],
    amenities: {
      parking: false,
      wifi: true,
      kitchen: true,
      pets: true,
      furnished: false
    },
    availableFrom: "October 20th",
    deposit: "£3,200",
    council: "Islington",
    transport: "Angel Tube (7 min walk)",
    agent: {
      name: "Sophie Miller",
      company: "North London Homes",
      phone: "020 7890 1234",
      email: "sophie@nlhomes.com",
      photo: "/placeholder.svg"
    }
  },
  {
    id: "9",
    title: "Modern Loft Apartment",
    price: "£2,500/month",
    location: "Hackney, E8",
    bedrooms: 2,
    bathrooms: 2,
    size: "950 sq ft",
    type: "rent" as const,
    available: true,
    images: ["/placeholder.svg"],
    description: "Converted industrial loft in up-and-coming Hackney with unique character.",
    features: ["Double height ceilings", "Industrial features", "Mezzanine", "Creative area"],
    amenities: {
      parking: false,
      wifi: true,
      kitchen: true,
      pets: true,
      furnished: false
    },
    availableFrom: "Immediately",
    deposit: "£5,000",
    council: "Hackney",
    transport: "London Fields (5 min walk)",
    agent: {
      name: "Marcus Johnson",
      company: "East London Properties",
      phone: "020 7901 2345",
      email: "marcus@eastlondon.com",
      photo: "/placeholder.svg"
    }
  },
  {
    id: "10",
    title: "Family Home with Garden",
    price: "£2,400/month",
    location: "Greenwich, SE10",
    bedrooms: 3,
    bathrooms: 2,
    size: "1300 sq ft",
    type: "rent" as const,
    available: true,
    images: ["/placeholder.svg"],
    description: "Spacious Victorian family home with large garden in historic Greenwich.",
    features: ["Large garden", "Period features", "Family-friendly", "Near park"],
    amenities: {
      parking: true,
      wifi: true,
      kitchen: true,
      pets: true,
      furnished: false
    },
    availableFrom: "November 1st",
    deposit: "£4,800",
    council: "Greenwich",
    transport: "Greenwich Station (10 min walk)",
    agent: {
      name: "Rebecca Thompson",
      company: "South East Homes",
      phone: "020 8012 3456",
      email: "rebecca@sehomes.com",
      photo: "/placeholder.svg"
    }
  },
  {
    id: "11",
    title: "Bright Studio Flat",
    price: "£1,100/month",
    location: "Wembley, HA9",
    bedrooms: 1,
    bathrooms: 1,
    size: "380 sq ft",
    type: "rent" as const,
    available: true,
    images: ["/placeholder.svg"],
    description: "Bright and airy studio flat in Wembley, perfect for commuters to central London.",
    features: ["Large windows", "Modern fittings", "Good transport links", "Affordable"],
    amenities: {
      parking: true,
      wifi: true,
      kitchen: true,
      pets: false,
      furnished: true
    },
    availableFrom: "Immediately",
    deposit: "£2,200",
    council: "Brent",
    transport: "Wembley Central (3 min walk)",
    agent: {
      name: "Hassan Ali",
      company: "West London Rentals",
      phone: "020 8123 4567",
      email: "hassan@westlondon.com",
      photo: "/placeholder.svg"
    }
  },
  {
    id: "12",
    title: "Luxury Townhouse",
    price: "£4,500/month",
    location: "Chelsea, SW3",
    bedrooms: 4,
    bathrooms: 3,
    size: "2200 sq ft",
    type: "rent" as const,
    available: false,
    status: "undergoing-viewings",
    images: ["/placeholder.svg"],
    description: "Exceptional luxury townhouse in prestigious Chelsea with premium finishes throughout.",
    features: ["Private garden", "Roof terrace", "Wine cellar", "Gym room"],
    amenities: {
      parking: true,
      wifi: true,
      kitchen: true,
      pets: true,
      furnished: true
    },
    availableFrom: "December 15th",
    deposit: "£9,000",
    council: "Kensington and Chelsea",
    transport: "Sloane Square Tube (8 min walk)",
    agent: {
      name: "Victoria Ashworth",
      company: "Prestige Properties",
      phone: "020 7234 5678",
      email: "victoria@prestigeproperties.com",
      photo: "/placeholder.svg"
    }
  },
  {
    id: "13",
    title: "Cozy 1-bed Apartment",
    price: "£1,300/month",
    location: "Bermondsey, SE1",
    bedrooms: 1,
    bathrooms: 1,
    size: "500 sq ft",
    type: "rent" as const,
    available: true,
    images: ["/placeholder.svg"],
    description: "Cozy modern apartment in trendy Bermondsey with easy access to London Bridge.",
    features: ["Modern kitchen", "Good storage", "Quiet location", "Near Thames"],
    amenities: {
      parking: false,
      wifi: true,
      kitchen: true,
      pets: false,
      furnished: true
    },
    availableFrom: "October 25th",
    deposit: "£2,600",
    council: "Southwark",
    transport: "Bermondsey Tube (4 min walk)",
    agent: {
      name: "Tom Watson",
      company: "River Properties",
      phone: "020 7345 6789",
      email: "tom@riverproperties.com",
      photo: "/placeholder.svg"
    }
  },
  {
    id: "14",
    title: "Contemporary 2-bed Flat",
    price: "£1,950/month",
    location: "Notting Hill, W11",
    bedrooms: 2,
    bathrooms: 2,
    size: "800 sq ft",
    type: "rent" as const,
    available: true,
    images: ["/placeholder.svg"],
    description: "Stylish contemporary flat in fashionable Notting Hill with designer interiors.",
    features: ["Designer interiors", "Balcony", "High-end appliances", "Porter service"],
    amenities: {
      parking: false,
      wifi: true,
      kitchen: true,
      pets: false,
      furnished: true
    },
    availableFrom: "November 10th",
    deposit: "£3,900",
    council: "Kensington and Chelsea",
    transport: "Notting Hill Gate Tube (5 min walk)",
    agent: {
      name: "Charlotte Davies",
      company: "West End Properties",
      phone: "020 7456 7890",
      email: "charlotte@westendproperties.com",
      photo: "/placeholder.svg"
    }
  },
  {
    id: "15",
    title: "Spacious 3-bed Flat",
    price: "£2,100/month",
    location: "Westminster, SW1",
    bedrooms: 3,
    bathrooms: 2,
    size: "1150 sq ft",
    type: "rent" as const,
    available: true,
    images: ["/placeholder.svg"],
    description: "Spacious apartment in the heart of Westminster with excellent central London location.",
    features: ["Central location", "Period building", "High ceilings", "Near Parliament"],
    amenities: {
      parking: false,
      wifi: true,
      kitchen: true,
      pets: false,
      furnished: false
    },
    availableFrom: "December 5th",
    deposit: "£4,200",
    council: "Westminster",
    transport: "Westminster Tube (6 min walk)",
    agent: {
      name: "Andrew Fletcher",
      company: "Central London Homes",
      phone: "020 7567 8901",
      email: "andrew@centrallondon.com",
      photo: "/placeholder.svg"
    }
  },
  // Buy Properties
  {
    id: "16",
    title: "Modern 2-bed Apartment for Sale",
    price: "£450,000",
    location: "Canary Wharf, E14",
    bedrooms: 2,
    bathrooms: 2,
    size: "820 sq ft",
    type: "sale" as const,
    available: true,
    images: ["/placeholder.svg"],
    description: "Contemporary 2-bedroom apartment in a prestigious development with stunning city views.",
    features: ["City views", "Concierge", "Balcony", "Modern fixtures"],
    amenities: {
      parking: true,
      wifi: false,
      kitchen: true,
      pets: false,
      furnished: false
    },
    council: "Tower Hamlets",
    transport: "Canary Wharf DLR (3 min walk)",
    agent: {
      name: "Jennifer Clarke",
      company: "Docklands Sales",
      phone: "020 7890 1234",
      email: "jennifer@docklandssales.com",
      photo: "/placeholder.svg"
    },
    tenure: "leasehold",
    serviceCharge: "£2,400/year",
    groundRent: "£350/year",
    councilTaxBand: "D",
    epcRating: "B",
    chainStatus: "no-chain",
    stampDuty: "£12,500"
  },
  {
    id: "17",
    title: "Victorian Terrace House",
    price: "£650,000",
    location: "Clapham, SW4",
    bedrooms: 3,
    bathrooms: 2,
    size: "1400 sq ft",
    type: "sale" as const,
    available: true,
    images: ["/placeholder.svg"],
    description: "Beautiful Victorian terrace house with period features and modern kitchen extension.",
    features: ["Period features", "Garden", "Extension", "High ceilings"],
    amenities: {
      parking: true,
      wifi: false,
      kitchen: true,
      pets: true,
      furnished: false
    },
    council: "Lambeth",
    transport: "Clapham Common Tube (4 min walk)",
    agent: {
      name: "Robert Mills",
      company: "Heritage Sales",
      phone: "020 7234 5678",
      email: "robert@heritagesales.com",
      photo: "/placeholder.svg"
    },
    tenure: "freehold",
    councilTaxBand: "E",
    epcRating: "C",
    chainStatus: "chain-free",
    stampDuty: "£19,500"
  },
  {
    id: "18",
    title: "Luxury Penthouse for Sale",
    price: "£1,200,000",
    location: "Shoreditch, E1",
    bedrooms: 3,
    bathrooms: 3,
    size: "1600 sq ft",
    type: "sale" as const,
    available: true,
    status: "undergoing-viewings",
    images: ["/placeholder.svg"],
    description: "Exceptional penthouse with panoramic London views and premium finishes throughout.",
    features: ["Panoramic views", "Roof terrace", "Premium finishes", "Concierge"],
    amenities: {
      parking: true,
      wifi: false,
      kitchen: true,
      pets: false,
      furnished: false
    },
    council: "Tower Hamlets",
    transport: "Shoreditch High Street (2 min walk)",
    agent: {
      name: "Amanda Foster",
      company: "Luxury London Sales",
      phone: "020 7345 6789",
      email: "amanda@luxurylondonsales.com",
      photo: "/placeholder.svg"
    },
    tenure: "leasehold",
    serviceCharge: "£4,800/year",
    groundRent: "£500/year",
    councilTaxBand: "G",
    epcRating: "A",
    chainStatus: "chain",
    stampDuty: "£54,000"
  },
  {
    id: "19",
    title: "Family House with Garden",
    price: "£750,000",
    location: "Greenwich, SE10",
    bedrooms: 4,
    bathrooms: 3,
    size: "1800 sq ft",
    type: "sale" as const,
    available: true,
    images: ["/placeholder.svg"],
    description: "Spacious Edwardian family house with large garden and off-street parking.",
    features: ["Large garden", "Off-street parking", "Period features", "Near schools"],
    amenities: {
      parking: true,
      wifi: false,
      kitchen: true,
      pets: true,
      furnished: false
    },
    council: "Greenwich",
    transport: "Greenwich Station (8 min walk)",
    agent: {
      name: "Paul Stevens",
      company: "Family Home Sales",
      phone: "020 8123 4567",
      email: "paul@familyhomesales.com",
      photo: "/placeholder.svg"
    },
    tenure: "freehold",
    councilTaxBand: "F",
    epcRating: "D",
    chainStatus: "no-chain",
    stampDuty: "£27,500"
  },
  {
    id: "20",
    title: "Modern Studio for Sale",
    price: "£320,000",
    location: "King's Cross, N1",
    bedrooms: 1,
    bathrooms: 1,
    size: "480 sq ft",
    type: "sale" as const,
    available: true,
    images: ["/placeholder.svg"],
    description: "Contemporary studio apartment perfect for first-time buyers or investors.",
    features: ["Modern design", "High-speed internet ready", "Concierge", "Investment potential"],
    amenities: {
      parking: false,
      wifi: false,
      kitchen: true,
      pets: false,
      furnished: false
    },
    council: "Camden",
    transport: "King's Cross St. Pancras (5 min walk)",
    agent: {
      name: "Lucy Chen",
      company: "Urban Sales",
      phone: "020 7456 7890",
      email: "lucy@urbansales.com",
      photo: "/placeholder.svg"
    },
    tenure: "leasehold",
    serviceCharge: "£1,800/year",
    groundRent: "£250/year",
    councilTaxBand: "C",
    epcRating: "B",
    chainStatus: "chain-free",
    stampDuty: "£6,000"
  },
  {
    id: "21",
    title: "Riverside Apartment for Sale",
    price: "£850,000",
    location: "Battersea, SW11",
    bedrooms: 2,
    bathrooms: 2,
    size: "1050 sq ft",
    type: "sale" as const,
    available: false,
    status: "taken",
    images: ["/placeholder.svg"],
    description: "Stunning riverside apartment with Thames views and luxury amenities.",
    features: ["Thames views", "Balcony", "Concierge", "Gym access"],
    amenities: {
      parking: true,
      wifi: false,
      kitchen: true,
      pets: false,
      furnished: false
    },
    council: "Wandsworth",
    transport: "Battersea Power Station (4 min walk)",
    agent: {
      name: "Simon Price",
      company: "Riverside Properties",
      phone: "020 7567 8901",
      email: "simon@riversideproperties.com",
      photo: "/placeholder.svg"
    },
    tenure: "leasehold",
    serviceCharge: "£3,600/year",
    groundRent: "£400/year",
    councilTaxBand: "F",
    epcRating: "B",
    chainStatus: "chain",
    stampDuty: "£32,500"
  },
  {
    id: "22",
    title: "Chelsea Mansion Flat",
    price: "£1,450,000",
    location: "Chelsea, SW3",
    bedrooms: 3,
    bathrooms: 2,
    size: "1200 sq ft",
    type: "sale" as const,
    available: true,
    images: ["/placeholder.svg"],
    description: "Elegant mansion flat in prime Chelsea location with period features.",
    features: ["Period features", "High ceilings", "Prime location", "Porter service"],
    amenities: {
      parking: false,
      wifi: false,
      kitchen: true,
      pets: true,
      furnished: false
    },
    council: "Kensington and Chelsea",
    transport: "Sloane Square Tube (6 min walk)",
    agent: {
      name: "Caroline Webb",
      company: "Prime Chelsea Sales",
      phone: "020 7678 9012",
      email: "caroline@primechelsea.com",
      photo: "/placeholder.svg"
    },
    tenure: "leasehold",
    serviceCharge: "£5,200/year",
    groundRent: "£600/year",
    councilTaxBand: "H",
    epcRating: "E",
    chainStatus: "no-chain",
    stampDuty: "£72,500"
  },
  {
    id: "23",
    title: "Converted Warehouse Loft",
    price: "£580,000",
    location: "Hackney, E8",
    bedrooms: 2,
    bathrooms: 2,
    size: "1100 sq ft",
    type: "sale" as const,
    available: true,
    images: ["/placeholder.svg"],
    description: "Unique converted warehouse loft with industrial features and modern amenities.",
    features: ["Industrial features", "High ceilings", "Exposed brick", "Modern amenities"],
    amenities: {
      parking: false,
      wifi: false,
      kitchen: true,
      pets: true,
      furnished: false
    },
    council: "Hackney",
    transport: "London Fields (7 min walk)",
    agent: {
      name: "Alex Thompson",
      company: "Industrial Sales",
      phone: "020 7789 0123",
      email: "alex@industrialsales.com",
      photo: "/placeholder.svg"
    },
    tenure: "leasehold",
    serviceCharge: "£2,200/year",
    groundRent: "£300/year",
    councilTaxBand: "E",
    epcRating: "C",
    chainStatus: "chain-free",
    stampDuty: "£19,000"
  }
];