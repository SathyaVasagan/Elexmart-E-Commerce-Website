import { Link } from 'react-router-dom'
import { useStore } from '../context/StoreContext'
import { currency } from '../utils/format'
import { useNavigate } from "react-router-dom";


export default function Cart() {
  const { totals, updateQty, removeFromCart, checkout } = useStore();
  const navigate = useNavigate();

  return (
    <div className="container-responsive my-6 grid md:grid-cols-[2fr,1fr] gap-6">
      <section className="card p-4">
        <h1 className="text-xl font-bold mb-3">Your Cart</h1>
        {totals.items.length === 0 ? (
          <div className="text-sm">
            No items.{" "}
            <Link to="/products" className="text-brand">
              Browse products
            </Link>
          </div>
        ) : (
          <ul className="divide-y divide-gray-100 dark:divide-gray-800">
            {totals.items.map((item) => (
              <li
                key={item.id}
                className="py-3 grid grid-cols-[80px,1fr,auto] gap-4 items-center"
              >
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-20 h-16 object-cover rounded-lg"
                />
                <div>
                  <div className="font-medium">{item.title}</div>
                  <div className="text-sm text-gray-500">
                    {currency(item.price)}
                  </div>
                  <div className="flex items-center gap-2 mt-2">
                    <input
                      type="number"
                      min="1"
                      className="input w-24"
                      value={item.qty}
                      onChange={(e) =>
                        updateQty(item.id, Number(e.target.value || 1))
                      }
                    />
                    <button
                      className="btn btn-outline"
                      onClick={() => removeFromCart(item.id)}
                    >
                      Remove
                    </button>
                  </div>
                </div>
                <div className="font-semibold">
                  {currency(item.price * item.qty)}
                </div>
              </li>
            ))}
          </ul>
        )}
      </section>
      <aside className="card p-4 h-max sticky top-24">
        <h2 className="font-semibold mb-3">Summary</h2>
        <div className="flex items-center justify-between">
          <div>Subtotal</div>
          <div className="font-medium">{currency(totals.subtotal)}</div>
        </div>
        <div className="text-xs text-gray-500 mt-1">
          Taxes and shipping calculated at checkout.
        </div>
        <button
          className="btn btn-primary w-full mt-4"
          onClick={() => navigate("/checkout")}
        >
          Proceed to Checkout
        </button>
        <Link
          to="/products"
          className="block text-center text-sm text-brand mt-2"
        >
          Continue shopping
        </Link>
      </aside>
    </div>
  );
}
