import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Services from './components/Services';
import Portfolio from './components/Portfolio';
import Testimonials from './components/Testimonials';
import Social from './components/Social';
import Contact from './components/Contact';
import Footer from './components/Footer';
import GIS from './pages/GIS';
import Negociere from './pages/Negociere';
import './App.css';

function HomePage({ scrolled }) {
  return (
    <div className="app">
      <Navbar scrolled={scrolled} />
      <Hero />
      <About />
      <Services />
      <Portfolio />
      <Testimonials />
      <Social />
      <Contact />
      <Footer />
    </div>
  );
}

function PageLayout({ scrolled, children }) {
  return (
    <div className="app">
      <Navbar scrolled={scrolled} />
      {children}
      <Contact />
      <Footer />
    </div>
  );
}

function App() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage scrolled={scrolled} />} />
        <Route
          path="/gis"
          element={
            <PageLayout scrolled={scrolled}>
              <GIS />
            </PageLayout>
          }
        />
        <Route
          path="/negociere"
          element={
            <PageLayout scrolled={scrolled}>
              <Negociere />
            </PageLayout>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
