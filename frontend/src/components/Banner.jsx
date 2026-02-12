import { useNavigate } from 'react-router-dom'
import { useStore } from '../context/StoreContext'
import { useState } from 'react'

export default function Banner() {
  const navigate = useNavigate()
  const { setSearchQuery } = useStore()
  const [term, setTerm] = useState('')

  const onSubmit = (e) => {
    e.preventDefault()
    setSearchQuery(term)
    navigate(`/products?search=${encodeURIComponent(term)}`)
  }

  return (
    <div className="relative h-[300px] md:h-[380px] bg-gradient-to-r from-brand to-brand-light rounded-2xl overflow-hidden shadow-soft">
      <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?q=80&w=2000&auto=format&fit=crop')] bg-cover bg-center opacity-5"></div>
      <div className="relative z-10 h-full flex flex-col items-center justify-center text-center p-8">
        <h1 className="text-3xl md:text-5xl font-black text-white drop-shadow">ElexMart</h1>
        <p className="mt-3 text-white/100 max-w-2xl">Find the latest electronics at great prices. Phones, laptops, audio and more.</p>
        <form onSubmit={onSubmit} className="mt-8 w-full max-w-xl mx-auto">
          <div className="relative">
            <input
              value={term}
              onChange={(e)=>setTerm(e.target.value)}
              className="input pl-10 pr-3 h-10"
              placeholder="Search electronics..."
            />
            <button className="btn m-1 bg-gray-600 hover:bg-gray-800 text-white">Search</button>
          </div>
        </form>
      </div>
    </div>
  )
}
