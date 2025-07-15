import { Coins, Leaf } from "lucide-react";
import { Card } from "./ui/card";

interface PointsDisplayProps {
  points: number;
  carbonSaved: number;
}

export const PointsDisplay = ({ points, carbonSaved }: PointsDisplayProps) => {
  return (
    <div className="flex gap-3 mb-6">
      <Card className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-primary to-primary-glow shadow-eco">
        <Coins className="text-primary-foreground" size={20} />
        <div className="text-primary-foreground">
          <p className="text-sm font-medium">Green$</p>
          <p className="text-lg font-bold">{points.toLocaleString()}</p>
        </div>
      </Card>
      
      <Card className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-carbon to-blue-500 shadow-eco">
        <Leaf className="text-white" size={20} />
        <div className="text-white">
          <p className="text-sm font-medium">CO₂ Saved</p>
          <p className="text-lg font-bold">{carbonSaved.toFixed(1)}kg</p>
        </div>
      </Card>
    </div>
  );
};