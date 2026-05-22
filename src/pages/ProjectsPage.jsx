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
    // Parallax Effect
    gsap.to('.parallax-bg', {
      yPercent: 30,
      ease: "none",
      scrollTrigger: {
        trigger: '.header-section',
        start: "top top",
        end: "bottom top",
        scrub: true
      }
    });

    gsap.utils.toArray('.reveal-up').forEach(elem => {
      gsap.fromTo(elem, 
        { y: 60, opacity: 0 }, 
        {
          y: 0, 
          opacity: 1, 
          duration: 1, 
          ease: 'power3.out',
          scrollTrigger: { trigger: elem, start: 'top 85%' }
        }
      );
    });

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
    <div ref={containerRef} className="w-full relative z-40 bg-[#090E17]">
      
      {/* Cinematic Header */}
      <section className="header-section relative h-[80vh] flex items-center justify-center overflow-hidden">
        {/* Background Image with Parallax */}
        <div className="absolute inset-0 w-full h-[130%] -top-[15%]">
          <img 
            src="/robotic_welding_cell.png" 
            alt="Robotic Welding Deployment"
            className="parallax-bg w-full h-full object-cover opacity-60" 
          />
        </div>
        
        {/* Vibrant Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#0F172A]/90 via-[#0F172A]/60 to-[#090E17] z-10" />
        
        <div className="relative z-20 text-center px-4 reveal-up mt-20 max-w-5xl">
          <span className="text-[#0EA5E9] font-bold tracking-[0.4em] uppercase mb-6 block text-sm shadow-sm font-mono">
            System Deployments
          </span>
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-black font-headings tracking-tighter mb-8 bg-clip-text text-transparent bg-gradient-to-r from-white via-slate-200 to-[#0EA5E9]">
            Proven Deployments. <br/> Measurable ROI.
          </h1>
          <p className="text-slate-300 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed font-normal">
            Explore our library of custom-built robotic workcells and automated inspection loops currently running on production lines worldwide.
          </p>
        </div>
      </section>

      {/* 2. CATEGORY FILTERS */}
      <section className="bg-[#090E17] py-8 px-6 md:px-20 border-b border-white/10">
        <div className="max-w-7xl mx-auto flex flex-wrap gap-3 items-center">
          <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mr-4 font-mono">// Filters:</span>
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-4 py-2 text-xs font-bold tracking-wider uppercase rounded-sm border transition-all duration-200 font-mono ${
                activeCategory === cat
                  ? 'bg-gradient-to-b from-slate-800 to-slate-900 text-white border-[#0EA5E9]/50 shadow-[0_0_15px_rgba(14,165,233,0.3)]'
                  : 'bg-[#1E293B]/50 text-slate-400 border-white/10 hover:border-white/30 hover:text-white'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </section>

      {/* 3. THE SCALABLE PORTFOLIO GRID */}
      <section className="bg-[#090E17] py-20 px-6 md:px-20 min-h-[50vh]">
        <div className="max-w-7xl mx-auto">
          
          <div 
            ref={gridRef}
            className="grid grid-cols-1 md:grid-cols-3 gap-8"
          >
            {filteredProjects.map((project) => (
              <div 
                key={project.id}
                onClick={() => navigate(`/projects/${project.slug}`)}
                className="group relative aspect-[4/3] overflow-hidden bg-[#1E293B] border border-white/10 shadow-sm cursor-pointer rounded-sm"
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
                <div className="absolute inset-0 bg-[#090E17]/90 flex flex-col justify-center p-8 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none z-20">
                  <span className="text-[10px] font-bold tracking-[0.25em] text-[#0EA5E9] uppercase mb-2 font-mono">
                    {project.category}
                  </span>
                  <h3 className="text-2xl font-bold text-white mb-4 font-headings">
                    {project.title}
                  </h3>
                  <p className="text-slate-300 text-xs leading-relaxed mb-6 font-normal">
                    {project.challenge.substring(0, 100)}...
                  </p>
                  <div className="flex items-center gap-3 text-[10px] font-bold tracking-widest text-white uppercase mt-auto font-mono">
                    <span className="w-8 h-[2px] bg-[#0EA5E9]" />
                    View Specifications & CAD Info
                  </div>
                </div>

                {/* Bottom Title Bar */}
                <div className="absolute bottom-0 left-0 w-full bg-[#1E293B]/90 backdrop-blur-md border-t border-white/10 p-4 flex justify-between items-center z-10 transition-transform duration-300 group-hover:translate-y-full">
                  <div>
                    <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider font-mono">{project.client}</h4>
                    <h3 className="text-sm font-bold text-white font-headings mt-0.5">{project.title}</h3>
                  </div>
                  <span className="text-[10px] font-bold text-[#0EA5E9] uppercase tracking-widest border border-white/10 px-3 py-1 group-hover:border-[#0EA5E9] transition-all duration-300 font-mono rounded-sm">
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
