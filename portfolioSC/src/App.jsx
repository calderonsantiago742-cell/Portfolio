import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Interests from './components/Interests';
import MyJourney from './components/MyJourney';
import LovedOnes from './components/LovedOnes';
import Footer from './components/Footer';
import HobbiesPage from './components/HobbiesPage';
import PlaylistPage from './components/PlaylistPage';
import InspirationsPage from './components/InspirationsPage';
import PortfolioPage from './components/PortfolioPage';
import AboutMePage from './components/AboutMePage';
import CaseStudyPage from './components/CaseStudyPage';

// Creamos un sub-componente que agrupa todas las secciones de tu página de inicio ("Home")
function Home() {
  return (
    <>
      <Hero />
      <Interests />
      <MyJourney />
      <LovedOnes />
    </>
  );
}

function App() {
  return (
    <Router>
      <main className="min-h-screen bg-[#fafafa] text-gray-900 font-sans selection:bg-black selection:text-white">
        <Navbar />
        
        {/* Aquí es donde ocurre la magia del cambio de páginas */}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/hobbies" element={<HobbiesPage />} />
          <Route path="/playlist" element={<PlaylistPage />} />
          <Route path="/inspirations" element={<InspirationsPage />} />
          <Route path="/portfolio" element={<PortfolioPage />} />
          <Route path="/about" element={<AboutMePage />} />
          <Route path="/case-study/:id" element={<CaseStudyPage />} />
        </Routes>
        
        <Footer />
      </main>
    </Router>
  );
}

export default App;