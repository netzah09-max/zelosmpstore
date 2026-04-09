import { Copy, Check } from "lucide-react";
import { useState } from "react";

const ServerIPBadge = () => {
  const [copied, setCopied] = useState(false);
  const ip = "zelosmp.serv.cx";

  const handleCopy = () => {
    navigator.clipboard.writeText(ip);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <button
      onClick={handleCopy}
      className="flex items-center gap-3 bg-secondary border border-border rounded-lg px-4 py-3 hover:border-primary/50 transition-colors group"
    >
      <span className="text-muted-foreground text-sm font-mono">{ip}</span>
      {copied ? (
        <Check className="w-4 h-4 text-primary" />
      ) : (
        <Copy className="w-4 h-4 text-muted-foreground group-hover:text-primary transition-colors" />
      )}
    </button>
  );
};

export default ServerIPBadge;
