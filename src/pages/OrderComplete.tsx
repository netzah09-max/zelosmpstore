import { useLocation, useNavigate } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { CheckCircle } from "lucide-react";

const OrderComplete = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const ign = (location.state as { ign?: string })?.ign;

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Navbar />
      <div className="flex-1 flex items-center justify-center px-4 py-16">
        <div className="text-center space-y-6 max-w-md">
          <CheckCircle className="w-20 h-20 text-primary mx-auto" />
          <h1 className="text-3xl font-bold text-foreground">Order Complete!</h1>
          <p className="text-muted-foreground">
            Thank you for your purchase{ign ? <>, <span className="text-primary font-semibold">{ign}</span></> : ""}! Your items will be delivered in-game shortly.
          </p>
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
};

export default OrderComplete;
