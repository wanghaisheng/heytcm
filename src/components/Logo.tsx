import { Zap } from 'lucide-react';

interface LogoProps {
  size?: number;
}

const Logo: React.FC<LogoProps> = ({ size = 48 }) => {
  return (
    <div className="flex items-center gap-2">
      <div className="relative">
        <div className="rounded-full bg-primary-500 p-1 flex items-center justify-center">
          <Zap size={size * 0.5} className="text-white" />
        </div>
        <div className="absolute inset-0 rounded-full border-2 border-secondary-400 opacity-70 animate-pulse-slow"></div>
      </div>
      <span className="text-xl font-display font-bold text-primary-700">HeyTCM</span>
    </div>
  );
};

export default Logo;