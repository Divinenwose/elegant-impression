import {Route, Routes} from 'react-router-dom';
import Navbar from './components/Navbar/Navbar.jsx';
import About from './Pages/About/About.jsx';
import Footer from './components/Footer/Footer.jsx';

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path='/' element={<About />} />
      </Routes>
      <Footer />
    </>
  )
}

export default App;
