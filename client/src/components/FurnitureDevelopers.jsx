import React from 'react';
import { Star, MapPin, Calendar, Building2, Phone, ExternalLink, Sofa, Home } from 'lucide-react';
import furnitureDeveloper from '../assets/furniture1.png';
import furniture2 from '../assets/furniture2.png';
import fur3 from '../assets/fur3.jpg';

const FurnitureDevelopers = () => {
  const developers = [
    {
      id: 1,
      name: "Urban Furniture Studios",
      year: "2015",
      projects: "150+",
      image: furnitureDeveloper,
      description: "Specializing in modern urban furniture design and manufacturing. We create pieces that blend functionality with contemporary aesthetics.",
      projectsList: ["Urban Living Room", "Minimalist Bedroom", "Office Spaces", "Dining Collections"],
      featuredProject: {
        name: "Urban Lounge Collection",
        location: "Design District, Mumbai",
        price: "₹1.5L - ₹8L",
      },
      rating: 4.9,
      reviews: 287,
      category: "Modern Furniture"
    },
    {
      id: 2,
      name: "Heritage Woodcrafts",
      year: "1998",
      projects: "500+",
      image: furniture2,
      description: "Traditional Indian woodcraft with modern techniques. Three generations of craftsmanship in every piece.",
      projectsList: ["Traditional Teak", "Rosewood Classics", "Hand-carved Sets", "Antique Restorations"],
      featuredProject: {
        name: "Heritage Dining Set",
        location: "Jaipur, Rajasthan",
        price: "₹2.8L - ₹12L",
      },
      rating: 4.8,
      reviews: 423,
      category: "Traditional Furniture"
    },
    {
      id: 3,
      name: "EcoLiving Furniture",
      year: "2020",
      projects: "80+",
      image: fur3,
      description: "Sustainable furniture made from recycled materials and eco-friendly practices. Modern designs with environmental consciousness.",
      projectsList: ["Recycled Collections", "Bamboo Series", "Eco Office", "Sustainable Living"],
      featuredProject: {
        name: "Eco Bamboo Series",
        location: "Bangalore, Karnataka",
        price: "₹75K - ₹4L",
      },
      rating: 4.7,
      reviews: 156,
      category: "Sustainable Furniture"
    }
  ];

  return (
    <section className="py-12 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4">
        {/* Header */}
        <div className="mb-10">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="text-3xl font-bold text-gray-900">Furniture Developers</h2>
              <p className="text-gray-600 mt-2">Premium furniture manufacturers and designers</p>
            </div>
            <div className="flex items-center gap-4">
              <button className="px-6 py-2.5 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors">
                View All
              </button>
            </div>
          </div>
          <div className="h-px bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500"></div>
        </div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {developers.map((developer) => (
            <div key={developer.id} className="bg-white rounded-xl border border-gray-200 overflow-hidden hover:shadow-lg transition-shadow duration-300">
              {/* Image Section */}
              <div className="relative h-48 bg-gradient-to-r from-blue-100 to-indigo-100 overflow-hidden">
                <img 
                  src={developer.image} 
                  alt={developer.name}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
                
                {/* Rating Badge */}
                <div className="absolute top-4 right-4 bg-white rounded-lg px-3 py-2 flex items-center shadow-md">
                  <Star className="w-4 h-4 text-yellow-500 fill-current mr-1" />
                  <span className="font-bold text-gray-900">{developer.rating}</span>
                  <span className="text-xs text-gray-500 ml-1">({developer.reviews})</span>
                </div>
                
                {/* Category Badge */}
                <div className="absolute top-4 left-4">
                  <span className="px-3 py-1.5 bg-gradient-to-r from-blue-600 to-indigo-600 text-white text-xs font-medium rounded-full">
                    {developer.category}
                  </span>
                </div>
              </div>

              {/* Content Section */}
              <div className="p-6">
                {/* Developer Name */}
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 mb-1">{developer.name}</h3>
                    <div className="flex items-center gap-4 text-sm text-gray-600">
                      <div className="flex items-center gap-1">
                        <Calendar className="w-4 h-4" />
                        <span>Since {developer.year}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Building2 className="w-4 h-4" />
                        <span>{developer.projects} Projects</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Description */}
                <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                  {developer.description}
                </p>

                {/* Projects Tags */}
                <div className="mb-6">
                  <h4 className="text-sm font-medium text-gray-700 mb-3">Signature Collections</h4>
                  <div className="flex flex-wrap gap-2">
                    {developer.projectsList.map((project, index) => (
                      <span
                        key={index}
                        className="px-3 py-1.5 bg-gray-100 text-gray-700 text-xs font-medium rounded-lg border border-gray-200"
                      >
                        {project}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Featured Project */}
                <div className="mb-6">
                  <h4 className="text-sm font-medium text-gray-700 mb-3">Featured Collection</h4>
                  <div className="bg-gradient-to-r from-gray-50 to-gray-100 rounded-lg p-4 border border-gray-200">
                    <div className="flex items-start">
                      <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center mr-3 flex-shrink-0">
                        <Home className="w-5 h-5 text-blue-600" />
                      </div>
                      <div className="flex-1">
                        <h5 className="font-semibold text-gray-900 truncate">{developer.featuredProject.name}</h5>
                        <div className="flex items-center text-sm text-gray-600 mt-1 mb-2">
                          <MapPin className="w-4 h-4 mr-2" />
                          <span className="truncate">{developer.featuredProject.location}</span>
                        </div>
                        <div className="text-lg font-bold text-blue-600">
                          {developer.featuredProject.price}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-3">
                  <button className="flex-1 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-medium py-2.5 rounded-lg hover:from-blue-700 hover:to-indigo-700 transition-all flex items-center justify-center gap-2">
                    <ExternalLink className="w-4 h-4" />
                    View Collections
                  </button>
                  <button className="flex-1 bg-white border border-gray-300 text-gray-800 font-medium py-2.5 rounded-lg hover:bg-gray-100 transition-all flex items-center justify-center gap-2">
                    <Phone className="w-4 h-4" />
                    Contact
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Stats Section */}
        <div className="mt-12 bg-gradient-to-r from-gray-900 to-gray-800 rounded-2xl p-8 text-white">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="text-3xl font-bold mb-2">50+</div>
              <div className="text-sm opacity-90">Furniture Brands</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold mb-2">2,000+</div>
              <div className="text-sm opacity-90">Designs Available</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold mb-2">4.8⭐</div>
              <div className="text-sm opacity-90">Customer Rating</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold mb-2">97%</div>
              <div className="text-sm opacity-90">Satisfaction Rate</div>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="mt-12 bg-white rounded-2xl border border-gray-200 p-8">
          <div className="text-center max-w-3xl mx-auto">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">Looking for Custom Furniture?</h3>
            <p className="text-gray-600 mb-6">
              Connect with our network of premium furniture developers for bespoke designs, custom measurements, 
              and personalized furniture solutions for your home or office.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="px-8 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-medium rounded-lg hover:shadow-lg transition-all">
                Request Custom Quote
              </button>
              <button className="px-8 py-3 border border-blue-600 text-blue-600 font-medium rounded-lg hover:bg-blue-50 transition-colors">
                Book Design Consultation
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FurnitureDevelopers;