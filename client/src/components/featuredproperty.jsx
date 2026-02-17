import React from "react";
import {
  CheckCircle,
  Star,
  Calendar,
  TrendingUp,
  Users,
  Home,
} from "lucide-react";
import image from "../assets/apartment1.png"; // Import your image

const FeaturedDevelopers = () => {
  const features = [
    "In-app scheduling for property viewings",
    "Real-time market price updates",
    "User-friendly interface for smooth navigation",
    "Access to off-market properties",
  ];

  return (
    <section className="px-6 py-12 max-w-7xl mx-auto">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        {/* Left column: text content */}
        <div>
          {/* Badge */}
          <div className="inline-flex items-center gap-2 bg-blue-50 text-blue-700 px-4 py-2 rounded-full text-sm font-semibold mb-6">
            <Home className="w-4 h-4" />
            Your Trusted Real Estate Partner
          </div>

          {/* Heading */}
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-slate-900 mb-4">
            <span>Helping You Every Step</span>
            <br className="hidden sm:block" />
            <span className="text-blue-600 mt-2 inline-block">Of The Way</span>
          </h2>

          {/* Description / Features */}
          <p className="text-slate-600 text-lg mb-6">
            Trust, clarity, and simplicity are at the core of everything we do
            to make your property journey easy.
          </p>

          <ul className="space-y-3 mb-8">
            {features.map((feature, index) => (
              <li key={index} className="flex items-start gap-3">
                <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                <span className="text-slate-700">{feature}</span>
              </li>
            ))}
          </ul>

          {/* Stats row */}
          <div className="flex flex-wrap items-center gap-6">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                <Calendar className="w-6 h-6 text-blue-600" />
              </div>
              <div>
                <div className="font-bold text-xl text-slate-900">
                  35+ Years
                </div>
                <div className="text-sm text-slate-500">
                  of dedicated home sales experience
                </div>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-yellow-100 rounded-full flex items-center justify-center">
                <Star className="w-6 h-6 text-yellow-600 fill-current" />
              </div>
              <div>
                <div className="flex items-center gap-1">
                  <span className="font-bold text-xl text-slate-900">5.0</span>
                  <div className="flex">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className="w-4 h-4 text-yellow-500 fill-current"
                      />
                    ))}
                  </div>
                </div>
                <div className="text-sm text-slate-500">
                  Trusted by 100,000+ users
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right column: image with stats overlay */}
        <div className="relative">
          <div className="relative rounded-2xl overflow-hidden shadow-2xl">
            <img
              src={image}
              alt="Modern apartment building"
              className="w-full h-full object-cover"
            />
            {/* Gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-blue-900/70 via-blue-600/30 to-transparent"></div>

            {/* Stats cards positioned over the image */}
            <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-white/20 backdrop-blur-md rounded-xl p-4 border border-white/30">
                  <TrendingUp className="w-6 h-6 mb-2 text-white" />
                  <div className="font-bold text-xl">₹2.5L+</div>
                  <div className="text-sm text-white/80">Average savings</div>
                </div>
                <div className="bg-white/20 backdrop-blur-md rounded-xl p-4 border border-white/30">
                  <Users className="w-6 h-6 mb-2 text-white" />
                  <div className="font-bold text-xl">50K+</div>
                  <div className="text-sm text-white/80">Happy customers</div>
                </div>
                <div className="col-span-2 bg-white/20 backdrop-blur-md rounded-xl p-4 border border-white/30">
                  <Home className="w-6 h-6 mb-2 text-white" />
                  <div className="font-bold text-xl">10,000+</div>
                  <div className="text-sm text-white/80">Properties listed</div>
                </div>
              </div>
            </div>
          </div>

          {/* Decorative circles */}
          <div className="absolute -top-4 -right-4 w-24 h-24 bg-blue-200 rounded-full opacity-30 blur-2xl -z-10"></div>
          <div className="absolute -bottom-4 -left-4 w-32 h-32 bg-purple-200 rounded-full opacity-30 blur-2xl -z-10"></div>
        </div>
      </div>
    </section>
  );
};

export default FeaturedDevelopers;
