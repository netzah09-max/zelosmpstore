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
    price: 4.99,
    category: "ranks",
    color: "hsl(145, 80%, 42%)",
    popular: true,
    features: [
      "/fly in lobby",
      "3 extra /sethomes",
      "Shards everywhere",
      "Priority queue",
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
    id: "spawners-key",
    name: "Spawners Key",
    description: "Unlock a spawners crate for mob spawner loot.",
    price: 4.99,
    category: "crate-keys",
    color: "hsl(145, 70%, 45%)",
  },
  {
    id: "amethyst-key",
    name: "Amethyst Key",
    description: "Unlock the amethyst crate for the rarest loot.",
    price: 9.99,
    category: "crate-keys",
    color: "hsl(280, 80%, 55%)",
    popular: true,
  },
];
