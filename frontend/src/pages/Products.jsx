import { useEffect, useMemo, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { useStore } from '../context/StoreContext'
import FiltersSidebar from '../components/FiltersSidebar'
import ProductCard from '../components/ProductCard'
import { sortByQuery } from '../utils/search'

export default function Products() {
  const { products } = useStore()
  const [params] = useSearchParams()
  const search = params.get('search') || ''
  const [filters, setFilters] = useState({})

  const filtered = useMemo(() => {
    let list = products.filter(p => {
      const matchCategory = !filters.category || p.category === filters.category
      const matchBrand = !filters.brand || p.brand === filters.brand
      const matchMin = p.price >= (filters.minPrice ?? 0)
      const matchMax = p.price <= (filters.maxPrice ?? Infinity)
      const matchRating = p.rating >= (filters.rating ?? 0)
      const matchStock = !filters.inStock || p.stock > 0
      return matchCategory && matchBrand && matchMin && matchMax && matchRating && matchStock
    })
    // Sort by search relevance if query present
    list = sortByQuery(list, search)
    return list
  }, [products, filters, search])

  return (
    <div className="container-responsive my-6 grid grid-cols-1 md:grid-cols-[260px,1fr] gap-6">
      <FiltersSidebar products={products} onFilter={setFilters} />
      <section>
        <div className="flex items-center justify-between mb-3">
          <h1 className="text-xl font-bold">Products</h1>
          {search && <div className="text-sm text-gray-500">Search: <span className="font-medium">{search}</span></div>}
        </div>
        {filtered.length === 0 ? (
          <div className="card p-6 text-center">No products match your filters.</div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {filtered.map(p => <ProductCard key={p.id} product={p} />)}
          </div>
        )}
      </section>
    </div>
  )
}
