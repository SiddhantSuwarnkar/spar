import React, { useState, useEffect } from 'react';
import { useNavigation } from '../context/NavigationContext';
import { Menu, X } from 'lucide-react';

export default function Navbar() {
  const { path, navigate } = useNavigation();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

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
  const isRoboticArm = path === '/robotic-arm';
  const isProjects = path.startsWith('/projects');
  const isAbout = path === '/about';

  // Dark Theme text contrast classes
  const textContrastClass = "text-slate-300";

  return (
    <nav
      className={`fixed left-1/2 -translate-x-1/2 w-[95%] max-w-7xl z-50 transition-all duration-300 bg-[#090E17]/30 backdrop-blur-md border border-white/[0.08] shadow-[0_8px_32px_0_rgba(0,0,0,0.37)] rounded-md ${
        isScrolled ? 'top-2 py-1.5' : 'top-6 py-2.5'
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
            className="h-10 md:h-12 w-auto object-contain transition-transform duration-300 group-hover:scale-105" 
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
            href="/robotic-arm"
            onClick={(e) => handleLinkClick(e, '/robotic-arm')}
            className={`transition-colors duration-200 hover:text-white ${
              isRoboticArm ? 'text-[#0EA5E9] border-b-2 border-[#0EA5E9] pb-1' : ''
            }`}
          >
            Robotic Arm
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

        {/* Right: Primary Call to Action & Mobile Toggle */}
        <div className="flex items-center gap-4">
          <a
            href="/contact"
            onClick={(e) => {
              handleLinkClick(e, '/contact');
              setIsMobileMenuOpen(false);
            }}
            className="hidden md:block bg-gradient-to-b from-slate-800 to-slate-900 border border-[#0EA5E9]/50 text-white hover:border-[#0EA5E9] px-6 py-2.5 rounded-sm text-xs font-bold tracking-widest uppercase transition-all duration-300 shadow-md font-mono"
          >
            Request Consultation
          </a>
          <button 
            className="md:hidden text-slate-300 hover:text-white transition-colors"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>

      </div>

      {/* Mobile Menu Dropdown */}
      <div 
        className={`md:hidden absolute top-full left-0 w-full bg-[#090E17]/80 backdrop-blur-lg border-t border-white/[0.08] shadow-2xl overflow-hidden transition-all duration-300 ease-in-out ${
          isMobileMenuOpen ? 'max-h-[400px] py-6' : 'max-h-0 py-0 border-transparent'
        } flex flex-col items-center gap-6 rounded-b-md`}
      >
        <a
          href="/"
          onClick={(e) => {
            handleLinkClick(e, '/');
            setIsMobileMenuOpen(false);
          }}
          className={`text-sm font-semibold tracking-wider font-headings transition-colors duration-200 hover:text-white ${
            isHome ? 'text-[#0EA5E9]' : 'text-slate-300'
          }`}
        >
          Home
        </a>
        <a
          href="/about"
          onClick={(e) => {
            handleLinkClick(e, '/about');
            setIsMobileMenuOpen(false);
          }}
          className={`text-sm font-semibold tracking-wider font-headings transition-colors duration-200 hover:text-white ${
            isAbout ? 'text-[#0EA5E9]' : 'text-slate-300'
          }`}
        >
          About Us
        </a>
        <a
          href="/solutions"
          onClick={(e) => {
            handleLinkClick(e, '/solutions');
            setIsMobileMenuOpen(false);
          }}
          className={`text-sm font-semibold tracking-wider font-headings transition-colors duration-200 hover:text-white ${
            isSolutions ? 'text-[#0EA5E9]' : 'text-slate-300'
          }`}
        >
          Solutions
        </a>
        <a
          href="/robotic-arm"
          onClick={(e) => {
            handleLinkClick(e, '/robotic-arm');
            setIsMobileMenuOpen(false);
          }}
          className={`text-sm font-semibold tracking-wider font-headings transition-colors duration-200 hover:text-white ${
            isRoboticArm ? 'text-[#0EA5E9]' : 'text-slate-300'
          }`}
        >
          Robotic Arm
        </a>
        <a
          href="/projects"
          onClick={(e) => {
            handleLinkClick(e, '/projects');
            setIsMobileMenuOpen(false);
          }}
          className={`text-sm font-semibold tracking-wider font-headings transition-colors duration-200 hover:text-white ${
            isProjects ? 'text-[#0EA5E9]' : 'text-slate-300'
          }`}
        >
          Case Studies
        </a>
        <a
          href="/contact"
          onClick={(e) => {
            handleLinkClick(e, '/contact');
            setIsMobileMenuOpen(false);
          }}
          className="mt-2 bg-gradient-to-b from-slate-800 to-slate-900 border border-[#0EA5E9]/50 text-white px-8 py-3 rounded-sm text-xs font-bold tracking-widest uppercase transition-all duration-300 font-mono w-[80%] max-w-xs text-center"
        >
          Request Consultation
        </a>
      </div>
    </nav>
  );
}