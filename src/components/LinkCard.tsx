import { Link } from "react-router-dom";
import { LucideIcon } from "lucide-react";

interface LinkCardProps {
  title: string;
  subtitle: string;
  image?: string;
  icon?: LucideIcon;
  iconColor?: string;
  bgColor?: string;
  to: string;
  external?: boolean;
}

const LinkCard = ({ title, subtitle, image, icon: Icon, iconColor, bgColor, to, external }: LinkCardProps) => {
  const content = (
    <div className="relative overflow-hidden rounded-xl border border-border/50 card-hover group cursor-pointer h-48">
      {image ? (
        <img
          src={image}
          alt={title}
          loading="lazy"
          className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
      ) : (
        <div
          className="absolute inset-0 flex items-center justify-center"
          style={bgColor ? { backgroundColor: bgColor } : undefined}
        >
          {!bgColor && <div className="absolute inset-0 bg-gradient-to-br from-secondary to-background" />}
          {Icon && (
            <Icon
              className="relative w-20 h-20 transition-transform duration-500 group-hover:scale-110"
              style={iconColor ? { color: iconColor } : undefined}
            />
          )}
        </div>
      )}
      {!bgColor && <div className="absolute inset-0 bg-background/60 group-hover:bg-background/40 transition-colors" />}
      {bgColor && <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors" />}
      <div className="relative z-10 p-5 flex flex-col justify-end h-full">
        <h3 className="text-white font-bold text-lg drop-shadow-md">{title}</h3>
        <p className="text-white/90 text-sm drop-shadow-md">{subtitle}</p>
      </div>
    </div>
  );

  if (external) {
    return (
      <div onClick={() => window.open(to, '_blank', 'noopener,noreferrer')}>
        {content}
      </div>
    );
  }

  return <Link to={to}>{content}</Link>;
};

export default LinkCard;
