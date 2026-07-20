"use client";
import Hero from "@/components/Hero";
import TrustBadges from "@/components/TrustBadges";
import CategoryGrid from "@/components/CategoryGrid";
import ProductCard from "@/components/ProductCard";
import { ProductGridSkeleton } from "@/components/Skeleton";
import { useCategories, useProducts } from "@/lib/hooks";

export default function HomePage() {
  const { categories } = useCategories();
  const { products, isLoading } = useProducts({ limit: 8, sort: "newest" });

  return (
    <>
      <Hero />
      <TrustBadges />
      <CategoryGrid categories={categories} />

      <section className="max-w-7xl mx-auto px-6 py-10">
        <h2 className="font-display text-2xl text-brown mb-6">New arrivals</h2>
        {isLoading && products.length === 0 ? (
          <ProductGridSkeleton />
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
            {products.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        )}
      </section>

      <section className="max-w-7xl mx-auto px-6 py-14">
        <h2 className="font-display text-2xl text-brown mb-8 text-center">Why Kalamkari?</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          {[
            { icon: "✍️", label: "Hand printed" },
            { icon: "🌿", label: "Natural colors" },
            { icon: "🧵", label: "100% cotton" },
            { icon: "👩‍🎨", label: "Made by artisans" },
          ].map((f) => (
            <div key={f.label} className="bg-beige rounded-xl2 py-8 px-4 shadow-softer">
              <div className="text-3xl mb-2">{f.icon}</div>
              <div className="text-sm font-medium text-brown/80">{f.label}</div>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-beige py-14">
        <div className="max-w-xl mx-auto text-center px-6">
          <h2 className="font-display text-2xl text-brown mb-2">Join our family</h2>
          <p className="text-brown/60 mb-6">Get ₹200 off your first order</p>
          <form className="flex gap-2" onSubmit={(e) => e.preventDefault()}>
            <input
              type="email"
              placeholder="Your email"
              className="flex-1 px-4 py-3 rounded-xl2 border border-brown/10 bg-white focus:outline-none focus:ring-2 focus:ring-gold"
            />
            <button className="bg-brown text-cream px-6 py-3 rounded-xl2 font-semibold hover:bg-gold transition-colors">
              Join
            </button>
          </form>
        </div>
      </section>
    </>
  );
}
