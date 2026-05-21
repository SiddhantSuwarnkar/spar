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
      <div className="w-full text-center py-36 bg-white min-h-[50vh] text-slate-500 font-mono">
        PROJECT_NOT_FOUND // ERROR_404
      </div>
    );
  }

  return (
    <div ref={containerRef} className="w-full relative z-40 bg-white">
      
      {/* 1. EDGE-TO-EDGE HERO VIDEO */}
      <div className="relative h-[50vh] md:h-[70vh] w-full bg-slate-900 border-b border-slate-200 overflow-hidden">
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
              <span className="text-xs font-bold uppercase tracking-[0.25em] text-[#0EA5E9] mb-3 block">
                // The Challenge
              </span>
              <h2 className="text-2xl font-bold text-[#0F172A] mb-4 font-headings">
                Operational Constraints & Goals
              </h2>
              <p className="text-slate-700 text-base leading-relaxed font-normal">
                {project.challenge}
              </p>
            </div>

            <div className="border-t border-slate-100 pt-10">
              <span className="text-xs font-bold uppercase tracking-[0.25em] text-[#0EA5E9] mb-3 block">
                // The Solution
              </span>
              <h2 className="text-2xl font-bold text-[#0F172A] mb-4 font-headings">
                Custom Integrated Architecture
              </h2>
              <p className="text-slate-700 text-base leading-relaxed font-normal">
                {project.solution}
              </p>
            </div>
          </div>

          {/* Right Column (30% width) - Sticky specs table */}
          <div 
            ref={rightColRef}
            className="col-span-12 lg:col-span-4 bg-[#F1F5F9] border border-slate-200 p-8 flex flex-col justify-start lg:sticky lg:top-28"
          >
            <span className="text-[10px] font-mono text-slate-400 block mb-2">// SPEC_TABLE_V.1.0</span>
            <h3 className="text-xs font-bold uppercase tracking-[0.25em] text-[#0F172A] border-b border-slate-300 pb-4 mb-6 font-headings">
              System Specifications
            </h3>
            
            <div className="flex flex-col gap-4">
              {Object.entries(project.specs).map(([key, val]) => (
                <div key={key} className="flex justify-between border-b border-slate-200/60 pb-3 text-xs">
                  <span className="text-slate-500 font-bold uppercase tracking-wider">{key}</span>
                  <span className="text-[#0F172A] font-bold text-right">{val}</span>
                </div>
              ))}
            </div>

            <button 
              onClick={() => navigate('/contact')}
              className="bg-[#0F172A] text-white hover:bg-[#0EA5E9] text-center py-4 text-xs font-bold tracking-widest uppercase mt-8 transition-colors duration-200 rounded-none shadow-md"
            >
              Request Custom Integration
            </button>
          </div>

        </div>

        {/* 3. MORE IMAGES GALLERY */}
        <div ref={galleryRef} className="border-t border-slate-100 mt-20 pt-16">
          <span className="text-xs font-bold uppercase tracking-[0.25em] text-[#0EA5E9] mb-3 block">
            System Angles
          </span>
          <h2 className="text-2xl font-bold text-[#0F172A] mb-8 font-headings">
            Close-Ups & Tooling Diagnostic Views
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {project.angles.map((angleImg, idx) => (
              <div key={idx} className="border border-slate-200 p-2 bg-[#F1F5F9] rounded-none">
                <img 
                  src={angleImg} 
                  alt={`Tooling view ${idx + 1}`} 
                  className="w-full aspect-[16/10] object-cover rounded-none transition-all duration-700"
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
