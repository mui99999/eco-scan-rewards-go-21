import { useState } from "react";
import { Navigation } from "@/components/Navigation";
import { PointsDisplay } from "@/components/PointsDisplay";
import { EcoMascot } from "@/components/EcoMascot";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Trophy, Target, Zap, Leaf, TrendingUp, Award, Calendar, Star } from "lucide-react";

const RewardsPage = () => {
  const [userPoints] = useState(1250);
  const [carbonSaved] = useState(15.7);

  // Calculate carbon reduction based on Green$ points
  const carbonPerPoint = 0.012; // 0.012 kg CO2 per point
  const calculatedCarbon = userPoints * carbonPerPoint;

  const achievements = [
    {
      id: 1,
      title: "First Scan",
      description: "Completed your first item scan",
      icon: Target,
      unlocked: true,
      points: 50,
      rarity: "Common"
    },
    {
      id: 2,
      title: "Recycling Champion",
      description: "Scanned 25 recyclable items",
      icon: Trophy,
      unlocked: true,
      points: 200,
      rarity: "Rare"
    },
    {
      id: 3,
      title: "Carbon Warrior",
      description: "Saved 10kg of CO₂ emissions",
      icon: Leaf,
      unlocked: true,
      points: 500,
      rarity: "Epic"
    },
    {
      id: 4,
      title: "Game Master",
      description: "Complete all mini-games",
      icon: Zap,
      unlocked: false,
      points: 1000,
      rarity: "Legendary",
      progress: 2,
      total: 3
    },
    {
      id: 5,
      title: "Eco Scholar",
      description: "Complete all learning modules",
      icon: Award,
      unlocked: false,
      points: 750,
      rarity: "Epic",
      progress: 2,
      total: 4
    },
    {
      id: 6,
      title: "Green Millionaire",
      description: "Accumulate 10,000 Green$ points",
      icon: Star,
      unlocked: false,
      points: 2000,
      rarity: "Legendary",
      progress: 1250,
      total: 10000
    }
  ];

  const weeklyGoals = [
    {
      title: "Scan 15 items",
      current: 8,
      target: 15,
      reward: 100,
      icon: Target
    },
    {
      title: "Visit 2 recycling centers",
      current: 1,
      target: 2,
      reward: 150,
      icon: Trophy
    },
    {
      title: "Complete 3 lessons",
      current: 2,
      target: 3,
      reward: 200,
      icon: Award
    }
  ];

  const monthlyStats = [
    {
      label: "Items Recycled",
      value: 47,
      change: "+12",
      icon: Target,
      color: "text-primary"
    },
    {
      label: "Points Earned",
      value: 1250,
      change: "+340",
      icon: Star,
      color: "text-reward"
    },
    {
      label: "CO₂ Saved (kg)",
      value: calculatedCarbon.toFixed(1),
      change: `+${(340 * carbonPerPoint).toFixed(1)}`,
      icon: Leaf,
      color: "text-eco"
    },
    {
      label: "Rank Position",
      value: "#24",
      change: "+3",
      icon: TrendingUp,
      color: "text-carbon"
    }
  ];

  const getRarityColor = (rarity) => {
    switch (rarity) {
      case "Common": return "bg-gray-500 text-white";
      case "Rare": return "bg-blue-500 text-white";
      case "Epic": return "bg-purple-500 text-white";
      case "Legendary": return "bg-yellow-500 text-black";
      default: return "bg-muted";
    }
  };

  const carbonCalculations = [
    {
      action: "Recycling 1 plastic bottle",
      points: 20,
      carbonSaved: (20 * carbonPerPoint).toFixed(3)
    },
    {
      action: "Completing a lesson",
      points: 50,
      carbonSaved: (50 * carbonPerPoint).toFixed(3)
    },
    {
      action: "Winning a mini-game",
      points: 100,
      carbonSaved: (100 * carbonPerPoint).toFixed(3)
    },
    {
      action: "Daily login streak (7 days)",
      points: 200,
      carbonSaved: (200 * carbonPerPoint).toFixed(3)
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-primary/5 pb-20">
      <div className="container mx-auto px-4 py-6">
        <div className="text-center mb-6">
          <h1 className="text-3xl font-bold text-foreground mb-2">
            Your Rewards 🏆
          </h1>
          <p className="text-muted-foreground">
            Track your progress and achievements
          </p>
        </div>

        <PointsDisplay points={userPoints} carbonSaved={calculatedCarbon} />

        <div className="flex justify-center mb-6">
          <EcoMascot 
            message="You're doing amazing! Keep up the great work! 🌟" 
            animation="bounce"
            size="md"
          />
        </div>

        {/* Carbon Calculation Explanation */}
        <Card className="mb-6 bg-gradient-to-r from-carbon to-blue-500 text-white">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Leaf size={20} />
              Carbon Impact Calculator
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <p className="text-sm opacity-90">
                Every Green$ point represents real environmental impact:
              </p>
              <div className="bg-white/10 p-3 rounded-lg">
                <p className="font-bold text-lg">
                  1 Green$ = {carbonPerPoint}kg CO₂ saved
                </p>
                <p className="text-sm opacity-90">
                  Your {userPoints.toLocaleString()} points = {calculatedCarbon.toFixed(2)}kg CO₂ prevented!
                </p>
              </div>
              <div className="grid grid-cols-1 gap-2 text-xs">
                {carbonCalculations.map((calc, index) => (
                  <div key={index} className="flex justify-between items-center bg-white/10 p-2 rounded">
                    <span>{calc.action}</span>
                    <span className="font-medium">{calc.points} pts = {calc.carbonSaved}kg CO₂</span>
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Monthly Stats */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Calendar size={20} />
              This Month's Impact
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-4">
              {monthlyStats.map((stat, index) => {
                const Icon = stat.icon;
                return (
                  <div key={index} className="text-center">
                    <Icon className={`${stat.color} mx-auto mb-2`} size={24} />
                    <p className="text-2xl font-bold">{stat.value}</p>
                    <p className="text-xs text-muted-foreground">{stat.label}</p>
                    <p className="text-xs text-primary font-medium">{stat.change} this week</p>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>

        {/* Weekly Goals */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Target size={20} />
              Weekly Goals
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {weeklyGoals.map((goal, index) => {
                const Icon = goal.icon;
                const progress = (goal.current / goal.target) * 100;
                return (
                  <div key={index} className="space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Icon size={16} className="text-primary" />
                        <span className="font-medium">{goal.title}</span>
                      </div>
                      <div className="text-right">
                        <span className="text-sm font-medium">
                          {goal.current}/{goal.target}
                        </span>
                        <Badge className="ml-2 bg-reward text-white">
                          +{goal.reward} pts
                        </Badge>
                      </div>
                    </div>
                    <Progress value={progress} className="h-2" />
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>

        {/* Achievements */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Trophy size={20} />
              Achievements
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 gap-4">
              {achievements.map((achievement) => {
                const Icon = achievement.icon;
                return (
                  <div 
                    key={achievement.id} 
                    className={`p-4 rounded-lg border transition-all duration-300 ${
                      achievement.unlocked 
                        ? "bg-primary/5 border-primary hover:shadow-eco" 
                        : "bg-muted/50 border-muted-foreground/20"
                    }`}
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex items-center gap-3">
                        <div className={`p-2 rounded-full ${
                          achievement.unlocked ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"
                        }`}>
                          <Icon size={20} />
                        </div>
                        <div>
                          <h3 className="font-semibold">{achievement.title}</h3>
                          <p className="text-sm text-muted-foreground">{achievement.description}</p>
                          {!achievement.unlocked && achievement.progress !== undefined && (
                            <div className="mt-2">
                              <Progress 
                                value={(achievement.progress / achievement.total) * 100} 
                                className="h-2 w-32"
                              />
                              <p className="text-xs text-muted-foreground mt-1">
                                {achievement.progress}/{achievement.total}
                              </p>
                            </div>
                          )}
                        </div>
                      </div>
                      <div className="text-right">
                        <Badge className={getRarityColor(achievement.rarity)}>
                          {achievement.rarity}
                        </Badge>
                        <p className="text-sm font-medium text-reward mt-1">
                          +{achievement.points} pts
                        </p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>

        {/* Level Progress */}
        <Card className="bg-gradient-to-r from-primary to-primary-glow text-primary-foreground">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Star size={20} />
              Level Progress
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-2xl font-bold">Level 12</p>
                  <p className="text-sm opacity-90">Eco Warrior</p>
                </div>
                <div className="text-right">
                  <p className="text-sm opacity-90">Next Level</p>
                  <p className="text-lg font-semibold">750 pts to go</p>
                </div>
              </div>
              <div className="bg-white/20 rounded-full h-3">
                <div 
                  className="bg-white rounded-full h-3"
                  style={{ width: "62%" }}
                ></div>
              </div>
              <div className="text-center">
                <p className="text-sm opacity-90">
                  Level 13 unlocks: Premium rewards & 2x weekend points!
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Navigation />
    </div>
  );
};

export default RewardsPage;