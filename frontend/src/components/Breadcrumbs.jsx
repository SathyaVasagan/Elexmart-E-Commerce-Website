import { Link } from 'react-router-dom'

export default function Breadcrumbs({ items }) {
  return (
    <nav className="text-sm mb-4 text-gray-500">
      <ol className="flex items-center gap-2">
        <li><Link to="/" className="hover:underline">Home</Link></li>
        {items.map((it, idx) => (
          <li key={idx} className="flex items-center gap-2">
            <span>/</span>
            {it.href ? <Link to={it.href} className="hover:underline">{it.label}</Link> : <span className="text-gray-700 dark:text-gray-200">{it.label}</span>}
          </li>
        ))}
      </ol>
    </nav>
  )
}
