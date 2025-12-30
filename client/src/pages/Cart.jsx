import { useCart } from "../context/CartContext";
import api from "../services/api";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";

export default function Cart() {
  const { cart, removeFromCart, clearCart, totalAmount } = useCart();
  const navigate = useNavigate();

  const placeOrder = async () => {
    await api.post("/orders", {
      items: cart.map((i) => ({
        foodId: i._id,
        quantity: i.quantity,
      })),
      totalAmount,
    });

    clearCart();
    alert("Order placed successfully!");
    navigate("/orders");
  };

  return (
    <>
      <Navbar />
      <div className="p-10">
        <h1 className="text-3xl font-semibold mb-6">Your Cart</h1>

        {cart.length === 0 && (
          <p className="text-gray-500">
            Your cart is empty. Add some delicious food 😋
          </p>
        )}

        {cart.map((item) => (
          <div
            key={item._id}
            className="border rounded-lg p-4 mb-3 flex gap-4 items-center"
          >
            <img
              src={item.image}
              alt={item.name}
              className="w-20 h-20 object-cover rounded"
            />

            <div className="flex-1">
              <h2 className="font-semibold">{item.name}</h2>
              <p className="text-gray-600">
                ₹{item.price} × {item.quantity}
              </p>
            </div>

            <button
              className="text-red-600"
              onClick={() => removeFromCart(item._id)}
            >
              Remove
            </button>
          </div>
        ))}

        {cart.length > 0 && (
          <>
            <h2 className="text-xl mt-4">
              Total: <b>₹{totalAmount}</b>
            </h2>
            <button
              onClick={placeOrder}
              className="mt-4 bg-black text-white px-6 py-2 rounded"
            >
              Place Order
            </button>
          </>
        )}
      </div>
    </>
  );
}
