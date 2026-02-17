import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Home, MapPin, Square, Ruler, Sofa, Check, HelpCircle, ArrowLeft, MessageCircle, ChevronRight } from "lucide-react";
import Navbar from "../../pages/admindashboard/Navbar";
import API from "../../services/api";

const PropertyDetails = () => {
  const location = useLocation();
  const navigate = useNavigate();
  
  const [form, setForm] = useState({
    // Property Details
    name: "",
    city: "",
    propertyType: "",
    projectName: "",
    locality: "",
    bhk: "",
    area: "",
    areaUnit: "sqft",
    furnishType: "",
    amenities: [],
    shareWithAgents: false,
     userType: "Owner",
    phone: "",
    category: "Residential",
    purpose: "Rent",
  });

  // Get data passed from previous page
  useEffect(() => {
    if (location.state?.formData) {
      setForm(prev => ({
        ...prev,
        ...location.state.formData
      }));
    }
  }, [location.state]);

  const propertyTypes = [
    "Apartment",
    "Independent House",
    "Duplex",
    "Independent Floor",
    "Villa",
    "Penthouse",
    "Studio",
    "Farm House"
  ];

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleAmenityToggle = (amenity) => {
    setForm(prev => ({
      ...prev,
      amenities: prev.amenities.includes(amenity)
        ? prev.amenities.filter(a => a !== amenity)
        : [...prev.amenities, amenity]
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Property details submitted:", form);
    // Navigate to Price Details page with form data
    navigate("/price-details", { state: { formData: form } });
  };

  const handleBack = () => {
    navigate(-1); // Go back to previous page
  };

  // Progress Sidebar
  const ProgressSidebar = () => (
    <div className="lg:col-span-1">
      <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6 sticky top-8">
        <div className="flex items-center gap-2 mb-6">
          <Home className="w-5 h-5 text-indigo-600" />
          <h1 className="text-xl font-bold text-slate-900">Post your property</h1>
        </div>
        
        <p className="text-slate-600 mb-8">Sell or rent your property</p>
        
        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm font-medium text-slate-700">
              5% completed
            </span>
          </div>
          <div className="w-full bg-slate-200 rounded-full h-2">
            <div 
              className="bg-gradient-to-r from-indigo-500 to-purple-500 h-2 rounded-full transition-all duration-500" 
              style={{ width: '5%' }}
            ></div>
          </div>
        </div>

        {/* Progress Steps */}
        <div className="space-y-6">
          <div>
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold bg-amber-100 text-amber-600">
                  1
                </div>
                <span className="font-semibold text-slate-900">Property Details</span>
              </div>
              <span className="text-sm px-3 py-1 rounded-full bg-amber-100 text-amber-800">
                In progress
              </span>
            </div>
            <p className="text-sm text-slate-500 ml-11">Add property specifications</p>
          </div>

          <div>
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold bg-slate-100 text-slate-400">
                  2
                </div>
                <span className="font-medium text-slate-500">
                  Price Details
                </span>
              </div>
              <span className="text-sm px-3 py-1 rounded-full text-slate-400">
                Pending
              </span>
            </div>
            <p className="text-sm text-slate-400 ml-11">Set pricing information</p>
          </div>

          <div className="pt-6 border-t border-slate-100">
            <div className="flex items-center gap-3 text-indigo-600 hover:text-indigo-700 cursor-pointer">
              <MessageCircle className="w-5 h-5" />
              <span className="font-medium">Need help? Now you can directly post property via WhatsApp</span>
              <ChevronRight className="w-4 h-4 ml-auto" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 py-8 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <ProgressSidebar />
            <div className="lg:col-span-2">
              <form onSubmit={handleSubmit} className="bg-white rounded-2xl shadow-sm border border-slate-200 p-8">
                {/* Header */}
                <div className="flex items-center justify-between mb-8">
                  <div>
                    <h2 className="text-2xl font-bold text-slate-900">Add Property Details</h2>
                    <div className="flex items-center gap-2 mt-2">
                      <HelpCircle className="w-4 h-4 text-slate-400" />
                      <span className="text-sm text-slate-500">Need help? Get a callback</span>
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={handleBack}
                    className="flex items-center gap-2 text-slate-600 hover:text-slate-900"
                  >
                    <ArrowLeft className="w-4 h-4" />
                    Back
                  </button>
                </div>

                {/* Form Fields */}
                <div className="space-y-8">
                  {/* Your Name */}
                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-2">
                      Your Name
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={form.name}
                      onChange={handleChange}
                      placeholder="Enter your full name"
                      className="w-full px-4 py-3 rounded-xl border border-slate-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 outline-none transition-all duration-200"
                      required
                    />
                  </div>

                  {/* City */}
                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-2">
                      City
                    </label>
                    <div className="relative">
                      <MapPin className="absolute left-4 top-1/2 transform -translate-y-1/2 text-slate-400 w-5 h-5" />
                      <input
                        type="text"
                        name="city"
                        value={form.city}
                        onChange={handleChange}
                        placeholder="Q. Search City"
                        className="w-full pl-12 pr-4 py-3 rounded-xl border border-slate-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 outline-none transition-all duration-200"
                        required
                      />
                    </div>
                  </div>

                  {/* Property Type */}
                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-3">
                      Property Type
                    </label>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                      {propertyTypes.map((type) => (
                        <button
                          key={type}
                          type="button"
                          onClick={() => setForm(prev => ({ ...prev, propertyType: type }))}
                          className={`py-3 px-4 rounded-xl border text-sm font-medium transition-all duration-200 flex items-center justify-center gap-2 ${
                            form.propertyType === type
                              ? "border-indigo-500 bg-gradient-to-r from-indigo-500 to-purple-600 text-white"
                              : "border-slate-200 bg-white hover:border-slate-300 text-slate-700"
                          }`}
                        >
                          <Square className="w-4 h-4" />
                          {type}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Building/Project/Society */}
                  {form.propertyType && (
                    <div>
                      <label className="block text-sm font-semibold text-slate-700 mb-2">
                        Building/Project/Society (Optional)
                      </label>
                      <input
                        type="text"
                        name="projectName"
                        value={form.projectName}
                        onChange={handleChange}
                        placeholder="Enter building or society name"
                        className="w-full px-4 py-3 rounded-xl border border-slate-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 outline-none transition-all duration-200"
                      />
                    </div>
                  )}

                  {/* Locality */}
                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-2">
                      Locality
                    </label>
                    <input
                      type="text"
                      name="locality"
                      value={form.locality}
                      onChange={handleChange}
                      placeholder="Please enter a valid locality"
                      className="w-full px-4 py-3 rounded-xl border border-slate-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 outline-none transition-all duration-200"
                      required
                    />
                  </div>

                  {/* BHK */}
                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-3">
                      BHK
                    </label>
                    <div className="flex flex-wrap gap-3">
                      {["1 RK", "1 BHK", "1.5 BHK", "2 BHK", "3+ BHK"].map((bhk) => (
                        <button
                          key={bhk}
                          type="button"
                          onClick={() => setForm(prev => ({ ...prev, bhk }))}
                          className={`px-6 py-3 rounded-xl border text-sm font-medium transition-all duration-200 ${
                            form.bhk === bhk
                              ? "border-indigo-500 bg-gradient-to-r from-indigo-500 to-purple-600 text-white"
                              : "border-slate-200 bg-white hover:border-slate-300 text-slate-700"
                          }`}
                        >
                          {bhk}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Built Up Area */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-semibold text-slate-700 mb-2">
                        Built Up Area
                      </label>
                      <div className="relative">
                        <Ruler className="absolute left-4 top-1/2 transform -translate-y-1/2 text-slate-400 w-5 h-5" />
                        <input
                          type="number"
                          name="area"
                          value={form.area}
                          onChange={handleChange}
                          placeholder="Enter area"
                          className="w-full pl-12 pr-4 py-3 rounded-xl border border-slate-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 outline-none transition-all duration-200"
                          required
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-slate-700 mb-2">
                        Area Unit
                      </label>
                      <select
                        name="areaUnit"
                        value={form.areaUnit}
                        onChange={handleChange}
                        className="w-full px-4 py-3 rounded-xl border border-slate-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 outline-none transition-all duration-200 bg-white"
                      >
                        <option value="sqft">Square Feet (sqft)</option>
                        <option value="sqm">Square Meter (sqm)</option>
                        <option value="acre">Acre</option>
                        <option value="hectare">Hectare</option>
                      </select>
                    </div>
                  </div>

                  {/* Furnish Type */}
                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-3">
                      Furnish Type
                    </label>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                      {["Fully Furnished", "Semi Furnished", "Unfurnished"].map((type) => (
                        <button
                          key={type}
                          type="button"
                          onClick={() => setForm(prev => ({ ...prev, furnishType: type }))}
                          className={`py-3 px-4 rounded-xl border text-sm font-medium transition-all duration-200 flex items-center justify-center gap-2 ${
                            form.furnishType === type
                              ? "border-indigo-500 bg-gradient-to-r from-indigo-500 to-purple-600 text-white"
                              : "border-slate-200 bg-white hover:border-slate-300 text-slate-700"
                          }`}
                        >
                          <Sofa className="w-4 h-4" />
                          {type}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Amenities */}
                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-3">
                      Add Furnishings / Amenities
                    </label>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                      {["AC", "TV", "Refrigerator", "Washing Machine", "Microwave", "RO Water", "Bed", "Wardrobe"].map((amenity) => (
                        <button
                          key={amenity}
                          type="button"
                          onClick={() => handleAmenityToggle(amenity)}
                          className={`py-3 px-4 rounded-xl border text-sm font-medium transition-all duration-200 flex items-center justify-center gap-2 ${
                            form.amenities.includes(amenity)
                              ? "border-green-500 bg-green-500 text-white"
                              : "border-slate-200 bg-white hover:border-slate-300 text-slate-700"
                          }`}
                        >
                          {form.amenities.includes(amenity) && <Check className="w-4 h-4" />}
                          {amenity}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Share with Agents */}
                  <div className="flex items-center gap-3 p-4 bg-slate-50 rounded-xl">
                    <input
                      type="checkbox"
                      id="shareWithAgents"
                      name="shareWithAgents"
                      checked={form.shareWithAgents}
                      onChange={handleChange}
                      className="w-5 h-5 rounded border-slate-300 text-indigo-600 focus:ring-indigo-500"
                    />
                    <label htmlFor="shareWithAgents" className="text-sm text-slate-700">
                      Share listing information with agents
                    </label>
                  </div>

                  {/* Next Button */}
                  <div className="pt-8 border-t border-slate-100">
                    <button
                      type="submit"
                      className="w-full py-4 bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-semibold rounded-xl hover:shadow-lg transition-all duration-200 transform hover:-translate-y-0.5 flex items-center justify-center gap-2"
                    >
                      Next, add price details
                      <ChevronRight className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default PropertyDetails;