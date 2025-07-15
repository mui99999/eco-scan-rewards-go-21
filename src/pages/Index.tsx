import { useState } from "react";
import { Navigation } from "@/components/Navigation";
import { PointsDisplay } from "@/components/PointsDisplay";
import { EcoMascot } from "@/components/EcoMascot";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Camera, MapPin, Trophy, Gamepad2, Recycle, Leaf, Award } from "lucide-react";
import { Link } from "react-router-dom";

const Index = () => {
  const [userPoints] = useState(1250);
  const [carbonSaved] = useState(15.7);

  const quickActions = [
    { icon: Camera, label: "Scan Item", path: "/scan", color: "bg-primary" },
    { icon: MapPin, label: "Find Centers", path: "/centers", color: "bg-eco" },
    { icon: Gamepad2, label: "Play Games", path: "/games", color: "bg-reward" },
    { icon: Award, label: "Shop Rewards", path: "/shop", color: "bg-carbon" },
  ];

  const stats = [
    { icon: Recycle, label: "Items Recycled", value: "47", color: "text-primary" },
    { icon: Leaf, label: "Trees Saved", value: "3.2", color: "text-eco" },
    { icon: Trophy, label: "Rank", value: "#24", color: "text-reward" },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-primary/5 pb-20">
      <div className="container mx-auto px-4 py-6">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">
            Welcome to EcoScan! 🌍
          </h1>
          <p className="text-muted-foreground">
            Scan, Recycle, Earn, and Save Our Planet
          </p>
        </div>

        {/* Points Display */}
        <PointsDisplay points={userPoints} carbonSaved={carbonSaved} />

        {/* Mascot */}
        <div className="flex justify-center mb-8">
          <EcoMascot 
            message="Ready to make a difference today? 🌱" 
            animation="float"
            size="lg"
          />
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-2 gap-4 mb-8">
          {quickActions.map((action) => {
            const Icon = action.icon;
            return (
              <Link key={action.path} to={action.path}>
                <Card className="hover:shadow-eco transition-all duration-300 hover:scale-105">
                  <CardContent className="flex flex-col items-center justify-center p-6">
                    <div className={`${action.color} p-4 rounded-full mb-3`}>
                      <Icon className="text-white" size={32} />
                    </div>
                    <p className="font-semibold text-center">{action.label}</p>
                  </CardContent>
                </Card>
              </Link>
            );
          })}
        </div>

        {/* Stats */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="text-center">Your Impact This Month</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-3 gap-4">
              {stats.map((stat) => {
                const Icon = stat.icon;
                return (
                  <div key={stat.label} className="text-center">
                    <Icon className={`${stat.color} mx-auto mb-2`} size={24} />
                    <p className="text-2xl font-bold">{stat.value}</p>
                    <p className="text-xs text-muted-foreground">{stat.label}</p>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>

        {/* Daily Challenge */}
        <Card className="bg-gradient-to-r from-primary to-primary-glow text-primary-foreground">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Trophy size={20} />
              Daily Challenge
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="mb-4">Scan 3 plastic bottles today and earn 100 bonus Green$ points!</p>
            <div className="bg-white/20 rounded-full h-2 mb-2">
              <div className="bg-white rounded-full h-2 w-1/3"></div>
            </div>
            <p className="text-sm">Progress: 1/3 items scanned</p>
          </CardContent>
        </Card>
      </div>

      <Navigation />
    </div>
  );
};

export default Index;
