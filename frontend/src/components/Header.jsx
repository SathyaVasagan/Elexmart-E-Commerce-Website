import { Link, useNavigate, useLocation } from 'react-router-dom'
import { useStore } from '../context/StoreContext'
import { useState } from 'react'

export default function Header() {
  const { cart, wishlist, setSearchQuery, theme, setTheme } = useStore()
  const [term, setTerm] = useState('')
  const navigate = useNavigate()
  const location = useLocation()

  const submit = (e) => {
    e.preventDefault()
    setSearchQuery(term)
    navigate(`/products?search=${encodeURIComponent(term)}`)
  }

  const navActive = (path) => (location.pathname === path ? 'text-brand' : 'text-gray-700 dark:text-gray-200')

  return (
    <header className="border-b border-gray-100 dark:border-gray-800 bg-white/70 dark:bg-gray-950/70 sticky top-0 backdrop-blur z-40">
      <div className="container-responsive flex items-center gap-4 py-3">
        {/* Left: Logo + Nav */}
        <div className="flex items-center gap-6">
          <Link to="/" className="text-xl font-bold text-brand">ElexMart</Link>
          <nav className="hidden md:flex items-center gap-4 text-sm font-medium">
            <Link to="/" className={navActive('/')}>Home</Link>
            <Link to="/products" className={navActive('/products')}>Products</Link>
          </nav>
        </div>

        {/* Right: Search + Actions */}
        <div className="ml-auto flex items-center gap-3 w-full md:w-auto">
          <form onSubmit={submit} className="flex-1 md:flex-initial relative">
            <input
              value={term}
              onChange={(e)=>setTerm(e.target.value)}
              className="input pl-10 pr-3 h-10"
              placeholder="Search electronics..."
            />
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">🔎</span>
          </form>
          <div className="flex items-center gap-3 text-sm">
            <Link to="/wishlist" className="relative hover:text-brand">
              ❤️
              {wishlist.length > 0 && <span className="absolute -top-2 -right-2 badge bg-brand text-white border-none">{wishlist.length}</span>}
              <span className="sr-only">Wishlist</span>
            </Link>
            <Link to="/cart" className="relative hover:text-brand">
              🛒
              {cart.length > 0 && <span className="absolute -top-2 -right-2 badge bg-brand text-white border-none">{cart.length}</span>}
              <span className="sr-only">Cart</span>
            </Link>
            <Link to="/login" className="hover:text-brand">Login</Link>
            <button onClick={()=> setTheme(theme === 'dark' ? 'light' : 'dark')} className="btn btn-outline h-10">
              {theme === 'dark' ? '🌙' : '☀️'}
            </button>
          </div>
        </div>
      </div>
    </header>
  )
}
