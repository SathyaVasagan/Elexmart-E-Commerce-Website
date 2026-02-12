import { useStore } from '../context/StoreContext'

export default function Toasts() {
  const { toasts } = useStore()
  return (
    <div className="fixed bottom-4 left-1/2 -translate-x-1/2 z-50 space-y-2">
      {toasts.map(t => (
        <div key={t.id} className="px-4 py-2 rounded-xl bg-black/80 text-white shadow-soft">
          {t.msg}
        </div>
      ))}
    </div>
  )
}
