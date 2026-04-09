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
    id: "zelo-plus",
    name: "ZELO+",
    description: "The exclusive ZeloSMP rank. Unlock all premium perks.",
    price: 9.99,
    category: "ranks",
    color: "hsl(145, 80%, 42%)",
    popular: true,
    features: [
      "/fly everywhere",
      "Custom nickname",
      "Colored chat",
      "Unlimited /sethome",
      "Zelo+ Kit",
      "Priority queue",
      "Particle effects",
      "Pet companion",
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
