import React from "react";
import {
  MapPin,
  Home,
  Building2,
  Star,
  Calendar,
  Phone,
  ExternalLink,
} from "lucide-react";
import image from "../assets/apartment1.png";

const FeaturedDevelopers = () => {
  const developers = [
    {
      id: 1,
      name: "Navin's Housing & Properties",
      year: "1989",
      projects: "25+",
      image: image,
      description:
        "Since 1989, Navin's has passionately woven dreams into reality, constructing homes where memories bloom...",
      projectsList: [
        "Navins Cedar",
        "Navins Starwood",
        "Navins Oak",
        "Navins Maple",
      ],
      featuredProperty: {
        name: "Navins Cedar At Starwood Township",
        location: "Venjavalai, Chennai South",
        price: "₹1.47 Cr - 1.63 Cr",
      },
      rating: 4.8,
      reviews: 234,
    },
    {
      id: 2,
      name: "Premier Housing & Properties",
      year: "2008",
      projects: "18+",
      image: "https://images.unsplash.com/photo-1582407947304-fd86f028f716",
      description:
        "Premier Housing & Properties is a company developing Real Assets over half a decade with a mission to provide...",
      projectsList: [
        "Premier JJS",
        "Premier Skyline",
        "Premier Greens",
        "Premier Heights",
      ],
      featuredProperty: {
        name: "Premier JJS Ashok Nagar",
        location: "Sriperumbudur, Chennai",
        price: "₹26.46 L - 79.38 L",
      },
      rating: 4.6,
      reviews: 189,
    },
    {
      id: 3,
      name: "Ravima Developers",
      year: "2023",
      projects: "12+",
      image: "https://images.unsplash.com/photo-1570129477492-45c003edd2be",
      description:
        "The core values of the company are – Innovation, Trust, Customer Satisfaction, and Transparency. We aim...",
      projectsList: [
        "Newton Homes",
        "Ravima Nest",
        "Newton Heights",
        "Newton Greens",
      ],
      featuredProperty: {
        name: "Newton Homes Handewadi",
        location: "Hadaipat, Handewadi Road-Hadaipat",
        price: "₹57.59 L - 73.75 L",
      },
      rating: 4.5,
      reviews: 156,
    },
  ];

  return (
    <section className="px-6 py-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="mb-8">
        <h2 className="text-2xl md:text-3xl font-bold text-slate-900">
          Featured Developers
        </h2>
        <p className="text-sm md:text-base text-slate-600 mt-2">
          Prominent real estate builders across India
        </p>
        <div className="h-px bg-gradient-to-r from-blue-500 via-blue-400 to-blue-300 mt-4" />
      </div>

      {/* Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {developers.map((dev) => (
          <div
            key={dev.id}
            className="bg-white rounded-xl border border-slate-200 hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
          >
            {/* Image */}
            <div className="relative h-40 bg-gradient-to-br from-blue-50 via-blue-100 to-blue-200 rounded-t-xl flex items-center justify-center overflow-hidden">
              {typeof dev.image === "string" ? (
                <img
                  src={dev.image}
                  alt={dev.name}
                  className="w-full h-full object-cover"
                />
              ) : (
                <img
                  src={dev.image}
                  alt={dev.name}
                  className="w-full h-full object-cover"
                />
              )}

              {/* Rating */}
              <div className="absolute top-3 right-3 bg-white/95 backdrop-blur-sm px-3 py-1.5 rounded-lg text-sm flex items-center gap-1.5 shadow-sm">
                <Star className="w-4 h-4 text-yellow-500 fill-current" />
                <span className="font-bold text-slate-800">{dev.rating}</span>
                <span className="text-slate-500 text-xs">({dev.reviews})</span>
              </div>

              {/* Year */}
              <div className="absolute top-3 left-3 bg-gradient-to-r from-blue-600 to-blue-500 text-white text-sm font-medium px-3 py-1.5 rounded-lg shadow">
                Est. {dev.year}
              </div>
            </div>

            {/* Content */}
            <div className="p-3">
              <h3 className="text-lg font-bold text-slate-900 mb-2 line-clamp-1">
                {dev.name}
              </h3>

              {/* Stats */}
              <div className="flex gap-6 mb-4 text-sm">
                <div className="flex items-center gap-2 text-slate-700">
                  <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                    <Calendar className="w-4 h-4 text-blue-600" />
                  </div>
                  <div>
                    <div className="font-medium text-slate-900">{dev.year}</div>
                    <div className="text-xs text-slate-500">Established</div>
                  </div>
                </div>
                <div className="flex items-center gap-2 text-slate-700">
                  <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center">
                    <Building2 className="w-4 h-4 text-green-600" />
                  </div>
                  <div>
                    <div className="font-medium text-slate-900">
                      {dev.projects}
                    </div>
                    <div className="text-xs text-slate-500">Projects</div>
                  </div>
                </div>
              </div>

              {/* Description */}
              <p className="text-sm text-slate-600 line-clamp-2 mb-4">
                {dev.description}
              </p>

              {/* Projects */}
              <div className="mb-4">
                <h4 className="text-sm font-medium text-slate-700 mb-3">
                  Key Projects
                </h4>
                <div className="flex flex-wrap gap-2">
                  {dev.projectsList.map((p, i) => (
                    <span
                      key={i}
                      className="text-xs px-2.5 py-1 bg-slate-50 text-slate-700 rounded-md border border-slate-200 hover:bg-slate-100 transition-colors"
                    >
                      {p}
                    </span>
                  ))}
                </div>
              </div>

              {/* Featured Property */}
              <div className="border border-slate-200 rounded-xl p-3 mb-4 bg-gradient-to-r from-slate-50 to-white">
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Home className="w-5 h-5 text-blue-600" />
                  </div>
                  <div className="flex-1">
                    <h4 className="text-sm font-semibold text-slate-900 truncate mb-1">
                      {dev.featuredProperty.name}
                    </h4>
                    <p className="text-xs text-slate-600 flex items-center gap-1.5 mb-2">
                      <MapPin className="w-3.5 h-3.5" />
                      {dev.featuredProperty.location}
                    </p>
                    <p className="text-base font-bold text-blue-600">
                      {dev.featuredProperty.price}
                    </p>
                  </div>
                </div>
              </div>

              {/* Actions - Both buttons with same color */}
              <div className="flex gap-3">
                <button className="flex-1 bg-gradient-to-r from-blue-600 to-blue-500 text-white text-sm py-2 px-3 rounded-lg hover:from-blue-700 hover:to-blue-600 transition-all duration-300 flex items-center justify-center gap-2 font-medium shadow-sm hover:shadow">
                  <ExternalLink className="w-4 h-4" />
                  View Projects
                </button>
                <button className="flex-1 bg-gradient-to-r from-blue-100 to-blue-50 text-blue-700 text-sm py-2 px-3 rounded-lg hover:from-blue-200 hover:to-blue-100 transition-all duration-300 flex items-center justify-center gap-2 font-medium border border-blue-200">
                  <Phone className="w-4 h-4" />
                  Contact
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Stats Section */}
      <div className="mt-10 bg-gradient-to-r from-blue-600 to-blue-500 rounded-2xl p-5 text-white">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          <div className="text-center">
            <div className="text-3xl md:text-4xl font-bold mb-2">150+</div>
            <div className="text-sm opacity-90">Trusted Developers</div>
          </div>
          <div className="text-center">
            <div className="text-3xl md:text-4xl font-bold mb-2">2,500+</div>
            <div className="text-sm opacity-90">Completed Projects</div>
          </div>
          <div className="text-center">
            <div className="text-3xl md:text-4xl font-bold mb-2">4.5+</div>
            <div className="text-sm opacity-90">Avg. Rating</div>
          </div>
          <div className="text-center">
            <div className="text-3xl md:text-4xl font-bold mb-2">95%</div>
            <div className="text-sm opacity-90">Satisfaction</div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeaturedDevelopers;
