import { useState } from "react";
import { Navigation } from "@/components/Navigation";
import { PointsDisplay } from "@/components/PointsDisplay";
import { EcoMascot } from "@/components/EcoMascot";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Gamepad2, Trophy, Star, Zap, Timer, Target } from "lucide-react";

const GamesPage = () => {
  const [userPoints, setUserPoints] = useState(1250);
  const [carbonSaved] = useState(15.7);
  const [selectedGame, setSelectedGame] = useState(null);
  const [gameActive, setGameActive] = useState(false);

  // Matching Game State
  const [matchingCards, setMatchingCards] = useState([]);
  const [flippedCards, setFlippedCards] = useState([]);
  const [matchedPairs, setMatchedPairs] = useState([]);
  const [gameScore, setGameScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(60);

  const games = [
    {
      id: 1,
      title: "Eco Matching",
      description: "Match recyclable items with their proper bins",
      difficulty: "Easy",
      reward: 50,
      icon: Target,
      color: "bg-primary"
    },
    {
      id: 2,
      title: "Sorting Challenge",
      description: "Sort waste items as fast as you can",
      difficulty: "Medium",
      reward: 100,
      icon: Timer,
      color: "bg-eco"
    },
    {
      id: 3,
      title: "Carbon Calculator",
      description: "Calculate environmental impact of different actions",
      difficulty: "Hard",
      reward: 200,
      icon: Trophy,
      color: "bg-carbon"
    }
  ];

  const matchingItems = [
    { id: 1, name: "Plastic Bottle", bin: "Recycling", emoji: "🍼" },
    { id: 2, name: "Apple Core", bin: "Compost", emoji: "🍎" },
    { id: 3, name: "Glass Jar", bin: "Recycling", emoji: "🫙" },
    { id: 4, name: "Paper", bin: "Recycling", emoji: "📄" },
    { id: 5, name: "Banana Peel", bin: "Compost", emoji: "🍌" },
    { id: 6, name: "Aluminum Can", bin: "Recycling", emoji: "🥤" }
  ];

  const initializeMatchingGame = () => {
    const items = [...matchingItems, ...matchingItems].map((item, index) => ({
      ...item,
      uniqueId: index,
      flipped: false
    }));
    
    // Shuffle the cards
    const shuffled = items.sort(() => Math.random() - 0.5);
    setMatchingCards(shuffled);
    setFlippedCards([]);
    setMatchedPairs([]);
    setGameScore(0);
    setTimeLeft(60);
    setGameActive(true);
  };

  const handleCardClick = (cardIndex) => {
    if (flippedCards.length === 2 || matchingCards[cardIndex].flipped) return;

    const newCards = [...matchingCards];
    newCards[cardIndex].flipped = true;
    setMatchingCards(newCards);

    const newFlipped = [...flippedCards, cardIndex];
    setFlippedCards(newFlipped);

    if (newFlipped.length === 2) {
      const [first, second] = newFlipped;
      if (matchingCards[first].id === matchingCards[second].id) {
        // Match found
        setMatchedPairs([...matchedPairs, matchingCards[first].id]);
        setGameScore(prev => prev + 10);
        setFlippedCards([]);
        
        // Check if game is complete
        if (matchedPairs.length + 1 === matchingItems.length) {
          setUserPoints(prev => prev + 50);
          setGameActive(false);
        }
      } else {
        // No match - flip back after delay
        setTimeout(() => {
          const resetCards = [...matchingCards];
          resetCards[first].flipped = false;
          resetCards[second].flipped = false;
          setMatchingCards(resetCards);
          setFlippedCards([]);
        }, 1000);
      }
    }
  };

  const getDifficultyColor = (difficulty) => {
    switch (difficulty) {
      case "Easy": return "bg-primary text-primary-foreground";
      case "Medium": return "bg-yellow-500 text-white";
      case "Hard": return "bg-destructive text-destructive-foreground";
      default: return "bg-muted";
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-primary/5 pb-20">
      <div className="container mx-auto px-4 py-6">
        <div className="text-center mb-6">
          <h1 className="text-3xl font-bold text-foreground mb-2">
            Eco Games 🎮
          </h1>
          <p className="text-muted-foreground">
            Play games and earn Green$ points!
          </p>
        </div>

        <PointsDisplay points={userPoints} carbonSaved={carbonSaved} />

        {!selectedGame && (
          <>
            <div className="flex justify-center mb-6">
              <EcoMascot 
                message="Ready for some eco-fun? Pick a game! 🎯" 
                animation="bounce"
                size="md"
              />
            </div>

            <div className="space-y-4">
              {games.map((game) => {
                const Icon = game.icon;
                return (
                  <Card 
                    key={game.id}
                    className="hover:shadow-eco transition-all duration-300 hover:scale-[1.02] cursor-pointer"
                    onClick={() => setSelectedGame(game)}
                  >
                    <CardHeader>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div className={`${game.color} p-3 rounded-full`}>
                            <Icon className="text-white" size={24} />
                          </div>
                          <div>
                            <CardTitle className="text-lg">{game.title}</CardTitle>
                            <p className="text-muted-foreground text-sm">{game.description}</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <Badge className={getDifficultyColor(game.difficulty)}>
                            {game.difficulty}
                          </Badge>
                          <div className="flex items-center gap-1 mt-2">
                            <Star size={16} className="text-reward fill-current" />
                            <span className="font-bold text-reward">+{game.reward}</span>
                          </div>
                        </div>
                      </div>
                    </CardHeader>
                  </Card>
                );
              })}
            </div>

            {/* Leaderboard */}
            <Card className="mt-6">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Trophy size={20} />
                  Weekly Leaderboard
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {[
                    { rank: 1, name: "EcoMaster", score: 2850, emoji: "🥇" },
                    { rank: 2, name: "GreenGuru", score: 2420, emoji: "🥈" },
                    { rank: 3, name: "You", score: 1250, emoji: "🥉" },
                  ].map((player) => (
                    <div key={player.rank} className="flex items-center justify-between p-3 bg-muted rounded-lg">
                      <div className="flex items-center gap-3">
                        <span className="text-2xl">{player.emoji}</span>
                        <div>
                          <p className="font-medium">{player.name}</p>
                          <p className="text-sm text-muted-foreground">Rank #{player.rank}</p>
                        </div>
                      </div>
                      <p className="font-bold text-primary">{player.score.toLocaleString()} pts</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </>
        )}

        {selectedGame && selectedGame.id === 1 && !gameActive && (
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Target size={20} />
                  {selectedGame.title}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center space-y-4">
                  <EcoMascot 
                    message="Match identical recyclable items! 🎯" 
                    animation="bounce"
                  />
                  <p className="text-muted-foreground">
                    Find pairs of matching recyclable items. You have 60 seconds!
                  </p>
                  <div className="flex gap-3">
                    <Button 
                      onClick={() => setSelectedGame(null)}
                      variant="outline"
                      className="flex-1"
                    >
                      Back to Games
                    </Button>
                    <Button 
                      onClick={initializeMatchingGame}
                      className="flex-1 bg-primary hover:bg-primary/90"
                    >
                      Start Game
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {selectedGame && selectedGame.id === 1 && gameActive && (
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="flex items-center gap-2">
                    <Target size={20} />
                    Eco Matching
                  </CardTitle>
                  <div className="flex gap-4">
                    <div className="text-center">
                      <p className="text-sm text-muted-foreground">Score</p>
                      <p className="text-lg font-bold text-primary">{gameScore}</p>
                    </div>
                    <div className="text-center">
                      <p className="text-sm text-muted-foreground">Time</p>
                      <p className="text-lg font-bold text-destructive">{timeLeft}s</p>
                    </div>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-3 gap-3">
                  {matchingCards.map((card, index) => (
                    <div
                      key={card.uniqueId}
                      onClick={() => handleCardClick(index)}
                      className={`aspect-square bg-muted rounded-lg flex items-center justify-center cursor-pointer transition-all duration-300 ${
                        card.flipped ? 'bg-primary text-primary-foreground scale-105' : 'hover:bg-muted-foreground/20'
                      }`}
                    >
                      {card.flipped ? (
                        <div className="text-center">
                          <div className="text-2xl mb-1">{card.emoji}</div>
                          <p className="text-xs font-medium">{card.name}</p>
                        </div>
                      ) : (
                        <div className="text-2xl opacity-50">❓</div>
                      )}
                    </div>
                  ))}
                </div>
                
                <div className="mt-4 text-center">
                  <Button 
                    onClick={() => {
                      setSelectedGame(null);
                      setGameActive(false);
                    }}
                    variant="outline"
                  >
                    End Game
                  </Button>
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

export default GamesPage;