"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import { Search, Heart, ShoppingBag, User, Menu, X } from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { useCart } from "@/context/CartContext";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const { user } = useAuth();
  const { cartCount, wishlist } = useCart();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`sticky top-0 z-50 transition-all duration-300 ${
        scrolled ? "bg-cream/80 backdrop-blur-md shadow-softer" : "bg-cream"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
        <Link href="/" className="font-display text-2xl text-brown tracking-tight">
          Kalamkari
        </Link>

        <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-brown/80">
          <Link href="/products" className="hover:text-gold transition-colors">Shop</Link>
          <Link href="/about" className="hover:text-gold transition-colors">About</Link>
          <Link href="/products?category=sarees" className="hover:text-gold transition-colors">Sarees</Link>
          <Link href="/products?category=dupattas" className="hover:text-gold transition-colors">Dupattas</Link>
        </nav>

        <div className="flex items-center gap-4 text-brown">
          <button aria-label="Search" className="hover:text-gold transition-colors">
            <Search size={20} />
          </button>
          <Link href="/wishlist" className="relative hover:text-gold transition-colors" aria-label="Wishlist">
            <Heart size={20} />
            {wishlist.length > 0 && (
              <span className="absolute -top-2 -right-2 bg-gold text-white text-[10px] rounded-full w-4 h-4 flex items-center justify-center">
                {wishlist.length}
              </span>
            )}
          </Link>
          <Link href="/cart" className="relative hover:text-gold transition-colors" aria-label="Cart">
            <ShoppingBag size={20} />
            {cartCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-gold text-white text-[10px] rounded-full w-4 h-4 flex items-center justify-center">
                {cartCount}
              </span>
            )}
          </Link>
          <Link href={user ? "/profile" : "/profile"} className="hover:text-gold transition-colors" aria-label="Profile">
            {user?.avatarUrl ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={user.avatarUrl} alt={user.name} className="w-6 h-6 rounded-full object-cover" />
            ) : (
              <User size={20} />
            )}
          </Link>
          <button className="md:hidden" onClick={() => setMenuOpen((o) => !o)} aria-label="Menu">
            {menuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {menuOpen && (
        <div className="md:hidden flex flex-col gap-3 px-6 pb-4 text-brown/90 text-sm font-medium">
          <Link href="/products" onClick={() => setMenuOpen(false)}>Shop</Link>
          <Link href="/about" onClick={() => setMenuOpen(false)}>About</Link>
          <Link href="/products?category=sarees" onClick={() => setMenuOpen(false)}>Sarees</Link>
          <Link href="/products?category=dupattas" onClick={() => setMenuOpen(false)}>Dupattas</Link>
        </div>
      )}
    </header>
  );
}
