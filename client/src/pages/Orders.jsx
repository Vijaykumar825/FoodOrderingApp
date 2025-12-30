import { useEffect, useState } from "react";
import api from "../services/api";
import Navbar from "../components/Navbar";

export default function Orders() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    api.get("/orders").then((res) => setOrders(res.data));
  }, []);

  return (
    <>
      <Navbar />
      <div className="p-10">
        <h1 className="text-3xl font-semibold mb-6">My Orders</h1>

        {orders.length === 0 && (
          <p className="text-gray-500">
            No orders yet. Your hunger journey starts now 🍽️
          </p>
        )}

        {orders.map((o) => (
          <div key={o._id} className="border rounded-lg p-5 mb-4">
            <p className="font-semibold">Total: ₹{o.totalAmount}</p>
            <p className="text-gray-600">Status: {o.status}</p>
            <p className="text-sm text-gray-400">
              {new Date(o.createdAt).toLocaleString()}
            </p>
          </div>
        ))}
      </div>
    </>
  );
}
