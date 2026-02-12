// src/api/index.js
// Centralized API layer – connects frontend with backend
// Make sure you have `VITE_API_BASE_URL=http://localhost:8000/api` in your .env file

const API_BASE =
  import.meta.env.VITE_API_BASE_URL || "http://localhost:8000/api";

async function req(path, opts = {}) {
  const url = `${API_BASE}${path}`;
  const res = await fetch(url, {
    headers: {
      "Content-Type": "application/json",
      ...(opts.token ? { Authorization: `Bearer ${opts.token}` } : {}),
    },
    method: opts.method || "GET",
    body: opts.body ? JSON.stringify(opts.body) : undefined,
  });
  const data = await res.json().catch(() => ({}));
  if (!res.ok) throw data;
  return data;
}


// 🛒 Product APIs
export async function fetchProducts() {
  return req("/products");
}

export async function fetchProductById(id) {
  return req(`/products/${id}`);
}

export async function searchProducts(q) {
  const all = await fetchProducts();
  const query = (q || "").toLowerCase();
  return all.filter(
    (p) =>
      p.title.toLowerCase().includes(query) ||
      p.brand.toLowerCase().includes(query) ||
      p.category.toLowerCase().includes(query) ||
      p.description.toLowerCase().includes(query)
  );
}

// ✉️ Newsletter
export async function submitNewsletter(email) {
  return req("/newsletter", { method: "POST", body: { email } });
}

// 👤 Auth APIs
export async function loginUser({ email, password }) {
  return req("/auth/login", { method: "POST", body: { email, password } });
}

export async function registerUser({ name, email, password }) {
  return req("/auth/register", {
    method: "POST",
    body: { name, email, password },
  });
}

// 💳 Razorpay Payment
export async function createCheckoutSession({ items, amount }) {
  return req("/checkout/create-order", {
    method: "POST",
    body: { items, amount },
  });
}

// 🌐 Social Login URLs
export const OAUTH_GOOGLE_URL = `${API_BASE.replace(
  "/api",
  ""
)}/api/auth/google`;
export const OAUTH_GITHUB_URL = `${API_BASE.replace(
  "/api",
  ""
)}/api/auth/github`;
