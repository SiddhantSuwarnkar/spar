import React, { useState, useEffect } from 'react';
import { useNavigation } from '../context/NavigationContext';

export default function Navbar() {
  const { path, navigate } = useNavigation();
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 80) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLinkClick = (e, targetPath, scrollAnchor = null) => {
    e.preventDefault();
    navigate(targetPath, () => {
      if (scrollAnchor) {
        const target = document.querySelector(scrollAnchor);
        if (target) {
          target.scrollIntoView({ behavior: 'smooth' });
        }
      }
    });
  };

  // Determine active classes
  const isHome = path === '/';
  const isSolutions = path === '/solutions';
  const isProjects = path.startsWith('/projects');
  const isAbout = path === '/about';

  // Dark Theme text contrast classes
  const textContrastClass = "text-slate-300";

  return (
    <nav
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 bg-[#090E17]/90 backdrop-blur-md border-b border-white/10 shadow-[0_4px_20px_rgba(0,0,0,0.3)] ${
        isScrolled ? 'py-3' : 'py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 md:px-20 flex items-center justify-between">
        
        {/* Left: Brand Logo using logo.png */}
        <a
          href="/"
          onClick={(e) => handleLinkClick(e, '/')}
          className="flex items-center select-none cursor-pointer group"
        >
          <img 
            src="/logo.png" 
            alt="SPAR Logo" 
            className="h-12 md:h-14 w-auto object-contain transition-transform duration-300 group-hover:scale-105" 
          />
        </a>

        {/* Center: Navigation Links */}
        <div className={`hidden md:flex items-center gap-10 text-xs font-semibold tracking-wider font-headings ${textContrastClass}`}>
          <a
            href="/"
            onClick={(e) => handleLinkClick(e, '/')}
            className={`transition-colors duration-200 hover:text-white ${
              isHome ? 'text-[#0EA5E9] border-b-2 border-[#0EA5E9] pb-1' : ''
            }`}
          >
            Home
          </a>
          <a
            href="/about"
            onClick={(e) => handleLinkClick(e, '/about')}
            className={`transition-colors duration-200 hover:text-white ${
              isAbout ? 'text-[#0EA5E9] border-b-2 border-[#0EA5E9] pb-1' : ''
            }`}
          >
            About Us
          </a>
          <a
            href="/solutions"
            onClick={(e) => handleLinkClick(e, '/solutions')}
            className={`transition-colors duration-200 hover:text-white ${
              isSolutions ? 'text-[#0EA5E9] border-b-2 border-[#0EA5E9] pb-1' : ''
            }`}
          >
            Solutions
          </a>
          <a
            href="/projects"
            onClick={(e) => handleLinkClick(e, '/projects')}
            className={`transition-colors duration-200 hover:text-white ${
              isProjects ? 'text-[#0EA5E9] border-b-2 border-[#0EA5E9] pb-1' : ''
            }`}
          >
            Case Studies
          </a>
        </div>

        {/* Right: Primary Call to Action */}
        <div className="flex items-center">
          <a
            href="/contact"
            onClick={(e) => handleLinkClick(e, '/contact')}
            className="bg-gradient-to-b from-slate-800 to-slate-900 border border-[#0EA5E9]/50 text-white hover:border-[#0EA5E9] px-6 py-2.5 rounded-sm text-xs font-bold tracking-widest uppercase transition-all duration-300 shadow-md font-mono"
          >
            Request Consultation
          </a>
        </div>

      </div>
    </nav>
  );
}