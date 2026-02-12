import { useEffect, useState } from 'react'

const news = [
  { id: 1, title: 'Festival Sale: Up to 50% off on Audio gear', href: '/products?search=audio' },
  { id: 2, title: 'New NovaBook 16 launched — preorders live', href: '/product/18' },
  { id: 3, title: 'Exchange Bonus on PixelPro phones', href: '/products?search=pixelpro' },
  { id: 4, title: 'Extended warranty for TVs — get 2 years extra', href: '/products?search=tv' },
]

export default function NewsTicker() {
  const [index, setIndex] = useState(0)
  useEffect(() => {
    const id = setInterval(() => setIndex(i => (i + 1) % news.length), 3000)
    return () => clearInterval(id)
  }, [])
  return (
    <div className="card p-4 flex items-center justify-between">
      <div className="font-semibold">Latest:</div>
      <a className="text-brand hover:underline text-sm md:text-base" href={news[index].href}>{news[index].title}</a>
    </div>
  )
}
