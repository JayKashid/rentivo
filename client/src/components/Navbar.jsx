import { Link, useLocation } from "react-router-dom";
import {
  Home,
  PlusCircle,
  LayoutDashboard,
  Info,
  User,
} from "lucide-react";

const Navbar = () => {
  const location = useLocation();

  const navLinks = [
    { to: "/", label: "Home", icon: <Home size={18} /> },
    {
      to: "/add-house",
      label: "Post Property",
      icon: <PlusCircle size={18} />,
      badge: "FREE",
    },
    {
      to: "/admin",
      label: "Admin Dashboard",
      icon: <LayoutDashboard size={18} />,
    },
    { to: "/about", label: "About Us", icon: <Info size={18} /> },
  ];

  return (
    <header className="sticky top-0 z-50 bg-white/90 backdrop-blur-md border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 lg:px-6">
        <div className="flex h-16 items-center justify-between">
          
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 group">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-indigo-600 to-blue-600 flex items-center justify-center shadow-md group-hover:scale-105 transition">
              <Home className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold tracking-tight text-gray-900">
              Rentivo
            </span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-2">
            {navLinks.map((link) => {
              const isActive = location.pathname === link.to;

              return (
                <Link
                  key={link.to}
                  to={link.to}
                  className={`relative flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all
                    ${
                      isActive
                        ? "text-indigo-600 bg-indigo-50"
                        : "text-gray-600 hover:text-indigo-600 hover:bg-gray-50"
                    }`}
                >
                  {link.icon}
                  <span>{link.label}</span>

                  {/* FREE badge */}
                  {link.badge && (
                    <span className="ml-1 text-[10px] font-semibold bg-green-100 text-green-700 px-2 py-0.5 rounded-full">
                      {link.badge}
                    </span>
                  )}
                </Link>
              );
            })}
          </nav>

          {/* Right Section */}
          {/* Right Section */}
<div className="flex items-center gap-3">

  {/* If NOT Logged In */}
  {!localStorage.getItem("token") ? (
    <Link
      to="/login"
      className="px-4 py-2 text-sm font-medium text-white bg-indigo-600 rounded-lg hover:bg-indigo-700 transition"
    >
      Login
    </Link>
  ) : (
    <>

      {/* Logout Button */}
      <button
        onClick={() => {
          localStorage.removeItem("token");
          window.location.href = "/";
        }}
        className="px-3 py-2 text-sm text-gray-600 hover:text-red-600"
      >
        Logout
      </button>
    </>
  )}

  {/* Mobile Menu */}
  <button className="md:hidden p-2 rounded-lg hover:bg-gray-100">
    <svg
      className="w-6 h-6 text-gray-700"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M4 6h16M4 12h16M4 18h16"
      />
    </svg>
  </button>
        

            {/* Mobile Menu */}
            <button className="md:hidden p-2 rounded-lg hover:bg-gray-100">
              <svg
                className="w-6 h-6 text-gray-700"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Nav */}
        <div className="md:hidden border-t border-gray-100 py-3">
          <div className="grid grid-cols-2 gap-2">
            {navLinks.map((link) => {
              const isActive = location.pathname === link.to;

              return (
                <Link
                  key={link.to}
                  to={link.to}
                  className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium
                    ${
                      isActive
                        ? "text-indigo-600 bg-indigo-50"
                        : "text-gray-600 hover:bg-gray-50"
                    }`}
                >
                  {link.icon}
                  <span>{link.label}</span>

                  {link.badge && (
                    <span className="ml-auto text-[10px] bg-green-100 text-green-700 px-2 py-0.5 rounded-full">
                      {link.badge}
                    </span>
                  )}
                </Link>
              );
            })}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
