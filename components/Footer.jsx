import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-brown text-cream/80 mt-20">
      <div className="max-w-7xl mx-auto px-6 py-14 grid grid-cols-2 md:grid-cols-4 gap-8 text-sm">
        <div>
          <h4 className="text-cream font-semibold mb-3">Shop</h4>
          <ul className="space-y-2">
            <li><Link href="/products?category=sarees">Sarees</Link></li>
            <li><Link href="/products?category=dupattas">Dupattas</Link></li>
            <li><Link href="/products">All products</Link></li>
          </ul>
        </div>
        <div>
          <h4 className="text-cream font-semibold mb-3">About</h4>
          <ul className="space-y-2">
            <li>Our story</li>
            <li>Artisans</li>
            <li>Sustainability</li>
          </ul>
        </div>
        <div>
          <h4 className="text-cream font-semibold mb-3">Policies</h4>
          <ul className="space-y-2">
            <li>Shipping</li>
            <li>Returns</li>
            <li>Privacy</li>
          </ul>
        </div>
        <div>
          <h4 className="text-cream font-semibold mb-3">Contact</h4>
          <ul className="space-y-2">
            <li>support@kalamkaristore.in</li>
            <li>+91 00000 00000</li>
          </ul>
        </div>
      </div>
      <div className="border-t border-cream/10 text-center text-xs py-4 text-cream/50">
        © {new Date().getFullYear()} Kalamkari Store. Handcrafted with care.
      </div>
    </footer>
  );
}
