import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { 
  Home, FileText, MoreVertical, PlusCircle, 
  User, ChevronDown, Bell, Search, MessageSquare,
  Settings, LogOut, HelpCircle, BarChart,
  Calendar, Wallet, Shield, X, Menu
} from "lucide-react";

const Navbar = () => {
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isMoreOpen, setIsMoreOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  const navItems = [
    { id: "dashboard", label: "Dashboard", icon: <Home className="w-4 h-4" />, path: "/dashboard" },
    { id: "your-posts", label: "Your Posts", icon: <FileText className="w-4 h-4" />, path: "/your-posts" },
  ];

  const moreOptions = [
    { label: "Saved Properties", icon: <FileText className="w-4 h-4" />, path: "/saved" },
    { label: "Notifications", icon: <Bell className="w-4 h-4" />, path: "/notifications" },
    { label: "Messages", icon: <MessageSquare className="w-4 h-4" />, path: "/messages" },
    { label: "Help Center", icon: <HelpCircle className="w-4 h-4" />, path: "/help" },
    { label: "Settings", icon: <Settings className="w-4 h-4" />, path: "/settings" },
  ];

  const profileOptions = [
    { label: "My Profile", icon: <User className="w-4 h-4" />, path: "/profile" },
    { label: "Account Settings", icon: <Settings className="w-4 h-4" />, path: "/settings" },
    { label: "Billing", icon: <Wallet className="w-4 h-4" />, path: "/billing" },
    { label: "Privacy", icon: <Shield className="w-4 h-4" />, path: "/privacy" },
    { label: "Logout", icon: <LogOut className="w-4 h-4" />, path: "/logout" },
  ];

  const isActive = (path) => location.pathname === path;

  return (
    <>
      <nav className="sticky top-0 z-50 bg-white border-b border-slate-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <div className="flex items-center">
              <Link to="/" className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-indigo-600 to-purple-600 flex items-center justify-center">
                  <Home className="w-5 h-5 text-white" />
                </div>
                <span className="text-xl font-bold text-slate-900">Rentivo</span>
              </Link>

              {/* Desktop Navigation */}
              <div className="hidden md:flex items-center ml-8 space-x-1">
                {navItems.map((item) => (
                  <Link
                    key={item.id}
                    to={item.path}
                    className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all duration-200 ${
                      isActive(item.path)
                        ? "bg-gradient-to-r from-indigo-50 to-purple-50 text-indigo-700 font-semibold"
                        : "text-slate-700 hover:text-slate-900 hover:bg-slate-50"
                    }`}
                  >
                    {item.icon}
                    <span>{item.label}</span>
                  </Link>
                ))}

                {/* More Dropdown */}
                <div className="relative">
                  <button
                    onClick={() => setIsMoreOpen(!isMoreOpen)}
                    className="flex items-center gap-2 px-4 py-2 rounded-lg text-slate-700 hover:text-slate-900 hover:bg-slate-50 transition-all duration-200"
                  >
                    <MoreVertical className="w-4 h-4" />
                    <span>More</span>
                    <ChevronDown className={`w-4 h-4 transition-transform ${isMoreOpen ? 'rotate-180' : ''}`} />
                  </button>

                  {isMoreOpen && (
                    <div className="absolute top-full left-0 mt-2 w-56 bg-white rounded-xl shadow-lg border border-slate-200 py-2 z-50">
                      {moreOptions.map((option, index) => (
                        <Link
                          key={index}
                          to={option.path}
                          className="flex items-center gap-3 px-4 py-3 text-slate-700 hover:bg-slate-50 hover:text-slate-900 transition-colors"
                        >
                          {option.icon}
                          <span className="text-sm">{option.label}</span>
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Search Bar (Desktop) */}
            <div className="hidden md:flex flex-1 max-w-md mx-4">
              <div className="relative w-full">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-4 h-4" />
                <input
                  type="text"
                  placeholder="Search properties, locations..."
                  className="w-full pl-10 pr-4 py-2 rounded-lg border border-slate-300 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-200 outline-none transition-all duration-200"
                />
              </div>
            </div>

            {/* Right Side Actions */}
            <div className="flex items-center gap-3">
              {/* Add Property Button */}
              <Link
                to="/add-house"
                className="hidden md:flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-lg hover:shadow-lg transition-all duration-200 font-semibold"
              >
                <PlusCircle className="w-4 h-4" />
                <span>Add Property</span>
              </Link>

              {/* Notification Bell */}
              <button className="relative p-2 text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-lg transition-colors">
                <Bell className="w-5 h-5" />
                <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
              </button>

              {/* Messages */}
              <button className="relative p-2 text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-lg transition-colors">
                <MessageSquare className="w-5 h-5" />
                <span className="absolute top-1 right-1 w-2 h-2 bg-green-500 rounded-full"></span>
              </button>

              {/* Profile Dropdown */}
              <div className="relative">
                <button
                  onClick={() => setIsProfileOpen(!isProfileOpen)}
                  className="flex items-center gap-2 p-1 rounded-lg hover:bg-slate-100 transition-colors"
                >
                  <div className="w-8 h-8 rounded-full bg-gradient-to-br from-indigo-400 to-purple-500 flex items-center justify-center">
                    <span className="text-white font-semibold text-sm">RK</span>
                  </div>
                  <ChevronDown className={`w-4 h-4 text-slate-600 transition-transform ${isProfileOpen ? 'rotate-180' : ''}`} />
                </button>

                {isProfileOpen && (
                  <div className="absolute right-0 top-full mt-2 w-64 bg-white rounded-xl shadow-lg border border-slate-200 py-2 z-50">
                    {/* User Info */}
                    <div className="px-4 py-3 border-b border-slate-100">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-indigo-400 to-purple-500 flex items-center justify-center">
                          <span className="text-white font-semibold">RK</span>
                        </div>
                        <div>
                          <div className="font-semibold text-slate-900">Rahul Kumar</div>
                          <div className="text-xs text-slate-500">Property Owner</div>
                        </div>
                      </div>
                    </div>

                    {/* Profile Options */}
                    <div className="py-2">
                      {profileOptions.map((option, index) => (
                        <Link
                          key={index}
                          to={option.path}
                          className="flex items-center gap-3 px-4 py-3 text-slate-700 hover:bg-slate-50 hover:text-slate-900 transition-colors"
                        >
                          {option.icon}
                          <span className="text-sm">{option.label}</span>
                        </Link>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Mobile Menu Button */}
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="md:hidden p-2 text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-lg transition-colors"
              >
                {isMobileMenuOpen ? (
                  <X className="w-6 h-6" />
                ) : (
                  <Menu className="w-6 h-6" />
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden border-t border-slate-200 bg-white">
            <div className="px-4 py-3 space-y-1">
              {/* Mobile Search */}
              <div className="mb-4">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-4 h-4" />
                  <input
                    type="text"
                    placeholder="Search properties..."
                    className="w-full pl-10 pr-4 py-2 rounded-lg border border-slate-300 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-200 outline-none"
                  />
                </div>
              </div>

              {/* Mobile Navigation Items */}
              {navItems.map((item) => (
                <Link
                  key={item.id}
                  to={item.path}
                  className={`flex items-center gap-3 px-4 py-3 rounded-lg ${
                    isActive(item.path)
                      ? "bg-gradient-to-r from-indigo-50 to-purple-50 text-indigo-700 font-semibold"
                      : "text-slate-700 hover:bg-slate-50"
                  }`}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {item.icon}
                  <span>{item.label}</span>
                </Link>
              ))}

              {/* Mobile More Options */}
              <div className="border-t border-slate-100 pt-2">
                <div className="text-xs font-semibold text-slate-400 px-4 py-2">MORE OPTIONS</div>
                {moreOptions.map((option, index) => (
                  <Link
                    key={index}
                    to={option.path}
                    className="flex items-center gap-3 px-4 py-3 text-slate-700 hover:bg-slate-50 rounded-lg"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    {option.icon}
                    <span>{option.label}</span>
                  </Link>
                ))}
              </div>

              {/* Mobile Add Property Button */}
              <div className="pt-4 border-t border-slate-100">
                <Link
                  to="/add-property"
                  className="flex items-center justify-center gap-2 px-4 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-lg font-semibold"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <PlusCircle className="w-5 h-5" />
                  <span>Add Property</span>
                </Link>
              </div>
            </div>
          </div>
        )}
      </nav>

      {/* Close dropdowns when clicking outside */}
      {isProfileOpen && (
        <div 
          className="fixed inset-0 z-40" 
          onClick={() => setIsProfileOpen(false)}
        />
      )}
      {isMoreOpen && (
        <div 
          className="fixed inset-0 z-40" 
          onClick={() => setIsMoreOpen(false)}
        />
      )}
    </>
  );
};

export default Navbar;