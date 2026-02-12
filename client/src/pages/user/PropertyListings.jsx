// import React, { useState, useEffect } from 'react';
// import { MapPin, Bed, Bath, Square, Heart, Share2, Phone, Search, Filter, ChevronDown } from 'lucide-react';
// import { useSearchParams } from "react-router-dom";
// // import { useAppContext } from "../../context/AppContext";
// import API from "../../services/api";


// const PropertyListings = () => {
//   // const { properties: contextProperties, searchProperties } = useAppContext();
//   const [searchParams] = useSearchParams();
  
//   const [displayProperties, setDisplayProperties] = useState([]);
//   const [isLoading, setIsLoading] = useState(true);
//   const [searchTerm, setSearchTerm] = useState("");
//   const [showFilters, setShowFilters] = useState(false);                                    
//   const [filters, setFilters] = useState({
//     propertyType: 'All',
//     status: 'All',
//     category: 'All',
//     furnishing: 'All',
//     sortBy: 'newest'
//   });

//   // Get initial search parameters from URL
//   const searchQuery = searchParams.get("search") || "";
//   const activeTab = searchParams.get("type") || "All";

//   // Initialize search from URL
// useEffect(() => {
//   let filtered = [...displayProperties];

//   // 🔍 Search by city / locality / title
//   if (searchTerm.trim()) {
//     const term = searchTerm.toLowerCase();
//     filtered = filtered.filter(p =>
//       p.city?.toLowerCase().includes(term) ||
//       p.location?.toLowerCase().includes(term) ||
//       p.title?.toLowerCase().includes(term)
//     );
//   }

//   // 🏠 Property Type
//   if (filters.propertyType !== "All") {
//     filtered = filtered.filter(p =>
//       p.propertyType === filters.propertyType
//     );
//   }

//   // 🪑 Furnishing
//   if (filters.furnishing !== "All") {
//     filtered = filtered.filter(p =>
//       p.furnishing?.toLowerCase().includes(filters.furnishing.toLowerCase())
//     );
//   }

//   // 📌 Status
//   if (filters.status !== "All") {
//     filtered = filtered.filter(p => p.status === filters.status);
//   }

//   // 💰 Sorting
//   if (filters.sortBy === "price-low") {
//     filtered.sort((a, b) => extractPrice(a.price) - extractPrice(b.price));
//   }
//   if (filters.sortBy === "price-high") {
//     filtered.sort((a, b) => extractPrice(b.price) - extractPrice(a.price));
//   }

//   setDisplayProperties(filtered);
// }, [searchTerm, filters]);



//   // Search and filter properties
//   useEffect(() => {
//     setIsLoading(true);
    
//     // Use the searchProperties function from context
//     let filtered = searchProperties(searchTerm, {
//       category: filters.category !== 'All' ? filters.category : undefined,
//       propertyType: filters.propertyType !== 'All' ? filters.propertyType : undefined,
//       status: filters.status !== 'All' ? filters.status : undefined
//     });

//     // Apply additional filters
//     filtered = filtered.filter(property => {
//       // Filter by furnishing
//       if (filters.furnishing !== 'All') {
//         if (!property.furnishing) return false;
//         return property.furnishing.toLowerCase().includes(filters.furnishing.toLowerCase());
//       }
      
//       // Filter by isDeleted
//       return !property.isDeleted;
//     });

//     // Sort properties
//     filtered = sortProperties(filtered, filters.sortBy);

//     // Transform properties for display
//     const transformedProperties = filtered.map(property => {
//       // Extract bedrooms from type
//       const bedroomMatch = property.type?.match(/(\d+)\s*BHK/) || 
//                           property.type?.match(/(\d+)\s*BED/) || 
//                           property.type?.match(/(\d+)\s*BEDROOM/);
//       const bedrooms = bedroomMatch ? parseInt(bedroomMatch[1]) : 1;
      
//       // Extract bathrooms
//       const bathroomMatch = property.type?.match(/(\d+)\s*BATH/) || 
//                            property.description?.match(/(\d+)\s*BATH/);
//       const bathrooms = bathroomMatch ? parseInt(bathroomMatch[1]) : Math.max(1, bedrooms - 1);
      
