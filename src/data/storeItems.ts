export interface StoreItem {
  id: string;
  tebexId: number;
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
    tebexId: 7385604,
    name: "ZELO+",
    description: "The exclusive ZeloSMP rank. Unlock all premium perks.",
    price: 4.99,
    category: "ranks",
    color: "hsl(0, 80%, 50%)",
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
    tebexId: 7385606,
    name: "Common Key",
    description: "Unlock a common crate for basic rewards.",
    price: 0.99,
    category: "crate-keys",
    color: "hsl(0, 0%, 70%)",
  },
  {
    id: "spawners-key",
    tebexId: 7385607,
    name: "Spawners Key",
    description: "Unlock a spawners crate for mob spawner loot.",
    price: 1.99,
    category: "crate-keys",
    color: "hsl(0, 80%, 50%)",
  },
  {
    id: "amethyst-key",
    tebexId: 7385611,
    name: "Amethyst Key",
    description: "Unlock the amethyst crate for the rarest loot.",
    price: 2.99,
    category: "crate-keys",
    color: "hsl(280, 80%, 55%)",
    popular: true,
  },
];
