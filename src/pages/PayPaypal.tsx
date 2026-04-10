import { useLocation, useNavigate } from "react-router-dom";
import { useCart } from "@/hooks/useCart";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { ArrowLeft, ExternalLink } from "lucide-react";

const PayPaypal = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { items, total, clearCart } = useCart();
  const ign = (location.state as { ign?: string })?.ign;

  if (!ign || items.length === 0) {
    return (
      <div className="min-h-screen bg-background flex flex-col">
        <Navbar />
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center space-y-4">
            <p className="text-muted-foreground">No active order found.</p>
            <button onClick={() => navigate("/store")} className="bg-primary text-primary-foreground px-6 py-3 rounded-lg font-semibold hover:bg-primary/90 transition-colors">
              Back to Store
            </button>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  const handlePaypalCheckout = () => {
    clearCart();
    navigate("/order-complete", { state: { ign } });
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Navbar />
      <div className="flex-1 flex items-center justify-center px-4 py-16">
        <div className="w-full max-w-md space-y-6">
          <div>
            <button onClick={() => navigate("/payment", { state: { ign } })} className="text-muted-foreground hover:text-foreground text-sm flex items-center gap-1 mb-4 transition-colors">
              <ArrowLeft className="w-4 h-4" /> Back
            </button>
            <div className="text-center space-y-2">
              <div className="w-16 h-16 rounded-2xl bg-[hsl(210,80%,55%)]/10 flex items-center justify-center mx-auto">
                <span className="text-[hsl(210,80%,55%)] font-bold text-2xl">P</span>
              </div>
              <h1 className="text-3xl font-bold text-foreground">PayPal</h1>
              <p className="text-muted-foreground">
                Complete your order of <span className="text-foreground font-bold">${total.toFixed(2)}</span>
              </p>
            </div>
          </div>

          {/* Order summary */}
          <div className="bg-card border border-border rounded-xl p-4 space-y-3">
            <h3 className="text-foreground font-semibold text-sm uppercase tracking-wider">Order Summary</h3>
            {items.map((item) => (
              <div key={item.id} className="flex justify-between text-sm">
                <span className="text-muted-foreground">{item.name} x{item.quantity}</span>
                <span className="text-foreground font-medium">${(item.price * item.quantity).toFixed(2)}</span>
              </div>
            ))}
            <div className="border-t border-border pt-3 flex justify-between font-bold text-foreground">
              <span>Total</span>
              <span>${total.toFixed(2)}</span>
            </div>
            <p className="text-muted-foreground text-xs">
              Playing as <span className="text-primary font-semibold">{ign}</span>
            </p>
          </div>

          <button
            onClick={handlePaypalCheckout}
            className="w-full bg-[hsl(210,80%,55%)] text-white font-semibold py-3 rounded-lg hover:bg-[hsl(210,80%,50%)] transition-colors flex items-center justify-center gap-2"
          >
            <ExternalLink className="w-4 h-4" /> Pay with PayPal
          </button>

          <p className="text-muted-foreground text-xs text-center">
            You will be redirected to PayPal to complete your purchase.
          </p>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default PayPaypal;
