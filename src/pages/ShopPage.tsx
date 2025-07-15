import { useState } from "react";
import { Navigation } from "@/components/Navigation";
import { PointsDisplay } from "@/components/PointsDisplay";
import { EcoMascot } from "@/components/EcoMascot";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { Gift, Coffee, Bike, TreePine, ShoppingBag, Star, Check } from "lucide-react";

const ShopPage = () => {
  const [userPoints, setUserPoints] = useState(1250);
  const [carbonSaved] = useState(15.7);
  const [purchasedItems, setPurchasedItems] = useState([]);
  const { toast } = useToast();

  const rewards = [
    {
      id: 1,
      title: "Free Coffee",
      description: "Redeem at participating eco-cafes",
      cost: 200,
      category: "Food & Drink",
      icon: Coffee,
      color: "bg-yellow-600",
      carbonSaved: 0.1,
      available: 15,
      partner: "Green Bean Cafe"
    },
    {
      id: 2,
      title: "Bike Sharing - 1 Hour",
      description: "Free 1-hour bike rental in the city",
      cost: 500,
      category: "Transportation",
      icon: Bike,
      color: "bg-blue-600",
      carbonSaved: 2.5,
      available: 8,
      partner: "CityBike Network"
    },
    {
      id: 3,
      title: "Plant a Tree",
      description: "We'll plant a tree in your name",
      cost: 1000,
      category: "Environment",
      icon: TreePine,
      color: "bg-green-600",
      carbonSaved: 22.0,
      available: 5,
      partner: "Forest Forever"
    },
    {
      id: 4,
      title: "Eco Shopping Bag",
      description: "Reusable bamboo fiber shopping bag",
      cost: 150,
      category: "Products",
      icon: ShoppingBag,
      color: "bg-amber-600",
      carbonSaved: 0.5,
      available: 25,
      partner: "EcoStore"
    },
    {
      id: 5,
      title: "Bike Sharing - Day Pass",
      description: "Unlimited bike rides for one day",
      cost: 1500,
      category: "Transportation",
      icon: Bike,
      color: "bg-blue-800",
      carbonSaved: 15.0,
      available: 3,
      partner: "CityBike Network"
    },
    {
      id: 6,
      title: "Premium Coffee Bundle",
      description: "5 free premium coffee vouchers",
      cost: 800,
      category: "Food & Drink",
      icon: Coffee,
      color: "bg-yellow-800",
      carbonSaved: 0.5,
      available: 12,
      partner: "Green Bean Cafe"
    }
  ];

  const categories = ["All", "Food & Drink", "Transportation", "Environment", "Products"];
  const [selectedCategory, setSelectedCategory] = useState("All");

  const filteredRewards = selectedCategory === "All" 
    ? rewards 
    : rewards.filter(reward => reward.category === selectedCategory);

  const handlePurchase = (reward) => {
    if (userPoints >= reward.cost) {
      setUserPoints(prev => prev - reward.cost);
      setPurchasedItems(prev => [...prev, reward.id]);
      
      toast({
        title: "Reward Redeemed! 🎉",
        description: `You've successfully redeemed ${reward.title}. Check your email for details.`,
        className: "bg-primary text-primary-foreground",
      });
    } else {
      toast({
        title: "Insufficient Points",
        description: `You need ${reward.cost - userPoints} more Green$ points for this reward.`,
        variant: "destructive",
      });
    }
  };

  const getCategoryColor = (category) => {
    switch (category) {
      case "Food & Drink": return "bg-yellow-500 text-white";
      case "Transportation": return "bg-blue-500 text-white";
      case "Environment": return "bg-green-500 text-white";
      case "Products": return "bg-purple-500 text-white";
      default: return "bg-muted";
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-primary/5 pb-20">
      <div className="container mx-auto px-4 py-6">
        <div className="text-center mb-6">
          <h1 className="text-3xl font-bold text-foreground mb-2">
            Rewards Shop 🎁
          </h1>
          <p className="text-muted-foreground">
            Spend your Green$ points on amazing rewards!
          </p>
        </div>

        <PointsDisplay points={userPoints} carbonSaved={carbonSaved} />

        <div className="flex justify-center mb-6">
          <EcoMascot 
            message="Great rewards await! What will you choose? 🛍️" 
            animation="bounce"
            size="md"
          />
        </div>

        {/* Category Filter */}
        <div className="flex gap-2 mb-6 overflow-x-auto pb-2">
          {categories.map((category) => (
            <Button
              key={category}
              variant={selectedCategory === category ? "default" : "outline"}
              size="sm"
              onClick={() => setSelectedCategory(category)}
              className="whitespace-nowrap"
            >
              {category}
            </Button>
          ))}
        </div>

        {/* Rewards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          {filteredRewards.map((reward) => {
            const Icon = reward.icon;
            const isPurchased = purchasedItems.includes(reward.id);
            const canAfford = userPoints >= reward.cost;
            
            return (
              <Card 
                key={reward.id}
                className={`transition-all duration-300 ${
                  isPurchased 
                    ? "bg-muted border-muted-foreground/50" 
                    : canAfford 
                      ? "hover:shadow-eco hover:scale-[1.02] cursor-pointer" 
                      : "opacity-60"
                }`}
              >
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-3">
                      <div className={`${reward.color} p-3 rounded-full ${isPurchased ? "opacity-50" : ""}`}>
                        <Icon className="text-white" size={24} />
                      </div>
                      <div>
                        <CardTitle className="text-lg flex items-center gap-2">
                          {reward.title}
                          {isPurchased && <Check size={16} className="text-primary" />}
                        </CardTitle>
                        <p className="text-muted-foreground text-sm">{reward.description}</p>
                        <p className="text-xs text-muted-foreground mt-1">
                          Partner: {reward.partner}
                        </p>
                      </div>
                    </div>
                  </div>
                </CardHeader>
                
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <Badge className={getCategoryColor(reward.category)}>
                        {reward.category}
                      </Badge>
                      <p className="text-sm text-muted-foreground">
                        {reward.available} available
                      </p>
                    </div>
                    
                    <div className="bg-muted/50 p-3 rounded-lg">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm font-medium">Environmental Impact</span>
                        <span className="text-sm text-primary font-medium">
                          -{reward.carbonSaved}kg CO₂
                        </span>
                      </div>
                      <div className="bg-primary/20 rounded-full h-2">
                        <div 
                          className="bg-primary rounded-full h-2"
                          style={{ width: `${Math.min(reward.carbonSaved * 5, 100)}%` }}
                        ></div>
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-1">
                        <Star size={16} className="text-reward fill-current" />
                        <span className="font-bold text-xl">{reward.cost.toLocaleString()}</span>
                        <span className="text-sm text-muted-foreground">Green$</span>
                      </div>
                      
                      <Button
                        onClick={() => handlePurchase(reward)}
                        disabled={!canAfford || isPurchased || reward.available === 0}
                        className={`${
                          isPurchased 
                            ? "bg-muted text-muted-foreground" 
                            : canAfford 
                              ? "bg-primary hover:bg-primary/90" 
                              : "bg-destructive/50"
                        }`}
                      >
                        {isPurchased 
                          ? "Redeemed" 
                          : canAfford 
                            ? "Redeem" 
                            : "Not enough points"
                        }
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Purchase History */}
        {purchasedItems.length > 0 && (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Gift size={20} />
                Recent Purchases
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {purchasedItems.slice(-3).map((itemId) => {
                  const item = rewards.find(r => r.id === itemId);
                  return (
                    <div key={itemId} className="flex items-center justify-between p-3 bg-primary/5 rounded-lg">
                      <div className="flex items-center gap-2">
                        <Check size={16} className="text-primary" />
                        <span className="font-medium">{item.title}</span>
                      </div>
                      <span className="text-sm text-muted-foreground">
                        -{item.cost} Green$
                      </span>
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>
        )}

        {/* Impact Summary */}
        <Card className="mt-6 bg-gradient-to-r from-primary to-primary-glow text-primary-foreground">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TreePine size={20} />
              Your Reward Impact
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-3 gap-4 text-center">
              <div>
                <p className="text-2xl font-bold">{purchasedItems.length}</p>
                <p className="text-sm opacity-90">Rewards Redeemed</p>
              </div>
              <div>
                <p className="text-2xl font-bold">
                  {purchasedItems.reduce((sum, id) => {
                    const reward = rewards.find(r => r.id === id);
                    return sum + (reward?.carbonSaved || 0);
                  }, 0).toFixed(1)}kg
                </p>
                <p className="text-sm opacity-90">CO₂ Prevented</p>
              </div>
              <div>
                <p className="text-2xl font-bold">
                  {purchasedItems.reduce((sum, id) => {
                    const reward = rewards.find(r => r.id === id);
                    return sum + (reward?.cost || 0);
                  }, 0).toLocaleString()}
                </p>
                <p className="text-sm opacity-90">Points Invested</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Navigation />
    </div>
  );
};

export default ShopPage;