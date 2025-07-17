import { useState, useEffect } from "react";
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

  // Sorting Game State
  const [sortingItems, setSortingItems] = useState([]);
  const [sortingScore, setSortingScore] = useState(0);
  const [sortingTimeLeft, setSortingTimeLeft] = useState(60);
  const [sortingGameActive, setSortingGameActive] = useState(false);
  const [draggedItem, setDraggedItem] = useState(null);

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

  // Sorting game items based on Hong Kong recycling policy
  const wasteItems = [
    { id: 1, name: "Aluminum Can", bin: "blue", emoji: "🥤", type: "Metal" },
    { id: 2, name: "Plastic Bottle", bin: "blue", emoji: "🍼", type: "Plastic" },
    { id: 3, name: "Newspaper", bin: "blue", emoji: "📰", type: "Paper" },
    { id: 4, name: "Glass Bottle", bin: "brown", emoji: "🍾", type: "Glass" },
    { id: 5, name: "Food Waste", bin: "brown", emoji: "🍎", type: "Food" },
    { id: 6, name: "Cardboard", bin: "blue", emoji: "📦", type: "Paper" },
    { id: 7, name: "Banana Peel", bin: "brown", emoji: "🍌", type: "Food" },
    { id: 8, name: "Soda Can", bin: "blue", emoji: "🥤", type: "Metal" },
    { id: 9, name: "Wine Bottle", bin: "brown", emoji: "🍷", type: "Glass" },
    { id: 10, name: "Magazine", bin: "blue", emoji: "📖", type: "Paper" }
  ];

  const recyclingBins = [
    { id: "blue", name: "Recyclables", color: "bg-blue-500", items: ["Metal", "Plastic", "Paper"] },
    { id: "brown", name: "Organic/Glass", color: "bg-amber-600", items: ["Glass", "Food"] },
    { id: "green", name: "General Waste", color: "bg-green-600", items: [] },
    { id: "red", name: "Hazardous", color: "bg-red-500", items: [] },
    { id: "yellow", name: "Special Items", color: "bg-yellow-500", items: [] }
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

  // Sorting Game Functions
  const initializeSortingGame = () => {
    const shuffledItems = [...wasteItems].sort(() => Math.random() - 0.5).slice(0, 8);
    setSortingItems(shuffledItems);
    setSortingScore(0);
    setSortingTimeLeft(60);
    setSortingGameActive(true);
  };

  const handleDragStart = (e, item) => {
    setDraggedItem(item);
    e.dataTransfer.effectAllowed = "move";
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = "move";
  };

  const handleDrop = (e, binId) => {
    e.preventDefault();
    if (!draggedItem) return;

    const correctBin = recyclingBins.find(bin => bin.id === draggedItem.bin);
    const targetBin = recyclingBins.find(bin => bin.id === binId);

    if (correctBin && targetBin && correctBin.id === targetBin.id) {
      setSortingScore(prev => prev + 10);
      setSortingItems(prev => prev.filter(item => item.id !== draggedItem.id));
    } else {
      setSortingScore(prev => Math.max(0, prev - 5));
    }

    setDraggedItem(null);

    // Check if all items are sorted
    if (sortingItems.length === 1) {
      setSortingGameActive(false);
      setUserPoints(prev => prev + 100);
    }
  };

  // Timer effect for sorting game
  useEffect(() => {
    let interval;
    if (sortingGameActive && sortingTimeLeft > 0) {
      interval = setInterval(() => {
        setSortingTimeLeft(prev => {
          if (prev <= 1) {
            setSortingGameActive(false);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [sortingGameActive, sortingTimeLeft]);

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

        {/* Sorting Challenge Game - Start Screen */}
        {selectedGame && selectedGame.id === 2 && !sortingGameActive && (
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Timer size={20} />
                  {selectedGame.title}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center space-y-4">
                  <EcoMascot 
                    message="Sort waste into the correct bins according to Hong Kong recycling policy! 🗂️" 
                    animation="bounce"
                  />
                  <p className="text-muted-foreground">
                    Drag items to the correct recycling bins. You have 60 seconds!<br/>
                    <span className="text-sm">+10 points for correct, -5 points for wrong</span>
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
                      onClick={initializeSortingGame}
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

        {/* Sorting Challenge Game - Active Screen */}
        {selectedGame && selectedGame.id === 2 && sortingGameActive && (
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="flex items-center gap-2">
                    <Timer size={20} />
                    Sorting Challenge
                  </CardTitle>
                  <div className="flex gap-4">
                    <div className="text-center">
                      <p className="text-sm text-muted-foreground">Score</p>
                      <p className="text-lg font-bold text-primary">{sortingScore}</p>
                    </div>
                    <div className="text-center">
                      <p className="text-sm text-muted-foreground">Time</p>
                      <p className="text-lg font-bold text-destructive">{sortingTimeLeft}s</p>
                    </div>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                {/* Items to Sort */}
                <div className="mb-6">
                  <h3 className="text-sm font-medium text-muted-foreground mb-3">Items to Sort:</h3>
                  <div className="flex flex-wrap gap-2 min-h-[80px] p-4 bg-muted/50 rounded-lg">
                    {sortingItems.map((item) => (
                      <div
                        key={item.id}
                        draggable
                        onDragStart={(e) => handleDragStart(e, item)}
                        className="bg-background p-3 rounded-lg border-2 border-dashed border-border cursor-grab active:cursor-grabbing hover:shadow-md transition-all duration-200 hover:scale-105"
                      >
                        <div className="text-center">
                          <div className="text-2xl mb-1">{item.emoji}</div>
                          <p className="text-xs font-medium">{item.name}</p>
                          <p className="text-xs text-muted-foreground">{item.type}</p>
                        </div>
                      </div>
                    ))}
                    {sortingItems.length === 0 && (
                      <div className="w-full text-center text-muted-foreground py-6">
                        🎉 All items sorted! Great job!
                      </div>
                    )}
                  </div>
                </div>

                {/* Recycling Bins */}
                <div className="space-y-3">
                  <h3 className="text-sm font-medium text-muted-foreground">Recycling Bins:</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                    {recyclingBins.map((bin) => (
                      <div
                        key={bin.id}
                        onDragOver={handleDragOver}
                        onDrop={(e) => handleDrop(e, bin.id)}
                        className={`${bin.color} p-4 rounded-lg text-white min-h-[100px] flex flex-col items-center justify-center border-2 border-dashed border-white/30 transition-all duration-200 hover:border-white/60`}
                      >
                        <div className="text-3xl mb-2">🗑️</div>
                        <p className="font-medium text-center text-sm">{bin.name}</p>
                        {bin.items.length > 0 && (
                          <p className="text-xs text-center opacity-90 mt-1">
                            {bin.items.join(", ")}
                          </p>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
                
                <div className="mt-6 text-center">
                  <Button 
                    onClick={() => {
                      setSelectedGame(null);
                      setSortingGameActive(false);
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