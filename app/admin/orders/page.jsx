"use client";
import { useEffect, useState } from "react";
import { api } from "@/lib/api";
import { formatINR } from "@/lib/format";
import AdminGuard from "@/components/AdminGuard";

const STATUSES = ["PENDING", "CONFIRMED", "SHIPPED", "DELIVERED", "CANCELLED"];

function AdminOrders() {
  const [orders, setOrders] = useState([]);

  async function load() {
    setOrders(await api.adminOrders());
  }
  useEffect(() => { load(); }, []);

  async function updateStatus(id, status) {
    const previous = orders;
    setOrders((prev) => prev.map((o) => (o.id === id ? { ...o, status } : o))); // instant
    try {
      await api.updateOrderStatus(id, status);
    } catch {
      setOrders(previous); // roll back
    }
  }

  return (
    <div className="max-w-5xl mx-auto px-6 py-10">
      <h1 className="font-display text-2xl text-brown mb-8">Manage orders</h1>
      <div className="space-y-4">
        {orders.map((o) => (
          <div key={o.id} className="bg-white rounded-xl2 shadow-softer p-5">
            <div className="flex justify-between items-start">
              <div>
                <p className="font-medium text-brown">Order #{o.id.slice(0, 8)}</p>
                <p className="text-sm text-brown/60">{o.user.name} · {o.user.email}</p>
                <p className="text-sm text-brown/60 mt-1">
                  {o.address.line1}, {o.address.city}, {o.address.state} {o.address.pincode}
                </p>
                <p className="text-sm text-brown/50 mt-1">{o.items.length} item(s)</p>
              </div>
              <div className="text-right">
                <p className="font-semibold text-brown">{formatINR(o.total)}</p>
                <p className="text-xs text-brown/50 mt-1">{new Date(o.createdAt).toLocaleDateString("en-IN")}</p>
              </div>
            </div>
            <div className="flex gap-2 mt-4">
              {STATUSES.map((s) => (
                <button
                  key={s}
                  onClick={() => updateStatus(o.id, s)}
                  className={`text-xs px-3 py-1.5 rounded-full font-medium transition-colors ${
                    o.status === s ? "bg-brown text-cream" : "bg-beige text-brown/60 hover:bg-gold/30"
                  }`}
                >
                  {s}
                </button>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function Page() {
  return <AdminGuard><AdminOrders /></AdminGuard>;
}
