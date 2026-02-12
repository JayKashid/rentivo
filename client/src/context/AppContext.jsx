import { createContext, useContext, useState, useEffect } from "react";

/**
 * Global App Context
 */
const AppContext = createContext();

/**
 * Provider Component
 */
export const AppProvider = ({ children }) => {
  const [properties, setProperties] = useState(() => {
    // Load from localStorage on initial render
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

  /**
   * Save to localStorage whenever properties change
   */
  useEffect(() => {
    try {
      localStorage.setItem('propertyListings', JSON.stringify(properties));
    } catch (error) {
      console.error("Error saving properties to localStorage:", error);
    }
  }, [properties]);

  /**
   * Enhanced addProperty with more fields
   */
  const addProperty = (propertyData) => {
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
      // Default values for missing fields
      location: "Pune",
      city: "Pune",
      images: ['https://images.unsplash.com/photo-1613490493576-7fde63acd811'],
      ...propertyData, // Override with user data
    };

    setProperties((prev) => [newProperty, ...prev]);
    return newProperty;
  };

  /**
   * DELETE PROPERTY - COMPLETELY REMOVE FROM ARRAY
   */
  const deleteProperty = (id) => {
    if (window.confirm("Are you sure you want to permanently delete this property?")) {
      setProperties((prev) => prev.filter((item) => item.id !== id));
      return true;
    }
    return false;
  };

  /**
   * Activate/Approve property (Admin function)
   */
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

  /**
   * Restore/Resubmit deleted property
   */
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

  /**
   * Update existing property
   */
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

  /**
   * Add property from admin (with approval)
   */
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

  /**
   * Get statistics
   */
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

  /**
   * Search properties
   */
  const searchProperties = (query, filters = {}) => {
    let results = [...properties];
    
    // Filter by query
    if (query) {
      const searchQuery = query.toLowerCase();
      results = results.filter(property => 
        property.type?.toLowerCase().includes(searchQuery) ||
        property.location?.toLowerCase().includes(searchQuery) ||
        property.city?.toLowerCase().includes(searchQuery) ||
        property.description?.toLowerCase().includes(searchQuery)
      );
    }
    
    // Filter by category
    if (filters.category) {
      results = results.filter(p => p.category === filters.category);
    }
    
    // Filter by property type
    if (filters.propertyType && filters.propertyType !== 'All') {
      results = results.filter(p => p.propertyType === filters.propertyType);
    }
    
    // Filter by status
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

/**
 * Custom Hook
 */
export const useAppContext = () => useContext(AppContext);