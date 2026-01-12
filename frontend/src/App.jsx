import { useState } from "react";
import { Route, Routes } from "react-router-dom";
import Navbar from './components/Navbar/Navbar.jsx';
import HomePage from './Pages/HomePage/Homepage.jsx';
import Contact from "./Pages/Contact/Contact.jsx";
import ScrollToTop from "./components/ScrollToTop.jsx";
import Services from "./Pages/Services/Services.jsx";

function App() {
  const [cartCount, setCartCount] = useState(0);

  return (
    <>
      <Navbar cartCount={cartCount} />
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<HomePage setCartCount={setCartCount} />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/services" element={<Services />} />
      </Routes>
    </>
  );
}


export default App;
