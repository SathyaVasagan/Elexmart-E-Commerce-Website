import { Link } from 'react-router-dom'
import { useStore } from '../context/StoreContext'
import { currency, stars } from '../utils/format'

export default function ProductCard({ product }) {
  const { addToCart, addToWishlist, isInWishlist } = useStore()

  return (
    <div className="card overflow-hidden group">
      <Link to={`/product/${product.id}`} className="block">
        <img src={product.image} alt={product.title} className="w-full h-48 object-cover transition group-hover:scale-[1.02]" />
      </Link>
      <div className="p-4 space-y-2">
        <Link to={`/product/${product.id}`} className="block font-semibold leading-tight">
          {product.title}
        </Link>
        <div className="text-xs text-gray-500">{product.brand} • {product.category}</div>
        <div className="flex items-center justify-between">
          <div className="font-bold">{currency(product.price)}</div>
          <div className="text-xs">{stars(product.rating)}</div>
        </div>
        <div className="flex gap-2 pt-2">
          <button onClick={() => addToCart(product, 1)} className="btn btn-primary flex-1">Add to Cart</button>
          <button onClick={() => addToWishlist(product.id)} className={`btn btn-outline ${isInWishlist(product.id) ? 'text-brand border-brand' : ''}`}>
            ♥
          </button>
        </div>
      </div>
    </div>
  )
}