//       // Extract area
//       const areaMatch = property.area?.match(/(\d+)/) || property.type?.match(/(\d+)\s*SQFT/);
//       const area = areaMatch ? `${areaMatch[1]} sqft` : (property.area || 'N/A');
      
//       return {
//         id: property.id,
//         title: property.type || 'Property',
//         type: property.type,
//         price: property.price || 'Price on request',
//         location: property.locality || property.location || property.city || 'Location not specified',
//         area: area,
//         bedrooms: bedrooms,
//         bathrooms: bathrooms,
//         furnishing: property.furnishing || 'Not specified',
//         images: property.images || property.photos || ['https://images.unsplash.com/photo-1613490493576-7fde63acd811'],
//         isVerified: property.verificationStatus === 'Verified',
//         isFeatured: property.visibility?.includes('High') || property.plan === 'Paid',
//         postedDate: property.lastAdded || property.createdAt || 'Recently',
//         category: property.category || 'Rent',
//         status: property.status || 'Under Review',
//         isActive: property.isActive || false,
//         propertyType: property.propertyType || 'Residential',
//         city: property.city,
//         description: property.description
//       };
//     });

//     setDisplayProperties(transformedProperties);
//     setIsLoading(false);
//   }, [contextProperties, searchTerm, filters, searchProperties]);

//   // Sort function
//   const sortProperties = (properties, sortBy) => {
//     const sorted = [...properties];
    
//     switch (sortBy) {
//       case 'price-low':
//         return sorted.sort((a, b) => {
//           const priceA = extractPrice(a.price);
//           const priceB = extractPrice(b.price);
//           return priceA - priceB;
//         });
      
//       case 'price-high':
//         return sorted.sort((a, b) => {
//           const priceA = extractPrice(a.price);
//           const priceB = extractPrice(b.price);
//           return priceB - priceA;
//         });
      
//       case 'newest':
//         return sorted.sort((a, b) => {
//           const dateA = new Date(a.createdAt || 0);
//           const dateB = new Date(b.createdAt || 0);
//           return dateB - dateA;
//         });
      
//       default:
//         return sorted;
//     }
//   };

//   // Helper function to extract price from string
//   const extractPrice = (priceString) => {
//     if (!priceString) return 0;
//     const match = priceString.match(/\d+/g);
//     return match ? parseInt(match.join('')) : 0;
//   };

//   // Handle search
//   const handleSearch = (e) => {
//     e.preventDefault();
//     // The search is already handled in useEffect via searchTerm state
//   };

//   // Handle filter changes
//   const handleFilterChange = (filterName, value) => {
//     setFilters(prev => ({
//       ...prev,
//       [filterName]: value
//     }));
//   };

//   // Clear all filters
//   const clearFilters = () => {
//     setFilters({
//       propertyType: 'All',
//       status: 'All',
//       category: 'All',
//       furnishing: 'All',
//       sortBy: 'newest'
//     });
//     setSearchTerm("");
//   };

//   // Show loading state
//   if (isLoading) {
//     return (
//       <div className="max-w-7xl mx-auto px-4 py-12">
//         <div className="text-center py-12">
//           <div className="inline-block animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-600 mb-4"></div>
//           <h3 className="text-xl font-semibold text-gray-700 mb-2">Loading properties...</h3>
//           <p className="text-gray-500">Fetching the latest listings...</p>
//         </div>
//       </div>
//     );
//   }

//   // Show no results state
//   if (displayProperties.length === 0) {
//     return (
//       <div className="max-w-7xl mx-auto px-4 py-12">
//         <div className="text-center py-12">
//           <div className="text-gray-400 mb-4">
//             <MapPin className="w-16 h-16 mx-auto mb-4" />
//           </div>
//           <h3 className="text-2xl font-bold text-gray-800 mb-3">
//             {searchTerm || filters.category !== 'All' ? "No matching properties found" : "No properties available"}
//           </h3>
//           <p className="text-gray-600 mb-8 max-w-md mx-auto">
//             {searchTerm 
//               ? `We couldn't find any properties matching "${searchTerm}". Try searching with different keywords.`
//               : "There are currently no properties listed. Check back later!"}
//           </p>
          
