import { Link } from 'react-router-dom'

export default function NotFound() {
  return (
    <div className="container-responsive my-24 text-center">
      <h1 className="text-3xl font-black">404</h1>
      <p className="text-gray-600 dark:text-gray-300">Page not found</p>
      <Link to="/" className="btn btn-primary mt-4">Go Home</Link>
    </div>
  )
}
