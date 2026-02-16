import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { MapPin, Star, Bed, Bath, Square, Phone, Mail, ArrowLeft } from "lucide-react";
import API from "../services/api";
import { useNavigate } from "react-router-dom";

// Placeholder image – you can set this in an env variable
const PLACEHOLDER_IMAGE = "https://images.unsplash.com/photo-1613490493576-7fde63acd811";

const HouseDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [house, setHouse] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Form states for booking/contact
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [guests, setGuests] = useState(1);
  const [contactName, setContactName] = useState("");
  const [contactEmail, setContactEmail] = useState("");
  const [contactMessage, setContactMessage] = useState("");

  useEffect(() => {
    const fetchHouse = async () => {
      try {
        setLoading(true);
        const res = await API.get(`/properties/${id}`);
        setHouse(res.data);
      } catch (err) {
        console.error("Error fetching property:", err);
        setError(err.response?.data?.message || "Property not found or failed to load.");
      } finally {
        setLoading(false);
      }
    };
    fetchHouse();
  }, [id]);

  const handleBookingSubmit = (e) => {
    e.preventDefault();
    console.log("Booking request:", { checkIn, checkOut, guests, propertyId: id });
    alert("Booking request sent! (Demo)");
  };

  const handleContactSubmit = (e) => {
    e.preventDefault();
    console.log("Contact message:", { name: contactName, email: contactEmail, message: contactMessage, propertyId: id });
    alert("Message sent! (Demo)");
  };

  // Loading skeleton
  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="max-w-6xl mx-auto px-4">
          <div className="animate-pulse">
            <div className="h-6 w-24 bg-gray-300 rounded mb-4"></div>
            <div className="w-full h-96 bg-gray-300 rounded-2xl"></div>
            <div className="mt-8 space-y-4">
              <div className="h-10 w-3/4 bg-gray-300 rounded"></div>
              <div className="h-6 w-1/2 bg-gray-300 rounded"></div>
              <div className="h-8 w-1/3 bg-gray-300 rounded"></div>
              <div className="grid grid-cols-3 gap-4">
                <div className="h-6 bg-gray-300 rounded"></div>
                <div className="h-6 bg-gray-300 rounded"></div>
                <div className="h-6 bg-gray-300 rounded"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error || !house) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Oops!</h2>
          <p className="text-gray-600">{error || "Property not found"}</p>
          <button
            onClick={() => navigate(-1)}
            className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
          >
            Go Back
          </button>
        </div>
      </div>
    );
  }

  // Extract data with fallbacks
  const images = house.photos?.length > 0 ? house.photos : [PLACEHOLDER_IMAGE];
  const location = [house.locality, house.city].filter(Boolean).join(", ") || "Location not specified";
  const price = house.monthlyRent ? `₹${house.monthlyRent.toLocaleString("en-IN")}` : "Price on request";
  const rating = 5.0; // Could come from backend
  const bedrooms = house.bhk || 1;
  // Try to get bathrooms from house.bathrooms if exists, else estimate
  const bathrooms = house.bathrooms || Math.max(1, Math.floor(bedrooms * 0.8));
  const area = house.area ? `${house.area} ${house.areaUnit || "sqft"}` : "N/A";
  const description = house.description || "Discover a harmonious blend of modern luxury and timeless elegance. Nestled in the heart of this area, our newest residency offers a sanctuary where every detail is meticulously crafted to elevate your lifestyle.";
  const amenities = house.amenities || ["Parking", "Wifi", "Backyard", "Terrace"];
  const propertyType = house.propertyType || "House";
  const agentName = house.agentName || "Prime Solutions Agency Office";
  const agentPhone = house.agentPhone || "0123456789";
  const agentEmail = house.agentEmail || "contact@primesolutions.com";

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-6xl mx-auto px-4">
        {/* Back button */}
        <button
          onClick={() => navigate(-1)}
          className="mb-4 flex items-center gap-2 text-gray-600 hover:text-gray-900 transition"
        >
          <ArrowLeft size={20} />
          <span>Back</span>
        </button>

        {/* Main image */}
        <div className="relative">
          <img
            src={images[0]}
            alt={house.name}
            className="w-full h-96 object-cover rounded-2xl shadow-lg"
            onError={(e) => {
              e.target.src = PLACEHOLDER_IMAGE;
            }}
          />
          {images.length > 1 && (
            <div className="absolute bottom-4 right-4 bg-black/60 text-white px-3 py-1 rounded-full text-sm">
              +{images.length - 1} more
            </div>
          )}
        </div>

        {/* Property details */}
        <div className="mt-8">
          <div className="flex flex-wrap items-start justify-between gap-4">
            <div>
              <h1 className="text-3xl md:text-4xl font-bold text-gray-900">{house.name || "Unnamed Property"}</h1>
              <p className="text-gray-600 flex items-center gap-1 mt-2">
                <MapPin size={18} className="flex-shrink-0" />
                <span>{location}</span>
              </p>
            </div>
            <div className="flex items-center gap-1 bg-green-100 text-green-800 px-4 py-2 rounded-full">
              <Star size={20} className="fill-current text-yellow-500" />
              <span className="font-semibold text-lg">{rating}</span>
              <span className="text-sm">(5.0)</span>
            </div>
          </div>

          {/* Price and type */}
          <div className="flex flex-wrap items-center gap-4 mt-4">
            <div>
              <span className="text-2xl font-bold text-blue-600">{price}</span>
              {house.monthlyRent && <span className="text-gray-500 text-sm ml-1">/month</span>}
            </div>
            <span className="px-3 py-1 bg-gray-200 text-gray-700 rounded-full text-sm">{propertyType}</span>
          </div>

          {/* Property stats */}
          <div className="flex flex-wrap gap-6 mt-6 text-gray-700">
            <div className="flex items-center gap-2">
              <Bed size={20} className="text-blue-600" />
              <span>{bedrooms} {bedrooms === 1 ? "Bed" : "Beds"}</span>
            </div>
            <div className="flex items-center gap-2">
              <Bath size={20} className="text-blue-600" />
              <span>{bathrooms} {bathrooms === 1 ? "Bath" : "Baths"}</span>
            </div>
            <div className="flex items-center gap-2">
              <Square size={20} className="text-blue-600" />
              <span>{area}</span>
            </div>
          </div>

          {/* Description */}
          <div className="mt-8">
            <h2 className="text-xl font-semibold text-gray-900 mb-3">Property Details</h2>
            <p className="text-gray-700 leading-relaxed whitespace-pre-line">{description}</p>
          </div>

          {/* Amenities */}
          <div className="mt-8">
            <h2 className="text-xl font-semibold text-gray-900 mb-3">Amenities</h2>
            <div className="flex flex-wrap gap-2">
              {amenities.map((item, index) => (
                <span
                  key={index}
                  className="bg-gray-100 text-gray-700 px-4 py-2 rounded-full text-sm"
                >
                  {item}
                </span>
              ))}
            </div>
          </div>

          {/* Booking and contact section */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-12">
            {/* Left column: Check-in/out, guests, contact form */}
            <div>
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Check availability</h2>
              <form onSubmit={handleBookingSubmit} className="space-y-4">
                <div>
                  <label htmlFor="checkIn" className="block text-sm font-medium text-gray-700 mb-1">
                    Check in
                  </label>
                  <input
                    id="checkIn"
                    type="date"
                    value={checkIn}
                    onChange={(e) => setCheckIn(e.target.value)}
                    min={new Date().toISOString().split("T")[0]}
                    required
                    className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                  />
                </div>
                <div>
                  <label htmlFor="checkOut" className="block text-sm font-medium text-gray-700 mb-1">
                    Check out
                  </label>
                  <input
                    id="checkOut"
                    type="date"
                    value={checkOut}
                    onChange={(e) => setCheckOut(e.target.value)}
                    min={checkIn || new Date().toISOString().split("T")[0]}
                    required
                    className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                  />
                </div>
                <div>
                  <label htmlFor="guests" className="block text-sm font-medium text-gray-700 mb-1">
                    Guests
                  </label>
                  <input
                    id="guests"
                    type="number"
                    min="1"
                    value={guests}
                    onChange={(e) => setGuests(parseInt(e.target.value))}
                    required
                    className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                  />
                </div>
                <button
                  type="submit"
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-lg transition"
                >
                  Check Availability
                </button>
              </form>

              <h2 className="text-xl font-semibold text-gray-900 mt-8 mb-4">Contact Agent</h2>
              <form onSubmit={handleContactSubmit} className="space-y-4">
                <input
                  type="text"
                  placeholder="Your Name"
                  value={contactName}
                  onChange={(e) => setContactName(e.target.value)}
                  required
                  className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                />
                <input
                  type="email"
                  placeholder="Your Email"
                  value={contactEmail}
                  onChange={(e) => setContactEmail(e.target.value)}
                  required
                  className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                />
                <textarea
                  placeholder="Your Message"
                  rows="4"
                  value={contactMessage}
                  onChange={(e) => setContactMessage(e.target.value)}
                  required
                  className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                ></textarea>
                <button
                  type="submit"
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-lg transition"
                >
                  Send Message
                </button>
              </form>
            </div>

            {/* Right column: Agent info */}
            <div>
              <h2 className="text-xl font-semibold text-gray-900 mb-4">For Buying Contact</h2>
              <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
                <h3 className="font-bold text-lg text-gray-900">{agentName}</h3>
                <div className="mt-4 space-y-3">
                  <div className="flex items-center gap-3 text-gray-700">
                    <Phone size={18} className="text-gray-500 flex-shrink-0" />
                    <span>{agentPhone}</span>
                  </div>
                  <div className="flex items-center gap-3 text-gray-700">
                    <Mail size={18} className="text-gray-500 flex-shrink-0" />
                    <span>{agentEmail}</span>
                  </div>
                </div>
                <div className="flex gap-3 mt-6">
                  <a
                    href={`mailto:${agentEmail}`}
                    className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded-lg text-center transition"
                  >
                    Send Email
                  </a>
                  <a
                    href={`tel:${agentPhone}`}
                    className="flex-1 bg-green-600 hover:bg-green-700 text-white font-semibold py-2 rounded-lg text-center transition"
                  >
                    Call Now
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HouseDetails;