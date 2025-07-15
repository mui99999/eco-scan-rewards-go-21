import { useState } from "react";
import { Navigation } from "@/components/Navigation";
import { PointsDisplay } from "@/components/PointsDisplay";
import { EcoMascot } from "@/components/EcoMascot";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { GraduationCap, Lightbulb, Recycle, PlayCircle, CheckCircle, Star } from "lucide-react";
import upcyclingIdeasImg from "@/assets/upcycling-ideas.png";

const LearnPage = () => {
  const [userPoints, setUserPoints] = useState(1250);
  const [carbonSaved] = useState(15.7);
  const [selectedLesson, setSelectedLesson] = useState(null);
  const [completedLessons, setCompletedLessons] = useState([1, 3]);

  const lessons = [
    {
      id: 1,
      title: "Plastic Bottle Upcycling",
      description: "Transform plastic bottles into useful household items",
      difficulty: "Beginner",
      duration: "5 min",
      points: 25,
      category: "DIY Projects",
      completed: true,
      projects: [
        { name: "Flower Pot", materials: "1 plastic bottle, scissors, paint", difficulty: "Easy" },
        { name: "Pen Holder", materials: "1 large bottle, decorative paper", difficulty: "Easy" },
        { name: "Storage Container", materials: "2 bottles, zipper, glue", difficulty: "Medium" }
      ]
    },
    {
      id: 2,
      title: "Understanding Recycling Symbols",
      description: "Learn to read and understand recycling codes",
      difficulty: "Beginner", 
      duration: "3 min",
      points: 15,
      category: "Education",
      completed: false,
      symbols: [
        { code: "1 PET", name: "Polyethylene Terephthalate", recyclable: true },
        { code: "2 HDPE", name: "High-Density Polyethylene", recyclable: true },
        { code: "3 PVC", name: "Polyvinyl Chloride", recyclable: false },
        { code: "4 LDPE", name: "Low-Density Polyethylene", recyclable: true }
      ]
    },
    {
      id: 3,
      title: "Composting Basics",
      description: "Start your own compost bin at home",
      difficulty: "Intermediate",
      duration: "8 min",
      points: 40,
      category: "Gardening",
      completed: true,
      steps: [
        "Choose a composting method (bin, pile, or tumbler)",
        "Layer green materials (food scraps) and brown materials (leaves)",
        "Turn the compost regularly for proper aeration",
        "Monitor moisture levels - should feel like a wrung-out sponge",
        "Harvest compost after 3-6 months"
      ]
    },
    {
      id: 4,
      title: "Zero Waste Kitchen Tips",
      description: "Reduce kitchen waste with simple strategies",
      difficulty: "Advanced",
      duration: "10 min",
      points: 50,
      category: "Lifestyle",
      completed: false,
      tips: [
        "Plan meals to reduce food waste",
        "Use reusable containers instead of plastic wrap",
        "Compost fruit and vegetable scraps",
        "Buy in bulk to reduce packaging",
        "Repurpose glass jars for storage"
      ]
    }
  ];

  const getDifficultyColor = (difficulty) => {
    switch (difficulty) {
      case "Beginner": return "bg-primary text-primary-foreground";
      case "Intermediate": return "bg-yellow-500 text-white";
      case "Advanced": return "bg-destructive text-destructive-foreground";
      default: return "bg-muted";
    }
  };

  const getCategoryColor = (category) => {
    switch (category) {
      case "DIY Projects": return "bg-eco text-white";
      case "Education": return "bg-carbon text-white";
      case "Gardening": return "bg-primary text-primary-foreground";
      case "Lifestyle": return "bg-reward text-white";
      default: return "bg-muted";
    }
  };

  const completeLesson = (lessonId) => {
    if (!completedLessons.includes(lessonId)) {
      setCompletedLessons([...completedLessons, lessonId]);
      const lesson = lessons.find(l => l.id === lessonId);
      setUserPoints(prev => prev + lesson.points);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-primary/5 pb-20">
      <div className="container mx-auto px-4 py-6">
        <div className="text-center mb-6">
          <h1 className="text-3xl font-bold text-foreground mb-2">
            Eco Learning 📚
          </h1>
          <p className="text-muted-foreground">
            Learn recycling and upcycling techniques
          </p>
        </div>

        <PointsDisplay points={userPoints} carbonSaved={carbonSaved} />

        {!selectedLesson && (
          <>
            <div className="flex justify-center mb-6">
              <EcoMascot 
                message="Knowledge is power! Let's learn together! 🧠" 
                animation="bounce"
                size="md"
              />
            </div>

            {/* Featured Image */}
            <Card className="mb-6">
              <CardContent className="p-0">
                <img 
                  src={upcyclingIdeasImg}
                  alt="Upcycling Ideas" 
                  className="w-full h-48 object-cover rounded-lg"
                />
                <div className="p-4">
                  <h3 className="font-bold text-lg mb-2">Creative Upcycling Ideas</h3>
                  <p className="text-muted-foreground text-sm">
                    Discover amazing ways to transform waste into wonderful creations!
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Progress Overview */}
            <Card className="mb-6">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <GraduationCap size={20} />
                  Learning Progress
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-3 gap-4 text-center">
                  <div>
                    <p className="text-2xl font-bold text-primary">{completedLessons.length}</p>
                    <p className="text-sm text-muted-foreground">Completed</p>
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-reward">
                      {lessons.filter(l => completedLessons.includes(l.id)).reduce((sum, l) => sum + l.points, 0)}
                    </p>
                    <p className="text-sm text-muted-foreground">Points Earned</p>
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-eco">{lessons.length - completedLessons.length}</p>
                    <p className="text-sm text-muted-foreground">Remaining</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Lessons List */}
            <div className="space-y-4">
              {lessons.map((lesson) => (
                <Card 
                  key={lesson.id}
                  className="hover:shadow-eco transition-all duration-300 hover:scale-[1.02] cursor-pointer"
                  onClick={() => setSelectedLesson(lesson)}
                >
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <CardTitle className="text-lg">{lesson.title}</CardTitle>
                          {completedLessons.includes(lesson.id) && (
                            <CheckCircle size={20} className="text-primary" />
                          )}
                        </div>
                        <p className="text-muted-foreground text-sm mb-3">{lesson.description}</p>
                        <div className="flex flex-wrap gap-2">
                          <Badge className={getDifficultyColor(lesson.difficulty)}>
                            {lesson.difficulty}
                          </Badge>
                          <Badge className={getCategoryColor(lesson.category)}>
                            {lesson.category}
                          </Badge>
                          <Badge variant="outline">
                            {lesson.duration}
                          </Badge>
                        </div>
                      </div>
                      <div className="text-right ml-4">
                        <div className="flex items-center gap-1 mb-2">
                          <Star size={16} className="text-reward fill-current" />
                          <span className="font-bold text-reward">+{lesson.points}</span>
                        </div>
                        <PlayCircle size={32} className="text-primary" />
                      </div>
                    </div>
                  </CardHeader>
                </Card>
              ))}
            </div>

            {/* Achievement Section */}
            <Card className="mt-6 bg-gradient-to-r from-primary to-primary-glow text-primary-foreground">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Lightbulb size={20} />
                  Eco Tips of the Day
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <p className="font-medium">💡 Did you know?</p>
                  <p className="text-sm opacity-90">
                    Recycling one plastic bottle can save enough energy to power a 60-watt light bulb for 3 hours!
                  </p>
                  <p className="text-sm opacity-90">
                    Composting food scraps can reduce household waste by up to 30%.
                  </p>
                </div>
              </CardContent>
            </Card>
          </>
        )}

        {selectedLesson && (
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="flex items-center gap-2">
                    <GraduationCap size={20} />
                    {selectedLesson.title}
                  </CardTitle>
                  {completedLessons.includes(selectedLesson.id) && (
                    <CheckCircle size={24} className="text-primary" />
                  )}
                </div>
                <div className="flex gap-2 mt-2">
                  <Badge className={getDifficultyColor(selectedLesson.difficulty)}>
                    {selectedLesson.difficulty}
                  </Badge>
                  <Badge className={getCategoryColor(selectedLesson.category)}>
                    {selectedLesson.category}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-6">{selectedLesson.description}</p>
                
                {selectedLesson.projects && (
                  <div className="space-y-4">
                    <h3 className="font-semibold text-lg">DIY Projects:</h3>
                    {selectedLesson.projects.map((project, index) => (
                      <Card key={index} className="bg-muted/50">
                        <CardContent className="p-4">
                          <h4 className="font-medium mb-2">{project.name}</h4>
                          <p className="text-sm text-muted-foreground mb-2">
                            <strong>Materials:</strong> {project.materials}
                          </p>
                          <Badge variant="outline">{project.difficulty}</Badge>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                )}

                {selectedLesson.symbols && (
                  <div className="space-y-4">
                    <h3 className="font-semibold text-lg">Recycling Symbols:</h3>
                    {selectedLesson.symbols.map((symbol, index) => (
                      <div key={index} className="flex items-center justify-between p-4 bg-muted rounded-lg">
                        <div>
                          <p className="font-medium">{symbol.code}</p>
                          <p className="text-sm text-muted-foreground">{symbol.name}</p>
                        </div>
                        <Badge className={symbol.recyclable ? "bg-primary text-primary-foreground" : "bg-destructive text-destructive-foreground"}>
                          {symbol.recyclable ? "Recyclable" : "Not Recyclable"}
                        </Badge>
                      </div>
                    ))}
                  </div>
                )}

                {selectedLesson.steps && (
                  <div className="space-y-4">
                    <h3 className="font-semibold text-lg">Steps:</h3>
                    {selectedLesson.steps.map((step, index) => (
                      <div key={index} className="flex items-start gap-3">
                        <div className="bg-primary text-primary-foreground rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold">
                          {index + 1}
                        </div>
                        <p className="text-sm">{step}</p>
                      </div>
                    ))}
                  </div>
                )}

                {selectedLesson.tips && (
                  <div className="space-y-4">
                    <h3 className="font-semibold text-lg">Tips:</h3>
                    {selectedLesson.tips.map((tip, index) => (
                      <div key={index} className="flex items-start gap-3">
                        <Lightbulb size={16} className="text-reward mt-0.5" />
                        <p className="text-sm">{tip}</p>
                      </div>
                    ))}
                  </div>
                )}

                <div className="flex gap-3 mt-8">
                  <Button 
                    onClick={() => setSelectedLesson(null)}
                    variant="outline"
                    className="flex-1"
                  >
                    Back to Lessons
                  </Button>
                  {!completedLessons.includes(selectedLesson.id) && (
                    <Button 
                      onClick={() => completeLesson(selectedLesson.id)}
                      className="flex-1 bg-primary hover:bg-primary/90"
                    >
                      Complete Lesson (+{selectedLesson.points} pts)
                    </Button>
                  )}
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

export default LearnPage;