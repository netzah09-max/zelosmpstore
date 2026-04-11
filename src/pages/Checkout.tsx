import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "@/hooks/useCart";
import { supabase } from "@/integrations/supabase/client";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { ShoppingCart, User, AlertTriangle, Loader2 } from "lucide-react";

const Checkout = () => {
  const { items, total } = useCart();
  const navigate = useNavigate();
  const [ign, setIgn] = useState("");
  const [showConfirm, setShowConfirm] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-background flex flex-col">
        <Navbar />
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center space-y-4">
            <ShoppingCart className="w-16 h-16 text-muted-foreground mx-auto" />
            <h2 className="text-2xl font-bold text-foreground">Your cart is empty</h2>
            <button
              onClick={() => navigate("/store")}
              className="bg-primary text-primary-foreground px-6 py-3 rounded-lg font-semibold hover:bg-primary/90 transition-colors"
            >
              Back to Store
            </button>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  const handleCompletePurchase = () => {
    if (!ign.trim()) return;
    setShowConfirm(true);
  };

  const handleConfirm = async () => {
    setShowConfirm(false);
    setLoading(true);
    setError("");

    try {
      const { data, error: fnError } = await supabase.functions.invoke("tebex-checkout", {
        body: {
          items: items.map((i) => ({ tebexId: i.tebexId, quantity: i.quantity })),
          ign: ign.trim(),
          completeUrl: `${window.location.origin}/order-complete`,
          cancelUrl: `${window.location.origin}/store`,
        },
      });

      if (fnError) throw fnError;
      if (data?.checkoutUrl) {
        window.location.href = data.checkoutUrl;
      } else {
        // Fallback to direct Tebex store
        window.location.href = "https://zelosmp.tebex.io";
      }
    } catch (err: any) {
      console.error("Checkout error:", err);
      setError("Something went wrong. Redirecting to store...");
      setTimeout(() => {
        window.location.href = "https://zelosmp.tebex.io";
      }, 2000);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Navbar />
      <div className="flex-1 flex items-center justify-center px-4 py-16">
        <div className="w-full max-w-md space-y-8">
          <div className="text-center space-y-2">
            <h1 className="text-3xl font-bold text-foreground">Checkout</h1>
            <p className="text-muted-foreground">Enter your in-game name to continue</p>
          </div>

          {/* Order Summary */}
          <div className="bg-card border border-border rounded-xl p-4 space-y-3">
            <h3 className="text-foreground font-semibold text-sm uppercase tracking-wider">Order Summary</h3>
            {items.map((item) => (
              <div key={item.id} className="flex justify-between text-sm">
                <span className="text-muted-foreground">
                  {item.name} x{item.quantity}
                </span>
                <span className="text-foreground font-medium">${(item.price * item.quantity).toFixed(2)}</span>
              </div>
            ))}
            <div className="border-t border-border pt-3 flex justify-between font-bold text-foreground">
              <span>Total</span>
              <span>${total.toFixed(2)}</span>
            </div>
          </div>

          {/* IGN Input */}
          <div className="space-y-2">
            <label className="text-foreground font-medium text-sm flex items-center gap-2">
              <User className="w-4 h-4 text-primary" />
              In-Game Name
            </label>
            <input
              type="text"
              value={ign}
              onChange={(e) => setIgn(e.target.value)}
              placeholder="Enter your Minecraft username"
              maxLength={16}
              className="w-full bg-secondary border border-border rounded-lg px-4 py-3 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
            />
          </div>

          {error && (
            <p className="text-destructive text-sm text-center">{error}</p>
          )}

          <button
            onClick={handleCompletePurchase}
            disabled={!ign.trim() || loading}
            className="w-full bg-primary text-primary-foreground font-semibold py-3 rounded-lg hover:bg-primary/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
          >
            {loading ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" /> Creating checkout...
              </>
            ) : (
              "Proceed to Checkout"
            )}
          </button>
        </div>
      </div>

      {/* Confirmation Modal */}
      {showConfirm && (
        <>
          <div className="fixed inset-0 bg-background/60 backdrop-blur-sm z-50" onClick={() => setShowConfirm(false)} />
          <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
            <div className="bg-card border border-border rounded-xl p-6 max-w-sm w-full space-y-4">
              <div className="flex items-center gap-3">
                <AlertTriangle className="w-6 h-6 text-yellow-500 shrink-0" />
                <h3 className="text-foreground font-bold text-lg">Confirm Username</h3>
              </div>
              <p className="text-muted-foreground text-sm">
                Make sure you wrote your in-game name correctly:
              </p>
              <p className="text-foreground font-bold text-xl text-center bg-secondary rounded-lg py-3">
                {ign.trim()}
              </p>
              <div className="flex gap-3">
                <button
                  onClick={() => setShowConfirm(false)}
                  className="flex-1 border border-border text-foreground py-2.5 rounded-lg font-medium hover:bg-secondary transition-colors"
                >
                  Go Back
                </button>
                <button
                  onClick={handleConfirm}
                  className="flex-1 bg-primary text-primary-foreground py-2.5 rounded-lg font-semibold hover:bg-primary/90 transition-colors"
                >
                  Confirm
                </button>
              </div>
            </div>
          </div>
        </>
      )}

      <Footer />
    </div>
  );
};

export default Checkout;
