import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useCart } from "../context/CartContext";

export default function Navbar() {
  const { logout } = useAuth();
  const { cart } = useCart();

  return (
    <nav className="flex justify-between items-center px-10 py-4 border-b bg-white">
      <Link to="/" className="text-2xl font-bold">
        Foodify 🍔
      </Link>

      <div className="flex items-center gap-6 text-sm font-medium">
        <Link to="/cart">Cart ({cart.length})</Link>
        <Link to="/orders">Orders</Link>
        <button onClick={logout} className="text-red-600">
          Logout
        </button>
      </div>
    </nav>
  );
}
