import { ShoppingCart, Star, Check } from "lucide-react";
import { useCart } from "@/hooks/useCart";
import type { StoreItem } from "@/data/storeItems";
import { useState } from "react";

const StoreItemCard = ({ item }: { item: StoreItem }) => {
  const { addItem } = useCart();
  const [added, setAdded] = useState(false);

  const handleAdd = () => {
    addItem({ id: item.id, name: item.name, price: item.price, category: item.category });
    setAdded(true);
    setTimeout(() => setAdded(false), 1200);
  };

  return (
    <div className="glass-card p-5 card-hover relative flex flex-col">
      {item.popular && (
        <div className="absolute -top-2 -right-2 bg-primary text-primary-foreground text-xs font-bold px-2 py-1 rounded-md flex items-center gap-1">
          <Star className="w-3 h-3" /> Popular
        </div>
      )}

      <div
        className="w-12 h-12 rounded-lg flex items-center justify-center mb-4 font-pixel text-xs font-bold"
        style={{ backgroundColor: item.color + "22", color: item.color, border: `1px solid ${item.color}44` }}
      >
        {item.name.charAt(0)}
      </div>

      <h3 className="text-foreground font-bold text-lg" style={{ color: item.color }}>
        {item.name}
      </h3>
      <p className="text-muted-foreground text-sm mt-1 flex-1">{item.description}</p>

      {item.features && (
        <ul className="mt-3 space-y-1">
          {item.features.map((f) => (
            <li key={f} className="text-xs text-muted-foreground flex items-center gap-1.5">
              <Check className="w-3 h-3 text-primary shrink-0" />
              {f}
            </li>
          ))}
        </ul>
      )}

      <div className="flex items-center justify-between mt-4 pt-4 border-t border-border/50">
        <span className="text-foreground font-bold text-xl">${item.price.toFixed(2)}</span>
        <button
          onClick={handleAdd}
          className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold transition-all ${
            added
              ? "bg-primary/20 text-primary"
              : "bg-primary text-primary-foreground hover:bg-primary/90"
          }`}
        >
          {added ? (
            <>
              <Check className="w-4 h-4" /> Added
            </>
          ) : (
            <>
              <ShoppingCart className="w-4 h-4" /> Add
            </>
          )}
        </button>
      </div>
    </div>
  );
};

export default StoreItemCard;
