import React from 'react';
import { useNavigate } from 'react-router-dom';
import { MapPin, Bed, Bath, Square, ArrowRight } from 'lucide-react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

const LatestProperties = ({
  featuredProperties = [],
  loading = false,
  error = null,
  onShowAll,
  totalCount = 0
}) => {
  const navigate = useNavigate();

  // Carousel settings – now showing 4 slides on large screens
  const settings = {
    dots: true,
    infinite: featuredProperties.length > 4,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    pauseOnHover: true,
    rtl: true,
    responsive: [
      {
        breakpoint: 1024,
        settings: { slidesToShow: 3 }
      },
      {
        breakpoint: 768,
        settings: { slidesToShow: 2 }
      },
      {
        breakpoint: 640,
        settings: { slidesToShow: 1 }
      }
    ]
  };

  if (error) {
    return (
      <div className="text-center py-12">
        <p className="text-red-600">Error loading properties: {error}</p>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="text-center py-12">
        <div className="inline-block animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-600 mb-4" />
        <h3 className="text-xl font-semibold text-gray-700">Loading properties...</h3>
      </div>
    );
  }

  if (featuredProperties.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="w-24 h-24 mx-auto mb-6 rounded-full bg-gradient-to-br from-blue-50 to-purple-50 flex items-center justify-center">
          <MapPin className="w-12 h-12 text-blue-500" />
        </div>
        <h3 className="text-2xl font-bold text-gray-800 mb-3">No Properties Available</h3>
        <p className="text-gray-600 max-w-md mx-auto">
          There are currently no properties listed. Check back soon for new listings!
        </p>
      </div>
    );
  }

  return (
    <div className="bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 py-16 relative overflow-hidden">
      {/* Decorative background elements */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,_var(--tw-gradient-stops))] from-blue-200/20 via-transparent to-transparent pointer-events-none"></div>
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_right,_var(--tw-gradient-stops))] from-purple-200/20 via-transparent to-transparent pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 bg-clip-text text-transparent">
            Discover Your Place Here
          </h2>
          <p className="text-gray-700 text-lg">
            Displaying 1–{Math.min(featuredProperties.length, 9)} from {totalCount.toLocaleString()} listings
          </p>
        </div>

        <Slider {...settings}>
          {featuredProperties.map((property) => (
            <div key={property.id} className="px-2">
              <div className="bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden hover:shadow-xl transition-all duration-300">
                {/* Image */}
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={property.images?.[0] || 'https://images.unsplash.com/photo-1613490493576-7fde63acd811'}
                    alt={property.title}
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                    onError={(e) => {
                      e.target.src = 'https://images.unsplash.com/photo-1613490493576-7fde63acd811';
                    }}
                  />
                  <div className="absolute top-3 left-3 bg-blue-600 text-white px-3 py-1 rounded-full text-xs font-semibold">
                    {property.propertyType || 'Property'}
                  </div>
                </div>

                {/* Content */}
                <div className="p-5">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-xl font-bold text-gray-900">{property.price}</span>
                  </div>

                  <h3 className="text-lg font-semibold text-gray-800 mb-2 truncate">
                    {property.title}
                  </h3>

                  <div className="flex items-center text-gray-500 text-sm mb-3">
                    <MapPin size={14} className="mr-1 flex-shrink-0" />
                    <span className="truncate">{property.location}</span>
                  </div>

                  <div className="flex flex-wrap gap-3 mb-3 text-gray-600">
                    <div className="flex items-center gap-1">
                      <Bed size={16} />
                      <span>{property.bedrooms ?? 1}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Bath size={16} />
                      <span>{property.bathrooms ?? 1}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Square size={16} />
                      <span>{property.area || 'N/A'}</span>
                    </div>
                    {property.furnishing && (
                      <div className="flex items-center gap-1">
                        <span className="text-xs bg-gray-100 px-2 py-1 rounded">
                          {property.furnishing}
                        </span>
                      </div>
                    )}
                  </div>

                  <p className="text-sm text-gray-600 line-clamp-2">
                    {property.description || 'Discover a harmonious blend of modern luxury and timeless elegance...'}
                  </p>

                  <button
                    onClick={() => navigate(`/property/${property.id}`)}
                    className="mt-4 w-full bg-gradient-to-r from-blue-50 to-blue-100 text-blue-700 font-semibold py-2 rounded-lg hover:from-blue-100 hover:to-blue-200 transition-all duration-200"
                  >
                    View Details
                  </button>
                </div>
              </div>
            </div>
          ))}
        </Slider>

        {/* Explore all button */}
        <div className="mt-12 text-center">
          <button
            onClick={onShowAll}
            className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-lg hover:shadow-lg transition-all duration-300"
          >
            <span>Explore All Properties</span>
            <ArrowRight size={18} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default LatestProperties;