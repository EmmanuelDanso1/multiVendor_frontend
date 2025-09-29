// src/api/products.js
const API = import.meta.env.VITE_API_URL || "http://localhost:8000/api";

/**
 * Search products from backend.
 * - Accepts an AbortSignal so caller can cancel requests.
 * - Expects backend to support ?search= query param (DRF SearchFilter or custom).
 */
export async function searchProducts(query, signal = undefined) {
  const url = `${API}/products/?search=${encodeURIComponent(query)}`;
  const res = await fetch(url, { signal });
  if (!res.ok) {
    const text = await res.text();
    throw new Error(`Search request failed: ${res.status} ${text}`);
  }
  const data = await res.json();
  // If you use DRF pagination you may get { results: [...] }
  if (Array.isArray(data)) return data;
  return data.results ?? [];
}
