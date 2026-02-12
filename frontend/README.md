# ElexMart — Electronics e‑commerce (React + Vite + Tailwind)

A responsive electronics e‑commerce starter with product catalog, filters, cart, wishlist, search, rotating news, and product detail pages. State persists with `localStorage`. Designed for easy backend integration.

## Features
- Shared Header & Footer on all pages
- Home page banner with search (also in header)
- Rotating news section (auto-advances)
- Products page with left sidebar filters (category, brand, price, rating, stock)
- Grid layout like Flipkart with Add to Cart & Wishlist
- Product detail page with images, price, add/wishlist, description, and customer reviews
- Cart (quantities, totals) & Wishlist pages
- Login page (stub) + Checkout page (stub) with backend integration placeholders
- Search prioritizes keyword matches on Products page
- URL-based filters & search
- LocalStorage persistence for cart, wishlist, and reviews
- Mobile-friendly responsive design with Tailwind CSS

## Getting Started
```bash
# 1) Install deps
npm install

# 2) Run dev server
npm run dev

# 3) Build for production
npm run build
npm run preview
```

## Backend Hooks
See `src/api/index.js` for stubbed functions and `TODO:` comments to integrate real APIs (products, auth, newsletter, checkout, reviews).

## Project Structure
```
elexmart/
  src/
    api/ (stubs)
    components/ (Header, Footer, Filters, Cards, etc.)
    context/ (global store with cart/wishlist/search)
    data/ (static products)
    pages/ (Home, Products, ProductDetail, Cart, Wishlist, Login, Checkout)
    utils/ (helpers)
    main.jsx, App.jsx, index.css
```

---

**Made with ❤️ using React + Vite + Tailwind.**
