import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { MapPin, BedDouble, Bath, Maximize } from "lucide-react";

const PropertyDetails = () => {
  const { id } = useParams();
  const [property, setProperty] = useState(null);

  useEffect(() => {
    axios
      .get(`/api/properties/${id}`)
      .then((res) => setProperty(res.data))
      .catch((err) => console.log(err));
  }, [id]);

  if (!property) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-gray-500 text-lg">Loading property...</p>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto p-4 md:p-8">

      {/* Image Section */}
      <div className="rounded-2xl overflow-hidden shadow-lg">
        <img
          src={property.image}
          alt={property.title}
          className="w-full h-[400px] object-cover"
        />
      </div>

      {/* Content Section */}
      <div className="mt-6 grid md:grid-cols-3 gap-8">

        {/* Left Content */}
        <div className="md:col-span-2 space-y-6">

          {/* Title & Location */}
          <div>
            <h1 className="text-3xl font-bold text-gray-800">
              {property.title}
            </h1>
            <div className="flex items-center text-gray-500 mt-2">
              <MapPin size={18} className="mr-1" />
              {property.location}
            </div>
          </div>

          {/* Features */}
          <div className="flex gap-6 text-gray-700 border-y py-4">
            <div className="flex items-center gap-2">
              <BedDouble size={18} />
              {property.beds} Bedrooms
            </div>

            <div className="flex items-center gap-2">
              <Bath size={18} />
              {property.baths} Bathrooms
            </div>

            <div className="flex items-center gap-2">
              <Maximize size={18} />
              {property.area} sqft
            </div>
          </div>

          {/* Description */}
          <div>
            <h2 className="text-xl font-semibold mb-2">
              Description
            </h2>
            <p className="text-gray-600 leading-relaxed">
              {property.description}
            </p>
          </div>
        </div>

        {/* Right Side Price Card */}
        <div className="bg-white shadow-xl rounded-2xl p-6 h-fit sticky top-24">
          <h2 className="text-2xl font-bold text-blue-600">
            ₹ {property.price}
          </h2>

          <button className="mt-6 w-full bg-blue-600 text-white py-3 rounded-xl font-semibold hover:bg-blue-700 transition">
            Contact Owner
          </button>

          <button className="mt-3 w-full border border-blue-600 text-blue-600 py-3 rounded-xl font-semibold hover:bg-blue-50 transition">
            Schedule Visit
          </button>
        </div>
      </div>
    </div>
  );
};

export default CardDetails;
