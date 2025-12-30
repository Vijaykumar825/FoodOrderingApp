import { useEffect, useState } from "react";
import api from "../services/api";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";

export default function Home() {
  const [restaurants, setRestaurants] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    api.get("/restaurants").then((res) => setRestaurants(res.data));
  }, []);

  return (
    <>
      <Navbar />
      <div className="p-10">
        <h1 className="text-3xl font-semibold mb-6">Restaurants</h1>

        <div className="grid grid-cols-3 gap-6">
          {restaurants.map((r) => (
            <div
              key={r._id}
              onClick={() => navigate(`/restaurant/${r._id}`)}
              className="border rounded-lg p-5 cursor-pointer hover:shadow transition"
            >
              <h2 className="text-lg font-semibold">{r.name}</h2>
              <p className="text-gray-600">{r.cuisine}</p>
              <p className="text-sm text-green-600 mt-1">⭐ {r.rating}</p>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
