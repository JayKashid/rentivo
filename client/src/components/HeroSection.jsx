import { Search, TrendingUp, ShieldCheck, MapPin } from "lucide-react";
import { useState } from "react";
import image from "../assets/house.png";
import SearchBar from "./SearchBar";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

// import {SearchBar, SmartPropertySearchBar } from './SearchBar';

const HeroSection = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("RENT");
  const [searchQuery, setSearchQuery] = useState("");

  const tabs = [
    { id: "BUY", label: "Buy", icon: "🏠" },
    { id: "RENT", label: "Rent", icon: "🔑" },
    { id: "COMMERCIAL", label: "Commercial", icon: "🏢" },
    { id: "PG", label: "PG/Co-living", icon: "👥" },
    { id: "PLOTS", label: "Plots", icon: "📍" },
  ];

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const popularSearches = [
    "Koregaon Park",
    "Hinjewadi Phase 1",
    "Wakad",
    "Baner",
    "Kharadi",
    "Viman Nagar",
  ];

  const handleSearch = () => {
    if (searchQuery.trim()) {
      console.log("Searching for:", searchQuery);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") handleSearch();
  };

  return (
    <section 
    id="hero"
     className="relative bg-gradient-to-br from-slate-900 via-slate-800 to-indigo-900 text-white overflow-hidden">
      {/* Background Elements - simplified */}
      <div className="absolute inset-0 bg-grid-white/5 bg-[size:20px_20px]" />

      {/* Reduced vertical padding */}
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 lg:py-14">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-10 items-center">
          {/* Left Content - more compact */}
          <div className="space-y-6">
            {/* Header Section - reduced spacing */}
            <div className="space-y-3">
              <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm px-3 py-1.5 rounded-full">
                <ShieldCheck className="w-3 h-3 text-emerald-400" />
                <span className="text-xs font-medium">
                  Trusted by 10,000+ home seekers
                </span>
              </div>

              <h1 className="text-3xl md:text-4xl lg:text-4xl font-bold leading-tight tracking-tight">
                Find Your Perfect Home in{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">
                  Pune
                </span>
              </h1>

              <p className="text-base text-slate-300 max-w-2xl">
                Discover verified properties with transparent pricing, 3D tours,
                and expert insights
              </p>

              {/* Stats - more compact */}
              <div className="flex flex-wrap gap-4 pt-2">
                <div className="flex items-center gap-2">
                  <div className="w-10 h-10 rounded-lg bg-blue-500/20 flex items-center justify-center">
                    <TrendingUp className="w-5 h-5 text-blue-400" />
                  </div>
                  <div>
                    <div className="text-xl font-bold">8K+</div>
                    <div className="text-xs text-slate-400">Daily Listings</div>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-10 h-10 rounded-lg bg-emerald-500/20 flex items-center justify-center">
                    <ShieldCheck className="w-5 h-5 text-emerald-400" />
                  </div>
                  <div>
                    <div className="text-xl font-bold">69K+</div>
                    <div className="text-xs text-slate-400">
                      Verified Properties
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Tabs - more compact */}
            <div className="space-y-2">
              <div className="text-xs font-medium text-slate-300">
                I'M LOOKING TO
              </div>
              <div className="flex flex-wrap gap-1.5">
                {tabs.map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`flex items-center gap-1.5 px-4 py-2 rounded-lg border transition-all duration-200 text-sm ${
                      activeTab === tab.id
                        ? "bg-white text-slate-900 border-white shadow"
                        : "bg-white/5 border-white/10 hover:bg-white/10 hover:border-white/20"
                    }`}
                  >
                    <span className="text-base">{tab.icon}</span>
                    <span className="font-medium">{tab.label}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Search Section - compact */}
            <div className="space-y-3">
              <div className="relative">
                {/* Search Section */}
                <div className="space-y-3">
                  <SearchBar
                    variant="dark"
                    onSearch={({ query }) => {
                      navigate(
                        `/properties?search=${encodeURIComponent(query)}&type=${activeTab}`,
                      );
                    }}
                  />
                </div>
              </div>

              {/* Popular Searches - compact */}
              <div className="space-y-1.5">
                <div className="text-xs text-slate-400 flex items-center gap-1.5">
                  <MapPin className="w-3 h-3" />
                  Popular in Pune
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {popularSearches.map((search) => (
                    <button
                      key={search}
                      onClick={() => setSearchQuery(search)}
                      className="px-2.5 py-1 bg-white/5 hover:bg-white/10 rounded text-xs text-slate-300 transition-colors"
                    >
                      {search}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Trust Badges - compact */}
            <div className="flex items-center gap-3 text-xs text-slate-400 pt-2">
              <div className="flex items-center gap-1.5">
                <div className="w-1.5 h-1.5 rounded-full bg-emerald-500"></div>
                Verified listings
              </div>
              <div className="flex items-center gap-1.5">
                <div className="w-1.5 h-1.5 rounded-full bg-blue-500"></div>
                Price transparency
              </div>
              <div className="flex items-center gap-1.5">
                <div className="w-1.5 h-1.5 rounded-full bg-purple-500"></div>
                Virtual tours
              </div>
            </div>
          </div>

          {/* Right Image - smaller */}
          <div className="relative lg:flex justify-end hidden">
            <div className="relative">
              {/* Floating Card - Fixed layout */}
              <div className="absolute -bottom-4 -left-4 bg-gradient-to-br from-blue-600 to-purple-600 text-white p-3 rounded-xl shadow-xl max-w-[220px] z-10">
                <div className="text-xs font-medium">Most Viewed</div>
                <div className="text-sm font-bold mt-0.5">Luxury 3BHK</div>
                <div className="text-xs text-white/80 mt-1 flex items-center gap-1">
                  <span>Koregaon Park</span>
                  <span>•</span>
                  <span>2,800 sq.ft</span>
                </div>
                <div className="text-lg font-bold mt-1">₹2.8 Cr</div>
              </div>

              {/* Main Image Container */}
              <div className="relative rounded-2xl overflow-hidden shadow-xl">
                <img
                  src={image}
                  alt="Modern luxury apartment in Pune"
                  className="w-full h-[350px] object-cover"
                />

                {/* Image Badge */}
                <div className="absolute top-3 right-3 bg-white/20 backdrop-blur-md text-white px-2 py-1 rounded-full text-xs font-medium z-20">
                  Verified
                </div>

                {/* View Stats - Fixed layout */}
                <div className="absolute bottom-3 right-3 flex items-center gap-2 text-white z-20">
                  <div className="flex items-center gap-1.5 bg-black/40 backdrop-blur-sm px-2 py-1 rounded-lg">
                    <div className="w-5 h-5 rounded-full bg-blue-500/30 flex items-center justify-center">
                      <span className="text-xs">👁️</span>
                    </div>
                    <div>
                      <div className="text-xs font-medium">234 views</div>
                      <div className="text-[10px] text-white/60">today</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Decorative Bottom - reduced height */}
      <div className="absolute bottom-0 left-0 w-full h-20 bg-gradient-to-t from-slate-900 to-transparent" />
    </section>
  );
};

export default HeroSection;
