import { useState } from "react";
import { Route, Routes } from "react-router-dom";
import Navbar from './components/Navbar/Navbar.jsx';
import HomePage from './Pages/HomePage/Homepage.jsx';
import Contact from "./Pages/Contact/Contact.jsx";
import ScrollToTop from "./components/ScrollToTop.jsx";
import Services from "./Pages/Services/Services.jsx";
import ProductPage from "./Pages/Product/Product.jsx";
import About from "./Pages/About/About.jsx";
import Gallery from "./Pages/Gallery/Gallery.jsx";
import ShippingPolicy from "./Pages/Shipping/Shipping.jsx";

function App() {
  const [cartCount, setCartCount] = useState(0);

  return (
    <>
      <Navbar cartCount={cartCount} />
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<HomePage setCartCount={setCartCount} />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/services" element={<Services />} />
        <Route path="/products" element={<ProductPage />} />
        <Route path="/gallery" element={<Gallery />} />
        <Route path="/shipping-policy" element={<ShippingPolicy />} />
      </Routes>
    </>
  );
}


export default App;
