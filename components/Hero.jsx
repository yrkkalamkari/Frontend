"use client";
import Link from "next/link";
import { motion } from "framer-motion";

export default function Hero() {
  return (
    <section className="relative bg-beige overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 py-16 sm:py-24 grid md:grid-cols-2 gap-10 items-center">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl text-brown leading-tight">
            Handcrafted Kalamkari Collection
          </h1>
          <p className="mt-4 text-lg text-brown/70 font-medium">
            Traditional art. Modern elegance.
          </p>
          <Link
            href="/products"
            className="inline-block mt-8 bg-brown text-cream px-8 py-4 rounded-xl2 font-semibold shadow-soft hover:bg-gold hover:scale-105 transition-all duration-300"
          >
            Shop now →
          </Link>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.15 }}
          className="rounded-xl2 overflow-hidden shadow-soft aspect-[4/5] bg-gradient-to-br from-gold/30 to-brown/20 flex items-center justify-center"
        >
          {/* Replace with a real product/model photo */}
          <span className="font-display text-brown/40 text-xl">Hero image</span>
        </motion.div>
      </div>
    </section>
  );
}
