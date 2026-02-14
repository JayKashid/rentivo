import { useNavigate } from "react-router-dom";
import { MapPin, BedDouble, Bath, Maximize } from "lucide-react";

const PropertyCard = ({ property }) => {
  const navigate = useNavigate();

  return (
    <div
      onClick={() => navigate(`/property/${property._id}`)}
      className="bg-white rounded-2xl shadow-md hover:shadow-xl transition duration-300 cursor-pointer overflow-hidden"
    >
      {/* Image Section */}
      <div className="relative">
        <img
          src={property.image}
          alt={property.title}
          className="w-full h-56 object-cover"
        />

        {/* Price Badge */}
        <div className="absolute top-3 left-3 bg-blue-600 text-white px-3 py-1 rounded-lg text-sm font-semibold shadow">
          ₹ {property.price}
        </div>
      </div>

      {/* Content Section */}
      <div className="p-4 space-y-3">
        {/* Title */}
        <h3 className="text-lg font-semibold text-gray-800 truncate">
          {property.title}
        </h3>

        {/* Location */}
        <div className="flex items-center text-gray-500 text-sm">
          <MapPin size={16} className="mr-1" />
          {property.location}
        </div>

        {/* Features */}
        <div className="flex justify-between text-gray-600 text-sm pt-2 border-t">
          <div className="flex items-center gap-1">
            <BedDouble size={16} />
            {property.beds} Beds
          </div>

          <div className="flex items-center gap-1">
            <Bath size={16} />
            {property.baths} Baths
          </div>

          <div className="flex items-center gap-1">
            <Maximize size={16} />
            {property.area} sqft
          </div>
        </div>
      </div>
    </div>
  );
};

export default PropertyCard;
