import { X, Trash2, ShoppingCart } from "lucide-react";
import { useCart } from "@/hooks/useCart";

interface CartSidebarProps {
  open: boolean;
  onClose: () => void;
}

const CartSidebar = ({ open, onClose }: CartSidebarProps) => {
  const { items, removeItem, clearCart, total } = useCart();

  if (!open) return null;

  return (
    <>
      <div className="fixed inset-0 bg-background/60 backdrop-blur-sm z-50" onClick={onClose} />
      <div className="fixed right-0 top-0 bottom-0 w-full max-w-sm bg-card border-l border-border z-50 flex flex-col">
        <div className="flex items-center justify-between p-4 border-b border-border">
          <h2 className="text-foreground font-bold text-lg flex items-center gap-2">
            <ShoppingCart className="w-5 h-5 text-primary" /> Cart
          </h2>
          <button onClick={onClose} className="text-muted-foreground hover:text-foreground">
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-4 space-y-3">
          {items.length === 0 ? (
            <p className="text-muted-foreground text-sm text-center mt-8">Your cart is empty</p>
          ) : (
            items.map((item) => (
              <div key={item.id} className="flex items-center justify-between bg-secondary rounded-lg p-3">
                <div>
                  <p className="text-foreground font-medium text-sm">{item.name}</p>
                  <p className="text-muted-foreground text-xs">x{item.quantity} · ${(item.price * item.quantity).toFixed(2)}</p>
                </div>
                <button onClick={() => removeItem(item.id)} className="text-muted-foreground hover:text-destructive">
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            ))
          )}
        </div>

        {items.length > 0 && (
          <div className="p-4 border-t border-border space-y-3">
            <div className="flex justify-between text-foreground font-bold">
              <span>Total</span>
              <span>${total.toFixed(2)}</span>
            </div>
            <button className="w-full bg-primary text-primary-foreground font-semibold py-3 rounded-lg hover:bg-primary/90 transition-colors">
              Checkout
            </button>
            <button onClick={clearCart} className="w-full text-muted-foreground text-sm hover:text-destructive transition-colors">
              Clear Cart
            </button>
          </div>
        )}
      </div>
    </>
  );
};

export default CartSidebar;
