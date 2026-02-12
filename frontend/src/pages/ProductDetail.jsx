import { useParams } from 'react-router-dom'
import { useStore } from '../context/StoreContext'
import { currency, stars } from '../utils/format'
import Breadcrumbs from '../components/Breadcrumbs'
import { useMemo, useState } from 'react'

export default function ProductDetail() {
  const { id } = useParams()
  const { products, addToCart, addToWishlist, isInWishlist, reviews, submitReview } = useStore()
  const product = useMemo(() => products.find(p => String(p.id) === String(id)), [products, id])
  const [qty, setQty] = useState(1)
  const [rName, setRName] = useState('')
  const [rText, setRText] = useState('')
  const productReviews = reviews[id] || []

  if (!product) return <div className="container-responsive my-6">Product not found.</div>

  const onReview = (e) => {
    e.preventDefault()
    if (!rName || !rText) return
    submitReview(id, { name: rName, text: rText })
    setRName(''); setRText('')
  }

  return (
    <div className="container-responsive my-6">
      <Breadcrumbs items={[{ label: 'Products', href: '/products' }, { label: product.title }]} />
      <div className="grid md:grid-cols-2 gap-6">
        <div className="card p-4">
          <img src={product.image} alt={product.title} className="w-full h-80 object-cover rounded-xl" />
        </div>
        <div className="space-y-4">
          <h1 className="text-2xl font-bold">{product.title}</h1>
          <div className="text-sm text-gray-500">{product.brand} • {product.category}</div>
          <div className="text-lg">{stars(product.rating)} <span className="text-sm text-gray-500">({product.rating})</span></div>
          <div className="text-3xl font-black">{currency(product.price)}</div>
          <div className="text-sm text-gray-600 dark:text-gray-300">{product.description}</div>
          <div className="flex items-center gap-3">
            <input type="number" min="1" value={qty} onChange={e=>setQty(Math.max(1, Number(e.target.value)))} className="input w-24" />
            <button className="btn btn-primary" onClick={()=>addToCart(product, qty)}>Add to Cart</button>
            <button className={`btn btn-outline ${isInWishlist(product.id) ? 'text-brand border-brand' : ''}`} onClick={()=>addToWishlist(product.id)}>♥ Wishlist</button>
          </div>
          <div className="text-sm">
            {product.stock > 0 ? <span className="text-green-600">In stock • {product.stock} left</span> : <span className="text-red-600">Out of stock</span>}
          </div>
        </div>
      </div>

      <section className="mt-10 grid md:grid-cols-[2fr,1fr] gap-6">
        <div className="card p-4">
          <h2 className="font-semibold mb-3">Customer Reviews</h2>
          {productReviews.length === 0 ? <div className="text-sm text-gray-500">No reviews yet.</div> : (
            <ul className="space-y-3">
              {productReviews.map((r, idx) => (
                <li key={idx} className="border-b border-gray-100 dark:border-gray-800 pb-2">
                  <div className="text-sm font-medium">{r.name} <span className="text-xs text-gray-500">• {new Date(r.date).toLocaleString()}</span></div>
                  <div className="text-sm">{r.text}</div>
                </li>
              ))}
            </ul>
          )}
        </div>
        <form onSubmit={onReview} className="card p-4">
          <h3 className="font-semibold mb-3">Write a review</h3>
          <input className="input mb-2" placeholder="Your name" value={rName} onChange={e=>setRName(e.target.value)} />
          <textarea className="input h-28" placeholder="Share details of your experience" value={rText} onChange={e=>setRText(e.target.value)} />
          <button className="btn btn-primary mt-3">Submit Review</button>
        </form>
      </section>
    </div>
  )
}
