import React, { useRef } from 'react';
import { useNavigation } from '../context/NavigationContext';
import { projects } from '../data/projectsData';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(ScrollTrigger);

export default function ProjectDetailPage() {
  const { path, navigate } = useNavigation();
  const containerRef = useRef(null);
  
  // Extract slug from path (Format is /projects/[slug])
  const segments = path.split('/');
  const slug = segments[segments.length - 1];
  
  // Find project
  const project = projects.find(p => p.slug === slug) || projects[0];

  // Animation Refs
  const leftColRef = useRef(null);
  const rightColRef = useRef(null);
  const galleryRef = useRef(null);

  useGSAP(() => {
    // 1. Content elements slide up
    gsap.fromTo(leftColRef.current.children,
      { y: 50, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.8, stagger: 0.2, ease: 'power2.out' }
    );

    // 2. Sidebar slide in
    gsap.fromTo(rightColRef.current,
      { x: 50, opacity: 0 },
      { x: 0, opacity: 1, duration: 0.8, ease: 'power2.out', delay: 0.2 }
    );

    // 3. Gallery slide up on scroll
    gsap.fromTo(galleryRef.current,
      { y: 80, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.9,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: galleryRef.current,
          start: 'top 85%'
        }
      }
    );
  }, { scope: containerRef });

  if (!project) {
    return (
      <div className="w-full text-center py-36 bg-[#090E17] min-h-[50vh] text-slate-500 font-mono">
        PROJECT_NOT_FOUND // ERROR_404
      </div>
    );
  }

  return (
    <div ref={containerRef} className="w-full relative z-40 bg-[#090E17]">
      
      {/* 1. EDGE-TO-EDGE HERO VIDEO */}
      <div className="relative h-[50vh] md:h-[70vh] w-full bg-slate-900 border-b border-white/10 overflow-hidden">
        {project.video ? (
          <video 
            src={project.video} 
            poster={project.image}
            autoPlay 
            loop 
            muted 
            playsInline
            className="w-full h-full object-cover opacity-90"
          />
        ) : (
          <img 
            src={project.image} 
            alt={project.title} 
            className="w-full h-full object-cover opacity-90"
          />
        )}
        
        {/* Back Button */}
        <div className="absolute top-28 left-6 md:left-20 z-30 pointer-events-auto">
          <a
            href="/projects"
            onClick={(e) => { e.preventDefault(); navigate('/projects'); }}
            className="inline-flex items-center gap-2 px-4 py-2 bg-[#0F172A]/85 backdrop-blur-[4px] border border-slate-800 text-xs font-bold uppercase tracking-wider text-slate-300 hover:text-white hover:bg-[#0EA5E9] hover:border-[#0EA5E9] transition-all duration-300 rounded-[2px]"
          >
            ← Back to Case Studies
          </a>
        </div>

        {/* Subtle overlay gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#0F172A]/80 via-transparent to-transparent pointer-events-none" />
        
        {/* Breadcrumb & Title */}
        <div className="absolute bottom-12 left-6 md:left-20 text-white max-w-4xl">
          <div className="flex items-center gap-2 mb-3">
            <a 
              href="/projects" 
              onClick={(e) => { e.preventDefault(); navigate('/projects'); }}
              className="text-[10px] font-bold tracking-[0.25em] text-[#0EA5E9] hover:underline uppercase"
            >
              Deployments
            </a>
            <span className="text-[10px] text-slate-500 font-mono">/</span>
            <span className="text-[10px] font-bold tracking-[0.25em] text-slate-300 uppercase">
              {project.category}
            </span>
          </div>
          
          <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold tracking-tight font-headings">
            {project.title}
          </h1>
        </div>
      </div>

      {/* 2. SPLIT LAYOUT: Challenge/Solution & Specs Table */}
      <div className="max-w-7xl mx-auto px-6 md:px-20 py-16 md:py-24">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-start">
          
          {/* Left Column (70% width) */}
          <div ref={leftColRef} className="col-span-12 lg:col-span-8 flex flex-col gap-10">
            <div>
              <span className="text-xs font-bold uppercase tracking-[0.25em] text-[#0EA5E9] mb-3 block font-mono">
                // The Challenge
              </span>
              <h2 className="text-2xl font-bold text-[#F8FAFC] mb-4 font-headings">
                Operational Constraints & Goals
              </h2>
              <p className="text-slate-400 text-base leading-relaxed font-normal">
                {project.challenge}
              </p>
            </div>

            <div className="border-t border-white/10 pt-10">
              <span className="text-xs font-bold uppercase tracking-[0.25em] text-[#0EA5E9] mb-3 block font-mono">
                // The Solution
              </span>
              <h2 className="text-2xl font-bold text-[#F8FAFC] mb-4 font-headings">
                Custom Integrated Architecture
              </h2>
              <p className="text-slate-400 text-base leading-relaxed font-normal">
                {project.solution}
              </p>
            </div>

            {/* NEW: ROI & Impact Grid */}
            <div className="border-t border-white/10 pt-10">
              <span className="text-xs font-bold uppercase tracking-[0.25em] text-[#0EA5E9] mb-3 block font-mono">
                // Measurable Impact
              </span>
              <h2 className="text-2xl font-bold text-[#F8FAFC] mb-6 font-headings">
                ROI & Performance Metrics
              </h2>
              
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {project.metrics && project.metrics.map((m, i) => (
                  <div key={i} className="bg-[#1E293B]/50 border border-white/10 p-4 rounded-sm flex flex-col items-center justify-center text-center shadow-md">
                    <span className="text-2xl lg:text-3xl font-black text-white font-headings mb-1">{m.value}</span>
                    <span className="text-[10px] font-bold text-[#0EA5E9] uppercase tracking-widest font-mono">{m.label}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column (30% width) - Sticky specs table */}
          <div 
            ref={rightColRef}
            className="col-span-12 lg:col-span-4 bg-[#1E293B]/50 backdrop-blur-md border border-white/10 p-8 flex flex-col justify-start lg:sticky lg:top-28 rounded-sm shadow-[0_10px_30px_rgba(0,0,0,0.5)]"
          >
            <span className="text-[10px] font-mono text-slate-500 block mb-2">// SPEC_TABLE_V.1.0</span>
            <h3 className="text-xs font-bold uppercase tracking-[0.25em] text-[#F8FAFC] border-b border-white/10 pb-4 mb-6 font-headings">
              System Specifications
            </h3>
            
            <div className="flex flex-col gap-4">
              {Object.entries(project.specs).map(([key, val]) => (
                <div key={key} className="flex justify-between border-b border-white/5 pb-3 text-xs">
                  <span className="text-slate-400 font-bold uppercase tracking-wider font-mono">{key}</span>
                  <span className="text-[#F8FAFC] font-bold text-right font-mono">{val}</span>
                </div>
              ))}
            </div>

            <button 
              onClick={() => navigate('/contact')}
              className="bg-gradient-to-b from-slate-800 to-slate-900 border border-[#0EA5E9]/50 text-white hover:border-[#0EA5E9] text-center py-4 text-xs font-bold tracking-widest uppercase mt-8 transition-all duration-300 rounded-sm shadow-md font-mono"
            >
              Request Custom Integration
            </button>
          </div>

        </div>

        {/* 3. MORE IMAGES GALLERY */}
        <div ref={galleryRef} className="border-t border-white/10 mt-20 pt-16">
          <span className="text-xs font-bold uppercase tracking-[0.25em] text-[#0EA5E9] mb-3 block font-mono">
            System Angles
          </span>
          <h2 className="text-2xl font-bold text-[#F8FAFC] mb-8 font-headings">
            Close-Ups & Tooling Diagnostic Views
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {project.angles.map((angleImg, idx) => (
              <div key={idx} className="border border-white/10 p-2 bg-[#1E293B]/50 rounded-sm">
                <img 
                  src={angleImg} 
                  alt={`Tooling view ${idx + 1}`} 
                  className="w-full aspect-[16/10] object-cover rounded-[2px] transition-all duration-700"
                />
                <div className="flex justify-between items-center mt-3 text-[10px] font-mono text-slate-500">
                  <span>CAMERA_ANGLE_0{idx + 1}.png</span>
                  <span>COORD_VERIFIED</span>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>

    </div>
  );
}
