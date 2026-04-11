import { corsHeaders } from "@supabase/supabase-js/cors";

const TEBEX_PUBLIC_TOKEN = "12k7z-7b51c4e7c5ed1f991e8003da04adfc778046318f";
const HEADLESS_API = `https://headless.tebex.io/api/accounts/${TEBEX_PUBLIC_TOKEN}`;

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  try {
    const { items, ign, completeUrl, cancelUrl } = await req.json();

    if (!items || !Array.isArray(items) || items.length === 0) {
      return new Response(JSON.stringify({ error: "No items provided" }), {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    if (!ign || typeof ign !== "string") {
      return new Response(JSON.stringify({ error: "No IGN provided" }), {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    // 1. Create basket with username
    const basketRes = await fetch(`${HEADLESS_API}/baskets`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        complete_url: completeUrl || "https://zelosmpstore.lovable.app/order-complete",
        cancel_url: cancelUrl || "https://zelosmpstore.lovable.app/store",
        username: ign,
      }),
    });

    const basketData = await basketRes.json();
    if (!basketRes.ok) {
      console.error("Basket creation failed:", basketData);
      return new Response(JSON.stringify({ error: "Failed to create basket", details: basketData }), {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const basketIdent = basketData.data.ident;
    const usernameId = basketData.data.username_id;

    // 2. Add each package to the basket
    for (const item of items) {
      const addRes = await fetch(`${HEADLESS_API}/baskets/${basketIdent}/packages`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          package_id: item.tebexId,
          quantity: item.quantity,
          variable_data: { username_id: usernameId },
        }),
      });

      const addData = await addRes.json();
      if (!addRes.ok) {
        console.error(`Failed to add package ${item.tebexId}:`, addData);
      }
    }

    // 3. Get auth/checkout URL
    const authRes = await fetch(
      `${HEADLESS_API}/baskets/${basketIdent}/auth?returnUrl=${encodeURIComponent(
        completeUrl || "https://zelosmpstore.lovable.app/order-complete"
      )}`
    );
    const authData = await authRes.json();

    // The checkout links are in the basket data
    const linksRes = await fetch(`${HEADLESS_API}/baskets/${basketIdent}`);
    const linksData = await linksRes.json();

    const checkoutUrl = linksData.data?.links?.checkout || authData?.data?.[0]?.url || `https://zelosmp.tebex.io`;

    return new Response(JSON.stringify({ checkoutUrl, basketIdent }), {
      status: 200,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Tebex checkout error:", error);
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
