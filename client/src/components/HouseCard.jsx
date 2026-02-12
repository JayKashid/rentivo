import { Link } from "react-router-dom";

const HouseCard = ({ house }) => {
  return (
    <div className="border border-gray-200 rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow bg-white">
      <img src={house.image} alt={house.title} className="w-full h-48 object-cover" />
      <div className="p-4">
        <h2 className="font-semibold text-lg text-gray-800">{house.title}</h2>
        <p className="text-green-600 font-bold text-xl mt-2">₹{house.price}</p>
        <p className="text-gray-600 text-sm mt-1">{house.location}</p>
        <Link 
          to={`/house/${house.id}`} 
          className="inline-block mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
        >
          View Details
        </Link>
      </div>
    </div>
  );
};

export default HouseCard;
