import { Home, Camera, MapPin, Trophy, Gamepad2, GraduationCap, Gift } from "lucide-react";
import { useLocation, Link } from "react-router-dom";

const navigationItems = [
  { icon: Home, label: "Home", path: "/" },
  { icon: Camera, label: "Scan", path: "/scan" },
  { icon: MapPin, label: "Centers", path: "/centers" },
  { icon: Trophy, label: "Rewards", path: "/rewards" },
  { icon: Gamepad2, label: "Games", path: "/games" },
  { icon: GraduationCap, label: "Learn", path: "/learn" },
  { icon: Gift, label: "Shop", path: "/shop" },
];

export const Navigation = () => {
  const location = useLocation();

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-card border-t border-border z-50">
      <div className="flex justify-around items-center py-2">
        {navigationItems.map((item) => {
          const Icon = item.icon;
          const isActive = location.pathname === item.path;
          
          return (
            <Link
              key={item.path}
              to={item.path}
              className={`flex flex-col items-center space-y-1 p-2 rounded-lg transition-all duration-200 ${
                isActive 
                  ? "text-primary bg-primary/10 transform scale-110" 
                  : "text-muted-foreground hover:text-primary hover:bg-primary/5"
              }`}
            >
              <Icon size={20} />
              <span className="text-xs font-medium">{item.label}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
};