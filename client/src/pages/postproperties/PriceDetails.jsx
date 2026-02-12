import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Clock, ArrowLeft, Calendar, IndianRupee, Shield, HelpCircle, Upload, X, Image, Film } from "lucide-react";
import Navbar from "../../pages/admindashboard/Navbar";
import API from "../../services/api";

const PriceDetails = () => {
  const location = useLocation();
  const navigate = useNavigate();
  
  const [form, setForm] = useState({
    name: "",
    city: "",
    propertyType: "Apartment",
    projectName: "",
    locality: "",
    bhk: "2",
    area: "",
    areaUnit: "sqft",
    furnishType: "Fully Furnished",
    amenities: [],
    
    monthlyRent: "",
    availableFrom: new Date().toISOString().split('T')[0],
    securityDeposit: "2 month",
    customDeposit: "",
  });

  const [photos, setPhotos] = useState([]);
  const [photoPreview, setPhotoPreview] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (location.state?.formData) {
      setForm(prev => ({
        ...prev,
        ...location.state.formData
      }));
    }
  }, [location.state]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handlePhotoUpload = (e) => {
    const files = Array.from(e.target.files);
    const newPhotos = files.slice(0, 10 - photos.length);
    
    newPhotos.forEach(file => {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPhotoPreview(prev => [...prev, reader.result]);
      };
      reader.readAsDataURL(file);
    });
    
    setPhotos(prev => [...prev, ...newPhotos]);
  };

  const removePhoto = (index) => {
    setPhotos(prev => prev.filter((_, i) => i !== index));
    setPhotoPreview(prev => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validation
    if (!form.monthlyRent || !form.availableFrom) {
      alert("Please fill in all required fields");
      return;
    }

    setIsSubmitting(true);

    try {
      const payload = {
        userType: "Owner",
        phone: "9999999999",
        name: form.name || "Unnamed Property",
        city: form.city || "Unknown City",
        locality: form.locality || "Unknown Locality",
        propertyType: form.propertyType,
        bhk: form.bhk,
        area: parseInt(form.area) || 0,
        areaUnit: form.areaUnit,
        furnishType: form.furnishType,
        amenities: form.amenities || [],

        monthlyRent: parseInt(form.monthlyRent),
        securityDeposit: form.customDeposit || form.securityDeposit,
        availableFrom: form.availableFrom,

        photos: photoPreview,
        videos: [],

        status: "Under Review",
        isActive: false,
        isDeleted: false,
        verificationStatus: "Pending",
        createdAt: new Date().toISOString()
      };

      const res = await API.post("/properties", payload);
      console.log("Property saved:", res.data);
      
      alert("✅ Property posted successfully!");
      
      // Redirect to YourPosts page
      navigate("/your-posts");

    } catch (err) {
      console.error("Error posting property:", err);
      alert("❌ Failed to post property. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleBack = () => {
    navigate(-1); // Go back to previous page
  };

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 py-8 px-4">
        <div className="max-w-2xl mx-auto">
          <form onSubmit={handleSubmit} className="bg-white rounded-2xl shadow-sm border border-slate-200 p-8">
            {/* Header */}
            <div className="flex items-center justify-between mb-8">
              <div>
                <h2 className="text-2xl font-bold text-slate-900">Add Price Details</h2>
                <div className="flex items-center gap-2 mt-2">
                  <HelpCircle className="w-4 h-4 text-slate-400" />
                  <span className="text-sm text-slate-500">Complete your property listing</span>
                </div>
              </div>
              <button
                type="button"
                onClick={handleBack}
                className="flex items-center gap-2 text-slate-600 hover:text-slate-900 hover:bg-slate-100 px-3 py-2 rounded-lg transition-colors"
              >
                <ArrowLeft className="w-4 h-4" />
                Back
              </button>
            </div>

            {/* Timer Alert */}
            <div className="mb-8 p-4 bg-gradient-to-r from-amber-50 to-orange-50 border border-amber-200 rounded-xl">
              <div className="flex items-center gap-3">
                <Clock className="w-5 h-5 text-amber-600" />
                <div className="flex-1">
                  <h3 className="font-semibold text-amber-800">Complete your listing!</h3>
                  <p className="text-sm text-amber-700">Just a few more details to post your property</p>
                </div>
              </div>
            </div>

            {/* Form Fields */}
            <div className="space-y-8">
              {/* Monthly Rent */}
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">
                  Monthly Rent (₹) *
                </label>
                <div className="relative">
                  <IndianRupee className="absolute left-4 top-1/2 transform -translate-y-1/2 text-slate-400 w-5 h-5" />
                  <input
                    type="number"
                    name="monthlyRent"
                    value={form.monthlyRent}
                    onChange={handleChange}
                    placeholder="Enter monthly rent"
                    className="w-full pl-12 pr-4 py-3 rounded-xl border border-slate-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 outline-none transition-all duration-200"
                    required
                    min="0"
                  />
                </div>
              </div>

              {/* Available From */}
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">
                  Available From *
                </label>
                <div className="relative">
                  <Calendar className="absolute left-4 top-1/2 transform -translate-y-1/2 text-slate-400 w-5 h-5" />
                  <input
                    type="date"
                    name="availableFrom"
                    value={form.availableFrom}
                    onChange={handleChange}
                    className="w-full pl-12 pr-4 py-3 rounded-xl border border-slate-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 outline-none transition-all duration-200"
                    required
                  />
                </div>
              </div>

              {/* Security Deposit */}
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-3">
                  Security Deposit
                </label>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-4">
                  {["None", "1 month", "2 month", "Custom"].map((deposit) => (
                    <button
                      key={deposit}
                      type="button"
                      onClick={() => setForm(prev => ({ 
                        ...prev, 
                        securityDeposit: deposit,
                        customDeposit: deposit === "Custom" ? prev.customDeposit : ""
                      }))}
                      className={`py-3 px-4 rounded-xl border text-sm font-medium transition-all duration-200 flex items-center justify-center gap-2 ${
                        form.securityDeposit === deposit
                          ? "border-indigo-500 bg-gradient-to-r from-indigo-50 to-indigo-25 text-indigo-700"
                          : "border-slate-200 hover:border-slate-300 text-slate-700"
                      }`}
                    >
                      {deposit}
                    </button>
                  ))}
                </div>
                
                {form.securityDeposit === "Custom" && (
                  <div className="relative">
                    <IndianRupee className="absolute left-4 top-1/2 transform -translate-y-1/2 text-slate-400 w-5 h-5" />
                    <input
                      type="number"
                      name="customDeposit"
                      value={form.customDeposit}
                      onChange={handleChange}
                      placeholder="Enter custom deposit amount"
                      className="w-full pl-12 pr-4 py-3 rounded-xl border border-slate-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 outline-none transition-all duration-200"
                      min="0"
                    />
                  </div>
                )}
              </div>

              {/* Upload Photos */}
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-3">
                  Upload Photos
                </label>
                <div className="border-2 border-dashed border-slate-300 rounded-xl p-6 text-center hover:border-indigo-400 transition-colors duration-200">
                  <input
                    type="file"
                    multiple
                    accept="image/*"
                    onChange={handlePhotoUpload}
                    className="hidden"
                    id="photo-input"
                  />
                  <label htmlFor="photo-input" className="cursor-pointer">
                    <div className="flex flex-col items-center gap-2">
                      <Image className="w-8 h-8 text-slate-400" />
                      <p className="text-sm font-medium text-slate-700">Click to upload photos</p>
                      <p className="text-xs text-slate-500">You can upload up to 10 photos (JPG, PNG, GIF)</p>
                    </div>
                  </label>
                </div>

                {/* Photo Preview */}
                {photoPreview.length > 0 && (
                  <div className="mt-4">
                    <p className="text-sm font-medium text-slate-700 mb-3">
                      Uploaded Photos ({photos.length}/10)
                    </p>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                      {photoPreview.map((preview, index) => (
                        <div key={index} className="relative group">
                          <img
                            src={preview}
                            alt={`Preview ${index + 1}`}
                            className="w-full h-24 object-cover rounded-lg border border-slate-200"
                          />
                          <button
                            type="button"
                            onClick={() => removePhoto(index)}
                            className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity duration-200"
                          >
                            <X className="w-4 h-4" />
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Submit Button */}
              <div className="pt-8 border-t border-slate-100">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className={`w-full py-4 bg-gradient-to-r from-green-600 to-emerald-600 text-white font-semibold rounded-xl hover:shadow-lg transition-all duration-200 flex items-center justify-center gap-2 ${
                    isSubmitting ? "opacity-70 cursor-not-allowed" : "hover:-translate-y-0.5"
                  }`}
                >
                  <Shield className="w-5 h-5" />
                  {isSubmitting ? "Posting..." : "Post Property"}
                </button>
                
                <p className="text-sm text-slate-500 text-center mt-4">
                  Your property will be reviewed and activated within 24 hours
                </p>
              </div>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default PriceDetails;