import React, {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { loadState, saveState } from "../utils/storage";
import { products as staticProducts } from "../data/products";
import { createCheckoutSession } from "../api";

const StoreCtx = createContext(null);

export function StoreProvider({ children }) {
  const [products] = useState(staticProducts);
  const [cart, setCart] = useState(() => loadState()?.cart || []);
  const [wishlist, setWishlist] = useState(() => loadState()?.wishlist || []);
  const [reviews, setReviews] = useState(() => loadState()?.reviews || {});
  const [searchQuery, setSearchQuery] = useState("");
  const [theme, setTheme] = useState(() => loadState()?.theme || "light");
  const [toasts, setToasts] = useState([]);

  useEffect(() => {
    saveState({ cart, wishlist, reviews, theme });
  }, [cart, wishlist, reviews, theme]);

  useEffect(() => {
    if (theme === "dark") document.documentElement.classList.add("dark");
    else document.documentElement.classList.remove("dark");
  }, [theme]);

  const addToast = (msg) => {
    const id = Math.random().toString(36).slice(2);
    setToasts((t) => [...t, { id, msg }]);
    setTimeout(() => setToasts((t) => t.filter((x) => x.id !== id)), 2500);
  };

  const addToCart = (product, qty = 1) => {
    setCart((c) => {
      const idx = c.findIndex((i) => i.id === (product.id || product._id));
      const next = [...c];
      if (idx >= 0) next[idx] = { ...next[idx], qty: next[idx].qty + qty };
      else next.push({ id: product.id || product._id, qty });
      return next;
    });
    addToast("Added to cart");
  };

  const removeFromCart = (id) => setCart((c) => c.filter((i) => i.id !== id));
  const updateQty = (id, qty) =>
    setCart((c) =>
      c.map((i) => (i.id === id ? { ...i, qty: Math.max(1, qty) } : i))
    );

  const addToWishlist = (id) => {
    setWishlist((w) => (w.includes(id) ? w : [...w, id]));
    addToast("Saved to wishlist");
  };
  const removeFromWishlist = (id) =>
    setWishlist((w) => w.filter((x) => x !== id));
  const isInWishlist = (id) => wishlist.includes(id);

  const submitReview = (productId, review) => {
    setReviews((r) => {
      const list = r[productId] || [];
      return {
        ...r,
        [productId]: [{ ...review, date: new Date().toISOString() }, ...list],
      };
    });
    addToast("Review posted");
  };

  const clearCart = () => setCart([]);

  // ✅ Fully fixed totals mapping
  const totals = useMemo(() => {
    // create a mapping of both id and _id to product
    const map = {};
    products.forEach((p) => {
      if (p.id) map[p.id] = p;
      if (p._id) map[p._id] = p;
    });

    const items = cart.map((i) => {
      const prod = map[i.id];
      if (!prod)
        return { id: i.id, name: "Unknown Product", price: 0, qty: i.qty };
      return { ...prod, qty: i.qty };
    });

    const subtotal = items.reduce((s, i) => s + (i.price || 0) * i.qty, 0);
    return { items, subtotal };
  }, [cart, products]);

  const checkout = async () => {
    const res = await createCheckoutSession(cart);
    if (res?.redirectUrl) window.location.href = res.redirectUrl;
  };

  const value = {
    products,
    cart,
    wishlist,
    reviews,
    searchQuery,
    theme,
    toasts,
    setSearchQuery,
    setTheme,
    addToCart,
    removeFromCart,
    updateQty,
    addToWishlist,
    removeFromWishlist,
    isInWishlist,
    submitReview,
    totals,
    clearCart,
    checkout,
    addToast,
  };

  return <StoreCtx.Provider value={value}>{children}</StoreCtx.Provider>;
}

export const useStore = () => useContext(StoreCtx);
