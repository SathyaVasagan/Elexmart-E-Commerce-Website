import { Link } from 'react-router-dom'
import { useStore } from '../context/StoreContext'
import { currency } from '../utils/format'

export default function Wishlist() {
  const { wishlist, products, removeFromWishlist, addToCart } = useStore()
  const items = products.filter(p => wishlist.includes(p.id))

  return (
    <div className="container-responsive my-6">
      <h1 className="text-xl font-bold mb-3">Wishlist</h1>
      {items.length === 0 ? (
        <div className="card p-4 text-sm">No saved items. <Link to="/products" className="text-brand">Browse products</Link></div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {items.map(p => (
            <div key={p.id} className="card p-4 space-y-2">
              <img src={p.image} alt={p.title} className="w-full h-40 object-cover rounded-lg" />
              <div className="font-medium">{p.title}</div>
              <div className="text-sm text-gray-500">{currency(p.price)}</div>
              <div className="flex gap-2">
                <button className="btn btn-primary flex-1" onClick={()=>addToCart(p,1)}>Add to Cart</button>
                <button className="btn btn-outline" onClick={()=>removeFromWishlist(p.id)}>Remove</button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
