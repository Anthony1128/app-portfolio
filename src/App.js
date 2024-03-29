import './App.scss';
import { Routes, Route } from 'react-router-dom'
import Layout from './components/Layout';
import Home from './components/Home';
import About from './components/About';
import Contact from './components/Contact';
import Pyramid from './components/Pyramid';
import PixelDraw from './components/PixelDraw';
import Cocktail from './components/Cocktail';

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/pyramid" element={<Pyramid />} />
          <Route path="/pixeldraw" element={<PixelDraw />} />
          <Route path="/cocktail" element={<Cocktail />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
