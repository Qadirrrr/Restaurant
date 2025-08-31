import React from 'react'
import Navbar from './components/Navbar/Navbar'
import Hero from './components/Hero/Hero'
import About from './components/About/About'
import Services from './components/Services/Services'
import Contact from './components/Contact/Contact'
import Footer from './components/Footer/Footer'
import Menu from './components/Menu/Menu'
const App = () => {
  return (
    <>
      <Navbar/>
      <section id="home"><Hero/></section>
      <section id="about"><About/></section>
      <Menu />
      <section id="services"><Services/></section>
      <section id="contact"><Contact/></section>
      <Footer/>
        
    </>
  )
}

export default App

{/*import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import About from "./pages/About";
import Services from "./pages/Services";
import Contact from "./pages/Contact";
import WebDevelopment from "./pages/WebDevelopment";
import AppDevelopment from "./pages/AppDevelopment";
import SEOOptimization from "./pages/SEOOptimization";

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/services" element={<Services />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/web-development" element={<WebDevelopment />} />
        <Route path="/app-development" element={<AppDevelopment />} />
        <Route path="/seo-optimization" element={<SEOOptimization />} />
      </Routes>
    </Router>
  );
}

export default App;
 */}