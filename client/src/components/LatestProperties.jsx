import React from 'react';
import { useNavigate } from 'react-router-dom';
import { MapPin, ArrowRight } from 'lucide-react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import PropertyCard from './PropertyCard'; // adjust path as needed

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

  // ... error, loading, empty state handling (same as before)

  return (
    <div className="bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 py-16 relative overflow-hidden">
      {/* Decorative elements */}
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
              <PropertyCard property={property} />
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