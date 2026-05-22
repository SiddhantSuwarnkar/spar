import React from 'react';
import { useNavigation } from '../context/NavigationContext';

export default function Footer() {
  const { navigate } = useNavigation();

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

  return (
    <footer id="contact" className="bg-[#090E17] text-[#F8FAFC] border-t border-white/10 relative z-40">
      <div className="max-w-7xl mx-auto px-6 md:px-20 py-16 md:py-24">
        
        {/* Main 4-Column Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 lg:gap-8 pb-16 border-b border-white/10">
          
          {/* Column 1: Company Logo & Details (col-span-4) */}
          <div className="lg:col-span-4 flex flex-col gap-6">
            <a
              href="/"
              onClick={(e) => handleLinkClick(e, '/')}
              className="flex items-center select-none cursor-pointer w-fit group"
            >
              <img 
                src="/logo.png" 
                alt="SPAR Logo" 
                className="h-12 md:h-14 w-auto object-contain transition-transform duration-300 group-hover:scale-105" 
              />
            </a>
            
            <p className="text-slate-400 text-sm leading-relaxed max-w-sm font-light">
              Engineering high-throughput, clean-room industrial automation systems for manufacturing lines globally.
            </p>
            
            <div className="text-xs text-slate-400 font-mono tracking-wide leading-relaxed">
              <span className="text-slate-500 font-semibold uppercase block mb-1">// Global HQ</span>
              100 Precision Way, Phase 3<br />
              Hinjawadi, Pune, MH 411057
            </div>
          </div>

          {/* Column 2: Quick Links (col-span-2) */}
          <div className="lg:col-span-2 flex flex-col gap-6">
            <h4 className="text-xs font-bold uppercase tracking-[0.2em] text-[#0EA5E9] font-headings">
              Quick Links
            </h4>
            <ul className="flex flex-col gap-3 text-sm text-slate-400 font-light">
              <li>
                <a
                  href="/solutions"
                  onClick={(e) => handleLinkClick(e, '/solutions')}
                  className="hover:text-white transition-colors duration-200"
                >
                  Solutions
                </a>
              </li>
              <li>
                <a
                  href="/projects"
                  onClick={(e) => handleLinkClick(e, '/projects')}
                  className="hover:text-white transition-colors duration-200"
                >
                  Case Studies
                </a>
              </li>
              <li>
                <a
                  href="/about"
                  onClick={(e) => handleLinkClick(e, '/about')}
                  className="hover:text-white transition-colors duration-200"
                >
                  About Us
                </a>
              </li>
              <li>
                <a
                  href="/contact"
                  onClick={(e) => handleLinkClick(e, '/contact')}
                  className="hover:text-white transition-colors duration-200"
                >
                  Request Consultation
                </a>
              </li>
            </ul>
          </div>

          {/* Column 3: Industries Served (col-span-3) */}
          <div id="industries" className="lg:col-span-3 flex flex-col gap-6 scroll-mt-12">
            <h4 className="text-xs font-bold uppercase tracking-[0.2em] text-[#0EA5E9] font-headings">
              Industries Served
            </h4>
            <ul className="flex flex-col gap-3 text-sm text-slate-400 font-light">
              <li className="flex items-center gap-2">
                <span className="w-1 h-1 bg-slate-600 rounded-none" />
                Automotive Assembly
              </li>
              <li className="flex items-center gap-2">
                <span className="w-1 h-1 bg-slate-600 rounded-none" />
                Logistics & Sorting
              </li>
              <li className="flex items-center gap-2">
                <span className="w-1 h-1 bg-slate-600 rounded-none" />
                Pharmaceuticals
              </li>
              <li className="flex items-center gap-2">
                <span className="w-1 h-1 bg-slate-600 rounded-none" />
                Semiconductor Clean-Rooms
              </li>
              <li className="flex items-center gap-2">
                <span className="w-1 h-1 bg-slate-600 rounded-none" />
                Aerospace Manufacturing
              </li>
            </ul>
          </div>

          {/* Column 4: Contact & Socials (col-span-3) */}
          <div className="lg:col-span-3 flex flex-col gap-6">
            <h4 className="text-xs font-bold uppercase tracking-[0.2em] text-[#0EA5E9] font-headings">
              Contact Channels
            </h4>
            
            <div className="flex flex-col gap-4 text-sm text-slate-400 font-light">
              <div>
                <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest block mb-1">Sales Operations</span>
                <a href="mailto:sales@spar-automation.com" className="text-white hover:text-[#0EA5E9] transition-colors duration-200 font-mono">
                  sales@spar-automation.com
                </a>
              </div>
              <div>
                <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest block mb-1">Technical Support</span>
                <a href="mailto:support@spar-automation.com" className="text-white hover:text-[#0EA5E9] transition-colors duration-200 font-mono">
                  support@spar-automation.com
                </a>
              </div>
              <div>
                <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest block mb-1">Direct Dial</span>
                <a href="tel:+91205550190" className="text-white hover:text-[#0EA5E9] transition-colors duration-200 font-mono">
                  +91 (20) 555-0190
                </a>
              </div>
            </div>

            {/* LinkedIn Icon */}
            <div className="pt-2">
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-[2px] bg-slate-800 hover:bg-[#0EA5E9] flex items-center justify-center text-white transition-all duration-300 shadow-md inline-block text-center"
                aria-label="LinkedIn Profile"
              >
                <svg className="w-5 h-5 mx-auto mt-2.5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path
                    fillRule="evenodd"
                    d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.779-1.75-1.75s.784-1.75 1.75-1.75 1.75.779 1.75 1.75-.784 1.75-1.75 1.75zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"
                    clipRule="evenodd"
                  />
                </svg>
              </a>
            </div>
          </div>

        </div>

        {/* Footer Sub-bottom details */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-6 pt-12 text-xs text-slate-500 font-mono tracking-wider">
          <span>&copy; {new Date().getFullYear()} SPAR AUTOMATION & ROBOTICS. ALL RIGHTS RESERVED.</span>
          <div className="flex gap-8">
            <a href="#privacy" className="hover:text-white transition-colors duration-200">PRIVACY_POLICY</a>
            <a href="#terms" className="hover:text-white transition-colors duration-200">SYSTEM_TERMS</a>
          </div>
        </div>

      </div>
    </footer>
  );
}
