import ecoMascotImg from "@/assets/eco-mascot.png";

interface EcoMascotProps {
  message?: string;
  animation?: "bounce" | "float" | "pulse";
  size?: "sm" | "md" | "lg";
}

export const EcoMascot = ({ 
  message = "Let's save the planet together! 🌱", 
  animation = "bounce", 
  size = "md" 
}: EcoMascotProps) => {
  const sizeClasses = {
    sm: "w-16 h-16",
    md: "w-24 h-24", 
    lg: "w-32 h-32"
  };

  const animationClasses = {
    bounce: "animate-bounce-gentle",
    float: "animate-float",
    pulse: "animate-pulse-eco"
  };

  return (
    <div className="flex flex-col items-center space-y-3">
      <div className={`${sizeClasses[size]} ${animationClasses[animation]}`}>
        <img 
          src={ecoMascotImg} 
          alt="Eco Mascot" 
          className="w-full h-full object-contain"
        />
      </div>
      {message && (
        <div className="bg-primary text-primary-foreground px-4 py-2 rounded-full text-sm font-medium shadow-eco max-w-xs text-center">
          {message}
        </div>
      )}
    </div>
  );
};