import { useLocation, useNavigate } from "react-router-dom";
import { useCart } from "@/hooks/useCart";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { CreditCard, ArrowLeft } from "lucide-react";

const Payment = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { items, total } = useCart();
  const ign = (location.state as { ign?: string })?.ign;

  if (!ign || items.length === 0) {
    return (
      <div className="min-h-screen bg-background flex flex-col">
        <Navbar />
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center space-y-4">
            <p className="text-muted-foreground">No active order found.</p>
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

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Navbar />
      <div className="flex-1 flex items-center justify-center px-4 py-16">
        <div className="w-full max-w-md space-y-8">
          <div>
            <button
              onClick={() => navigate("/checkout")}
              className="text-muted-foreground hover:text-foreground text-sm flex items-center gap-1 mb-4 transition-colors"
            >
              <ArrowLeft className="w-4 h-4" /> Back
            </button>
            <div className="text-center space-y-2">
              <h1 className="text-3xl font-bold text-foreground">Payment</h1>
              <p className="text-muted-foreground">
                Playing as <span className="text-primary font-semibold">{ign}</span> · Total: <span className="text-foreground font-bold">${total.toFixed(2)}</span>
              </p>
            </div>
          </div>

          <div className="text-foreground text-sm font-semibold uppercase tracking-wider">Choose a payment method</div>

          {/* Card */}
          <button
            onClick={() => {/* payment integration */}}
            className="w-full bg-card border border-border rounded-xl p-5 flex items-center gap-4 hover:border-primary/50 hover:bg-secondary transition-all group"
          >
            <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center shrink-0 group-hover:bg-primary/20 transition-colors">
              <CreditCard className="w-6 h-6 text-primary" />
            </div>
            <div className="text-left">
              <p className="text-foreground font-semibold">Credit / Debit Card</p>
              <p className="text-muted-foreground text-sm">Visa, Mastercard, Amex</p>
            </div>
          </button>

          {/* PayPal */}
          <button
            onClick={() => {/* payment integration */}}
            className="w-full bg-card border border-border rounded-xl p-5 flex items-center gap-4 hover:border-primary/50 hover:bg-secondary transition-all group"
          >
            <div className="w-12 h-12 rounded-lg bg-blue-500/10 flex items-center justify-center shrink-0 group-hover:bg-blue-500/20 transition-colors">
              <span className="text-blue-500 font-bold text-lg">P</span>
            </div>
            <div className="text-left">
              <p className="text-foreground font-semibold">PayPal</p>
              <p className="text-muted-foreground text-sm">Pay with your PayPal account</p>
            </div>
          </button>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Payment;
