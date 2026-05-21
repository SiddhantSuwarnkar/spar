import React, { useState, useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    company: '',
    email: '',
    service: 'Machine Vision'
  });
  const [submitted, setSubmitted] = useState(false);
  const containerRef = useRef(null);
  const leftColRef = useRef(null);
  const rightColRef = useRef(null);

  useGSAP(() => {
    // Left column slide from left
    gsap.fromTo(leftColRef.current,
      { x: -50, opacity: 0 },
      { x: 0, opacity: 1, duration: 0.8, ease: 'power2.out' }
    );

    // Right column slide from right
    gsap.fromTo(rightColRef.current,
      { x: 50, opacity: 0 },
      { x: 0, opacity: 1, duration: 0.8, ease: 'power2.out' }
    );
  }, { scope: containerRef });

  const handleSubmit = (e) => {
    e.preventDefault();
    // Simulate API Submission
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setFormData({ name: '', company: '', email: '', service: 'Machine Vision' });
    }, 5000);
  };

  return (
    <div ref={containerRef} className="w-full relative z-40 bg-white min-h-screen pt-20 flex flex-col">
      
      {/* Split screen content wrapper */}
      <div className="flex-grow grid grid-cols-1 lg:grid-cols-2">
        
        {/* LEFT SIDE: Contact Info (Dark #0F172A Bg) */}
        <div 
          ref={leftColRef}
          className="bg-[#0F172A] text-white p-12 md:p-20 flex flex-col justify-between"
        >
          <div>
            <span className="text-xs font-bold uppercase tracking-[0.3em] text-[#0EA5E9] mb-4 block">
              Global Operations
            </span>
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight font-headings mb-8">
              Let's Architect <br/>
              Your Automation.
            </h1>
            
            <p className="text-slate-300 text-sm md:text-base max-w-md leading-relaxed mb-12 font-normal">
              Connect with our design engineers to review feasibility, calculate target throughput cycle times, and schedule a complete audit of your assembly line.
            </p>

            {/* Styled HQ Blueprint Vector (Visual Placeholder Map) */}
            <div className="border border-slate-800 p-4 bg-[#0d121f] rounded-none mb-12 select-none pointer-events-none relative overflow-hidden">
              <span className="text-[8px] font-mono text-slate-500 absolute top-3 left-3">SYS_BLUEPRINT_HQ_LOC.dwg</span>
              <svg className="w-full h-48 text-[#0EA5E9]/20" viewBox="0 0 200 100" fill="none" xmlns="http://www.w3.org/2000/svg">
                {/* Tech Grid Pattern */}
                <line x1="0" y1="20" x2="200" y2="20" stroke="#1E293B" strokeWidth="0.5" strokeDasharray="2 2" />
                <line x1="0" y1="50" x2="200" y2="50" stroke="#1E293B" strokeWidth="0.5" strokeDasharray="2 2" />
                <line x1="0" y1="80" x2="200" y2="80" stroke="#1E293B" strokeWidth="0.5" strokeDasharray="2 2" />
                <line x1="40" y1="0" x2="40" y2="100" stroke="#1E293B" strokeWidth="0.5" strokeDasharray="2 2" />
                <line x1="100" y1="0" x2="100" y2="100" stroke="#1E293B" strokeWidth="0.5" strokeDasharray="2 2" />
                <line x1="160" y1="0" x2="160" y2="100" stroke="#1E293B" strokeWidth="0.5" strokeDasharray="2 2" />
                
                {/* Blueprint lines resembling roads/buildings */}
                <rect x="20" y="30" width="30" height="40" stroke="#334155" strokeWidth="1" />
                <rect x="60" y="20" width="80" height="50" stroke="#0EA5E9" strokeWidth="1.5" strokeOpacity="0.4" />
                <rect x="150" y="40" width="30" height="30" stroke="#334155" strokeWidth="1" />
                
                {/* Radar ring indicator */}
                <circle cx="100" cy="45" r="8" stroke="#0EA5E9" strokeWidth="1.5" className="animate-ping" style={{ transformOrigin: 'center' }} />
                <circle cx="100" cy="45" r="4" fill="#0EA5E9" />
                
                {/* Text overlays */}
                <text x="100" y="32" fill="#0EA5E9" fontSize="6" fontFamily="monospace" fontWeight="bold" textAnchor="middle">SPAR PUNE HQ</text>
                <text x="25" y="85" fill="#475569" fontSize="5" fontFamily="monospace">STREET_9</text>
                <text x="155" y="85" fill="#475569" fontSize="5" fontFamily="monospace">BLVD_PRECISION</text>
              </svg>
            </div>
          </div>

          <div className="flex flex-col gap-6 text-xs text-slate-400 font-mono">
            <div>
              <span className="text-slate-500 block mb-1">// GLOBAL OFFICE HQ</span>
              100 Precision Way, Phase 3, Hinjawadi, Pune, MH 411057
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <span className="text-slate-500 block mb-1">// DIRECT PHONES</span>
                +91 (20) 555-0190
              </div>
              <div>
                <span className="text-slate-500 block mb-1">// DIRECT EMAIL</span>
                sales@spar-automation.com
              </div>
            </div>
          </div>
        </div>

        {/* RIGHT SIDE: The Form (White Bg) */}
        <div 
          ref={rightColRef}
          className="bg-white p-12 md:p-20 flex flex-col justify-center border-l border-slate-100"
        >
          <div className="max-w-md w-full mx-auto">
            <h2 className="text-2xl font-bold text-[#0F172A] mb-8 font-headings">
              Request Project Assessment
            </h2>

            {submitted ? (
              <div className="border border-[#0EA5E9]/30 bg-[#F0F9FF] p-6 text-slate-700 text-sm leading-relaxed rounded-none animate-fadeIn">
                <span className="font-bold text-[#0EA5E9] block mb-2">SYSTEM_STATUS: Assessment Request Logged</span>
                Thank you. Your request was successfully transmitted to our engineering team. We will review your automation requirements and contact you within 24 business hours.
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="flex flex-col gap-6">
                
                {/* Name */}
                <div className="flex flex-col">
                  <label htmlFor="name" className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2">Full Name</label>
                  <input
                    type="text"
                    id="name"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                    placeholder="Enter your name"
                    className="border border-slate-200 focus:border-[#0EA5E9] focus:outline-none p-3.5 text-sm text-[#0F172A] rounded-none transition-colors duration-200"
                  />
                </div>

                {/* Company */}
                <div className="flex flex-col">
                  <label htmlFor="company" className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2">Company Name</label>
                  <input
                    type="text"
                    id="company"
                    required
                    value={formData.company}
                    onChange={(e) => setFormData({...formData, company: e.target.value})}
                    placeholder="Enter company name"
                    className="border border-slate-200 focus:border-[#0EA5E9] focus:outline-none p-3.5 text-sm text-[#0F172A] rounded-none transition-colors duration-200"
                  />
                </div>

                {/* Email */}
                <div className="flex flex-col">
                  <label htmlFor="email" className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2">Corporate Email</label>
                  <input
                    type="email"
                    id="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                    placeholder="name@company.com"
                    className="border border-slate-200 focus:border-[#0EA5E9] focus:outline-none p-3.5 text-sm text-[#0F172A] rounded-none transition-colors duration-200"
                  />
                </div>

                {/* What are you looking to automate? Dropdown */}
                <div className="flex flex-col">
                  <label htmlFor="service" className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2">Automation Target</label>
                  <select
                    id="service"
                    value={formData.service}
                    onChange={(e) => setFormData({...formData, service: e.target.value})}
                    className="border border-slate-200 focus:border-[#0EA5E9] focus:outline-none p-3.5 text-sm text-[#0F172A] bg-white rounded-none transition-colors duration-200"
                  >
                    <option value="Machine Vision">Machine Vision (Quality Control / Inspection)</option>
                    <option value="Robotic Assembly">High-Speed Robotic Assembly</option>
                    <option value="Precision Welding">Precision Welding Cells</option>
                    <option value="Other Services">Other Custom Engineering Services</option>
                  </select>
                </div>

                <button
                  type="submit"
                  className="bg-[#0EA5E9] text-white hover:bg-[#0F172A] py-4 px-6 text-xs font-bold tracking-widest uppercase mt-4 transition-all duration-300 shadow-md shadow-sky-500/10 rounded-none border border-[#0EA5E9] hover:border-[#0F172A]"
                >
                  Submit Request &rarr;
                </button>

              </form>
            )}
          </div>
        </div>

      </div>

    </div>
  );
}