//           {searchTerm && (
//             <button
//               onClick={clearFilters}
//               className="px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors"
//             >
//               Clear Search & Show All Properties
//             </button>
//           )}
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="max-w-7xl mx-auto px-4 py-8">
//       {/* Search Bar */}
//       <div className="mb-8">
//         <form onSubmit={handleSearch} className="relative">
//           <div className="relative">
//             <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
//             <input
//               type="text"
//               value={searchTerm}
//               onChange={(e) => setSearchTerm(e.target.value)}
//               placeholder="Search properties by city, locality, project name..."
//               className="w-full pl-12 pr-40 py-4 rounded-xl border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-all duration-200 text-gray-800"
//             />
//             <div className="absolute right-2 top-1/2 transform -translate-y-1/2 flex gap-2">
//               <button
//                 type="button"
//                 onClick={() => setShowFilters(!showFilters)}
//                 className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 text-gray-700"
//               >
//                 <Filter className="w-4 h-4" />
//                 Filters
//                 <ChevronDown className="w-4 h-4" />
//               </button>
//               <button
//                 type="submit"
//                 className="px-6 py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-medium rounded-lg hover:shadow-lg transition-all duration-200"
//               >
//                 Search
//               </button>
//             </div>
//           </div>
//         </form>

//         {/* Filters Dropdown */}
//         {showFilters && (
//           <div className="mt-4 bg-white p-6 rounded-xl border border-gray-200 shadow-lg">
//             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
//               {/* Category */}
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
//                 <select
//                   value={filters.category}
//                   onChange={(e) => handleFilterChange('category', e.target.value)}
//                   className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
//                 >
//                   <option value="All">All Categories</option>
//                   <option value="Rent">For Rent</option>
//                   <option value="Buy">For Sale</option>
//                   <option value="Commercial">Commercial</option>
//                   <option value="PG">PG/Co-living</option>
//                 </select>
//               </div>

//               {/* Property Type */}
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-2">Property Type</label>
//                 <select
//                   value={filters.propertyType}
//                   onChange={(e) => handleFilterChange('propertyType', e.target.value)}
//                   className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
//                 >
//                   <option value="All">All Types</option>
//                   <option value="Residential">Residential</option>
//                   <option value="Commercial">Commercial</option>
//                   <option value="Plot">Plot/Land</option>
//                 </select>
//               </div>

//               {/* Furnishing */}
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-2">Furnishing</label>
//                 <select
//                   value={filters.furnishing}
//                   onChange={(e) => handleFilterChange('furnishing', e.target.value)}
//                   className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
//                 >
//                   <option value="All">Any Furnishing</option>
//                   <option value="Fully">Fully Furnished</option>
//                   <option value="Semi">Semi Furnished</option>
//                   <option value="Unfurnished">Unfurnished</option>
//                 </select>
//               </div>

//               {/* Status */}
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-2">Status</label>
//                 <select
//                   value={filters.status}
//                   onChange={(e) => handleFilterChange('status', e.target.value)}
//                   className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
//                 >
//                   <option value="All">All Status</option>
//                   <option value="Active">Active</option>
//                   <option value="Pending">Pending Review</option>
//                   <option value="Verified">Verified Only</option>
//                 </select>
//               </div>

//               {/* Sort By */}
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-2">Sort By</label>
//                 <select
//                   value={filters.sortBy}
//                   onChange={(e) => handleFilterChange('sortBy', e.target.value)}
//                   className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
//                 >
//                   <option value="newest">Newest First</option>
//                   <option value="price-low">Price: Low to High</option>
//                   <option value="price-high">Price: High to Low</option>
//                 </select>
//               </div>
//             </div>

//             <div className="flex justify-between items-center mt-6 pt-6 border-t border-gray-200">
//               <div className="text-sm text-gray-500">
//                 Showing {displayProperties.length} properties
//               </div>
//               <div className="flex gap-3">
//                 <button
//                   onClick={clearFilters}
//                   className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50"
//                 >
//                   Clear All
//                 </button>
//                 <button
//                   onClick={() => setShowFilters(false)}
//                   className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
//                 >
//                   Apply Filters
//                 </button>
//               </div>
//             </div>
//           </div>
//         )}
//       </div>

