import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { CartProvider } from "@/hooks/useCart";
import Index from "./pages/Index.tsx";
import Store from "./pages/Store.tsx";
import Checkout from "./pages/Checkout.tsx";
import Payment from "./pages/Payment.tsx";
import PayCard from "./pages/PayCard.tsx";
import PayPaypal from "./pages/PayPaypal.tsx";
import OrderComplete from "./pages/OrderComplete.tsx";
import NotFound from "./pages/NotFound.tsx";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <CartProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/store" element={<Store />} />
            <Route path="/checkout" element={<Checkout />} />
            <Route path="/payment" element={<Payment />} />
            <Route path="/pay/card" element={<PayCard />} />
            <Route path="/pay/paypal" element={<PayPaypal />} />
            <Route path="/order-complete" element={<OrderComplete />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </CartProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
