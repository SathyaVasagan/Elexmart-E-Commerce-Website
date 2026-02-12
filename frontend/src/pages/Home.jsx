import Banner from '../components/Banner'
import NewsTicker from '../components/NewsTicker'
import ProductCard from '../components/ProductCard'
import { useStore } from '../context/StoreContext'
import { Link } from 'react-router-dom'

export default function Home() {
  const { products } = useStore()
  const featured = products.slice(0,8)
  const trending = products.slice(8,16)

  return (
    <div className="container-responsive my-6 space-y-8">
      <Banner />
      <NewsTicker />

      <section>
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-xl font-bold">Featured</h2>
          <Link to="/products" className="text-brand text-sm hover:underline">View all</Link>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {featured.map(p => <ProductCard key={p.id} product={p} />)}
        </div>
      </section>

      <section>
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-xl font-bold">Trending</h2>
          <Link to="/products" className="text-brand text-sm hover:underline">View all</Link>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {trending.map(p => <ProductCard key={p.id} product={p} />)}
        </div>
      </section>
    </div>
  )
}