//       {/* Results Header */}
//       <div className="mb-8">
//         <div className="flex justify-between items-center">
//           <div>
//             <h2 className="text-2xl font-bold text-gray-800 mb-1">
//               {searchTerm 
//                 ? `Properties in "${searchTerm}"` 
//                 : filters.category !== 'All'
//                   ? `${filters.category} Properties`
//                   : "All Properties"}
//             </h2>
//             <p className="text-gray-600">
//               Found {displayProperties.length} matching properties
//             </p>
//           </div>
//           <div className="text-sm text-gray-500">
//             <span className="font-medium">{displayProperties.length}</span> total properties
//           </div>
//         </div>
//       </div>

//       {/* Property Grid */}
//       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//         {displayProperties.map((property) => (
//           <div key={property.id} className="bg-white rounded-xl shadow-sm border overflow-hidden hover:shadow-lg transition-shadow duration-300">
//             {/* Property Status Badge */}
//             <div className="absolute top-3 left-3 z-10">
//               <span className={`inline-block px-3 py-1 rounded-full text-xs font-semibold ${
//                 property.status === 'Active' || property.isActive 
//                   ? 'bg-green-100 text-green-800' 
//                   : property.status === 'Under Review' 
//                     ? 'bg-yellow-100 text-yellow-800'
//                     : 'bg-gray-100 text-gray-800'
//               }`}>
//                 {property.status}
//               </span>
//             </div>

//             {/* Image Section */}
//             <div className="relative h-56 overflow-hidden bg-gray-100">
//               <img
//                 src={property.images[0]}
//                 alt={property.title}
//                 className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
//                 onError={(e) => {
//                   e.target.src = 'https://images.unsplash.com/photo-1613490493576-7fde63acd811';
//                 }}
//               />
//               <div className="absolute top-3 right-3 flex gap-2">
//                 {property.isVerified && (
//                   <span className="bg-green-600 text-white text-xs px-3 py-1.5 rounded-full flex items-center gap-1">
//                     <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
//                       <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
//                     </svg>
//                     Verified
//                   </span>
//                 )}
//                 {property.isFeatured && (
//                   <span className="bg-blue-600 text-white text-xs px-3 py-1.5 rounded-full">
//                     Featured
//                   </span>
//                 )}
//               </div>
//               <button className="absolute top-3 right-12 w-8 h-8 bg-white/90 rounded-full flex items-center justify-center hover:bg-white shadow-sm">
//                 <Heart className="w-4 h-4 text-gray-700 hover:text-red-500" />
//               </button>
//             </div>

//             {/* Details Section */}
//             <div className="p-5">
//               <div className="flex justify-between items-start mb-3">
//                 <div className="flex-1">
//                   <h3 className="font-bold text-lg text-gray-800 mb-2 truncate">{property.title}</h3>
//                   <div className="flex items-center text-gray-600 text-sm mb-1">
//                     <MapPin className="w-4 h-4 mr-1 flex-shrink-0" />
//                     <span className="truncate">{property.location}</span>
//                   </div>
//                   {property.city && (
//                     <div className="text-xs text-gray-500 ml-5">{property.city}</div>
//                   )}
//                 </div>
//                 <div className="text-right ml-4">
//                   <div className="text-xl font-bold text-blue-600 mb-1">{property.price}</div>
//                   <div className="text-xs text-gray-500">
//                     {property.propertyType === 'Commercial' ? 'Commercial' : 'Residential'}
//                   </div>
//                 </div>
//               </div>

