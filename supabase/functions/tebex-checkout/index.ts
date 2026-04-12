const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

const TEBEX_PUBLIC_TOKEN = "12k7z-7b51c4e7c5ed1f991e8003da04adfc778046318f";
const HEADLESS_API = `https://headless.tebex.io/api/accounts/${TEBEX_PUBLIC_TOKEN}`;
const HEADLESS_BASE = "https://headless.tebex.io/api";

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

    const basketText = await basketRes.text();
    console.log("Basket response status:", basketRes.status);
    console.log("Basket response:", basketText.substring(0, 500));

    let basketData;
    try {
      basketData = JSON.parse(basketText);
    } catch {
      return new Response(JSON.stringify({ error: "Tebex returned invalid response", details: basketText.substring(0, 200) }), {
        status: 502,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    if (!basketRes.ok) {
      return new Response(JSON.stringify({ error: "Failed to create basket", details: basketData }), {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const basketIdent = basketData.data.ident;
    const usernameId = basketData.data.username_id;

    // 2. Add each package to the basket (use /baskets/{ident}/packages without account token)
    for (const item of items) {
      const addRes = await fetch(`${HEADLESS_BASE}/baskets/${basketIdent}/packages`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          package_id: item.tebexId,
          quantity: item.quantity,
          variable_data: { username_id: usernameId },
        }),
      });

      const addText = await addRes.text();
      console.log(`Add package ${item.tebexId} status:`, addRes.status, addText.substring(0, 300));

      if (!addRes.ok) {
        console.error(`Failed to add package ${item.tebexId}:`, addText.substring(0, 500));
      }
    }

    // 3. Get checkout URL from basket
    const linksRes = await fetch(`${HEADLESS_BASE}/baskets/${basketIdent}`);
    const linksText = await linksRes.text();
    console.log("Links response:", linksText.substring(0, 500));
    
    let linksData;
    try {
      linksData = JSON.parse(linksText);
    } catch {
      // fallback
    }

    const checkoutUrl = linksData?.data?.links?.checkout || `https://checkout.tebex.io/checkout/${basketIdent}`;

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
