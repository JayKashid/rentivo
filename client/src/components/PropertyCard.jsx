import React from 'react';
import { useNavigate } from 'react-router-dom';
import { MapPin, Bed, Bath, Square } from 'lucide-react';

const PropertyCard = ({ property }) => {
  const navigate = useNavigate();

  return (
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
  );
};

export default PropertyCard;