//               {/* Property Features */}
//               <div className="grid grid-cols-4 gap-3 py-4 border-y border-gray-100">
//                 <div className="text-center">
//                   <div className="flex items-center justify-center gap-1 mb-1">
//                     <Bed className="w-4 h-4 text-gray-600" />
//                     <span className="font-medium text-gray-800">{property.bedrooms}</span>
//                   </div>
//                   <span className="text-xs text-gray-500">Beds</span>
//                 </div>
//                 <div className="text-center">
//                   <div className="flex items-center justify-center gap-1 mb-1">
//                     <Bath className="w-4 h-4 text-gray-600" />
//                     <span className="font-medium text-gray-800">{property.bathrooms}</span>
//                   </div>
//                   <span className="text-xs text-gray-500">Baths</span>
//                 </div>
//                 <div className="text-center">
//                   <div className="flex items-center justify-center gap-1 mb-1">
//                     <Square className="w-4 h-4 text-gray-600" />
//                     <span className="font-medium text-gray-800">{property.area}</span>
//                   </div>
//                   <span className="text-xs text-gray-500">Area</span>
//                 </div>
//                 <div className="text-center">
//                   <div className="mb-1">
//                     <span className="font-medium text-gray-800 text-xs">{property.furnishing}</span>
//                   </div>
//                   <span className="text-xs text-gray-500">Furnishing</span>
//                 </div>
//               </div>

//               {/* Action Buttons */}
//               <div className="flex gap-3 mt-5">
//                 <button className="flex-1 bg-gradient-to-r from-blue-600 to-purple-600 text-white py-2.5 rounded-lg font-medium hover:from-blue-700 hover:to-purple-700 transition-all duration-200 flex items-center justify-center gap-2 shadow-sm hover:shadow">
//                   <Phone className="w-4 h-4" />
//                   Contact Owner
//                 </button>
//                 <button className="w-12 border border-gray-300 rounded-lg flex items-center justify-center hover:bg-gray-50">
//                   <Share2 className="w-4 h-4 text-gray-600" />
//                 </button>
//               </div>

//               <div className="flex justify-between items-center text-xs text-gray-500 mt-4">
//                 <span>Posted {property.postedDate}</span>
//                 <span className={`px-3 py-1 rounded-full ${
//                   property.category === 'Rent' ? 'bg-green-100 text-green-800' :
//                   property.category === 'Buy' ? 'bg-blue-100 text-blue-800' :
//                   property.category === 'Commercial' ? 'bg-purple-100 text-purple-800' :
//                   'bg-gray-100 text-gray-800'
//                 }`}>
//                   {property.category}
//                 </span>
//               </div>
//             </div>
//           </div>
//         ))}
//       </div>

//       {/* Pagination */}
//       {displayProperties.length > 9 && (
//         <div className="flex justify-center mt-12">
//           <nav className="flex items-center gap-2">
//             <button className="w-10 h-10 flex items-center justify-center rounded-lg border border-gray-300 hover:bg-gray-50 text-gray-700">
//               &lt;
//             </button>
//             <button className="w-10 h-10 flex items-center justify-center rounded-lg bg-blue-600 text-white font-medium">
//               1
//             </button>
//             <button className="w-10 h-10 flex items-center justify-center rounded-lg border border-gray-300 hover:bg-gray-50 text-gray-700">
//               2
//             </button>
//             <button className="w-10 h-10 flex items-center justify-center rounded-lg border border-gray-300 hover:bg-gray-50 text-gray-700">
//               3
//             </button>
//             <span className="px-3 text-gray-500">...</span>
//             <button className="w-10 h-10 flex items-center justify-center rounded-lg border border-gray-300 hover:bg-gray-50 text-gray-700">
//               10
//             </button>
//             <button className="w-10 h-10 flex items-center justify-center rounded-lg border border-gray-300 hover:bg-gray-50 text-gray-700">
//               &gt;
//             </button>
//           </nav>
//         </div>
//       )}
//     </div>
//   );
// };

// export default PropertyListings;



import React, { useState, useEffect } from "react";
import {
  MapPin,
  Bed,
  Bath,
  Square,
  Heart,
  Share2,
  Phone,
  Search,
  Filter,
  ChevronDown,
} from "lucide-react";
import { useSearchParams } from "react-router-dom";
import API from "../../services/api";

