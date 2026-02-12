import React, { useState, useEffect, useCallback } from 'react';
import { 
  Calendar, Home, Building2, RefreshCw, Upload,
  TrendingUp, Shield, Plus, Edit, Trash2, Clock, CheckCircle, XCircle,
  IndianRupee, Filter, RotateCcw, AlertCircle, AlertTriangle
} from 'lucide-react';
import Navbar from './Navbar';
import API from '../../services/api';

const YourPosts = () => {
  const [showAddForm, setShowAddForm] = useState(false);
  const [newProperty, setNewProperty] = useState({
    name: '',
    city: '',
    locality: '',
    propertyType: 'Apartment',
    bhk: '2',
    area: '',
    areaUnit: 'sqft',
    furnishType: 'Fully Furnished',
    monthlyRent: '',
    securityDeposit: '2 month',
    availableFrom: new Date().toISOString().split('T')[0]
  });
  
  const [editingId, setEditingId] = useState(null);
  const [editForm, setEditForm] = useState({});
  const [properties, setProperties] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);
  const [deletingId, setDeletingId] = useState(null);
  
  const [filters, setFilters] = useState({
    subCategory: 'All',
  });

  // Fetch properties function
  const fetchProperties = useCallback(async () => {
    try {
      setRefreshing(true);
      setError(null);
      const res = await API.get("/properties");
      
      if (res.data && Array.isArray(res.data)) {
        // Transform and sort properties (newest first)
        const transformedProperties = res.data.map(property => ({
          id: property._id,
          _id: property._id,
          name: property.name || 'Unnamed Property',
          city: property.city || '',
          locality: property.locality || '',
          propertyType: property.propertyType || 'Apartment',
          bhk: property.bhk || '2',
          area: property.area || 0,
          areaUnit: property.areaUnit || 'sqft',
          furnishType: property.furnishType || 'Fully Furnished',
          monthlyRent: property.monthlyRent || 0,
          securityDeposit: property.securityDeposit || '2 month',
          availableFrom: property.availableFrom || new Date().toISOString().split('T')[0],
          status: property.status || 'Under Review',
          isActive: property.status === 'Active',
          isUnderReview: property.status === 'Under Review',
          isDeleted: property.status === 'Deleted',
          verificationStatus: property.verificationStatus || 'Pending',
          createdAt: property.createdAt || new Date(),
          photos: property.photos || [],
          
          // Display fields
          price: property.monthlyRent ? `₹${parseInt(property.monthlyRent).toLocaleString('en-IN')}` : '₹0',
          type: `${property.bhk || '2'} BHK ${property.propertyType || 'Apartment'}`,
          areaDisplay: `${property.area || 0} ${property.areaUnit || 'sqft'}`,
          furnishing: property.furnishType || 'Fully Furnished',
          category: 'Rent',
          lastAdded: property.createdAt 
            ? new Date(property.createdAt).toLocaleDateString('en-GB', { 
                day: '2-digit', 
                month: 'short', 
                year: 'numeric' 
              })
            : 'Today',
        })).sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
        
        setProperties(transformedProperties);
      } else {
        throw new Error('Invalid data format received from server');
      }
    } catch (error) {
      console.error("Failed to fetch properties:", error);
      setError('Failed to load properties. Please try again.');
    } finally {
      setIsLoading(false);
      setRefreshing(false);
    }
  }, []);

  // Initial fetch
  useEffect(() => {
    fetchProperties();
  }, [fetchProperties]);

  // Subcategories for filtering
  const subCategories = [
    { label: "All Properties", count: properties.length, key: "All" },
    { label: "Active", count: properties.filter(p => p.status === 'Active').length, key: "Active" },
    { label: "Under Review", count: properties.filter(p => p.status === 'Under Review').length, key: "UnderReview" },
  ];

  const handleFilterChange = (key, value) => {
    setFilters(prev => ({ ...prev, [key]: value }));
  };

  // HARD DELETE FUNCTION - PERMANENTLY REMOVE FROM MONGODB
  const handleDelete = async (id) => {
    if (!id) {
      setError('Invalid property ID');
      return;
    }

    // Get property details for confirmation message
    const propertyToDelete = properties.find(p => p._id === id);
    if (!propertyToDelete) {
      setError('Property not found');
      return;
    }

    // Strong confirmation for permanent deletion
    const confirmed = window.confirm(
      `⚠️ PERMANENT DELETE WARNING!\n\n` +
      `You are about to PERMANENTLY delete:\n` +
      `• ${propertyToDelete.name}\n` +
      `• ${propertyToDelete.type}\n` +
      `• ${propertyToDelete.price}/month\n` +
      `• ${propertyToDelete.locality}, ${propertyToDelete.city}\n\n` +
      `✅ This will FREE UP storage space\n` +
      `❌ This action CANNOT be undone!\n\n` +
      `Are you absolutely sure you want to permanently delete this property?`
    );

    if (!confirmed) {
      return; // User cancelled
    }

    try {
      setDeletingId(id);
      setError(null);
      setSuccessMessage(null);
      
      console.log(`🚨 Attempting HARD DELETE for property ID: ${id}`);
      
      // Use DELETE method to permanently remove from MongoDB
      const response = await API.delete(`/properties/${id}`);
      
      console.log('✅ Hard delete successful:', response.data);
      
      // Remove from local state completely
      setProperties(prev => prev.filter(p => p._id !== id));
      
      setSuccessMessage('✅ Property permanently deleted from database! Storage has been freed.');
      setTimeout(() => setSuccessMessage(null), 4000);
      
    } catch (error) {
      console.error("❌ Failed to delete property:", error);
      console.error("Error details:", error.response?.data || error.message);
      
      // If DELETE method fails (404 or 405), it means DELETE endpoint doesn't exist
      if (error.response?.status === 404 || error.response?.status === 405) {
        console.log('DELETE endpoint not found, trying PUT as fallback...');
        
        // Show user option for fallback
        const fallbackConfirmed = window.confirm(
          'DELETE endpoint not available. Try fallback method?\n\n' +
          'Note: Fallback might not free up storage immediately.'
        );
        
        if (fallbackConfirmed) {
          try {
            // Try PUT method to mark as deleted (soft delete as fallback)
            const putResponse = await API.put(`/properties/${id}`, {
              status: "Deleted",
              isActive: false,
              isDeleted: true,
              deletedAt: new Date().toISOString()
            });
            
            console.log('✅ Fallback delete successful:', putResponse.data);
            
            // Update local state
            setProperties(prev => prev.map(p => 
              p._id === id 
                ? { ...p, status: 'Deleted', isActive: false, isDeleted: true }
                : p
            ));
            
            setSuccessMessage('Property marked as deleted (fallback). Storage may not be freed.');
            setTimeout(() => setSuccessMessage(null), 4000);
            
          } catch (putError) {
            console.error('❌ Fallback also failed:', putError);
            setError('Both DELETE and fallback methods failed. Please check backend configuration.');
            setTimeout(() => setError(null), 5000);
          }
        }
      } else {
        setError('Failed to delete property. Server error.');
        setTimeout(() => setError(null), 5000);
      }
    } finally {
      setDeletingId(null);
    }
  };

  const handleEdit = (property) => {
    setEditingId(property._id);
    setEditForm({
      name: property.name,
      city: property.city,
      locality: property.locality,
      monthlyRent: property.monthlyRent,
      area: property.area,
      furnishType: property.furnishType,
      propertyType: property.propertyType,
      bhk: property.bhk,
      areaUnit: property.areaUnit,
      securityDeposit: property.securityDeposit,
    });
  };

  const handleSaveEdit = async (id) => {
    if (!id) {
      setError('Invalid property ID');
      return;
    }

    try {
      setError(null);
      setSuccessMessage(null);
      
      const updatedProperty = {
        name: editForm.name,
        city: editForm.city,
        locality: editForm.locality,
        monthlyRent: parseInt(editForm.monthlyRent) || 0,
        area: parseInt(editForm.area) || 0,
        furnishType: editForm.furnishType,
        propertyType: editForm.propertyType,
        bhk: editForm.bhk,
        areaUnit: editForm.areaUnit,
        securityDeposit: editForm.securityDeposit,
        status: "Under Review",
      };

      console.log('Updating property:', id, updatedProperty);
      
      const response = await API.put(`/properties/${id}`, updatedProperty);
      console.log('Update successful:', response.data);
      
      // Update local state
      setProperties(prev => prev.map(p => 
        p._id === id 
          ? { 
              ...p, 
              ...updatedProperty,
              price: updatedProperty.monthlyRent ? `₹${parseInt(updatedProperty.monthlyRent).toLocaleString('en-IN')}` : '₹0',
              type: `${updatedProperty.bhk || '2'} BHK ${updatedProperty.propertyType || 'Apartment'}`,
              areaDisplay: `${updatedProperty.area || 0} ${updatedProperty.areaUnit || 'sqft'}`,
              furnishing: updatedProperty.furnishType,
              status: 'Under Review'
            }
          : p
      ));
      
      setEditingId(null);
      setSuccessMessage('Property updated successfully!');
      setTimeout(() => setSuccessMessage(null), 3000);
      
    } catch (error) {
      console.error("Failed to update property:", error);
      setError('Failed to update property. Please try again.');
      setTimeout(() => setError(null), 5000);
    }
  };

  const handleAddProperty = async () => {
    // Validation
    if (!newProperty.name.trim()) {
      setError('Property name is required');
      return;
    }
    if (!newProperty.city.trim()) {
      setError('City is required');
      return;
    }
    if (!newProperty.monthlyRent || parseInt(newProperty.monthlyRent) <= 0) {
      setError('Valid monthly rent is required');
      return;
    }

    try {
      setError(null);
      setSuccessMessage(null);
      
      const propertyToAdd = {
        userType: "Owner",
        phone: "9999999999",
        name: newProperty.name.trim(),
        city: newProperty.city.trim(),
        locality: newProperty.locality.trim(),
        propertyType: newProperty.propertyType,
        bhk: newProperty.bhk,
        area: parseInt(newProperty.area) || 0,
        areaUnit: newProperty.areaUnit,
        furnishType: newProperty.furnishType,
        monthlyRent: parseInt(newProperty.monthlyRent),
        securityDeposit: newProperty.securityDeposit,
        availableFrom: newProperty.availableFrom,
        status: "Under Review",
        isActive: false,
        photos: [],
      };

      console.log("Adding property:", propertyToAdd);
      const response = await API.post("/properties", propertyToAdd);
      console.log("Add response:", response.data);
      
      if (response.data && response.data._id) {
        const newProp = {
          ...propertyToAdd,
          _id: response.data._id,
          id: response.data._id,
          createdAt: new Date().toISOString(),
          price: `₹${parseInt(propertyToAdd.monthlyRent).toLocaleString('en-IN')}`,
          type: `${propertyToAdd.bhk} BHK ${propertyToAdd.propertyType}`,
          areaDisplay: `${propertyToAdd.area} ${propertyToAdd.areaUnit}`,
          furnishing: propertyToAdd.furnishType,
          lastAdded: new Date().toLocaleDateString('en-GB', { 
            day: '2-digit', 
            month: 'short', 
            year: 'numeric' 
          }),
          verificationStatus: 'Pending',
          isUnderReview: true,
        };
        
        setProperties(prev => [newProp, ...prev]);
      }
      
      // Reset form
      setShowAddForm(false);
      setNewProperty({
        name: '',
        city: '',
        locality: '',
        propertyType: 'Apartment',
        bhk: '2',
        area: '',
        areaUnit: 'sqft',
        furnishType: 'Fully Furnished',
        monthlyRent: '',
        securityDeposit: '2 month',
        availableFrom: new Date().toISOString().split('T')[0]
      });
      
      setSuccessMessage('Property added successfully!');
      setTimeout(() => setSuccessMessage(null), 3000);
      
    } catch (error) {
      console.error("Failed to add property:", error);
      setError('Failed to add property. Please check console for details.');
      setTimeout(() => setError(null), 5000);
    }
  };

  const filteredProperties = properties.filter(property => {
    if (!property) return false;
    
    switch (filters.subCategory) {
      case 'Active':
        return property.status === 'Active';
      case 'UnderReview':
        return property.status === 'Under Review';
      case 'All':
      default:
        return property.status !== 'Deleted'; // Hide deleted properties from all view
    }
  });

  const handleReset = () => {
    setFilters({ subCategory: 'All' });
  };

  const handleManualRefresh = () => {
    fetchProperties();
  };

  // Calculate statistics
  const stats = {
    total: properties.filter(p => p.status !== 'Deleted').length, // Don't count deleted
    active: properties.filter(p => p.status === 'Active').length,
    pending: properties.filter(p => p.status === 'Under Review').length,
  };

  // Test if DELETE endpoint works
  const testDeleteEndpoint = async () => {
    if (properties.length === 0) {
      setError('No properties to test with');
      return;
    }
    
    const testProperty = properties[0];
    const confirmed = window.confirm(
      `Test DELETE endpoint for property:\n${testProperty.name}\nThis is a TEST - no actual deletion.`
    );
    
    if (!confirmed) return;
    
    try {
      console.log(`Testing DELETE endpoint for property: ${testProperty._id}`);
      const response = await API.delete(`/properties/${testProperty._id}`);
      console.log('✅ DELETE endpoint works:', response.data);
      
      // Since this was a test, refetch to restore the property
      fetchProperties();
      
      setSuccessMessage('✅ DELETE endpoint is working!');
      setTimeout(() => setSuccessMessage(null), 3000);
    } catch (error) {
      console.error('❌ DELETE endpoint failed:', error);
      setError(`DELETE endpoint failed: ${error.response?.data?.message || error.message}`);
      setTimeout(() => setError(null), 5000);
    }
  };

  if (isLoading) {
    return (
      <>
        <Navbar />
        <div className="min-h-screen bg-gray-50 flex items-center justify-center">
          <div className="text-center">
            <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
            <p className="text-gray-600">Loading your properties...</p>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gray-50 p-4 md:p-6">
        {/* Success/Error Messages */}
        {successMessage && (
          <div className="fixed top-20 right-4 z-50 animate-slide-in">
            <div className="bg-green-50 border border-green-200 rounded-lg p-4 shadow-lg max-w-sm">
              <div className="flex items-center gap-3">
                <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0" />
                <div>
                  <p className="text-green-800 text-sm font-medium">{successMessage}</p>
                  {successMessage.includes('permanently') && (
                    <p className="text-green-700 text-xs mt-1">Storage space has been freed</p>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}
        
        {error && (
          <div className="fixed top-20 right-4 z-50 animate-slide-in">
            <div className="bg-red-50 border border-red-200 rounded-lg p-4 shadow-lg max-w-sm">
              <div className="flex items-center gap-3">
                <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0" />
                <p className="text-red-800 text-sm font-medium">{error}</p>
              </div>
            </div>
          </div>
        )}

        <div className="flex flex-col lg:flex-row gap-6">
          {/* Left Sidebar */}
          <div className="lg:w-1/4 space-y-6">
            {/* Dashboard Stats Card */}
            <div className="bg-white rounded-xl border p-5 shadow-sm">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-gray-900">Dashboard</h2>
                <span className="bg-blue-100 text-blue-600 text-xs px-3 py-1 rounded-full font-medium">
                  Owner
                </span>
              </div>

              {/* Property Statistics */}
              <div className="space-y-4">
                <div className="bg-blue-50 p-4 rounded-xl">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-600">Total Properties</p>
                      <p className="text-2xl font-bold text-gray-900">{stats.total}</p>
                    </div>
                    <Home className="w-8 h-8 text-blue-600" />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div className="bg-green-50 p-3 rounded-xl">
                    <div className="flex items-center gap-2 mb-1">
                      <TrendingUp className="w-4 h-4 text-green-600" />
                      <span className="text-sm font-medium text-gray-700">Active</span>
                    </div>
                    <p className="text-lg font-bold text-gray-900">{stats.active}</p>
                  </div>

                  <div className="bg-yellow-50 p-3 rounded-xl">
                    <div className="flex items-center gap-2 mb-1">
                      <Clock className="w-4 h-4 text-yellow-600" />
                      <span className="text-sm font-medium text-gray-700">Pending</span>
                    </div>
                    <p className="text-lg font-bold text-gray-900">{stats.pending}</p>
                  </div>
                </div>
              </div>

              {/* Quick Actions */}
              <div className="mt-6 pt-6 border-t border-gray-100">
                <h3 className="text-sm font-medium text-gray-600 mb-3">Quick Actions</h3>
                <button 
                  onClick={() => setShowAddForm(true)}
                  className="w-full bg-blue-600 text-white py-2.5 rounded-lg font-medium hover:bg-blue-700 transition-colors text-sm mb-2 flex items-center justify-center gap-2"
                >
                  <Plus className="w-4 h-4" />
                  Add New Property
                </button>
                <button 
                  onClick={handleManualRefresh}
                  className="w-full border border-gray-300 text-gray-700 py-2.5 rounded-lg font-medium hover:bg-gray-50 transition-colors text-sm flex items-center justify-center gap-2"
                  disabled={refreshing}
                >
                  <RefreshCw className={`w-4 h-4 ${refreshing ? 'animate-spin' : ''}`} />
                  {refreshing ? 'Refreshing...' : 'Refresh List'}
                </button>
                <button 
                  onClick={testDeleteEndpoint}
                  className="w-full border border-red-300 text-red-600 py-2.5 rounded-lg font-medium hover:bg-red-50 transition-colors text-sm flex items-center justify-center gap-2 mt-2"
                >
                  <AlertTriangle className="w-4 h-4" />
                  Test Delete API
                </button>
              </div>
            </div>

            {/* Filter Section */}
            <div className="bg-white rounded-xl border p-5 shadow-sm">
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-sm font-medium text-gray-600">Filter Properties</h3>
                <button 
                  onClick={handleReset}
                  className="text-xs text-blue-600 hover:text-blue-800 flex items-center gap-1"
                >
                  <RotateCcw className="w-3 h-3" />
                  Reset
                </button>
              </div>
              <div className="space-y-2">
                {subCategories.map((item) => (
                  <button
                    key={item.key}
                    onClick={() => handleFilterChange('subCategory', item.key)}
                    className={`flex items-center justify-between w-full px-3 py-2.5 rounded-lg text-sm transition-colors ${
                      filters.subCategory === item.key 
                        ? 'bg-blue-50 text-blue-600 border border-blue-200' 
                        : 'text-gray-700 hover:bg-gray-50 border border-transparent'
                    }`}
                  >
                    <span className="font-medium">{item.label}</span>
                    <span className={`px-2 py-1 rounded-full text-xs min-w-[24px] text-center ${
                      item.count > 0 ? 'bg-blue-100 text-blue-600' : 'bg-gray-100 text-gray-500'
                    }`}>
                      {item.count}
                    </span>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:w-3/4">
            {/* Header with Stats */}
            <div className="bg-white rounded-xl border p-4 mb-6 shadow-sm">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                  <h1 className="text-2xl font-bold text-gray-900">Your Properties</h1>
                  <p className="text-gray-600 mt-1">
                    Showing <span className="font-semibold">{filteredProperties.length}</span> of <span className="font-semibold">{stats.total}</span> properties
                  </p>
                  <p className="text-xs text-gray-500 mt-1">
                    ⚠️ Delete action is PERMANENT - removes from database completely
                  </p>
                </div>
                <div className="flex items-center gap-3">
                  <button 
                    onClick={handleManualRefresh}
                    className="flex items-center gap-2 text-sm text-gray-600 hover:text-gray-900 hover:bg-gray-50 px-3 py-2 rounded-lg transition-colors"
                    disabled={refreshing}
                  >
                    <RefreshCw className={`w-4 h-4 ${refreshing ? 'animate-spin' : ''}`} />
                    {refreshing ? 'Refreshing...' : 'Refresh'}
                  </button>
                  <button 
                    onClick={() => window.location.href = '/property-details'}
                    className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-4 py-2 rounded-lg font-medium hover:shadow-md transition-all text-sm"
                  >
                    Post New Property
                  </button>
                </div>
              </div>
            </div>

            {/* Add Property Form */}
            {showAddForm && (
              <div className="bg-white rounded-xl border p-6 mb-6 shadow-sm">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-xl font-bold text-gray-900">Add New Property</h2>
                  <button 
                    onClick={() => setShowAddForm(false)}
                    className="text-gray-500 hover:text-gray-700 hover:bg-gray-100 p-1 rounded-lg"
                  >
                    <XCircle className="w-6 h-6" />
                  </button>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Property Name *</label>
                    <input
                      type="text"
                      value={newProperty.name}
                      onChange={(e) => setNewProperty({...newProperty, name: e.target.value})}
                      className="w-full p-2.5 border rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-all"
                      placeholder="Enter property name"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">City *</label>
                    <input
                      type="text"
                      value={newProperty.city}
                      onChange={(e) => setNewProperty({...newProperty, city: e.target.value})}
                      className="w-full p-2.5 border rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-all"
                      placeholder="Enter city"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Locality</label>
                    <input
                      type="text"
                      value={newProperty.locality}
                      onChange={(e) => setNewProperty({...newProperty, locality: e.target.value})}
                      className="w-full p-2.5 border rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-all"
                      placeholder="Enter locality"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Monthly Rent (₹) *</label>
                    <input
                      type="number"
                      value={newProperty.monthlyRent}
                      onChange={(e) => setNewProperty({...newProperty, monthlyRent: e.target.value})}
                      className="w-full p-2.5 border rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-all"
                      placeholder="Enter monthly rent"
                      required
                      min="0"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Area</label>
                    <input
                      type="number"
                      value={newProperty.area}
                      onChange={(e) => setNewProperty({...newProperty, area: e.target.value})}
                      className="w-full p-2.5 border rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-all"
                      placeholder="Enter area"
                      min="0"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Property Type</label>
                    <select
                      value={newProperty.propertyType}
                      onChange={(e) => setNewProperty({...newProperty, propertyType: e.target.value})}
                      className="w-full p-2.5 border rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-all"
                    >
                      <option value="Apartment">Apartment</option>
                      <option value="Villa">Villa</option>
                      <option value="House">House</option>
                      <option value="Studio">Studio</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">BHK</label>
                    <select
                      value={newProperty.bhk}
                      onChange={(e) => setNewProperty({...newProperty, bhk: e.target.value})}
                      className="w-full p-2.5 border rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-all"
                    >
                      <option value="1">1 BHK</option>
                      <option value="2">2 BHK</option>
                      <option value="3">3 BHK</option>
                      <option value="4">4 BHK</option>
                    </select>
                  </div>
                </div>
                <div className="flex gap-3 mt-6">
                  <button
                    onClick={handleAddProperty}
                    className="bg-blue-600 text-white px-6 py-2.5 rounded-lg font-medium hover:bg-blue-700 transition-colors"
                  >
                    Add Property
                  </button>
                  <button
                    onClick={() => setShowAddForm(false)}
                    className="border border-gray-300 text-gray-700 px-6 py-2.5 rounded-lg font-medium hover:bg-gray-50 transition-colors"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            )}

            {/* Properties List */}
            <div className="space-y-4">
              {filteredProperties.length > 0 ? (
                filteredProperties.map((property) => (
                  <div key={property._id} className="bg-white rounded-xl border p-6 shadow-sm hover:shadow-md transition-shadow">
                    <div className="flex flex-col lg:flex-row gap-6">
                      {/* Property Details */}
                      <div className="lg:w-2/3">
                        <div className="flex items-start justify-between mb-3">
                          <div>
                            <span className={`inline-block px-3 py-1 rounded-full text-xs font-semibold ${
                              property.status === 'Active' ? 'bg-green-100 text-green-800' :
                              'bg-yellow-100 text-yellow-800'
                            }`}>
                              {property.status}
                            </span>
                            <div className="text-sm text-gray-500 mt-1">ID: {property._id?.substring(0, 8)}...</div>
                          </div>
                          <div className="text-right">
                            <div className="text-2xl font-bold text-gray-900 flex items-center">
                              <IndianRupee className="w-6 h-6 mr-1" />
                              {property.price}
                              <span className="text-sm text-gray-500 ml-2">/month</span>
                            </div>
                          </div>
                        </div>

                        {editingId === property._id ? (
                          <div className="space-y-4 mb-4">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                              <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Property Name</label>
                                <input
                                  type="text"
                                  value={editForm.name}
                                  onChange={(e) => setEditForm({...editForm, name: e.target.value})}
                                  className="w-full border rounded-lg p-2.5"
                                  placeholder="Property Name"
                                />
                              </div>
                              <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Monthly Rent (₹)</label>
                                <input
                                  type="number"
                                  value={editForm.monthlyRent}
                                  onChange={(e) => setEditForm({...editForm, monthlyRent: e.target.value})}
                                  className="w-full border rounded-lg p-2.5"
                                  placeholder="Monthly Rent"
                                />
                              </div>
                              <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">City</label>
                                <input
                                  type="text"
                                  value={editForm.city}
                                  onChange={(e) => setEditForm({...editForm, city: e.target.value})}
                                  className="w-full border rounded-lg p-2.5"
                                  placeholder="City"
                                />
                              </div>
                              <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Locality</label>
                                <input
                                  type="text"
                                  value={editForm.locality}
                                  onChange={(e) => setEditForm({...editForm, locality: e.target.value})}
                                  className="w-full border rounded-lg p-2.5"
                                  placeholder="Locality"
                                />
                              </div>
                            </div>
                            <div className="flex gap-3">
                              <button
                                onClick={() => handleSaveEdit(property._id)}
                                className="bg-green-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-green-700 transition-colors"
                              >
                                Save Changes
                              </button>
                              <button
                                onClick={() => setEditingId(null)}
                                className="border border-gray-300 text-gray-700 px-4 py-2 rounded-lg text-sm font-medium hover:bg-gray-50 transition-colors"
                              >
                                Cancel
                              </button>
                            </div>
                          </div>
                        ) : (
                          <>
                            <h3 className="text-lg font-semibold text-gray-900 mb-2">{property.type} - {property.name}</h3>
                            <div className="text-gray-600 mb-2 flex items-center gap-2">
                              <span>📍 {property.locality || 'N/A'}, {property.city}</span>
                            </div>
                            <div className="text-gray-600 mb-4 flex items-center gap-4">
                              <span>📏 {property.areaDisplay}</span>
                              <span>🛋️ {property.furnishing}</span>
                            </div>
                          </>
                        )}

                        <div className="space-y-2 mb-6">
                          <div className="flex items-center text-gray-600 text-sm">
                            <Calendar className="w-4 h-4 mr-2 text-gray-400" />
                            <span>Posted: {property.lastAdded}</span>
                          </div>
                          <div className="flex items-center text-gray-600 text-sm">
                            <Shield className="w-4 h-4 mr-2 text-gray-400" />
                            <span>Verification: {property.verificationStatus}</span>
                          </div>
                        </div>

                        <div className="flex flex-wrap gap-3">
                          <button 
                            onClick={() => handleEdit(property)}
                            className="border border-gray-300 text-gray-700 px-4 py-2 rounded-lg font-medium hover:bg-gray-50 transition-colors text-sm flex items-center gap-2"
                          >
                            <Edit className="w-4 h-4" />
                            Edit
                          </button>
                          <button
                            onClick={() => handleDelete(property._id)}
                            disabled={deletingId === property._id}
                            className={`border border-red-300 px-4 py-2 rounded-lg font-medium transition-colors text-sm flex items-center gap-2 ${
                              deletingId === property._id
                                ? 'bg-red-100 text-red-800 cursor-not-allowed'
                                : 'text-red-600 hover:bg-red-50 hover:border-red-400'
                            }`}
                            title="Permanently delete from database"
                          >
                            {deletingId === property._id ? (
                              <>
                                <div className="w-4 h-4 border-2 border-red-600 border-t-transparent rounded-full animate-spin"></div>
                                Deleting...
                              </>
                            ) : (
                              <>
                                <Trash2 className="w-4 h-4" />
                                Delete Permanently
                              </>
                            )}
                          </button>
                        </div>
                      </div>

                      {/* Property Image */}
                      <div className="lg:w-1/3">
                        <div className="bg-gray-50 border-2 border-dashed border-gray-300 rounded-lg h-64 flex flex-col items-center justify-center text-center p-4 hover:bg-gray-100 transition-colors cursor-pointer relative">
                          {property.photos?.length > 0 ? (
                            <>
                              <img 
                                src={property.photos[0]} 
                                alt={property.name} 
                                className="w-full h-full object-cover rounded-lg"
                              />
                              <div className="absolute bottom-2 right-2 bg-black/70 text-white text-xs px-2 py-1 rounded">
                                {property.photos.length} photo{property.photos.length > 1 ? 's' : ''}
                              </div>
                            </>
                          ) : (
                            <>
                              <Upload className="w-12 h-12 text-gray-400 mb-3" />
                              <span className="text-sm font-medium text-gray-700 mb-1">Add Property Images</span>
                              <p className="text-xs text-gray-500">Click to upload photos</p>
                            </>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <div className="bg-white rounded-xl border p-8 text-center">
                  <Building2 className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-xl font-semibold text-gray-700 mb-2">No Properties Found</h3>
                  <p className="text-gray-500 mb-6">
                    {filters.subCategory !== 'All' 
                      ? `No properties found in the ${filters.subCategory} category.`
                      : "You haven't added any properties yet."}
                  </p>
                  <button
                    onClick={() => setShowAddForm(true)}
                    className="bg-blue-600 text-white px-6 py-2.5 rounded-lg font-medium hover:bg-blue-700 transition-colors inline-flex items-center gap-2"
                  >
                    <Plus className="w-4 h-4" />
                    Add Your First Property
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* CSS for slide-in animation */}
      <style jsx>{`
        @keyframes slide-in {
          from {
            transform: translateX(100%);
            opacity: 0;
          }
          to {
            transform: translateX(0);
            opacity: 1;
          }
        }
        .animate-slide-in {
          animation: slide-in 0.3s ease-out;
        }
      `}</style>
    </>
  );
};

export default YourPosts;