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
import PropertyCard from "../../components/PropertyCard"; // correct relative path from pages/user to components

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
        console.log("Fetching properties from:", API.defaults.baseURL + "/properties");
        const res = await API.get("/properties");
        console.log("API response:", res);
        console.log("Fetched properties count:", res.data.length);
        if (res.data.length > 0) {
          console.log("First property sample:", res.data[0]);
        }

        const transformed = res.data.map((p) => ({
          id: p._id,
          title: p.name || "Unnamed Property",
          price: p.monthlyRent ? `₹${p.monthlyRent.toLocaleString("en-IN")}/mo` : "Price on request",
          // Combine locality and city for location display
          location: [p.locality, p.city].filter(Boolean).join(", ") || "Location not specified",
          city: p.city || "",
          bedrooms: parseInt(p.bhk) || 1,
          bathrooms: p.bathrooms || 1, // if backend provides bathrooms, use it; otherwise fallback
          area: p.area ? `${p.area} ${p.areaUnit || 'sqft'}` : "N/A",
          furnishing: p.furnishType || "Not specified",
          images: p.photos?.length > 0 ? p.photos : ["https://images.unsplash.com/photo-1613490493576-7fde63acd811"],
          description: p.description || "Discover a harmonious blend of modern luxury and timeless elegance...",
          propertyType: p.propertyType || "Residential",
          postedDate: p.createdAt ? new Date(p.createdAt).toDateString() : "Recently",
          status: p.status || "Under Review",
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
    const extractPrice = (price) => {
      if (!price) return 0;
      const numeric = parseInt(price.replace(/\D/g, ""));
      return isNaN(numeric) ? 0 : numeric;
    };

    if (filters.sortBy === "price-low") {
      filtered.sort((a, b) => extractPrice(a.price) - extractPrice(b.price));
    } else if (filters.sortBy === "price-high") {
      filtered.sort((a, b) => extractPrice(b.price) - extractPrice(a.price));
    } else if (filters.sortBy === "newest") {
      filtered.sort((a, b) => new Date(b.postedDate) - new Date(a.postedDate));
    }

    setDisplayProperties(filtered);
  }, [searchTerm, filters, allProperties]);

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
            <PropertyCard key={property.id} property={property} />
          ))}
        </div>
      )}
    </div>
  );
};

export default PropertyListings;