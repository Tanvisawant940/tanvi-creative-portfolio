import React, { useState, useEffect } from 'react';
import { Menu, X, Sparkles } from 'lucide-react';

export default function Navbar() {
  const [activeSection, setActiveSection] = useState('home');
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Exact nav items required by prompt:
  // Home, About, Creative Interests, My Art Space, Contact
  const navItems = [
    { name: 'Home', href: '#home', id: 'home' },
    { name: 'About', href: '#about', id: 'about' },
    { name: 'Creative Interests', href: '#interests', id: 'interests' },
    { name: 'My Art Space', href: '#art-space', id: 'art-space' },
    { name: 'Contact', href: '#contact', id: 'contact' },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);

      const sections = ['home', 'about', 'interests', 'art-space', 'contact'];
      const scrollPos = window.scrollY + 200;

      for (const sectionId of sections) {
        const el = document.getElementById(sectionId);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPos >= top && scrollPos < top + height) {
            setActiveSection(sectionId);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (e, href) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    const target = document.querySelector(href);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-40 px-4 sm:px-6 lg:px-8 pt-4 transition-all duration-300">
      <nav
        aria-label="Main Navigation"
        className={`max-w-6xl mx-auto rounded-full px-5 sm:px-6 py-3.5 transition-all duration-300 flex items-center justify-between glass-nav shadow-[0_8px_30px_rgb(251,207,232,0.4)] ${
          isScrolled ? 'py-2.5 bg-opacity-95' : 'bg-opacity-85'
        }`}
      >
        {/* Brand: Tanvi’s Atelier + Animated Pink Dot */}
        <a
          href="#home"
          onClick={(e) => scrollToSection(e, '#home')}
          className="flex items-center gap-2.5 group cursor-pointer focus:outline-none focus:ring-2 focus:ring-[#DB2777] rounded-full px-2"
        >
          <span className="font-serif text-xl sm:text-2xl font-bold tracking-tight text-[#291D22] group-hover:text-[#DB2777] transition-colors">
            Tanvi’s Atelier
          </span>
          <span className="w-2.5 h-2.5 rounded-full bg-[#DB2777] animate-pulse shadow-[0_0_8px_#DB2777]" />
        </a>

        {/* Desktop Navigation Links */}
        <div className="hidden md:flex items-center gap-1 lg:gap-2">
          {navItems.map((item) => {
            const isActive = activeSection === item.id;

            return (
              <a
                key={item.name}
                href={item.href}
                onClick={(e) => scrollToSection(e, item.href)}
                className={`text-sm font-medium px-4 py-1.5 rounded-full transition-all duration-200 relative ${
                  isActive
                    ? 'text-[#DB2777] font-semibold bg-[#FCE7ED]'
                    : 'text-[#4E3C44] hover:text-[#DB2777] hover:bg-[#FDF2F5]'
                }`}
              >
                {item.name}
                {isActive && (
                  <span className="absolute bottom-0.5 left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full bg-[#DB2777]" />
                )}
              </a>
            );
          })}
        </div>

        {/* Inquire CTA Button + Mobile Menu Trigger */}
        <div className="flex items-center gap-3">
          {/* Inquire Button scrolls to contact */}
          <a
            href="#contact"
            onClick={(e) => scrollToSection(e, '#contact')}
            className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-semibold px-4 sm:px-5 py-2 rounded-full bg-[#DB2777] text-white hover:bg-[#be185d] shadow-[0_4px_14px_rgba(219,39,119,0.35)] transition-all transform hover:-translate-y-0.5 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#DB2777]"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>Inquire</span>
          </a>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle navigation menu"
            aria-expanded={mobileMenuOpen}
            className="md:hidden p-2 rounded-full text-[#4E3C44] hover:text-[#DB2777] hover:bg-[#FCE7ED] border border-[#FBCFE8]"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </nav>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden mt-2 mx-auto max-w-sm rounded-2xl p-4 glass-nav border border-[#FBCFE8] shadow-xl animate-fadeIn">
          <div className="flex flex-col space-y-1">
            {navItems.map((item) => {
              const isActive = activeSection === item.id;
              return (
                <a
                  key={item.name}
                  href={item.href}
                  onClick={(e) => scrollToSection(e, item.href)}
                  className={`text-sm font-medium px-4 py-2.5 rounded-xl transition-all ${
                    isActive
                      ? 'bg-[#FCE7ED] text-[#DB2777] font-semibold'
                      : 'text-[#4E3C44] hover:bg-[#FDF2F5] hover:text-[#DB2777]'
                  }`}
                >
                  {item.name}
                </a>
              );
            })}
          </div>
        </div>
      )}
    </header>
  );
}
