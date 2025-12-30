import { useState } from "react";
import api from "../services/api";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Register() {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const submit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);

      // 1️⃣ Register user
      await api.post("/auth/register", form);

      // 2️⃣ Show success message
      setSuccess(true);

      // 3️⃣ Short delay for UX
      setTimeout(async () => {
        // 4️⃣ Auto-login
        await login(form.email, form.password);

        // 5️⃣ Redirect to home
        navigate("/", { replace: true });
      }, 1200);
    } catch (err) {
      alert(err.response?.data?.msg || "Registration failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={submit} className="p-10 max-w-md mx-auto">
      <h1 className="text-2xl mb-4 font-semibold">Register</h1>

      {success && (
        <div className="mb-4 p-3 bg-green-100 text-green-700 rounded">
          Registration successful! Redirecting to home…
        </div>
      )}

      <input
        className="border p-2 w-full mb-2"
        placeholder="Name"
        required
        disabled={loading || success}
        onChange={(e) => setForm({ ...form, name: e.target.value })}
      />

      <input
        className="border p-2 w-full mb-2"
        placeholder="Email"
        type="email"
        required
        disabled={loading || success}
        onChange={(e) => setForm({ ...form, email: e.target.value })}
      />

      <input
        className="border p-2 w-full mb-4"
        placeholder="Password"
        type="password"
        required
        disabled={loading || success}
        onChange={(e) => setForm({ ...form, password: e.target.value })}
      />

      <button
        disabled={loading || success}
        className="bg-black text-white p-2 w-full mb-3 disabled:opacity-50"
      >
        {loading ? "Registering..." : "Register"}
      </button>

      <p className="text-sm text-center">
        Already have an account?{" "}
        <Link to="/login" className="text-blue-600 underline">
          Login here
        </Link>
      </p>
    </form>
  );
}
