

## Problem

The store page fetches live data from the Tebex API on every load (`Store.tsx` line 26), which **completely replaces** the local items in `storeItems.ts`. That's why your text changes never appear — they get overwritten immediately.

## Plan

**Modify `Store.tsx`** to merge the Tebex API data with local overrides from `storeItems.ts`. Specifically:

1. When API data comes back, loop through the results
2. For each item, check if there's a matching local override in `storeItems.ts` (by `tebexId`)
3. If a local override exists, use the **local name, description, and features** but keep the API **price** (so pricing stays in sync with Tebex)
4. If no local override exists, use the API data as-is

This way, your custom text in `storeItems.ts` always takes priority, while prices stay accurate from the API.

### Technical Detail

In `src/pages/Store.tsx`, replace the fetch success handler (line 25-27):

```typescript
// Before
if (data?.packages && data.packages.length > 0) {
  setStoreItems(data.packages);
}

// After — merge API data with local overrides
if (data?.packages && data.packages.length > 0) {
  const merged = data.packages.map((pkg: StoreItem) => {
    const local = fallbackItems.find(f => f.tebexId === pkg.tebexId);
    if (local) {
      return { ...pkg, name: local.name, description: local.description, features: local.features, color: local.color, popular: local.popular };
    }
    return pkg;
  });
  setStoreItems(merged);
}
```

This is a small change — only a few lines in one file.

