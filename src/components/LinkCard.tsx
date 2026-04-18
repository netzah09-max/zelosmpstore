import { Link } from "react-router-dom";
import { LucideIcon } from "lucide-react";

interface LinkCardProps {
  title: string;
  subtitle: string;
  image?: string;
  icon?: LucideIcon;
  iconColor?: string;
  to: string;
  external?: boolean;
}

const LinkCard = ({ title, subtitle, image, icon: Icon, iconColor, to, external }: LinkCardProps) => {
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
        <div className="absolute inset-0 bg-gradient-to-br from-secondary to-background flex items-center justify-center">
          {Icon && (
            <Icon
              className="w-20 h-20 transition-transform duration-500 group-hover:scale-110"
              style={iconColor ? { color: iconColor } : undefined}
            />
          )}
        </div>
      )}
      <div className="absolute inset-0 bg-background/60 group-hover:bg-background/40 transition-colors" />
      <div className="relative z-10 p-5 flex flex-col justify-end h-full">
        <h3 className="text-foreground font-bold text-lg">{title}</h3>
        <p className="text-muted-foreground text-sm">{subtitle}</p>
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
