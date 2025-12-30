import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../services/api";
import { useCart } from "../context/CartContext";
import Navbar from "../components/Navbar";

export default function Restaurant() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const [foods, setFoods] = useState([]);

  useEffect(() => {
    api.get(`/foods/${id}`).then((res) => setFoods(res.data));
  }, [id]);

  return (
    <>
      <Navbar />
      <div className="p-10">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-semibold">Menu</h1>
          <button
            onClick={() => navigate("/cart")}
            className="bg-black text-white px-4 py-2 rounded"
          >
            Go to Cart
          </button>
        </div>

        {foods.length === 0 && (
          <p className="text-gray-500">No food items available.</p>
        )}

        <div className="grid grid-cols-3 gap-6">
          {foods.map((food) => (
            <div key={food._id} className="border rounded-lg p-5">
              <h2 className="font-semibold">{food.name}</h2>
              <p className="text-gray-700">₹{food.price}</p>
              <button
                className="mt-3 bg-black text-white px-3 py-1 rounded"
                onClick={() => addToCart(food)}
              >
                Add to Cart
              </button>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