const PropertyListings = () => {
  const [searchParams] = useSearchParams();

  const [allProperties, setAllProperties] = useState([]);
  const [displayProperties, setDisplayProperties] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [showFilters, setShowFilters] = useState(false);

  const [filters, setFilters] = useState({
    propertyType: "All",
    status: "All",
    category: "All",
    furnishing: "All",
    sortBy: "newest",
  });

  // ✅ FETCH FROM BACKEND (MongoDB)
  useEffect(() => {
    const fetchProperties = async () => {
      try {
        setIsLoading(true);
        const res = await API.get("/properties");
        console.log("Fetched from MongoDB:", res.data);

        const transformed = res.data.map((p) => ({
          id: p._id,
          title: p.name,
          price: `₹${p.monthlyRent}`,
          location: p.locality,
          city: p.city,
          bedrooms: parseInt(p.bhk) || 1,
          bathrooms: 1,
          area: `${p.area} ${p.areaUnit}`,
          furnishing: p.furnishType,
          images:
            p.photos?.length > 0
              ? p.photos
              : [
                  "https://images.unsplash.com/photo-1613490493576-7fde63acd811",
                ],
          isVerified: true,
          isFeatured: false,
          postedDate: new Date(p.createdAt).toDateString(),
          category: "Rent",
          status: p.status,
          propertyType: p.propertyType,
          isActive: p.status === "Active",
        }));

        setAllProperties(transformed);
        setDisplayProperties(transformed);
      } catch (err) {
        console.error("Error fetching properties:", err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProperties();
  }, []);

  // ✅ SEARCH + FILTER LOGIC
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
      filtered = filtered.filter(
        (p) => p.propertyType === filters.propertyType
      );
    }

    if (filters.furnishing !== "All") {
      filtered = filtered.filter((p) =>
        p.furnishing
          ?.toLowerCase()
          .includes(filters.furnishing.toLowerCase())
      );
    }

    if (filters.status !== "All") {
      filtered = filtered.filter((p) => p.status === filters.status);
    }

    if (filters.sortBy === "price-low") {
      filtered.sort(
        (a, b) => extractPrice(a.price) - extractPrice(b.price)
      );
    }

    if (filters.sortBy === "price-high") {
      filtered.sort(
        (a, b) => extractPrice(b.price) - extractPrice(a.price)
      );
    }

    if (filters.sortBy === "newest") {
      filtered.sort(
        (a, b) => new Date(b.postedDate) - new Date(a.postedDate)
      );
    }

    setDisplayProperties(filtered);
  }, [searchTerm, filters, allProperties]);

  const extractPrice = (price) => {
    if (!price) return 0;
    return parseInt(price.replace(/\D/g, "")) || 0;
  };

  const handleFilterChange = (key, value) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
  };

  const clearFilters = () => {
    setFilters({
      propertyType: "All",
      status: "All",
      category: "All",
      furnishing: "All",
      sortBy: "newest",
    });
    setSearchTerm("");
  };

  if (isLoading) {
    return (
      <div className="text-center py-20 text-xl font-semibold">
        Loading properties...
      </div>
    );
  }

  if (displayProperties.length === 0) {
    return (
      <div className="text-center py-20 text-gray-600">
        No properties found
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      {/* SEARCH */}
      <div className="mb-6 flex gap-3">
        <input
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
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

      {/* GRID */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {displayProperties.map((property) => (
          <div
            key={property.id}
            className="bg-white border rounded-xl overflow-hidden shadow hover:shadow-lg transition"
          >
            <img
              src={property.images[0]}
              className="h-56 w-full object-cover"
            />

            <div className="p-4">
              <h3 className="font-bold text-lg">{property.title}</h3>
              <p className="text-gray-500 flex items-center gap-1 mt-1">
                <MapPin size={14} /> {property.location}, {property.city}
              </p>

              <p className="text-blue-600 text-xl font-bold mt-2">
                {property.price}
              </p>

              <div className="grid grid-cols-3 gap-3 text-sm mt-4 text-gray-700">
                <div className="flex items-center gap-1">
                  <Bed size={16} /> {property.bedrooms}
                </div>
                <div className="flex items-center gap-1">
                  <Bath size={16} /> {property.bathrooms}
                </div>
                <div className="flex items-center gap-1">
                  <Square size={16} /> {property.area}
                </div>
              </div>

              <button className="mt-4 w-full bg-blue-600 text-white py-2 rounded-lg flex justify-center items-center gap-2">
                <Phone size={16} /> Contact Owner
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PropertyListings;
