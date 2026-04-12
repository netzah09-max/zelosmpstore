import { useState, useEffect } from "react";
import { ShoppingCart, Crown, Key, Loader2 } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import StoreItemCard from "@/components/StoreItemCard";
import CartSidebar from "@/components/CartSidebar";
import { useCart } from "@/hooks/useCart";
import { supabase } from "@/integrations/supabase/client";
import type { StoreItem } from "@/data/storeItems";
import { storeItems as fallbackItems } from "@/data/storeItems";

const Store = () => {
  const [category, setCategory] = useState<"ranks" | "crate-keys">("ranks");
  const [cartOpen, setCartOpen] = useState(false);
  const [storeItems, setStoreItems] = useState<StoreItem[]>(fallbackItems);
  const [loading, setLoading] = useState(true);
  const { items } = useCart();
  const totalItems = items.reduce((sum, i) => sum + i.quantity, 0);

  useEffect(() => {
    const fetchPackages = async () => {
      try {
        const { data, error } = await supabase.functions.invoke("tebex-packages");
        if (error) throw error;
        if (data?.packages && data.packages.length > 0) {
          setStoreItems(data.packages);
        }
      } catch (err) {
        console.error("Failed to fetch packages, using fallback:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchPackages();
  }, []);

  const filtered = storeItems.filter((item) => item.category === category);

  const categories = [
    { id: "ranks" as const, label: "Ranks", icon: Crown },
    { id: "crate-keys" as const, label: "Crate Keys", icon: Key },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <CartSidebar open={cartOpen} onClose={() => setCartOpen(false)} />

      <div className="container pt-24 pb-12">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="font-pixel text-2xl text-primary glow-text">STORE</h1>
            <p className="text-muted-foreground text-sm mt-1">Support the server & unlock perks</p>
          </div>
          <button
            onClick={() => setCartOpen(true)}
            className="relative bg-secondary border border-border rounded-lg p-3 hover:border-primary/50 transition-colors"
          >
            <ShoppingCart className="w-5 h-5 text-muted-foreground" />
            {totalItems > 0 && (
              <span className="absolute -top-2 -right-2 bg-primary text-primary-foreground text-xs rounded-full w-5 h-5 flex items-center justify-center font-bold">
                {totalItems}
              </span>
            )}
          </button>
        </div>

        {/* Category Tabs */}
        <div className="flex gap-2 mb-8">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setCategory(cat.id)}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                category === cat.id
                  ? "bg-primary text-primary-foreground"
                  : "bg-secondary text-muted-foreground hover:text-foreground"
              }`}
            >
              <cat.icon className="w-4 h-4" />
              {cat.label}
            </button>
          ))}
        </div>

        {/* Items Grid */}
        {loading ? (
          <div className="flex items-center justify-center py-20">
            <Loader2 className="w-8 h-8 text-primary animate-spin" />
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {filtered.map((item) => (
              <StoreItemCard key={item.id} item={item} />
            ))}
            {filtered.length === 0 && (
              <p className="text-muted-foreground text-sm col-span-full text-center py-12">
                No items in this category yet.
              </p>
            )}
          </div>
        )}
      </div>

      <Footer />
    </div>
  );
};

export default Store;
