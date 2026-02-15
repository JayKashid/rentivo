import React, { useState, useEffect } from "react";
import {
  MapPin,
  Bed,
  Bath,
  Square,
  Phone,
  Filter,
} from "lucide-react";
import { useSearchParams } from "react-router-dom";
import API from "../../services/api";

const PropertyListings = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const [allProperties, setAllProperties] = useState([]);
  const [displayProperties, setDisplayProperties] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [showFilters, setShowFilters] = useState(false);
  const [fetchError, setFetchError] = useState(null);

  const [filters, setFilters] = useState({
    propertyType: "All",
    status: "All",
    category: "All",
    furnishing: "All",
    sortBy: "newest",
  });

  // ✅ Read search query from URL
  useEffect(() => {
    const querySearch = searchParams.get("search") || "";
    setSearchTerm(querySearch);
  }, [searchParams]);

  // ✅ Fetch properties from backend
  useEffect(() => {
    const fetchProperties = async () => {
      try {
        setIsLoading(true);
        setFetchError(null);
        console.log("Fetching properties from:", API.defaults.baseURL + "/properties"); // log full URL
        const res = await API.get("/properties");
        console.log("API response:", res);
        console.log("Fetched properties count:", res.data.length);
        if (res.data.length > 0) {
          console.log("First property sample:", res.data[0]);
        }

        const transformed = res.data.map((p) => ({
          id: p._id,
          title: p.name || "Unnamed Property",
          price: p.monthlyRent ? `₹${p.monthlyRent}` : "Price on request",
          location: p.locality || "Location not specified",
          city: p.city || "",
          bedrooms: parseInt(p.bhk) || 1,
          bathrooms: 1, // You might want to calculate this properly
          area: p.area ? `${p.area} ${p.areaUnit || 'sqft'}` : "N/A",
          furnishing: p.furnishType || "Not specified",
          images: p.photos?.length > 0 ? p.photos : ["https://images.unsplash.com/photo-1613490493576-7fde63acd811"],
          postedDate: p.createdAt ? new Date(p.createdAt).toDateString() : "Recently",
          status: p.status || "Under Review",
          propertyType: p.propertyType || "Residential",
        }));

        setAllProperties(transformed);
        setDisplayProperties(transformed);
      } catch (err) {
        console.error("❌ Error fetching properties:", err);
        setFetchError(err.message);
      } finally {
        setIsLoading(false);
      }
    };
    fetchProperties();
  }, []);

  // ✅ Filtering logic
  useEffect(() => {
    let filtered = [...allProperties];

    if (searchTerm.trim()) {
      const term = searchTerm.toLowerCase();
      filtered = filtered.filter(
        (p) =>
          p.city?.toLowerCase().includes(term) ||
          p.location?.toLowerCase().includes(term) ||
          p.title?.toLowerCase().includes(term)
      );
    }

    if (filters.propertyType !== "All") {
      filtered = filtered.filter((p) => p.propertyType === filters.propertyType);
    }
    if (filters.furnishing !== "All") {
      filtered = filtered.filter((p) =>
        p.furnishing?.toLowerCase().includes(filters.furnishing.toLowerCase())
      );
    }
    if (filters.status !== "All") {
      filtered = filtered.filter((p) => p.status === filters.status);
    }

    // Sorting
    if (filters.sortBy === "price-low") {
      filtered.sort((a, b) => extractPrice(a.price) - extractPrice(b.price));
    } else if (filters.sortBy === "price-high") {
      filtered.sort((a, b) => extractPrice(b.price) - extractPrice(a.price));
    } else if (filters.sortBy === "newest") {
      filtered.sort((a, b) => new Date(b.postedDate) - new Date(a.postedDate));
    }

    setDisplayProperties(filtered);
  }, [searchTerm, filters, allProperties]);

  const extractPrice = (price) => {
    if (!price) return 0;
    const numeric = parseInt(price.replace(/\D/g, ""));
    return isNaN(numeric) ? 0 : numeric;
  };

  const handleSearchChange = (e) => {
    const newTerm = e.target.value;
    setSearchTerm(newTerm);
    if (newTerm.trim()) {
      setSearchParams({ search: newTerm });
    } else {
      setSearchParams({});
    }
  };

  if (isLoading) {
    return (
      <div className="text-center py-20">
        <div className="inline-block animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-600 mb-4"></div>
        <div className="text-xl">Loading properties...</div>
      </div>
    );
  }

  if (fetchError) {
    return (
      <div className="text-center py-20 text-red-600">
        <p>Error loading properties: {fetchError}</p>
        <button
          onClick={() => window.location.reload()}
          className="mt-4 px-4 py-2 bg-blue-600 text-white rounded"
        >
          Retry
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      {/* Search input */}
      <div className="mb-6 flex gap-3">
        <input
          value={searchTerm}
          onChange={handleSearchChange}
          placeholder="Search by city, locality, name..."
          className="w-full border px-4 py-3 rounded-lg"
        />
        <button
          onClick={() => setShowFilters(!showFilters)}
          className="px-5 border rounded-lg flex items-center gap-2"
        >
          <Filter size={18} /> Filters
        </button>
      </div>

      {/* Show total count for debugging */}
      <div className="mb-4 text-sm text-gray-500">
        Total properties: {allProperties.length} | Showing: {displayProperties.length}
      </div>

      {/* Results grid */}
      {displayProperties.length === 0 ? (
        <div className="text-center py-20 text-gray-600">
          <p>No properties found</p>
          {allProperties.length === 0 && (
            <p className="text-sm mt-2">No properties in database. Try adding one first.</p>
          )}
          {allProperties.length > 0 && searchTerm && (
            <p className="text-sm mt-2">No matches for "{searchTerm}". Try a different search.</p>
          )}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {displayProperties.map((property) => (
            <div key={property.id} className="bg-white border rounded-xl overflow-hidden shadow hover:shadow-lg transition">
              <img
                src={property.images[0]}
                className="h-56 w-full object-cover"
                alt={property.title}
                onError={(e) => {
                  e.target.src = "https://images.unsplash.com/photo-1613490493576-7fde63acd811";
                }}
              />
              <div className="p-4">
                <h3 className="font-bold text-lg">{property.title}</h3>
                <p className="text-gray-500 flex items-center gap-1 mt-1">
                  <MapPin size={14} /> {property.location}, {property.city}
                </p>
                <p className="text-blue-600 text-xl font-bold mt-2">{property.price}</p>
                <div className="grid grid-cols-3 gap-3 text-sm mt-4 text-gray-700">
                  <div className="flex items-center gap-1"><Bed size={16} /> {property.bedrooms}</div>
                  <div className="flex items-center gap-1"><Bath size={16} /> {property.bathrooms}</div>
                  <div className="flex items-center gap-1"><Square size={16} /> {property.area}</div>
                </div>
                <button className="mt-4 w-full bg-blue-600 text-white py-2 rounded-lg flex justify-center items-center gap-2">
                  <Phone size={16} /> Contact Owner
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default PropertyListings;