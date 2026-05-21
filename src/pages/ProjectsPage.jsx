import React, { useState, useRef } from 'react';
import { useNavigation } from '../context/NavigationContext';
import { projects } from '../data/projectsData';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(ScrollTrigger);

const categories = ["All", "Delta Automation", "Machine Vision", "Robotics & Logistics"];

export default function ProjectsPage() {
  const { navigate } = useNavigation();
  const [activeCategory, setActiveCategory] = useState("All");
  const containerRef = useRef(null);
  const gridRef = useRef(null);

  // Filter projects based on selection
  const filteredProjects = activeCategory === "All" 
    ? projects 
    : projects.filter(p => p.category === activeCategory);

  useGSAP(() => {
    // Fade in grid items on render/scroll
    const items = gridRef.current.children;
    if (items.length > 0) {
      gsap.fromTo(items,
        { scale: 0.95, opacity: 0, y: 30 },
        { 
          scale: 1, 
          opacity: 1, 
          y: 0, 
          duration: 0.6, 
          stagger: 0.1, 
          ease: 'power2.out',
          overwrite: 'auto'
        }
      );
    }
  }, { dependencies: [activeCategory], scope: containerRef });

  return (
    <div ref={containerRef} className="w-full relative z-40 bg-white">
      
      {/* 1. HERO SECTION: Stark White, Bold Slate Heading */}
      <section className="bg-white pt-36 pb-16 px-6 md:px-20 border-b border-slate-100">
        <div className="max-w-7xl mx-auto">
          <span className="text-xs font-bold uppercase tracking-[0.3em] text-[#0EA5E9] mb-4 block">
            System Deployments
          </span>
          <h1 className="text-4xl md:text-6xl font-bold text-[#0F172A] tracking-tight mb-6 font-headings">
            Proven Deployments. Measurable ROI.
          </h1>
          <div className="w-16 h-[2px] bg-[#0EA5E9]"></div>
          <p className="text-slate-700 text-sm md:text-base max-w-xl mt-6 leading-relaxed font-normal">
            Explore our library of custom-built robotic workcells and automated inspection loops currently running on production lines worldwide.
          </p>
        </div>
      </section>

      {/* 2. CATEGORY FILTERS */}
      <section className="bg-white py-8 px-6 md:px-20 border-b border-slate-100">
        <div className="max-w-7xl mx-auto flex flex-wrap gap-3 items-center">
          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mr-4">// Filters:</span>
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-4 py-2 text-xs font-bold tracking-wider uppercase rounded-none border transition-all duration-200 ${
                activeCategory === cat
                  ? 'bg-[#0F172A] text-white border-[#0F172A]'
                  : 'bg-white text-slate-700 border-slate-200 hover:border-slate-400 hover:text-[#0F172A]'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </section>

      {/* 3. THE SCALABLE PORTFOLIO GRID */}
      <section className="bg-[#F1F5F9] py-20 px-6 md:px-20 min-h-[50vh]">
        <div className="max-w-7xl mx-auto">
          
          <div 
            ref={gridRef}
            className="grid grid-cols-1 md:grid-cols-3 gap-8"
          >
            {filteredProjects.map((project) => (
              <div 
                key={project.id}
                onClick={() => navigate(`/projects/${project.slug}`)}
                className="group relative aspect-[4/3] overflow-hidden bg-slate-900 border border-slate-200 shadow-sm cursor-pointer rounded-none"
              >
                
                {/* Main Image */}
                <video 
                  src={project.video} 
                  poster={project.image}
                  autoPlay 
                  loop 
                  muted 
                  playsInline
                  className="w-full h-full object-cover group-hover:scale-105 transition-all duration-700 opacity-90 group-hover:opacity-100"
                />
                
                {/* Overlay Details */}
                <div className="absolute inset-0 bg-[#0F172A]/90 flex flex-col justify-center p-8 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none z-20">
                  <span className="text-[10px] font-bold tracking-[0.25em] text-[#0EA5E9] uppercase mb-2">
                    {project.category}
                  </span>
                  <h3 className="text-2xl font-bold text-white mb-4 font-headings">
                    {project.title}
                  </h3>
                  <p className="text-slate-300 text-xs leading-relaxed mb-6 font-normal">
                    {project.challenge.substring(0, 100)}...
                  </p>
                  <div className="flex items-center gap-3 text-[10px] font-bold tracking-widest text-white uppercase mt-auto">
                    <span className="w-8 h-[2px] bg-[#0EA5E9]" />
                    View Specifications & CAD Info
                  </div>
                </div>

                {/* Bottom Title Bar */}
                <div className="absolute bottom-0 left-0 w-full bg-white border-t border-slate-200 p-4 flex justify-between items-center z-10 transition-transform duration-300 group-hover:translate-y-full">
                  <div>
                    <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider">{project.client}</h4>
                    <h3 className="text-sm font-bold text-[#0F172A] font-headings mt-0.5">{project.title}</h3>
                  </div>
                  <span className="text-[10px] font-bold text-[#0EA5E9] uppercase tracking-widest border border-slate-100 px-3 py-1 group-hover:bg-[#0EA5E9] group-hover:text-white group-hover:border-[#0EA5E9] transition-all duration-300">
                    View Specs
                  </span>
                </div>

              </div>
            ))}
          </div>

          {filteredProjects.length === 0 && (
            <div className="w-full text-center py-16 text-slate-500 font-mono text-sm uppercase">
              No deployments found in this category.
            </div>
          )}

        </div>
      </section>

    </div>
  );
}
