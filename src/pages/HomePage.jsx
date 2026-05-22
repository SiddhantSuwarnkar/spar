import React, { useRef } from 'react';
import { useNavigation } from '../context/NavigationContext';
import { projects } from '../data/projectsData';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

// 1. IMPORT THE HERO
import Hero from '../components/Hero';

gsap.registerPlugin(ScrollTrigger);

export default function HomePage() {
  const { navigate } = useNavigation();
  const containerRef = useRef(null);

  const pitchRef = useRef(null);
  const teaserSectionRef = useRef(null);
  const teaserCardsRef = useRef([]);
  const featuredRef = useRef(null);
  const featuredCardsRef = useRef([]);

  useGSAP(() => {
    gsap.fromTo(pitchRef.current,
      { y: 60, opacity: 0 },
      { y: 0, opacity: 1, duration: 1, ease: 'power3.out', scrollTrigger: { trigger: pitchRef.current, start: 'top 85%' } }
    );

    gsap.fromTo(teaserCardsRef.current,
      { y: 80, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.8, stagger: 0.2, ease: 'power3.out', scrollTrigger: { trigger: teaserSectionRef.current, start: 'top 80%' } }
    );

    gsap.fromTo(featuredCardsRef.current,
      { y: 80, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.8, stagger: 0.15, ease: 'power3.out', scrollTrigger: { trigger: featuredRef.current, start: 'top 80%' } }
    );

    // Global reveal animations for non-staggered elements
    gsap.utils.toArray('.reveal-up').forEach(elem => {
      gsap.fromTo(elem, 
        { y: 40, opacity: 0 }, 
        {
          y: 0, 
          opacity: 1, 
          duration: 1, 
          ease: 'power3.out',
          scrollTrigger: { 
            trigger: elem, 
            start: 'top 85%' 
          }
        }
      );
    });
  }, { scope: containerRef });

  return (
    <main className="w-full bg-[#090E17]">

      {/* 2. RENDER THE HERO FIRST */}
      <Hero />

      {/* 3. WRAP THE REST OF THE PAGE IN Z-40 */}
      <div ref={containerRef} className="w-full relative z-40 bg-[#090E17]">

        <section className="bg-[#0F172A] py-24 md:py-32 px-6 md:px-20 border-b border-white/10 flex items-center justify-center">
          <div ref={pitchRef} className="max-w-4xl text-center">
            <span className="text-xs font-bold uppercase tracking-[0.3em] text-[#0EA5E9] mb-4 block font-mono">
              System Architecture & Kinematics
            </span>
            <h2 className="text-4xl md:text-6xl font-bold text-[#F8FAFC] tracking-tight leading-[1.15] mb-8 font-headings">
              Designing intelligent robotic workcells for modern industrial automation.
            </h2>
            <div className="w-16 h-[2px] bg-[#0EA5E9] mx-auto mb-8"></div>
            <p className="text-slate-400 text-base md:text-lg max-w-2xl mx-auto leading-relaxed font-normal">
              We bridge physical machinery and virtual digital twins. Our team architects custom tooling, vision diagnostic loops, and synchronized hardware cells designed to operate with absolute safety and continuous peak throughput.
            </p>
          </div>
        </section>

        <section ref={teaserSectionRef} className="bg-[#090E17] py-24 px-6 md:px-20 border-b border-white/10">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16 reveal-up">
              <span className="text-xs font-bold uppercase tracking-[0.25em] text-[#0EA5E9] mb-3 block font-mono">
                Core Capabilities
              </span>
              <h3 className="text-3xl md:text-4xl font-bold text-[#F8FAFC] tracking-tight font-headings">
                Engineered Capabilities
              </h3>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {/* Card 1 */}
              <div ref={el => teaserCardsRef.current[0] = el} className="bg-[#1E293B]/50 backdrop-blur-md border border-white/10 p-8 flex flex-col items-start shadow-sm hover:border-[#0EA5E9]/50 transition-all duration-300 rounded-sm group">
                <div className="w-12 h-12 bg-[#0F172A] text-[#0EA5E9] flex items-center justify-center mb-6 border border-white/10">
                  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /><path strokeLinecap="round" strokeLinejoin="round" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" /></svg>
                </div>
                <h4 className="text-lg font-bold text-[#F8FAFC] mb-3 font-headings">Machine Vision</h4>
                <p className="text-slate-400 text-sm leading-relaxed mb-6 font-normal">High-resolution 2D/3D inspection systems, real-time quality control checks, and sub-millimeter part localization.</p>
                <a href="/solutions" onClick={(e) => { e.preventDefault(); navigate('/solutions'); }} className="text-xs font-bold text-[#0EA5E9] uppercase tracking-widest flex items-center gap-2 group-hover:text-white transition-colors duration-200 mt-auto font-mono">Learn More &rarr;</a>
              </div>
              {/* Card 2 */}
              <div ref={el => teaserCardsRef.current[1] = el} className="bg-[#1E293B]/50 backdrop-blur-md border border-white/10 p-8 flex flex-col items-start shadow-sm hover:border-[#0EA5E9]/50 transition-all duration-300 rounded-sm group">
                <div className="w-12 h-12 bg-[#0F172A] text-[#0EA5E9] flex items-center justify-center mb-6 border border-white/10">
                  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" /></svg>
                </div>
                <h4 className="text-lg font-bold text-[#F8FAFC] mb-3 font-headings">Automated Assembly</h4>
                <p className="text-slate-400 text-sm leading-relaxed mb-6 font-normal">High-speed picking cells, dual-arm synchronous kinematic systems, and intelligent custom gripper fabrication.</p>
                <a href="/solutions" onClick={(e) => { e.preventDefault(); navigate('/solutions'); }} className="text-xs font-bold text-[#0EA5E9] uppercase tracking-widest flex items-center gap-2 group-hover:text-white transition-colors duration-200 mt-auto font-mono">Learn More &rarr;</a>
              </div>
              {/* Card 3 */}
              <div ref={el => teaserCardsRef.current[2] = el} className="bg-[#1E293B]/50 backdrop-blur-md border border-white/10 p-8 flex flex-col items-start shadow-sm hover:border-[#0EA5E9]/50 transition-all duration-300 rounded-sm group">
                <div className="w-12 h-12 bg-[#0F172A] text-[#0EA5E9] flex items-center justify-center mb-6 border border-white/10">
                  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
                </div>
                <h4 className="text-lg font-bold text-[#F8FAFC] mb-3 font-headings">Precision Welding</h4>
                <p className="text-slate-400 text-sm leading-relaxed mb-6 font-normal">Consistent seam-welding cells, path tracking micro-sensors, and active heat control algorithms for metal assembly.</p>
                <a href="/solutions" onClick={(e) => { e.preventDefault(); navigate('/solutions'); }} className="text-xs font-bold text-[#0EA5E9] uppercase tracking-widest flex items-center gap-2 group-hover:text-white transition-colors duration-200 mt-auto font-mono">Learn More &rarr;</a>
              </div>
            </div>
          </div>
        </section>

        <section ref={featuredRef} className="bg-[#0F172A] py-24 px-6 md:px-20 border-b border-white/10">
          <div className="max-w-7xl mx-auto">
            <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6 reveal-up">
              <div>
                <span className="text-xs font-bold uppercase tracking-[0.25em] text-[#0EA5E9] mb-3 block font-mono">Featured Work</span>
                <h3 className="text-3xl md:text-4xl font-bold text-[#F8FAFC] tracking-tight font-headings">Proven Deployments</h3>
              </div>
              <button onClick={() => navigate('/projects')} className="bg-gradient-to-b from-slate-800 to-slate-900 border border-[#0EA5E9]/50 text-white hover:border-[#0EA5E9] px-6 py-3 rounded-sm text-xs font-bold tracking-widest uppercase transition-all duration-300 shadow-md h-fit whitespace-nowrap font-mono">View All Projects</button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
              {projects.map((project, idx) => (
                <div key={project.id} ref={el => featuredCardsRef.current[idx] = el} onClick={() => navigate(`/projects/${project.slug}`)} className="group relative aspect-[16/10] overflow-hidden bg-[#1E293B] border border-white/10 shadow-sm cursor-pointer rounded-sm">
                  <video src={project.video} poster={project.image} autoPlay loop muted playsInline className="w-full h-full object-cover group-hover:scale-105 transition-all duration-700 opacity-70 group-hover:opacity-100" />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#090E17]/90 to-transparent flex flex-col justify-between p-8 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-20">
                    <div className="flex justify-between items-start">
                      <div>
                        <span className="text-[10px] font-bold tracking-[0.2em] text-[#0EA5E9] uppercase block mb-1 font-mono">{project.category}</span>
                        <h4 className="text-xl font-bold text-white font-headings">{project.title}</h4>
                      </div>
                      <span className="text-[9px] font-mono text-slate-400 border border-white/20 px-2 py-0.5">SYS_ID: 0{project.id}</span>
                    </div>
                    <p className="text-slate-300 text-xs leading-relaxed max-w-md font-normal">{project.challenge}</p>
                    <div className="flex items-center gap-3 text-[10px] font-bold tracking-widest text-[#0EA5E9] uppercase font-mono"><span className="w-8 h-[1px] bg-[#0EA5E9]" />Review Specs & Systems</div>
                  </div>
                  <div className="absolute bottom-0 left-0 w-full bg-[#1E293B]/90 backdrop-blur-md border-t border-white/10 px-6 py-4 flex justify-between items-center z-10 group-hover:translate-y-full transition-transform duration-300">
                    <div>
                      <h5 className="text-[9px] font-bold text-slate-400 uppercase tracking-widest font-mono">{project.client}</h5>
                      <h4 className="text-sm font-bold text-white font-headings mt-0.5">{project.title}</h4>
                    </div>
                    <span className="text-[9px] font-bold text-[#0EA5E9] tracking-widest uppercase font-mono">View</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="bg-[#090E17] py-12 border-b border-white/10 overflow-hidden relative select-none">
          <div className="absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-[#090E17] to-transparent z-10 pointer-events-none" />
          <div className="absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-[#090E17] to-transparent z-10 pointer-events-none" />
          <div className="max-w-7xl mx-auto px-6 mb-4 text-center reveal-up">
            <span className="text-[10px] font-mono uppercase tracking-[0.25em] text-slate-500">// INTEGRATED SYSTEMS DEPLOYED AT INDUSTRY LEADERS</span>
          </div>
          <div className="flex items-center whitespace-nowrap overflow-hidden py-4 reveal-up">
            <div className="flex gap-16 items-center animate-marquee">
              <span className="text-lg font-bold tracking-widest text-slate-600 font-headings">AEROTECH SOLUTIONS</span><span className="w-2.5 h-2.5 bg-[#0EA5E9] rounded-sm shrink-0" />
              <span className="text-lg font-bold tracking-widest text-slate-600 font-headings">GLOBAL MOTORS CO.</span><span className="w-2.5 h-2.5 bg-slate-600 rounded-sm shrink-0" />
              <span className="text-lg font-bold tracking-widest text-slate-600 font-headings">PRIME LOGISTICS INC.</span><span className="w-2.5 h-2.5 bg-[#0EA5E9] rounded-sm shrink-0" />
              <span className="text-lg font-bold tracking-widest text-slate-600 font-headings">PHARMA-CONCEPTS</span><span className="w-2.5 h-2.5 bg-slate-600 rounded-sm shrink-0" />
              <span className="text-lg font-bold tracking-widest text-slate-600 font-headings">INTELLI-GRIP GROUP</span><span className="w-2.5 h-2.5 bg-[#0EA5E9] rounded-sm shrink-0" />
              <span className="text-lg font-bold tracking-widest text-slate-600 font-headings">AEROTECH SOLUTIONS</span><span className="w-2.5 h-2.5 bg-[#0EA5E9] rounded-sm shrink-0" />
              <span className="text-lg font-bold tracking-widest text-slate-600 font-headings">GLOBAL MOTORS CO.</span><span className="w-2.5 h-2.5 bg-slate-600 rounded-sm shrink-0" />
              <span className="text-lg font-bold tracking-widest text-slate-600 font-headings">PRIME LOGISTICS INC.</span><span className="w-2.5 h-2.5 bg-[#0EA5E9] rounded-sm shrink-0" />
              <span className="text-lg font-bold tracking-widest text-slate-600 font-headings">PHARMA-CONCEPTS</span><span className="w-2.5 h-2.5 bg-slate-600 rounded-sm shrink-0" />
              <span className="text-lg font-bold tracking-widest text-slate-600 font-headings">INTELLI-GRIP GROUP</span><span className="w-2.5 h-2.5 bg-[#0EA5E9] rounded-sm shrink-0" />
            </div>
          </div>
        </section>

        <style>{`
          @keyframes marquee { 0% { transform: translateX(0%); } 100% { transform: translateX(-50%); } }
          .animate-marquee { display: flex; animation: marquee 25s linear infinite; }
        `}</style>
      </div>
    </main>
  );
}