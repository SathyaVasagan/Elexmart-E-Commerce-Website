import { useEffect, useMemo, useState } from 'react'
import { useSearchParams } from 'react-router-dom'

export default function FiltersSidebar({ products, onFilter }) {
  const [params, setParams] = useSearchParams()
  const [category, setCategory] = useState(params.get('category') || '')
  const [brand, setBrand] = useState(params.get('brand') || '')
  const [minPrice, setMinPrice] = useState(Number(params.get('min') || 0))
  const [maxPrice, setMaxPrice] = useState(Number(params.get('max') || 100000))
  const [rating, setRating] = useState(Number(params.get('rating') || 0))
  const [inStock, setInStock] = useState(params.get('stock') === '1')

  const categories = useMemo(() => Array.from(new Set(products.map(p => p.category))), [products])
  const brands = useMemo(() => Array.from(new Set(products.map(p => p.brand))), [products])

  useEffect(() => {
    const next = {}
    if (category) next.category = category
    if (brand) next.brand = brand
    if (minPrice) next.min = String(minPrice)
    if (maxPrice !== 100000) next.max = String(maxPrice)
    if (rating) next.rating = String(rating)
    if (inStock) next.stock = '1'
    setParams(next, { replace: true })
    onFilter({ category, brand, minPrice, maxPrice, rating, inStock })
  }, [category, brand, minPrice, maxPrice, rating, inStock])

  return (
    <aside className="card p-4 sticky top-24 h-max">
      <div className="font-semibold mb-3">Filters</div>
      <div className="space-y-4 text-sm">
        <div>
          <div className="font-medium mb-1">Category</div>
          <select className="input" value={category} onChange={e=>setCategory(e.target.value)}>
            <option value="">All</option>
            {categories.map(c => <option key={c} value={c}>{c}</option>)}
          </select>
        </div>
        <div>
          <div className="font-medium mb-1">Brand</div>
          <select className="input" value={brand} onChange={e=>setBrand(e.target.value)}>
            <option value="">All</option>
            {brands.map(b => <option key={b} value={b}>{b}</option>)}
          </select>
        </div>
        <div>
          <div className="font-medium mb-1">Price (₹)</div>
          <div className="flex items-center gap-2">
            <input type="number" className="input" value={minPrice} onChange={e=>setMinPrice(Number(e.target.value||0))} placeholder="Min" />
            <input type="number" className="input" value={maxPrice} onChange={e=>setMaxPrice(Number(e.target.value||100000))} placeholder="Max" />
          </div>
        </div>
        <div>
          <div className="font-medium mb-1">Rating</div>
          <select className="input" value={rating} onChange={e=>setRating(Number(e.target.value))}>
            <option value="0">Any</option>
            <option value="4.5">4.5+</option>
            <option value="4">4+</option>
            <option value="3.5">3.5+</option>
          </select>
        </div>
        <div className="flex items-center gap-2">
          <input id="stock" type="checkbox" checked={inStock} onChange={e=>setInStock(e.target.checked)} />
          <label htmlFor="stock">In Stock only</label>
        </div>
        <button onClick={()=>{setCategory('');setBrand('');setMinPrice(0);setMaxPrice(100000);setRating(0);setInStock(false)}} className="btn btn-outline w-full">Clear</button>
      </div>
    </aside>
  )
}
