import useSWR, { mutate as globalMutate } from "swr";
import { api } from "./api";

// Categories barely change — cache aggressively, don't refetch on every tab focus.
export function useCategories() {
  const { data, isLoading } = useSWR("categories", () => api.categories(), {
    revalidateOnFocus: false,
    revalidateIfStale: false,
    dedupingInterval: 60_000,
  });
  return { categories: data || [], isLoading };
}

export function useProducts(params = {}) {
  const key = ["products", JSON.stringify(params)];
  const { data, isLoading, error } = useSWR(key, () => api.products(params), {
    revalidateOnFocus: false,
    keepPreviousData: true, // keep showing the old grid while the new filter's request is in flight
    dedupingInterval: 5_000,
  });
  return {
    products: data?.products || [],
    total: data?.total || 0,
    totalPages: data?.totalPages || 1,
    isLoading,
    error,
  };
}

export function useProduct(slug) {
  const { data, isLoading, error } = useSWR(slug ? ["product", slug] : null, () => api.product(slug), {
    revalidateOnFocus: false,
    dedupingInterval: 10_000,
  });
  return { product: data, isLoading, error };
}

// Shared across Profile and Checkout — whichever page loads first populates the
// cache, so the other one shows addresses instantly with zero network wait.
export function useAddresses(enabled) {
  const { data, isLoading, mutate } = useSWR(enabled ? "addresses" : null, () => api.addresses(), {
    revalidateOnFocus: false,
    dedupingInterval: 10_000,
  });
  return { addresses: data || [], isLoading, mutate };
}

export function useOrders(enabled) {
  const { data, isLoading, mutate } = useSWR(enabled ? "orders" : null, () => api.orders(), {
    revalidateOnFocus: false,
    dedupingInterval: 5_000,
  });
  return { orders: data || [], isLoading, mutate };
}

export function useOrder(id) {
  const { data, isLoading } = useSWR(id ? ["order", id] : null, () => api.order(id), {
    revalidateOnFocus: false,
    dedupingInterval: 5_000,
  });
  return { order: data, isLoading };
}

// Call after placing an order so the /orders list is fresh next time it's opened,
// without forcing this page to wait on a refetch right now.
export function invalidateOrders() {
  globalMutate("orders");
}

