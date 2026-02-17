import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Home,
  Phone,
  Building2,
  Users,
  ShieldCheck,
  Zap,
  ArrowRight,
  Star,
  CheckCircle,
  Target,
  Lock,
  Globe,
  Calendar,
  MessageSquare,
  Award,
  Sparkles,
} from "lucide-react";
import Navbar from "../../pages/admindashboard/Navbar";

const AddHouse = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    userType: "",           // No default selection
    propertyCategory: "",    // No default selection
    lookingTo: "",           // No default selection
    phone: "",
  });
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setError("");
  };

  // Helper to update a field and clear error
  const handleSelection = (field, value) => {
    setForm({ ...form, [field]: value });
    setError("");
  };

  const handleSubmit = () => {
    // Validate all required fields
    if (!form.userType) {
      setError("Please select whether you are an Owner or Broker/Builder");
      return;
    }
    if (!form.propertyCategory) {
      setError("Please select Property Type (Residential or Commercial)");
      return;
    }
    if (!form.lookingTo) {
      setError("Please select what you are looking for (Rent/Sell/PG)");
      return;
    }
    if (!form.phone.trim()) {
      setError("Phone number is required");
      return;
    }
    if (!/^\d{10}$/.test(form.phone)) {
      setError("Please enter a valid 10-digit mobile number");
      return;
    }

    // Navigate to property details with form data
    navigate("/property-details", { state: { formData: form } });
  };

  const features = [
    {
      icon: <Zap className="w-4 h-4" />,
      text: "Post property in 60 seconds",
      color: "from-blue-500 to-cyan-500",
    },
    {
      icon: <ShieldCheck className="w-4 h-4" />,
      text: "Verified buyers & tenants",
      color: "from-emerald-500 to-green-500",
    },
    {
      icon: <Users className="w-4 h-4" />,
      text: "Personalized selling assistance",
      color: "from-purple-500 to-pink-500",
    },
    {
      icon: <Globe className="w-4 h-4" />,
      text: "Reach 10M+ monthly users",
      color: "from-orange-500 to-red-500",
    },
  ];

  const successStories = [
    { stat: "50K+", label: "Active Listings" },
    { stat: "98%", label: "Satisfaction" },
    { stat: "2.4M", label: "Monthly Visitors" },
    { stat: "24h", label: "Fast Response" },
  ];

  // Check if form is complete (for optional button disable)
  const isFormComplete =
    form.userType &&
    form.propertyCategory &&
    form.lookingTo &&
    form.phone &&
    /^\d{10}$/.test(form.phone);

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100 flex items-center justify-center px-4 py-8">
        <div className="max-w-6xl w-full grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          {/* LEFT CONTENT - Hero Section (unchanged) */}
          <div className="space-y-6">
            {/* ... (keep all left content as before) ... */}
            <div className="inline-flex items-center gap-2 bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-3 py-1.5 rounded-full text-xs font-semibold">
              <Sparkles className="w-3 h-3" />
              #1 Real Estate Platform
            </div>

            <div className="space-y-4">
              <h1 className="text-4xl lg:text-5xl font-bold tracking-tight text-slate-900 leading-tight">
                List Your Property
                <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600">
                  Reach Millions
                </span>
              </h1>
              <p className="text-base lg:text-lg text-slate-600 max-w-lg leading-relaxed">
                Join thousands of successful property owners who've sold or
                rented their properties faster with our premium listing services.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-4">
              {features.map((feature, index) => (
                <div
                  key={index}
                  className="flex items-center gap-3 p-3 bg-white rounded-lg border border-slate-200 hover:border-slate-300 hover:shadow-sm transition-all"
                >
                  <div
                    className={`w-8 h-8 rounded-lg bg-gradient-to-br ${feature.color} flex items-center justify-center flex-shrink-0`}
                  >
                    <div className="text-white">{feature.icon}</div>
                  </div>
                  <span className="font-medium text-sm text-slate-700">
                    {feature.text}
                  </span>
                </div>
              ))}
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-6">
              {successStories.map((story, index) => (
                <div key={index} className="text-center">
                  <div className="text-xl md:text-2xl font-bold bg-gradient-to-r from-slate-900 to-slate-700 bg-clip-text text-transparent">
                    {story.stat}
                  </div>
                  <div className="text-xs text-slate-500 mt-1">
                    {story.label}
                  </div>
                </div>
              ))}
            </div>

            <div className="pt-4 border-t border-slate-200">
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-amber-400 to-orange-500 flex items-center justify-center flex-shrink-0">
                  <span className="text-white text-xs font-bold">RK</span>
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-1 mb-1">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Star
                        key={star}
                        className="w-3 h-3 fill-amber-400 text-amber-400"
                      />
                    ))}
                  </div>
                  <p className="text-sm text-slate-700 italic">
                    "Sold my apartment in just 7 days! The platform connected me
                    with genuine buyers."
                  </p>
                  <div className="text-xs text-slate-500 mt-1">
                    Rahul Kumar, Property Owner
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT CARD - Form Section */}
          <div className="relative">
            <div className="relative bg-white rounded-2xl shadow-xl border border-slate-200 overflow-hidden">
              {/* Form Header */}
              <div className="bg-gradient-to-r from-slate-900 to-slate-800 text-white p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <h2 className="text-xl font-bold mb-1">
                      Start Your Free Listing
                    </h2>
                    <p className="text-slate-300 text-xs">
                      Complete in just 3 steps
                    </p>
                  </div>
                  <div className="text-right">
                    <div className="text-2xl font-bold">FREE</div>
                    <div className="text-xs text-slate-400">
                      No hidden charges
                    </div>
                  </div>
                </div>
                <div className="mt-4">
                  <div className="flex items-center justify-between text-xs text-slate-300 mb-1">
                    <span>Step 1 of 3</span>
                    <span>33% complete</span>
                  </div>
                  <div className="w-full bg-slate-700 rounded-full h-1.5">
                    <div className="bg-gradient-to-r from-indigo-500 to-purple-500 h-1.5 rounded-full w-1/3"></div>
                  </div>
                </div>
              </div>

              {/* Form Content */}
              <div className="p-6 space-y-6">
                {/* User Type */}
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">
                    <span className="flex items-center gap-1.5 text-sm">
                      <Users className="w-3.5 h-3.5" />I am a <span className="text-red-500">*</span>
                    </span>
                  </label>
                  <div className="grid grid-cols-2 gap-2">
                    {["Owner", "Broker/Builder"].map((type) => (
                      <button
                        key={type}
                        type="button"
                        onClick={() => handleSelection("userType", type)}
                        className={`py-2.5 px-3 rounded-lg border transition-all duration-200 flex items-center justify-center gap-1.5 text-sm ${
                          form.userType === type
                            ? "border-transparent bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-semibold shadow-sm"
                            : "border-slate-200 bg-white hover:border-slate-300 text-slate-700 hover:bg-slate-50"
                        }`}
                      >
                        {form.userType === type && (
                          <CheckCircle className="w-3.5 h-3.5" />
                        )}
                        {type}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Property Type */}
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">
                    <span className="flex items-center gap-1.5 text-sm">
                      <Building2 className="w-3.5 h-3.5" />
                      Property Type <span className="text-red-500">*</span>
                    </span>
                  </label>
                  <div className="grid grid-cols-2 gap-2">
                    {["Residential", "Commercial"].map((item) => (
                      <button
                        key={item}
                        type="button"
                        onClick={() => handleSelection("propertyCategory", item)}
                        className={`py-2.5 px-3 rounded-lg border transition-all duration-200 flex items-center justify-center gap-1.5 text-sm ${
                          form.propertyCategory === item
                            ? "border-transparent bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-semibold shadow-sm"
                            : "border-slate-200 bg-white hover:border-slate-300 text-slate-700 hover:bg-slate-50"
                        }`}
                      >
                        {form.propertyCategory === item && (
                          <CheckCircle className="w-3.5 h-3.5" />
                        )}
                        {item}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Looking To */}
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">
                    <span className="flex items-center gap-1.5 text-sm">
                      <Target className="w-3.5 h-3.5" />
                      Looking to <span className="text-red-500">*</span>
                    </span>
                  </label>
                  <div className="grid grid-cols-3 gap-2">
                    {["Rent", "Sell", "PG"].map((item) => (
                      <button
                        key={item}
                        type="button"
                        onClick={() => handleSelection("lookingTo", item)}
                        className={`py-2.5 px-2 rounded-lg border text-sm transition-all duration-200 ${
                          form.lookingTo === item
                            ? "border-transparent bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-semibold shadow-sm"
                            : "border-slate-200 bg-white hover:border-slate-300 text-slate-700 hover:bg-slate-50"
                        }`}
                      >
                        {item}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Phone Input */}
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">
                    <span className="flex items-center gap-1.5 text-sm">
                      <Phone className="w-3.5 h-3.5" />
                      Contact Number <span className="text-red-500">*</span>
                    </span>
                  </label>
                  <div className="relative">
                    <div className="absolute left-3 top-1/2 transform -translate-y-1/2 flex items-center gap-1.5">
                      <span className="text-slate-900 font-medium text-sm">
                        +91
                      </span>
                      <div className="w-px h-3 bg-slate-300"></div>
                    </div>
                    <input
                      type="tel"
                      name="phone"
                      value={form.phone}
                      onChange={handleChange}
                      placeholder="Enter 10-digit mobile number"
                      className={`w-full pl-16 pr-4 py-3 rounded-lg border ${
                        error ? "border-red-500" : "border-slate-300"
                      } focus:border-indigo-500 focus:ring-1 focus:ring-indigo-200 outline-none transition-all duration-200 bg-white text-sm`}
                    />
                  </div>
                  {error && (
                    <p className="text-xs text-red-500 mt-1.5">{error}</p>
                  )}
                  <p className="text-xs text-slate-500 mt-1.5">
                    We'll call/SMS to verify and assist. No spam guaranteed.
                  </p>
                </div>

                {/* CTA Button - Now a <button> with validation */}
                <button
                  onClick={handleSubmit}
                  className="block w-full py-3.5 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white font-semibold rounded-lg shadow-md hover:shadow-lg transition-all duration-200 flex items-center justify-center gap-2 group text-sm hover:text-white focus:text-white"
                >
                  <span>Start Free Listing</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                </button>

                {/* Trust & Privacy */}
                <div className="text-center pt-2">
                  <div className="flex items-center justify-center gap-1.5 text-slate-600 text-xs mb-2">
                    <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" />
                    <span>Your data is 100% secure & private</span>
                  </div>
                  <p className="text-xs text-slate-500">
                    By continuing, you agree to our{" "}
                    <a href="#" className="text-indigo-600 hover:underline">
                      Terms
                    </a>{" "}
                    and{" "}
                    <a href="#" className="text-indigo-600 hover:underline">
                      Privacy Policy
                    </a>
                  </p>
                </div>
              </div>

              {/* Footer Badges */}
              <div className="border-t border-slate-200 p-4 bg-slate-50">
                <div className="grid grid-cols-2 gap-3">
                  <div className="flex items-center gap-2">
                    <MessageSquare className="w-3.5 h-3.5 text-emerald-500 flex-shrink-0" />
                    <div>
                      <div className="text-xs font-semibold text-slate-700">
                        WhatsApp Support
                      </div>
                      <div className="text-xs text-slate-500">
                        Instant assistance
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Calendar className="w-3.5 h-3.5 text-indigo-500 flex-shrink-0" />
                    <div>
                      <div className="text-xs font-semibold text-slate-700">
                        Schedule Tour
                      </div>
                      <div className="text-xs text-slate-500">
                        Flexible timings
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AddHouse;
