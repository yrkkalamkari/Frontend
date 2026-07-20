"use client";
import { useEffect, useState, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import ProductCard from "@/components/ProductCard";
import { ProductGridSkeleton } from "@/components/Skeleton";
import EmptyState from "@/components/EmptyState";
import { useCategories, useProducts } from "@/lib/hooks";

function ProductListing() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const category = searchParams.get("category") || "";
  const sort = searchParams.get("sort") || "newest";
  const search = searchParams.get("search") || "";

  const [minPriceInput, setMinPriceInput] = useState("");
  const [maxPriceInput, setMaxPriceInput] = useState("");
  // Debounced values — these are what actually trigger a request, so typing
  // "1500" doesn't fire 4 separate API calls, just one ~400ms after you stop.
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [page, setPage] = useState(1);

  useEffect(() => {
    const t = setTimeout(() => {
      setMinPrice(minPriceInput);
      setMaxPrice(maxPriceInput);
      setPage(1);
    }, 400);
    return () => clearTimeout(t);
  }, [minPriceInput, maxPriceInput]);

  const { categories } = useCategories();
  const { products, totalPages, isLoading } = useProducts({
    category, sort, search, minPrice, maxPrice, page, limit: 12,
  });

  function updateParam(key, value) {
    const params = new URLSearchParams(searchParams.toString());
    if (value) params.set(key, value);
    else params.delete(key);
    router.push(`/products?${params.toString()}`);
    setPage(1);
  }

  return (
    <div className="max-w-7xl mx-auto px-6 py-10">
      <h1 className="font-display text-3xl text-brown mb-8 capitalize">
        {category || "All products"}
      </h1>

      <div className="grid md:grid-cols-[220px_1fr] gap-8">
        {/* Filters */}
        <aside className="hidden md:block space-y-8 sticky top-24 self-start">
          <div>
            <h3 className="font-semibold text-brown text-sm mb-3">Category</h3>
            <ul className="space-y-2 text-sm text-brown/70">
              <li>
                <button onClick={() => updateParam("category", "")} className={!category ? "text-gold font-semibold" : ""}>
                  All
                </button>
              </li>
              {categories.map((c) => (
                <li key={c.id}>
                  <button
                    onClick={() => updateParam("category", c.slug)}
                    className={category === c.slug ? "text-gold font-semibold" : ""}
                  >
                    {c.name}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-brown text-sm mb-3">Price range</h3>
            <div className="flex gap-2">
              <input
                type="number"
                placeholder="Min"
                value={minPriceInput}
                onChange={(e) => setMinPriceInput(e.target.value)}
                className="w-full px-3 py-2 text-sm rounded-lg border border-brown/10"
              />
              <input
                type="number"
                placeholder="Max"
                value={maxPriceInput}
                onChange={(e) => setMaxPriceInput(e.target.value)}
                className="w-full px-3 py-2 text-sm rounded-lg border border-brown/10"
              />
            </div>
          </div>
        </aside>

        {/* Products */}
        <div>
          <div className="flex justify-end mb-6">
            <select
              value={sort}
              onChange={(e) => updateParam("sort", e.target.value)}
              className="text-sm border border-brown/10 rounded-lg px-3 py-2 bg-white"
            >
              <option value="newest">Newest</option>
              <option value="price_asc">Price: low to high</option>
              <option value="price_desc">Price: high to low</option>
            </select>
          </div>

          {isLoading && products.length === 0 ? (
            <ProductGridSkeleton count={9} />
          ) : products.length === 0 ? (
            <EmptyState icon="🔍" title="No products found" subtitle="Try adjusting your filters" />
          ) : (
            <>
              <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
                {products.map((p) => (
                  <ProductCard key={p.id} product={p} />
                ))}
              </div>

              {totalPages > 1 && (
                <div className="flex justify-center gap-2 mt-10">
                  {Array.from({ length: totalPages }).map((_, i) => (
                    <button
                      key={i}
                      onClick={() => setPage(i + 1)}
                      className={`w-9 h-9 rounded-full text-sm font-medium transition-colors ${
                        page === i + 1 ? "bg-brown text-cream" : "bg-beige text-brown/70"
                      }`}
                    >
                      {i + 1}
                    </button>
                  ))}
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default function ProductsPage() {
  return (
    <Suspense fallback={<div className="max-w-7xl mx-auto px-6 py-10"><ProductGridSkeleton count={9} /></div>}>
      <ProductListing />
    </Suspense>
  );
}
