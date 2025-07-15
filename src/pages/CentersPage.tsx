import { useState } from "react";
import { Navigation } from "@/components/Navigation";
import { PointsDisplay } from "@/components/PointsDisplay";
import { EcoMascot } from "@/components/EcoMascot";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { MapPin, Navigation as NavigationIcon, Clock, Star, Phone, Recycle } from "lucide-react";
import recyclingCenterImg from "@/assets/recycling-center.png";

const CentersPage = () => {
  const [userPoints] = useState(1250);
  const [carbonSaved] = useState(15.7);
  const [selectedCenter, setSelectedCenter] = useState(null);

  const recyclingCenters = [
    {
      id: 1,
      name: "GREEN@COMMUNITY Center",
      type: "Government Center",
      distance: "0.8 km",
      rating: 4.8,
      hours: "8:00 AM - 6:00 PM",
      phone: "+60 3-1234 5678",
      address: "Jalan Hijau 15, Taman Eco, 50450 Kuala Lumpur",
      accepts: ["Plastic Bottles", "Cans", "Paper", "Glass"],
      bonus: "Double points on weekends"
    },
    {
      id: 2,
      name: "Mil Mill Recycling Hub",
      type: "NGO Center", 
      distance: "1.2 km",
      rating: 4.6,
      hours: "9:00 AM - 5:00 PM",
      phone: "+60 3-9876 5432",
      address: "No. 42, Jalan Kelestarian, 53100 Kuala Lumpur",
      accepts: ["E-waste", "Textiles", "Furniture", "Metal"],
      bonus: "Free collection service"
    },
    {
      id: 3,
      name: "EcoPoint Express",
      type: "Private Center",
      distance: "2.1 km", 
      rating: 4.4,
      hours: "24/7 Drop-off",
      phone: "+60 3-5555 0123",
      address: "Lot 88, Jalan Inovasi, Cyber Heights, 63000 Cyberjaya",
      accepts: ["All Plastics", "Batteries", "Oil", "Chemicals"],
      bonus: "Instant payment via app"
    }
  ];

  const getCenterTypeColor = (type) => {
    switch (type) {
      case "Government Center": return "bg-primary";
      case "NGO Center": return "bg-eco";
      case "Private Center": return "bg-carbon";
      default: return "bg-muted";
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-primary/5 pb-20">
      <div className="container mx-auto px-4 py-6">
        <div className="text-center mb-6">
          <h1 className="text-3xl font-bold text-foreground mb-2">
            Recycling Centers 🗺️
          </h1>
          <p className="text-muted-foreground">
            Find nearby centers and drop-off points
          </p>
        </div>

        <PointsDisplay points={userPoints} carbonSaved={carbonSaved} />

        <div className="flex justify-center mb-6">
          <EcoMascot 
            message="These centers are closest to you! 📍" 
            animation="bounce"
            size="md"
          />
        </div>

        {/* Map Placeholder */}
        <Card className="mb-6">
          <CardContent className="p-0">
            <div className="h-48 bg-gradient-to-br from-eco-light to-primary rounded-lg flex items-center justify-center relative overflow-hidden">
              <img 
                src={recyclingCenterImg}
                alt="Map View" 
                className="absolute inset-0 w-full h-full object-cover opacity-50"
              />
              <div className="absolute inset-0 bg-primary/20"></div>
              <div className="relative text-center text-white">
                <MapPin size={32} className="mx-auto mb-2" />
                <p className="font-semibold">Interactive Map</p>
                <p className="text-sm">Tap centers for details</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Centers List */}
        <div className="space-y-4">
          {recyclingCenters.map((center) => (
            <Card 
              key={center.id} 
              className="hover:shadow-eco transition-all duration-300 hover:scale-[1.02] cursor-pointer"
              onClick={() => setSelectedCenter(center)}
            >
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <CardTitle className="text-lg">{center.name}</CardTitle>
                    <div className="flex items-center gap-2 mt-1">
                      <Badge className={`${getCenterTypeColor(center.type)} text-white`}>
                        {center.type}
                      </Badge>
                      <div className="flex items-center gap-1">
                        <Star size={14} className="text-yellow-500 fill-current" />
                        <span className="text-sm font-medium">{center.rating}</span>
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-medium text-primary">{center.distance}</p>
                    <p className="text-xs text-muted-foreground">away</p>
                  </div>
                </div>
              </CardHeader>
              
              <CardContent className="pt-0">
                <div className="space-y-3">
                  <div className="flex items-center gap-2 text-sm">
                    <Clock size={16} className="text-muted-foreground" />
                    <span>{center.hours}</span>
                  </div>
                  
                  <div className="flex items-start gap-2 text-sm">
                    <MapPin size={16} className="text-muted-foreground mt-0.5" />
                    <span className="text-muted-foreground">{center.address}</span>
                  </div>
                  
                  <div className="flex flex-wrap gap-1">
                    {center.accepts.slice(0, 3).map((item, index) => (
                      <Badge key={index} variant="secondary" className="text-xs">
                        {item}
                      </Badge>
                    ))}
                    {center.accepts.length > 3 && (
                      <Badge variant="secondary" className="text-xs">
                        +{center.accepts.length - 3} more
                      </Badge>
                    )}
                  </div>
                  
                  <div className="bg-reward/10 text-reward p-2 rounded-lg text-sm font-medium">
                    🎉 {center.bonus}
                  </div>
                  
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm" className="flex-1">
                      <Phone size={16} className="mr-1" />
                      Call
                    </Button>
                    <Button size="sm" className="flex-1 bg-primary hover:bg-primary/90">
                      <NavigationIcon size={16} className="mr-1" />
                      Navigate
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Quick Stats */}
        <Card className="mt-6 bg-gradient-to-r from-primary to-primary-glow text-primary-foreground">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Recycle size={20} />
              Recycling Network Stats
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-3 gap-4 text-center">
              <div>
                <p className="text-2xl font-bold">47</p>
                <p className="text-sm opacity-90">Centers Near You</p>
              </div>
              <div>
                <p className="text-2xl font-bold">15k</p>
                <p className="text-sm opacity-90">Items Recycled Today</p>
              </div>
              <div>
                <p className="text-2xl font-bold">2.3T</p>
                <p className="text-sm opacity-90">CO₂ Saved This Month</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Navigation />
    </div>
  );
};

export default CentersPage;