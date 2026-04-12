const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

const TEBEX_PUBLIC_TOKEN = "12k7z-7b51c4e7c5ed1f991e8003da04adfc778046318f";
const HEADLESS_API = `https://headless.tebex.io/api/accounts/${TEBEX_PUBLIC_TOKEN}`;

function categorizePackage(pkg: any): "ranks" | "crate-keys" {
  const name = (pkg.name || "").toLowerCase();
  const desc = (pkg.description || "").toLowerCase();
  const categoryName = (pkg.category?.name || "").toLowerCase();

  // Check category name from Tebex first
  if (categoryName.includes("rank") || categoryName.includes("role")) return "ranks";
  if (categoryName.includes("crate") || categoryName.includes("key")) return "crate-keys";

  // Fallback to name/description heuristics
  if (name.includes("key") || name.includes("crate") || desc.includes("crate") || desc.includes("key")) return "crate-keys";
  if (name.includes("rank") || name.includes("+") || desc.includes("rank") || desc.includes("perk")) return "ranks";

  return "ranks"; // default
}

function getColor(pkg: any, category: string): string {
  const name = (pkg.name || "").toLowerCase();
  if (name.includes("common")) return "hsl(0, 0%, 70%)";
  if (name.includes("amethyst") || name.includes("purple")) return "hsl(280, 80%, 55%)";
  if (name.includes("crimson") || name.includes("red")) return "hsl(0, 80%, 50%)";
  if (name.includes("spawner")) return "hsl(0, 80%, 50%)";
  if (name.includes("gold") || name.includes("golden")) return "hsl(45, 90%, 55%)";
  if (name.includes("diamond") || name.includes("blue")) return "hsl(200, 80%, 55%)";
  if (name.includes("emerald") || name.includes("green")) return "hsl(140, 70%, 45%)";
  if (category === "ranks") return "hsl(0, 80%, 50%)";
  return "hsl(220, 70%, 55%)";
}

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  try {
    const res = await fetch(`${HEADLESS_API}/packages`);
    const text = await res.text();

    if (!res.ok) {
      console.error("Tebex packages error:", res.status, text.substring(0, 300));
      return new Response(JSON.stringify({ error: "Failed to fetch packages", status: res.status }), {
        status: 502,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    let data;
    try {
      data = JSON.parse(text);
    } catch {
      return new Response(JSON.stringify({ error: "Invalid response from Tebex" }), {
        status: 502,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const packages = (data.data || []).map((pkg: any) => {
      const category = categorizePackage(pkg);
      // Strip HTML tags from description
      const plainDesc = (pkg.description || "").replace(/<[^>]*>/g, "").trim();
      return {
        id: String(pkg.id),
        tebexId: pkg.id,
        name: pkg.name,
        description: plainDesc || `Get the ${pkg.name} package.`,
        price: pkg.total_price || pkg.base_price || 0,
        category,
        color: getColor(pkg, category),
        popular: false,
      };
    });

    return new Response(JSON.stringify({ packages }), {
      status: 200,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Tebex packages error:", error);
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
