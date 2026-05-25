import { useEffect, useState } from "react";

interface Status {
  online: boolean;
  players?: { online: number; max: number };
}

const ServerStatus = () => {
  const [status, setStatus] = useState<Status | null>(null);

  useEffect(() => {
    let cancelled = false;
    const fetchStatus = async () => {
      try {
        const res = await fetch("https://api.mcsrvstat.us/3/zelosmp.net");
        const data = await res.json();
        if (!cancelled) {
          setStatus({ online: !!data.online, players: data.players });
        }
      } catch {
        if (!cancelled) setStatus({ online: false });
      }
    };
    fetchStatus();
    const interval = setInterval(fetchStatus, 60000);
    return () => {
      cancelled = true;
      clearInterval(interval);
    };
  }, []);

  const online = status?.online;
  const dotColor = online ? "bg-green-500" : "bg-red-500";
  const label = status === null
    ? "Checking..."
    : online
    ? `${status.players?.online ?? 0}/${status.players?.max ?? 0} online`
    : "Offline";

  return (
    <div className="flex items-center gap-2 bg-secondary border border-border rounded-lg px-3 py-1.5">
      <span className={`w-2 h-2 rounded-full ${dotColor} ${online ? "animate-pulse" : ""}`} />
      <span className="text-xs font-mono text-muted-foreground">{label}</span>
    </div>
  );
};

export default ServerStatus;
