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
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 bg-[#0F172A] border-b border-slate-800 shadow-[0_4px_20px_rgba(0,0,0,0.3)] ${
        isScrolled ? 'py-3' : 'py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 md:px-20 flex items-center justify-between">
        
        {/* Left: Brand Logo using logo.png */}
        <a
          href="/"
          onClick={(e) => handleLinkClick(e, '/')}
          className="flex items-center select-none cursor-pointer"
        >
          <img 
            src="/logo.png" 
            alt="SPAR Logo" 
            className="h-9 md:h-11 w-auto object-contain transition-all duration-300" 
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
            className="bg-[#0EA5E9] text-white border border-[#0EA5E9] px-6 py-2.5 rounded-[2px] text-xs font-bold tracking-widest uppercase hover:bg-white hover:text-[#0F172A] hover:border-white transition-all duration-300 shadow-md shadow-sky-500/10"
          >
            Request Consultation
          </a>
        </div>

      </div>
    </nav>
  );
}