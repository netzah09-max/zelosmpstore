export interface StoreItem {
  id: string;
  name: string;
  description: string;
  price: number;
  category: "ranks" | "crate-keys";
  color: string;
  popular?: boolean;
  features?: string[];
}

export const storeItems: StoreItem[] = [
  {
    id: "vip",
    name: "VIP",
    description: "Stand out with exclusive VIP perks and commands.",
    price: 4.99,
    category: "ranks",
    color: "hsl(145, 80%, 42%)",
    features: ["/fly in lobby", "Colored chat", "3 /sethome", "VIP Kit"],
  },
  {
    id: "mvp",
    name: "MVP",
    description: "Unlock powerful abilities and premium features.",
    price: 9.99,
    category: "ranks",
    color: "hsl(200, 80%, 55%)",
    popular: true,
    features: ["/fly everywhere", "Custom nickname", "5 /sethome", "MVP Kit", "Priority queue"],
  },
  {
    id: "legend",
    name: "LEGEND",
    description: "The ultimate rank with all perks unlocked.",
    price: 19.99,
    category: "ranks",
    color: "hsl(45, 100%, 55%)",
    features: [
      "All MVP perks",
      "Particle effects",
      "10 /sethome",
      "Legend Kit",
      "Custom join message",
      "Pet companion",
    ],
  },
  {
    id: "immortal",
    name: "IMMORTAL",
    description: "Ascend beyond limits. The pinnacle of power.",
    price: 34.99,
    category: "ranks",
    color: "hsl(280, 80%, 55%)",
    features: [
      "All Legend perks",
      "Exclusive trails",
      "Unlimited /sethome",
      "Immortal Kit",
      "Server-wide announcements",
      "Custom emotes",
      "Priority support",
    ],
  },
  {
    id: "common-key",
    name: "Common Key",
    description: "Unlock a common crate for basic rewards.",
    price: 1.99,
    category: "crate-keys",
    color: "hsl(0, 0%, 70%)",
  },
  {
    id: "rare-key",
    name: "Rare Key",
    description: "Unlock a rare crate for better loot.",
    price: 3.99,
    category: "crate-keys",
    color: "hsl(200, 80%, 55%)",
  },
  {
    id: "epic-key",
    name: "Epic Key",
    description: "Unlock an epic crate for powerful items.",
    price: 6.99,
    category: "crate-keys",
    color: "hsl(280, 80%, 55%)",
    popular: true,
  },
  {
    id: "legendary-key",
    name: "Legendary Key",
    description: "Unlock a legendary crate for the rarest loot.",
    price: 12.99,
    category: "crate-keys",
    color: "hsl(45, 100%, 55%)",
  },
];
