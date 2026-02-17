import { useState, useEffect } from "react";
import HeroSection from "../components/HeroSection";
import FeaturedDevelopers from "../components/featuredproperty";
import FurnitureDevelopers from "../components/FurnitureDevelopers";
import LatestProperties from "../components/LatestProperties";
import { useAppContext } from "../context/AppContext";

const Home = () => {
  const { properties: contextProperties } = useAppContext();
  const [featuredProperties, setFeaturedProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    try {
      setLoading(true);
      setError(null);

      // Filter out deleted properties
      let filtered = contextProperties.filter(
        (property) => !property.isDeleted,
      );

      // Sort by newest first using createdAt or fallback
      filtered.sort((a, b) => {
        const dateA = new Date(a.createdAt || a.postedDate || 0);
        const dateB = new Date(b.createdAt || b.postedDate || 0);
        return dateB - dateA;
      });

      // Take only the first 3
      const newestThree = filtered.slice(0, 4);

      // Transform for display
      const transformedProperties = newestThree.map((property) => {
        const bedroomMatch =
          property.type?.match(/(\d+)\s*BHK/) ||
          property.type?.match(/(\d+)\s*BED/) ||
          property.type?.match(/(\d+)\s*BEDROOM/);
        const bedrooms = bedroomMatch ? parseInt(bedroomMatch[1]) : 1;

        const bathroomMatch =
          property.type?.match(/(\d+)\s*BATH/) ||
          property.description?.match(/(\d+)\s*BATH/);
        const bathrooms = bathroomMatch
          ? parseInt(bathroomMatch[1])
          : Math.max(1, bedrooms - 1);

        const areaDisplay = property.area ?? "N/A";

        let price =
          property.price || property.monthlyRent || "Price on request";
        if (typeof price === "number") {
          price = `₹ ${price.toLocaleString("en-IN")}`;
        } else if (
          typeof price === "string" &&
          !price.includes("₹") &&
          price !== "Price on request"
        ) {
          price = `₹ ${price}`;
        }

        const images = property.images || property.photos;
        const firstImage =
          Array.isArray(images) && images.length > 0
            ? images[0]
            : "https://images.unsplash.com/photo-1613490493576-7fde63acd811";

        return {
          id: property.id || property._id,
          title: property.type || property.propertyType || "Property",
          type: property.type,
          price: price,
          location:
            property.locality ||
            property.location ||
            property.city ||
            "Location not specified",
          area: areaDisplay,
          bedrooms: bedrooms,
          bathrooms: bathrooms,
          furnishing:
            property.furnishing || property.furnishType || "Not specified",
          images: [firstImage],
          isVerified: property.verificationStatus === "Verified",
          isFeatured:
            property.visibility?.includes("High") || property.plan === "Paid",
          postedDate: property.lastAdded || property.createdAt || "Recently",
          category: property.category || "Rent",
          status: property.status || "Under Review",
          isActive: property.isActive || false,
          propertyType: property.propertyType || "Residential",
          city: property.city,
          description: property.description,
        };
      });

      setFeaturedProperties(transformedProperties);
    } catch (err) {
      console.error("Error processing properties:", err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, [contextProperties]);

  const handleShowAll = () => {
    window.location.href = "/properties";
  };

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center p-8 bg-red-50 rounded-lg">
          <h2 className="text-2xl font-bold text-red-800 mb-4">
            Something went wrong
          </h2>
          <p className="text-red-600">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="mt-4 px-4 py-2 bg-red-600 text-white rounded-lg"
          >
            Reload Page
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <HeroSection />
      <FeaturedDevelopers />
      <LatestProperties
        featuredProperties={featuredProperties}
        loading={loading}
        error={error}
        onShowAll={handleShowAll}
        totalCount={contextProperties.length}
      />
      <FurnitureDevelopers />
    </div>
  );
};

export default Home;
