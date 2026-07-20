import Link from "next/link";

export default function CategoryGrid({ categories = [] }) {
  if (categories.length === 0) return null;
  return (
    <section className="max-w-7xl mx-auto px-6 py-10">
      <h2 className="font-display text-2xl text-brown mb-6">Shop by category</h2>
      <div className="flex gap-6 overflow-x-auto pb-2">
        {categories.map((c) => (
          <Link
            key={c.id}
            href={`/products?category=${c.slug}`}
            className="flex flex-col items-center gap-3 shrink-0 group"
          >
            <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-full bg-beige shadow-softer flex items-center justify-center text-brown/50 font-display text-sm transition-transform duration-300 group-hover:scale-105">
              {c.name.slice(0, 2)}
            </div>
            <span className="text-sm font-medium text-brown/80">{c.name}</span>
          </Link>
        ))}
      </div>
    </section>
  );
}
