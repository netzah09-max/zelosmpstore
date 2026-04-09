import { Link } from "react-router-dom";

interface LinkCardProps {
  title: string;
  subtitle: string;
  image: string;
  to: string;
  external?: boolean;
}

const LinkCard = ({ title, subtitle, image, to, external }: LinkCardProps) => {
  const content = (
    <div className="relative overflow-hidden rounded-xl border border-border/50 card-hover group cursor-pointer h-48">
      <img
        src={image}
        alt={title}
        loading="lazy"
        className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
      />
      <div className="absolute inset-0 bg-background/60 group-hover:bg-background/40 transition-colors" />
      <div className="relative z-10 p-5 flex flex-col justify-end h-full">
        <h3 className="text-foreground font-bold text-lg">{title}</h3>
        <p className="text-muted-foreground text-sm">{subtitle}</p>
      </div>
    </div>
  );

  if (external) {
    return (
      <a href={to} target="_blank" rel="noopener noreferrer">
        {content}
      </a>
    );
  }

  return <Link to={to}>{content}</Link>;
};

export default LinkCard;
