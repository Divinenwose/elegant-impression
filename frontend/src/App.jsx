import {Route, Routes} from "react-router-dom";
import Navbar from './components/Navbar/Navbar.jsx';
import HomePage from './Pages/HomePage/Homepage.jsx';
import Contact from "./Pages/Contact/Contact.jsx";
import ScrollToTop from "./components/ScrollToTop.jsx";

function App() {
  return (
    <>
      <Navbar />
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/contact" element={<Contact />} />
      </Routes>
    </>
  )
}

export default App;
