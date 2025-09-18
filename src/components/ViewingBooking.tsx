import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Calendar, Clock, Users } from "lucide-react";

interface ViewingSlot {
  id: string;
  date: string;
  time: string;
  spotsAvailable: number;
  totalSpots: number;
}

interface ViewingBookingProps {
  propertyId: string;
  propertyTitle: string;
  onBooking?: (slotId: string) => void;
}

const mockViewingSlots: ViewingSlot[] = [
  {
    id: "1",
    date: "2025-01-20",
    time: "10:00 AM",
    spotsAvailable: 2,
    totalSpots: 3
  },
  {
    id: "2", 
    date: "2025-01-20",
    time: "2:00 PM",
    spotsAvailable: 1,
    totalSpots: 3
  },
  {
    id: "3",
    date: "2025-01-21",
    time: "11:00 AM", 
    spotsAvailable: 3,
    totalSpots: 3
  },
  {
    id: "4",
    date: "2025-01-22",
    time: "3:00 PM",
    spotsAvailable: 0,
    totalSpots: 3
  }
];

const ViewingBooking = ({ propertyId, propertyTitle, onBooking }: ViewingBookingProps) => {
  const [selectedSlot, setSelectedSlot] = useState<string | null>(null);
  const [booked, setBooked] = useState(false);

  const handleBooking = (slotId: string) => {
    setSelectedSlot(slotId);
    setBooked(true);
    onBooking?.(slotId);
  };

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString('en-GB', { 
      weekday: 'long', 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
  };

  if (booked) {
    return (
      <Card>
        <CardContent className="p-6 text-center">
          <div className="text-success text-2xl mb-2">✓</div>
          <h3 className="text-lg font-semibold mb-2">Viewing Booked!</h3>
          <p className="text-muted-foreground mb-4">
            You'll receive confirmation details via email shortly.
          </p>
          <Button variant="outline" onClick={() => setBooked(false)}>
            Book Another Viewing
          </Button>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center">
          <Calendar className="h-5 w-5 mr-2" />
          Available Viewing Slots
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        {mockViewingSlots.map((slot) => (
          <div 
            key={slot.id}
            className="flex items-center justify-between p-3 border border-border rounded-lg hover:bg-muted/50 transition-colors"
          >
            <div className="flex-1">
              <div className="font-medium">{formatDate(slot.date)}</div>
              <div className="flex items-center text-sm text-muted-foreground mt-1">
                <Clock className="h-4 w-4 mr-1" />
                {slot.time}
                <Users className="h-4 w-4 ml-3 mr-1" />
                {slot.spotsAvailable}/{slot.totalSpots} spots
              </div>
            </div>
            
            <div className="flex items-center gap-2">
              {slot.spotsAvailable === 0 ? (
                <Badge variant="secondary">Full</Badge>
              ) : slot.spotsAvailable === 1 ? (
                <Badge variant="outline" className="border-warning text-warning">
                  1 spot left
                </Badge>
              ) : (
                <Badge variant="outline" className="border-success text-success">
                  Available
                </Badge>
              )}
              
              <Button 
                size="sm"
                disabled={slot.spotsAvailable === 0}
                onClick={() => handleBooking(slot.id)}
              >
                {slot.spotsAvailable === 0 ? "Full" : "Book"}
              </Button>
            </div>
          </div>
        ))}
        
        <div className="text-sm text-muted-foreground text-center pt-2">
          Can't make any of these times? Contact the agent to arrange a private viewing.
        </div>
      </CardContent>
    </Card>
  );
};

export default ViewingBooking;