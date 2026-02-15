import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import API from "../services/api";

const HouseDetails = () => {
  const { id } = useParams();
  const [house, setHouse] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchHouse = async () => {
      try {
        const res = await API.get(`/properties/${id}`);
        setHouse(res.data);
      } catch (err) {
        console.error("Error fetching property:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchHouse();
  }, [id]);

  if (loading) return <p className="text-center mt-10">Loading...</p>;
  if (!house) return <p className="text-center mt-10">Property not found</p>;

  return (
    <div className="p-6 max-w-2xl mx-auto">
      <h1 className="text-3xl font-bold mb-4">{house.name}</h1>

      <img
        src={house.photos?.[0] || "https://via.placeholder.com/500"}
        className="w-full h-96 object-cover rounded mt-4"
      />

      <div className="mt-6">
        <h2 className="text-2xl font-bold">
          {house.bhk} {house.propertyType}
        </h2>

        <p className="text-xl text-green-500 mt-2">
          ₹{house.monthlyRent}/month
        </p>

        <p className="text-gray-400 mt-2">
          {house.locality}, {house.city}
        </p>

        <p className="mt-4">
          Area: {house.area} {house.areaUnit}
        </p>
      </div>
    </div>
  );
};

export default HouseDetails;
