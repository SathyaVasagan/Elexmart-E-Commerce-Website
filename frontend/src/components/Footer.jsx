import { useState } from 'react'
import { submitNewsletter } from '../api'

export default function Footer() {
  const [email, setEmail] = useState('')
  const [msg, setMsg] = useState('')

  const onSubmit = async (e) => {
    e.preventDefault()
    const res = await submitNewsletter(email)
    if (res?.ok) {
      setMsg('Subscribed! Check your inbox for confirmation.')
      setEmail('')
    } else setMsg('Something went wrong.')
  }

  return (
    <footer className="mt-12 border-t border-gray-100 dark:border-gray-800 bg-white dark:bg-gray-950">
      <div className="container-responsive py-10 grid md:grid-cols-3 gap-8 text-sm">
        <div>
          <div className="text-xl font-bold text-brand mb-3">ElexMart</div>
          <p className="text-gray-600 dark:text-gray-300">
            Your trusted destination for electronics — from phones to PCs, audio gear and more.
          </p>
          <p className="mt-3 text-gray-500">Similar to other shopping sites like Flipkart, Amazon, and Croma.</p>
        </div>
        <div>
          <div className="font-semibold mb-3">Quick Links</div>
          <ul className="space-y-2 text-gray-600 dark:text-gray-300">
            <li>Shipping & Returns</li>
            <li>Warranty & Support</li>
            <li>Careers</li>
            <li>Contact Us</li>
          </ul>
        </div>
        <div>
          <div className="font-semibold mb-3">Subscribe to news</div>
          <form onSubmit={onSubmit} className="flex gap-2">
            <input className="input" type="email" required placeholder="you@example.com" value={email} onChange={e=>setEmail(e.target.value)} />
            <button className="btn btn-primary">Subscribe</button>
          </form>
          {msg && <div className="text-green-600 dark:text-green-400 mt-2">{msg}</div>}
          <p className="text-xs text-gray-500 mt-3">Get product launches, deal alerts, and tech tips.</p>
        </div>
      </div>
      <div className="border-t border-gray-100 dark:border-gray-800 py-4 text-center text-xs text-gray-500">
        © {new Date().getFullYear()} ElexMart. All rights reserved.
      </div>
    </footer>
  )
}
