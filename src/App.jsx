import React from 'react';
import CanvasBackground from './components/CanvasBackground';
import CustomCursor from './components/CustomCursor';
import Navbar from './components/Navbar';
import HeroSection from './components/HeroSection';
import AboutSection from './components/AboutSection';
import CreativeInterests from './components/CreativeInterests';
import InteractiveArtSpace from './components/InteractiveArtSpace';
import ContactSection from './components/ContactSection';
import Footer from './components/Footer';

export default function App() {
  return (
    <div className="relative min-h-screen bg-[#FFF8FA] text-[#4E3C44] selection:bg-[#FCE7ED] selection:text-[#DB2777]">
      {/* Playful Pink Custom Cursor */}
      <CustomCursor />

      {/* Lightweight Animated Canvas Background (Sine waves, pink dots, ripple effect) */}
      <CanvasBackground />

      {/* Floating Glassmorphic Navigation Bar */}
      <Navbar />

      {/* Main Single-Page Content Flow */}
      <main className="relative z-10">
        {/* Section 6: Hero Section */}
        <HeroSection />

        {/* Section 7: About Section */}
        <AboutSection />

        {/* Section 8: My Creative Interests (Art & Craft, Lippan Art, Mandala Art, Drawing) */}
        <CreativeInterests />

        {/* Section 9: My Art Space — Interactive Drawing Canvas (Mandala & Free Drawing) */}
        <InteractiveArtSpace />

        {/* Section 10: Contact Section */}
        <ContactSection />
      </main>

      {/* Section 11: Footer */}
      <Footer />
    </div>
  );
}
