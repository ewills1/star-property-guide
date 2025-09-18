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
  },
];