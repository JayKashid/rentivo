import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { MapPin, Bed, Bath, Square, ArrowRight } from "lucide-react";
import HeroSection from "../components/HeroSection";
import FeaturedDevelopers from "../components/featuredproperty";
import FurnitureDevelopers from "../components/FurnitureDevelopers";
import { useAppContext } from "../context/AppContext";

const Home = () => {
  const navigate = useNavigate();
  const { properties: contextProperties } = useAppContext();
  const [featuredProperties, setFeaturedProperties] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    
    // Filter properties (same logic as PropertyListings)
    let filtered = contextProperties.filter(property => !property.isDeleted);
    
    // Take only first 3 properties
    filtered = filtered.slice(0, 3);

    // Transform properties for display (similar to PropertyListings)
    const transformedProperties = filtered.map(property => {
      // Extract bedrooms from type
      const bedroomMatch = property.type?.match(/(\d+)\s*BHK/) || 
                          property.type?.match(/(\d+)\s*BED/) || 
                          property.type?.match(/(\d+)\s*BEDROOM/);
      const bedrooms = bedroomMatch ? parseInt(bedroomMatch[1]) : 1;
      
      // Extract bathrooms
      const bathroomMatch = property.type?.match(/(\d+)\s*BATH/) || 
                           property.description?.match(/(\d+)\s*BATH/);
      const bathrooms = bathroomMatch ? parseInt(bathroomMatch[1]) : Math.max(1, bedrooms - 1);
      
      // Extract area
      const areaMatch = property.area?.match(/(\d+)/) || property.type?.match(/(\d+)\s*SQFT/);
      const area = areaMatch ? `${areaMatch[1]} sqft` : (property.area || 'N/A');
      
      // Format price
      let price = property.price || 'Price on request';
      if (typeof price === 'number') {
        price = `₹ ${price.toLocaleString('en-IN')}`;
      } else if (!price.includes('₹') && price !== 'Price on request') {
        price = `₹ ${price}`;
      }
      
      return {
        id: property.id,
        title: property.type || 'Property',
        type: property.type,
        price: price,
        location: property.locality || property.location || property.city || 'Location not specified',
        area: area,
        bedrooms: bedrooms,
        bathrooms: bathrooms,
        furnishing: property.furnishing || 'Not specified',
        images: property.images || property.photos || ['https://images.unsplash.com/photo-1613490493576-7fde63acd811'],
        isVerified: property.verificationStatus === 'Verified',
        isFeatured: property.visibility?.includes('High') || property.plan === 'Paid',
        postedDate: property.lastAdded || property.createdAt || 'Recently',
        category: property.category || 'Rent',
        status: property.status || 'Under Review',
        isActive: property.isActive || false,
        propertyType: property.propertyType || 'Residential',
        city: property.city,
        description: property.description
      };
    });

    setFeaturedProperties(transformedProperties);
    setLoading(false);
  }, [contextProperties]);

  const handleShowAll = () => {
    navigate("api/properties");
  };

  return (
    <div className="min-h-screen">
      <HeroSection />
      <FeaturedDevelopers />
      <FurnitureDevelopers />
      
      {/* Featured Properties Section */}
      <div className="bg-gradient-to-b from-white to-gray-50 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Section Header */}
          <div className="flex flex-col md:flex-row md:items-center justify-between mb-10">
            <div className="mb-6 md:mb-0">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3">
                Latest Properties
              </h2>
              <p className="text-gray-600 text-lg">
                Discover our latest properties across multiple cities
              </p>
            </div>
            
           
          </div>

          {loading ? (
            <div className="text-center py-12">
              <div className="inline-block animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-600 mb-4"></div>
              <h3 className="text-xl font-semibold text-gray-700">Loading properties...</h3>
            </div>
          ) : featuredProperties.length === 0 ? (
            <div className="text-center py-12">
              <div className="w-24 h-24 mx-auto mb-6 rounded-full bg-gradient-to-br from-blue-50 to-purple-50 flex items-center justify-center">
                <MapPin className="w-12 h-12 text-blue-500" />
              </div>
              <h3 className="text-2xl font-bold text-gray-800 mb-3">No Properties Available</h3>
              <p className="text-gray-600 max-w-md mx-auto">
                There are currently no properties listed. Check back soon for new listings!
              </p>
            </div>
          ) : (
            <>
              {/* Properties Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {featuredProperties.map((property) => (
                  <div key={property.id} className="bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
                    {/* Image Section */}
                    <div className="relative h-56 overflow-hidden">
                      <img
                        src={property.images[0]}
                        alt={property.title}
                        className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                        onError={(e) => {
                          e.target.src = 'https://images.unsplash.com/photo-1613490493576-7fde63acd811';
                        }}
                      />
                      <div className="absolute top-4 left-4">
                        <span className={`px-3 py-1.5 rounded-full text-xs font-semibold ${
                          property.category === 'Rent' 
                            ? 'bg-green-100 text-green-800' 
                            : 'bg-blue-100 text-blue-800'
                        }`}>
                          {property.category}
                        </span>
                      </div>
                      <div className="absolute top-4 right-4">
                        {property.isVerified && (
                          <span className="px-3 py-1.5 bg-gradient-to-r from-green-600 to-emerald-600 text-white text-xs font-semibold rounded-full flex items-center gap-1">
                            <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                            </svg>
                            Verified
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Details Section */}
                    <div className="p-6">
                      <div className="mb-4">
                        <h3 className="text-xl font-bold text-gray-900 mb-2 truncate">{property.title}</h3>
                        <div className="flex items-center text-gray-600">
                          <MapPin className="w-4 h-4 mr-2 flex-shrink-0" />
                          <span className="truncate">{property.location}</span>
                        </div>
                      </div>

                      {/* Property Features */}
                      <div className="grid grid-cols-4 gap-3 py-4 border-y border-gray-100 mb-5">
                        <div className="text-center">
                          <div className="flex items-center justify-center gap-1 mb-1">
                            <Bed className="w-4 h-4 text-blue-600" />
                            <span className="font-bold text-gray-800">{property.bedrooms}</span>
                          </div>
                          <span className="text-xs text-gray-500">Beds</span>
                        </div>
                        <div className="text-center">
                          <div className="flex items-center justify-center gap-1 mb-1">
                            <Bath className="w-4 h-4 text-blue-600" />
                            <span className="font-bold text-gray-800">{property.bathrooms}</span>
                          </div>
                          <span className="text-xs text-gray-500">Baths</span>
                        </div>
                        <div className="text-center">
                          <div className="flex items-center justify-center gap-1 mb-1">
                            <Square className="w-4 h-4 text-blue-600" />
                            <span className="font-bold text-gray-800">{property.area}</span>
                          </div>
                          <span className="text-xs text-gray-500">Area</span>
                        </div>
                        <div className="text-center">
                          <div className="mb-1">
                            <span className="font-bold text-gray-800 text-xs">{property.furnishing}</span>
                          </div>
                          <span className="text-xs text-gray-500">Furnishing</span>
                        </div>
                      </div>

                      {/* Price and CTA */}
                      <div className="flex items-center justify-between">
                        <div>
                          <div className="text-sm text-gray-500">Price</div>
                          <div className="text-2xl font-bold text-blue-600">{property.price}</div>
                        </div>
                        <button 
                          onClick={() => navigate(`/property/${property.id}`)}
                          className="px-5 py-2.5 bg-gradient-to-r from-blue-50 to-blue-100 text-blue-700 font-semibold rounded-lg hover:from-blue-100 hover:to-blue-200 transition-all duration-200"
                        >
                          View Details
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Bottom CTA */}
              <div className="mt-16 text-center">
                <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-2xl p-8 border border-blue-100">
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">
                    Discover More Properties
                  </h3>
                  <p className="text-gray-600 mb-8 max-w-2xl mx-auto">
                    Browse through our extensive collection of properties. Find your dream home today!
                  </p>
                  <button
                    onClick={handleShowAll}
                    className="group px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-xl hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 inline-flex items-center gap-3"
                  >
                    <span>Explore All Properties</span>
                    <ArrowRight className="w-5 h-5 group-hover:translate-x-2 transition-transform" />
                  </button>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Home;