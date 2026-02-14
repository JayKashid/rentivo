import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import Footer from "./components/Footer";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import AddHouse from "./pages/postproperties/AddHouse";
import HouseDetails from "./pages/HouseDetails";
import PropertyDetails from "./pages/postproperties/PropertyDetails";
import PriceDetails from "./pages/postproperties/PriceDetails";
import YourPosts from "./pages/admindashboard/YourPosts";
import { AppProvider } from "./context/AppContext";
import PropertyListings from "./pages/user/PropertyListings";
import Register from "./pages/Register";
import Login from "./pages/Login";
// import CardDetails from "./components/CardDetails";

function AppContent() {
  const location = useLocation();
  const hideNavbar = ["/add-house", "/property-details", "/price-details", "/your-posts", "/dashboard"].includes(location.pathname) || location.pathname.startsWith("/admin");

  return (
    <div className="flex flex-col min-h-screen">
      {!hideNavbar && <Navbar />}
      <main className="flex-grow">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/add-house" element={<AddHouse />} />
          <Route path="/house/:id" element={<HouseDetails />} />
          <Route path="/property-details" element={<PropertyDetails />} />
          <Route path="/price-details" element={<PriceDetails />} />
          <Route path="/your-posts" element={<YourPosts />} />
          <Route path="/api/properties" element={<PropertyListings />} />
          {/* Add route for individual property details */}
          <Route path="/login" element={<Login />} />
          <Route path="/property/:id" element={<HouseDetails />} />
          {/* <Route path="/property/:id" element={<CardDetails />} /> */}
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

function App() {
  return (
    <BrowserRouter>
      <AppProvider>
        <AppContent />
      </AppProvider>
    </BrowserRouter>
  );
}

export default App;