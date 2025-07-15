import { useState } from "react";
import { Navigation } from "@/components/Navigation";
import { PointsDisplay } from "@/components/PointsDisplay";
import { EcoMascot } from "@/components/EcoMascot";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Camera, CheckCircle, Info, Zap } from "lucide-react";
import bottlePartsImg from "@/assets/bottle-parts.png";

const ScanPage = () => {
  const [userPoints, setUserPoints] = useState(1250);
  const [carbonSaved, setCarbonSaved] = useState(15.7);
  const [isScanning, setIsScanning] = useState(false);
  const [scanResult, setScanResult] = useState(null);

  const handleScan = () => {
    setIsScanning(true);
    
    // Simulate scanning process
    setTimeout(() => {
      setIsScanning(false);
      setScanResult({
        item: "Plastic Water Bottle",
        recyclability: 85,
        parts: [
          { name: "Bottle Body", recyclable: true, material: "PET Plastic", points: 15 },
          { name: "Cap", recyclable: true, material: "PP Plastic", points: 5 },
          { name: "Label", recyclable: false, material: "Mixed Materials", points: 0 }
        ],
        totalPoints: 20,
        carbonReduction: 0.3
      });
      
      // Update points
      setUserPoints(prev => prev + 20);
      setCarbonSaved(prev => prev + 0.3);
    }, 3000);
  };

  const recyclabilityColor = (percentage) => {
    if (percentage >= 80) return "text-primary";
    if (percentage >= 60) return "text-yellow-500";
    return "text-destructive";
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-primary/5 pb-20">
      <div className="container mx-auto px-4 py-6">
        <div className="text-center mb-6">
          <h1 className="text-3xl font-bold text-foreground mb-2">
            Smart Scanner 📷
          </h1>
          <p className="text-muted-foreground">
            Scan items to identify recyclable parts
          </p>
        </div>

        <PointsDisplay points={userPoints} carbonSaved={carbonSaved} />

        {!scanResult && !isScanning && (
          <div className="text-center space-y-6">
            <EcoMascot 
              message="Point your camera at any recyclable item!" 
              animation="pulse"
            />
            
            <div className="relative">
              <div className="w-64 h-64 mx-auto bg-muted rounded-xl border-4 border-dashed border-muted-foreground/50 flex items-center justify-center">
                <Camera size={64} className="text-muted-foreground" />
              </div>
              
              <Button 
                onClick={handleScan}
                className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-primary hover:bg-primary/90 text-primary-foreground px-8 py-3 rounded-full shadow-eco"
              >
                <Camera className="mr-2" size={20} />
                Start Scanning
              </Button>
            </div>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Info size={20} />
                  How It Works
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-start gap-3">
                  <div className="bg-primary text-primary-foreground rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold">1</div>
                  <p className="text-sm">Point camera at recyclable items</p>
                </div>
                <div className="flex items-start gap-3">
                  <div className="bg-primary text-primary-foreground rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold">2</div>
                  <p className="text-sm">AI identifies recyclable parts</p>
                </div>
                <div className="flex items-start gap-3">
                  <div className="bg-primary text-primary-foreground rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold">3</div>
                  <p className="text-sm">Earn Green$ points and learn proper disposal</p>
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {isScanning && (
          <div className="text-center space-y-6">
            <EcoMascot 
              message="Analyzing your item... 🔍" 
              animation="pulse"
            />
            
            <div className="relative">
              <div className="w-64 h-64 mx-auto bg-primary/10 rounded-xl border-4 border-primary flex items-center justify-center">
                <div className="animate-spin">
                  <Camera size={64} className="text-primary" />
                </div>
              </div>
              
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-full h-1 bg-muted rounded-full overflow-hidden">
                  <div className="h-full bg-primary rounded-full animate-pulse"></div>
                </div>
              </div>
            </div>
            
            <p className="text-lg font-medium animate-pulse">Scanning in progress...</p>
          </div>
        )}

        {scanResult && (
          <div className="space-y-6">
            <Card className="border-primary bg-primary/5">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-primary">
                  <CheckCircle size={24} />
                  Scan Complete!
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center mb-4">
                  <img 
                    src={bottlePartsImg}
                    alt="Bottle Parts Analysis" 
                    className="w-48 h-48 mx-auto object-contain"
                  />
                </div>
                
                <div className="space-y-4">
                  <div className="text-center">
                    <h3 className="text-xl font-bold">{scanResult.item}</h3>
                    <p className={`text-lg font-semibold ${recyclabilityColor(scanResult.recyclability)}`}>
                      {scanResult.recyclability}% Recyclable
                    </p>
                  </div>

                  <div className="space-y-2">
                    <h4 className="font-semibold">Recyclable Parts:</h4>
                    {scanResult.parts.map((part, index) => (
                      <div key={index} className="flex items-center justify-between p-3 bg-muted rounded-lg">
                        <div>
                          <p className="font-medium">{part.name}</p>
                          <p className="text-sm text-muted-foreground">{part.material}</p>
                        </div>
                        <div className="text-right">
                          {part.recyclable ? (
                            <div className="flex items-center gap-2">
                              <CheckCircle size={16} className="text-primary" />
                              <span className="text-sm font-medium text-primary">+{part.points} pts</span>
                            </div>
                          ) : (
                            <span className="text-sm text-muted-foreground">Not recyclable</span>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>

                  <Card className="bg-gradient-to-r from-reward to-yellow-500 text-white">
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-semibold">Rewards Earned</p>
                          <p className="text-2xl font-bold">+{scanResult.totalPoints} Green$</p>
                          <p className="text-sm opacity-90">+{scanResult.carbonReduction}kg CO₂ saved</p>
                        </div>
                        <Zap size={32} />
                      </div>
                    </CardContent>
                  </Card>

                  <div className="flex gap-3">
                    <Button 
                      onClick={() => setScanResult(null)}
                      variant="outline" 
                      className="flex-1"
                    >
                      Scan Another
                    </Button>
                    <Button 
                      className="flex-1 bg-primary hover:bg-primary/90"
                    >
                      Find Recycling Center
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </div>

      <Navigation />
    </div>
  );
};

export default ScanPage;