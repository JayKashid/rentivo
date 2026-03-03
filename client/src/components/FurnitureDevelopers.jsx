import React from "react";
import {
  ArrowRight,
  Star,
  Shield,
  Zap,
  CheckCircle,
  Camera,
  Target,
  Globe,
  BarChart,
} from "lucide-react";

const FurnitureDevelopers = () => {
  // Stats data
  const stats = [
    { value: "500+", label: "Experts Trust Us" },
    { value: "4.9/5", label: "2k+ Reviews" },
    { value: "3x", label: "Faster Sales" },
  ];

  // Features for the new section
  const features = [
    {
      icon: Camera,
      title: "Professional Photography",
      description:
        "High-quality images that showcase your property’s best angles.",
    },
    {
      icon: Target,
      title: "Targeted Marketing",
      description: "Reach the right buyers with data-driven ad campaigns.",
    },
    {
      icon: Globe,
      title: "Global Exposure",
      description:
        "List your property on top platforms to attract international buyers.",
    },
    {
      icon: BarChart,
      title: "Performance Analytics",
      description: "Track views, clicks, and leads with real-time dashboards.",
    },
  ];

  return (
    <>
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-gray-100 via-gray-50 to-white overflow-hidden">
        {/* Square grid pattern overlay */}
        <div
          className="absolute inset-0 opacity-10 pointer-events-none"
          style={{
            backgroundImage: `
              linear-gradient(to right, #9ca3af 1px, transparent 1px),
              linear-gradient(to bottom, #9ca3af 1px, transparent 1px)
            `,
            backgroundSize: "40px 40px",
          }}
        />

        {/* Decorative blobs (kept for subtle depth) */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-40 -left-40 w-80 h-80 bg-blue-100 rounded-full mix-blend-multiply filter blur-3xl opacity-40 animate-float" />
          <div className="absolute -bottom-40 -right-40 w-80 h-80 bg-indigo-100 rounded-full mix-blend-multiply filter blur-3xl opacity-40 animate-float animation-delay-2000" />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left side – Image collage */}
            <div className="relative order-2 lg:order-1">
              <div className="relative rounded-2xl overflow-hidden shadow-2xl">
                <img
                  src="https://images.unsplash.com/photo-1556228453-efd6c1ff04f6?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
                  alt="Modern living room with comfortable furniture"
                  className="w-full h-auto object-cover"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-tr from-blue-600/20 to-transparent" />

                {/* Floating badges */}
                <div className="absolute top-6 left-6 bg-white/90 backdrop-blur-sm rounded-lg shadow-lg p-3 flex items-center gap-2 animate-float">
                  <div className="flex">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Star
                        key={star}
                        className="w-4 h-4 fill-yellow-400 text-yellow-400"
                      />
                    ))}
                  </div>
                  <span className="text-sm font-medium text-gray-700">
                    4.9/5
                  </span>
                </div>

                <div className="absolute bottom-6 right-6 bg-white/90 backdrop-blur-sm rounded-lg shadow-lg p-3 flex items-center gap-2 animate-float animation-delay-1000">
                  <CheckCircle className="w-5 h-5 text-green-500" />
                  <span className="text-sm font-medium text-gray-700">
                    Verified Experts
                  </span>
                </div>

                <div className="absolute bottom-24 left-6 bg-white/90 backdrop-blur-sm rounded-lg shadow-lg p-3 flex items-center gap-2 animate-float animation-delay-2000">
                  <Zap className="w-5 h-5 text-blue-500" />
                  <span className="text-sm font-medium text-gray-700">
                    3x faster
                  </span>
                </div>
              </div>
            </div>

            {/* Right side – Text content */}
            <div className="text-center lg:text-left order-1 lg:order-2">
              {/* Eyebrow */}
              <div className="flex items-center justify-center lg:justify-start gap-2 mb-6">
                <div
                  className="flex -space-x-2"
                  role="img"
                  aria-label="Trusted experts"
                >
                  {[1, 2, 3, 4].map((i) => (
                    <img
                      key={i}
                      src={`https://i.pravatar.cc/40?img=${i + 10}`}
                      alt=""
                      className="w-10 h-10 rounded-full border-2 border-white shadow-md"
                      loading="lazy"
                    />
                  ))}
                </div>
                <p className="text-sm font-semibold text-gray-700 uppercase tracking-wider">
                  Trusted by 500+ Experts
                </p>
              </div>

              <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight mb-6">
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-gray-900 to-gray-600">
                  Sell or Rent Faster with
                </span>
                <br />
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-indigo-600">
                  Expert Strategies & Real Support!
                </span>
              </h1>

              <p className="text-lg text-gray-600 mb-8 max-w-xl mx-auto lg:mx-0">
                Achieve your goals faster with personalized strategies, hands‑on
                support, and results that speak for themselves.
              </p>

              <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4 mb-10">
                <button
                  type="button"
                  className="group inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-semibold rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-1 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                >
                  Get Started
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </button>
                <div className="flex items-center gap-2 text-sm text-gray-500">
                  <Shield className="w-4 h-4 text-green-500" />
                  <span>30-day money-back guarantee</span>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-4 max-w-md mx-auto lg:mx-0">
                {stats.map((stat, idx) => (
                  <div key={idx} className="text-center">
                    <div className="text-2xl font-bold text-gray-900">
                      {stat.value}
                    </div>
                    <div className="text-xs text-gray-500">{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* New Section: Advertise Your Properties Like a Pro */}
      <section className="relative py-20 bg-gradient-to-br from-gray-100 via-gray-50 to-white overflow-hidden">
        {/* Square grid pattern overlay */}
        <div
          className="absolute inset-0 opacity-10 pointer-events-none"
          style={{
            backgroundImage: `
        linear-gradient(to right, #9ca3af 1px, transparent 1px),
        linear-gradient(to bottom, #9ca3af 1px, transparent 1px)
      `,
            backgroundSize: "40px 40px",
          }}
        />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Advertise Your Properties{" "}
              <span className="text-blue-600">Like a Professional</span>
            </h2>
            <p className="text-lg text-gray-600">
              Everything you need to showcase your properties and attract
              qualified buyers – all in one place.
            </p>
          </div>

          {/* Partner & Team Row */}
          <div className="flex flex-wrap justify-center items-center gap-8 md:gap-12 mb-16">
            {/* Instagram Partner */}
            <div className="flex flex-col items-center">
              <div className="w-16 h-16 bg-gradient-to-tr from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center shadow-lg mb-3">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="32"
                  height="32"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="white"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                  <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
                </svg>
              </div>
              <span className="text-sm font-semibold text-gray-700">
                Instagram Partner
              </span>
            </div>

            {/* YouTube Partner */}
            <div className="flex flex-col items-center">
              <div className="w-16 h-16 bg-red-600 rounded-2xl flex items-center justify-center shadow-lg mb-3">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="32"
                  height="32"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="white"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.25 29 29 0 0 0-.46-5.33z"></path>
                  <polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02"></polygon>
                </svg>
              </div>
              <span className="text-sm font-semibold text-gray-700">
                YouTube Partner
              </span>
            </div>

            {/* Supportive Team */}
            <div className="flex flex-col items-center">
              <div className="w-16 h-16 bg-green-500 rounded-2xl flex items-center justify-center shadow-lg mb-3">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="32"
                  height="32"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="white"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
                  <circle cx="9" cy="7" r="4"></circle>
                  <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
                  <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
                </svg>
              </div>
              <span className="text-sm font-semibold text-gray-700">
                Supportive Team
              </span>
            </div>
          </div>

          {/* Features Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, idx) => {
              const Icon = feature.icon;
              return (
                <div
                  key={idx}
                  className="bg-white/70 backdrop-blur-sm rounded-2xl p-6 hover:shadow-xl transition-shadow duration-300 group border border-gray-200"
                >
                  <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4 group-hover:bg-blue-600 transition-colors duration-300">
                    <Icon className="w-6 h-6 text-blue-600 group-hover:text-white transition-colors duration-300" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600">{feature.description}</p>
                </div>
              );
            })}
          </div>

          {/* CTA Button */}
          <div className="mt-16 text-center">
            <button
              type="button"
              className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-semibold rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-1"
            >
              Start Your Campaign
              <ArrowRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </section>

      {/* Custom animations */}
      <style jsx>{`
        @keyframes float {
          0%,
          100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-10px);
          }
        }
        .animate-float {
          animation: float 6s ease-in-out infinite;
        }
        .animation-delay-1000 {
          animation-delay: 1s;
        }
        .animation-delay-2000 {
          animation-delay: 2s;
        }
      `}</style>
    </>
  );
};

export default FurnitureDevelopers;
