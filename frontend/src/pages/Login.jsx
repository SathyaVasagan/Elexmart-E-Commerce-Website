import { useState } from "react";
import { loginUser, OAUTH_GOOGLE_URL, OAUTH_GITHUB_URL } from "../api";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [msg, setMsg] = useState("");
  const [loading, setLoading] = useState(false);

  const submit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMsg("");
    try {
      const res = await loginUser({ email, password });
      if (res?.token) {
        localStorage.setItem("elexmart_token", res.token);
        setMsg("✅ Logged in successfully!");
        // redirect after login
        setTimeout(() => {
          window.location.href = "/";
        }, 1000);
      } else {
        setMsg("Unexpected response. Please try again.");
      }
    } catch (err) {
      setMsg(err?.error || "❌ Login failed. Check your credentials.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto px-4 my-12 flex justify-center">
      <div className="bg-white shadow-lg rounded-2xl p-8 w-full max-w-md">
        <h1 className="text-2xl font-bold text-center text-gray-800 mb-6">
          <span className="text-blue-600">Login to Elexmart</span>
        </h1>

        <form onSubmit={submit} className="space-y-4">
          <div>
            <label className="block text-gray-700 text-sm font-semibold mb-2">
              Email
            </label>
            <input
              type="email"
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              style={{ backgroundColor: "#f9fafb", color: "#000000ff" }}
              required
            />
          </div>

          <div>
            <label className="block text-gray-700 text-sm font-semibold mb-2">
              Password
            </label>
            <input
              type="password"
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              style={{ backgroundColor: "#f9fafb", color: "#000000ff" }}
              required
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 text-white font-semibold py-2 rounded-lg hover:bg-blue-700 transition disabled:opacity-50"
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>

        {msg && (
          <p className="text-center mt-4 text-sm font-medium text-gray-700">
            {msg}
          </p>
        )}

        <div className="mt-6 text-center">
          <div className="text-gray-500 text-sm mb-3">Or sign in with</div>
          <div className="flex justify-center gap-3">
            <a
              href={OAUTH_GOOGLE_URL}
              className="border border-gray-300 rounded-lg px-4 py-2 hover:bg-gray-100 transition"
            >
              Google
            </a>
          </div>
        </div>

        <p className="text-center text-gray-600 text-sm mt-6">
          Don’t have an account?{" "}
          <a href="/register" className="text-blue-600 hover:underline">
            Register
          </a>
        </p>
      </div>
    </div>
  );
}
