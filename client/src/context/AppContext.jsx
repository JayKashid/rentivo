import { createContext, useContext, useState, useEffect } from "react";
import API from "../services/api"; // adjust the import path as needed

const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [properties, setProperties] = useState(() => {
    // Load from localStorage for instant initial render
    try {
      const savedProperties = localStorage.getItem('propertyListings');
      if (savedProperties) {
        return JSON.parse(savedProperties);
      }
    } catch (error) {
      console.error("Error loading properties from localStorage:", error);
    }
    return [];
  });

  // Fetch fresh data from backend on mount and update state
  const refreshProperties = async () => {
    try {
      const res = await API.get("/properties");
      // Transform backend data to match context shape (if needed)
      const transformed = res.data.map(p => ({
        id: p._id,                 // use _id as id
        ...p,
        // Ensure fields used in Home exist
        type: p.propertyType,      // map if needed
        location: p.locality,
        city: p.city,
        price: p.monthlyRent,
        images: p.photos?.length ? p.photos : ['https://images.unsplash.com/photo-1613490493576-7fde63acd811'],
        isActive: p.status === 'Active',
        isDeleted: false,
        postedDate: p.createdAt,
        lastAdded: new Date(p.createdAt).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }),
        category: 'Rent',           // or from p.category if you have it
        furnishing: p.furnishType,
        verificationStatus: p.verificationStatus || 'Pending',
        // ... add any other fields your Home component expects
      }));
      setProperties(transformed);
      // Also update localStorage for future quick loads
      localStorage.setItem('propertyListings', JSON.stringify(transformed));
    } catch (error) {
      console.error("Failed to refresh properties from backend:", error);
    }
  };

  // Initial fetch
  useEffect(() => {
    refreshProperties();
  }, []);

  // Save to localStorage whenever properties change (for offline/quick load)
  useEffect(() => {
    try {
      localStorage.setItem('propertyListings', JSON.stringify(properties));
    } catch (error) {
      console.error("Error saving properties to localStorage:", error);
    }
  }, [properties]);

  // ... rest of your context functions (addProperty, deleteProperty, etc.)
  // They should work with the updated properties state.

  const addProperty = (propertyData) => {
    // This might be used for local-only additions, but after backend integration
    // you probably want to use refreshProperties instead.
    // For now, keep it but consider removing or deprecating.
    const newProperty = {
      id: Date.now(),
      status: "Under Review",
      isActive: false,
      isDeleted: false,
      plan: "Free",
      visibility: "Low (Free Plan)",
      verificationStatus: "Pending",
      lastAdded: new Date().toLocaleDateString('en-GB', { 
        day: '2-digit', 
        month: 'short', 
        year: 'numeric' 
      }),
      createdAt: new Date().toISOString(),
      location: "Pune",
      city: "Pune",
      images: ['https://images.unsplash.com/photo-1613490493576-7fde63acd811'],
      ...propertyData,
    };
    setProperties((prev) => [newProperty, ...prev]);
    return newProperty;
  };

  // Other functions (deleteProperty, activateProperty, etc.) remain similar,
  // but they should also probably call the backend API and then refresh.
  // We'll keep them as is for now.

  const deleteProperty = (id) => {
    if (window.confirm("Are you sure you want to permanently delete this property?")) {
      setProperties((prev) => prev.filter((item) => item.id !== id));
      return true;
    }
    return false;
  };

  const activateProperty = (id) => {
    setProperties((prev) =>
      prev.map((item) =>
        item.id === id
          ? { 
              ...item, 
              isActive: true, 
              status: "Active", 
              verificationStatus: "Verified",
              isDeleted: false,
              visibility: item.plan === "Paid" ? "High (Paid Plan)" : "Medium"
            }
          : item
      )
    );
  };

  const restoreProperty = (id) => {
    setProperties((prev) =>
      prev.map((item) =>
        item.id === id
          ? { 
              ...item, 
              isDeleted: false, 
              status: "Under Review",
              isActive: false,
              verificationStatus: "Pending",
              lastAdded: new Date().toLocaleDateString('en-GB', { 
                day: '2-digit', 
                month: 'short', 
                year: 'numeric' 
              })
            }
          : item
      )
    );
  };

  const updateProperty = (id, updates) => {
    setProperties((prev) =>
      prev.map((item) =>
        item.id === id
          ? { 
              ...item, 
              ...updates,
              lastAdded: new Date().toLocaleDateString('en-GB', { 
                day: '2-digit', 
                month: 'short', 
                year: 'numeric' 
              }),
              status: updates.status || "Under Review",
              verificationStatus: updates.verificationStatus || "Pending"
            }
          : item
      )
    );
  };

  const addPropertyAsAdmin = (propertyData) => {
    const newProperty = {
      id: Date.now(),
      status: "Active",
      isActive: true,
      isDeleted: false,
      plan: propertyData.plan || "Paid",
      visibility: "High (Paid Plan)",
      verificationStatus: "Verified",
      lastAdded: new Date().toLocaleDateString('en-GB', { 
        day: '2-digit', 
        month: 'short', 
        year: 'numeric' 
      }),
      createdAt: new Date().toISOString(),
      ...propertyData,
    };
    setProperties((prev) => [newProperty, ...prev]);
    return newProperty;
  };

  const getStats = () => {
    return {
      total: properties.length,
      active: properties.filter(p => p.isActive).length,
      pending: properties.filter(p => !p.isActive && !p.isDeleted).length,
      deleted: properties.filter(p => p.isDeleted).length,
      residential: properties.filter(p => p.propertyType === 'Residential').length,
      commercial: properties.filter(p => p.propertyType === 'Commercial').length,
      rent: properties.filter(p => p.category === 'Rent').length,
      buy: properties.filter(p => p.category === 'Buy').length,
    };
  };

  const searchProperties = (query, filters = {}) => {
    let results = [...properties];
    
    if (query) {
      const searchQuery = query.toLowerCase();
      results = results.filter(property => 
        property.type?.toLowerCase().includes(searchQuery) ||
        property.location?.toLowerCase().includes(searchQuery) ||
        property.city?.toLowerCase().includes(searchQuery) ||
        property.description?.toLowerCase().includes(searchQuery)
      );
    }
    
    if (filters.category) {
      results = results.filter(p => p.category === filters.category);
    }
    
    if (filters.propertyType && filters.propertyType !== 'All') {
      results = results.filter(p => p.propertyType === filters.propertyType);
    }
    
    if (filters.status && filters.status !== 'All') {
      if (filters.status === 'Active') {
        results = results.filter(p => p.isActive);
      } else if (filters.status === 'Pending') {
        results = results.filter(p => !p.isActive && !p.isDeleted);
      }
    }
    
    return results;
  };

  return (
    <AppContext.Provider
      value={{
        properties,
        refreshProperties,   // expose the refresh function
        addProperty,
        addPropertyAsAdmin,
        deleteProperty,
        activateProperty,
        restoreProperty,
        updateProperty,
        getStats,
        searchProperties
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => useContext(AppContext);