import React, { useState } from "react";
import { useStore } from "../context/StoreContext";
import { createOrder, verifyPayment } from "../services/paymentService";

const Checkout = () => {
  const { totals, clearCart, addToast } = useStore();
  const [loading, setLoading] = useState(false);

  const handlePayment = async () => {
    if (totals.subtotal <= 0) {
      addToast("Your cart is empty!");
      return;
    }

    try {
      setLoading(true);

      // 1️⃣ Create order on backend
      const order = await createOrder(totals.subtotal * 100);
      if (!order?.id) throw new Error("Failed to create Razorpay order");

      // 2️⃣ Razorpay options
      const options = {
        key: import.meta.env.VITE_RAZORPAY_KEY_ID,
        amount: order.amount,
        currency: order.currency,
        name: "ElexMart",
        description: "Complete your purchase securely",
        order_id: order.id,
        handler: async (response) => {
          const verifyRes = await verifyPayment(response);
          if (verifyRes.success) {
            clearCart();
            addToast("Payment Successful! Thank you for your order.");
          } else {
            addToast("Payment verification failed.");
          }
        },
        prefill: {
          name: "Guest User",
          email: "guest@example.com",
          contact: "9999999999",
        },
        notes: { store_name: "ElexMart" },
        theme: { color: "#2563eb" },
      };

      // 3️⃣ Load Razorpay script
      if (!window.Razorpay) {
        const script = document.createElement("script");
        script.src = "https://checkout.razorpay.com/v1/checkout.js";
        document.body.appendChild(script);
        await new Promise((resolve) => (script.onload = resolve));
      }

      // 4️⃣ Open Razorpay checkout
      const razor = new window.Razorpay(options);
      razor.open();
      razor.on("payment.failed", (response) => {
        addToast("Payment failed! Please try again.");
        console.error("Payment failed:", response.error);
      });
    } catch (error) {
      console.error("Payment error:", error);
      addToast("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-10 px-6">
      <div className="max-w-3xl mx-auto bg-white dark:bg-gray-800 shadow-xl rounded-2xl p-8">
        <h1 className="text-3xl font-semibold mb-6 text-gray-800 dark:text-white">
          Checkout
        </h1>

        {totals.items.length === 0 ? (
          <p className="text-gray-500 dark:text-gray-300">
            Your cart is empty.
          </p>
        ) : (
          <>
            <ul className="divide-y divide-gray-200 dark:divide-gray-700 mb-6">
              {totals.items.map((item) => (
                <li
                  key={item.id}
                  className="flex justify-between py-4 text-gray-700 dark:text-gray-300"
                >
                  <span>
                    {item.title} × {item.qty}
                  </span>
                  <span>₹{(item.price * item.qty).toFixed(2)}</span>
                </li>
              ))}
            </ul>

            <div className="flex justify-between items-center border-t pt-4 text-lg font-medium text-gray-900 dark:text-gray-100">
              <span>Total:</span>
              <span>₹{totals.subtotal.toFixed(2)}</span>
            </div>

            <button
              onClick={handlePayment}
              disabled={loading}
              className={`mt-6 w-full py-3 rounded-lg text-white font-semibold text-lg transition ${
                loading
                  ? "bg-blue-400 cursor-not-allowed"
                  : "bg-blue-600 hover:bg-blue-700"
              }`}
            >
              {loading ? "Processing..." : "Pay with Razorpay"}
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default Checkout;
