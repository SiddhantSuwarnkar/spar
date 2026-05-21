import React, { useRef } from 'react';
import { useNavigation } from '../context/NavigationContext';
import { projects } from '../data/projectsData';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(ScrollTrigger);

export default function HomePage() {
  const { navigate } = useNavigation();
  const containerRef = useRef(null);

  // Animation Refs
  const pitchRef = useRef(null);
  const teaserSectionRef = useRef(null);
  const teaserCardsRef = useRef([]);
  const featuredRef = useRef(null);
  const featuredCardsRef = useRef([]);

  useGSAP(() => {
    // 1. Elevator Pitch Slide Up
    gsap.fromTo(pitchRef.current,
      { y: 60, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: pitchRef.current,
          start: 'top 85%',
        }
      }
    );

    // 2. Solutions Teaser Cards stagger slide up
    gsap.fromTo(teaserCardsRef.current,
      { y: 80, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.8,
        stagger: 0.2,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: teaserSectionRef.current,
          start: 'top 80%',
        }
      }
    );

    // 3. Featured Work Cards stagger slide up
    gsap.fromTo(featuredCardsRef.current,
      { y: 80, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.8,
        stagger: 0.15,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: featuredRef.current,
          start: 'top 80%',
        }
      }
    );
  }, { scope: containerRef });

  return (
    <div ref={containerRef} className="w-full relative z-40 bg-white">

      {/* 1. ELEVATOR PITCH SECTION */}
      <section className="bg-white py-24 md:py-32 px-6 md:px-20 border-b border-slate-100 flex items-center justify-center">
        <div ref={pitchRef} className="max-w-4xl text-center">
          <span className="text-xs font-bold uppercase tracking-[0.3em] text-[#0EA5E9] mb-4 block">
            System Architecture & Kinematics
          </span>
          <h2 className="text-4xl md:text-6xl font-bold text-[#0F172A] tracking-tight leading-[1.15] mb-8 font-headings">
            Designing intelligent robotic workcells for modern industrial automation.
          </h2>
          <div className="w-16 h-[2px] bg-[#0EA5E9] mx-auto mb-8"></div>
          <p className="text-slate-700 text-base md:text-lg max-w-2xl mx-auto leading-relaxed font-normal">
            We bridge physical machinery and virtual digital twins. Our team architects custom tooling, vision diagnostic loops, and synchronized hardware cells designed to operate with absolute safety and continuous peak throughput.
          </p>
        </div>
      </section>

      {/* 2. SOLUTIONS TEASER CARDS */}
      <section ref={teaserSectionRef} className="bg-[#F1F5F9] py-24 px-6 md:px-20 border-b border-slate-200">
        <div className="max-w-7xl mx-auto">

          <div className="text-center mb-16">
            <span className="text-xs font-bold uppercase tracking-[0.25em] text-[#0EA5E9] mb-3 block">
              Core Capabilities
            </span>
            <h3 className="text-3xl md:text-4xl font-bold text-[#0F172A] tracking-tight font-headings">
              Engineered Capabilities
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">

            {/* Card 1: Machine Vision */}
            <div
              ref={el => teaserCardsRef.current[0] = el}
              className="bg-white border border-slate-200/60 p-8 flex flex-col items-start shadow-sm hover:shadow-md transition-all duration-300 rounded-none group"
            >
              <div className="w-12 h-12 bg-[#F1F5F9] text-[#0EA5E9] flex items-center justify-center mb-6 border border-slate-200/40">
                {/* SVG Icon: Eye/Aperture */}
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                </svg>
              </div>
              <h4 className="text-lg font-bold text-[#0F172A] mb-3 font-headings">Machine Vision</h4>
              <p className="text-slate-700 text-sm leading-relaxed mb-6 font-normal">
                High-resolution 2D/3D inspection systems, real-time quality control checks, and sub-millimeter part localization.
              </p>
              <a
                href="/solutions"
                onClick={(e) => { e.preventDefault(); navigate('/solutions'); }}
                className="text-xs font-bold text-[#0EA5E9] uppercase tracking-widest flex items-center gap-2 group-hover:text-[#0F172A] transition-colors duration-200 mt-auto"
              >
                Learn More &rarr;
              </a>
            </div>

            {/* Card 2: Kinematic Assembly */}
            <div
              ref={el => teaserCardsRef.current[1] = el}
              className="bg-white border border-slate-200/60 p-8 flex flex-col items-start shadow-sm hover:shadow-md transition-all duration-300 rounded-none group"
            >
              <div className="w-12 h-12 bg-[#F1F5F9] text-[#0EA5E9] flex items-center justify-center mb-6 border border-slate-200/40">
                {/* SVG Icon: Robotic Arm / Gripper */}
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                </svg>
              </div>
              <h4 className="text-lg font-bold text-[#0F172A] mb-3 font-headings">Automated Assembly</h4>
              <p className="text-slate-700 text-sm leading-relaxed mb-6 font-normal">
                High-speed picking cells, dual-arm synchronous kinematic systems, and intelligent custom gripper fabrication.
              </p>
              <a
                href="/solutions"
                onClick={(e) => { e.preventDefault(); navigate('/solutions'); }}
                className="text-xs font-bold text-[#0EA5E9] uppercase tracking-widest flex items-center gap-2 group-hover:text-[#0F172A] transition-colors duration-200 mt-auto"
              >
                Learn More &rarr;
              </a>
            </div>

            {/* Card 3: Robotic Welding */}
            <div
              ref={el => teaserCardsRef.current[2] = el}
              className="bg-white border border-slate-200/60 p-8 flex flex-col items-start shadow-sm hover:shadow-md transition-all duration-300 rounded-none group"
            >
              <div className="w-12 h-12 bg-[#F1F5F9] text-[#0EA5E9] flex items-center justify-center mb-6 border border-slate-200/40">
                {/* SVG Icon: Fire/Spark */}
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h4 className="text-lg font-bold text-[#0F172A] mb-3 font-headings">Precision Welding</h4>
              <p className="text-slate-700 text-sm leading-relaxed mb-6 font-normal">
                Consistent seam-welding cells, path tracking micro-sensors, and active heat control algorithms for metal assembly.
              </p>
              <a
                href="/solutions"
                onClick={(e) => { e.preventDefault(); navigate('/solutions'); }}
                className="text-xs font-bold text-[#0EA5E9] uppercase tracking-widest flex items-center gap-2 group-hover:text-[#0F172A] transition-colors duration-200 mt-auto"
              >
                Learn More &rarr;
              </a>
            </div>

          </div>

        </div>
      </section>

      {/* 3. FEATURED WORK GRID */}
      <section ref={featuredRef} className="bg-white py-24 px-6 md:px-20 border-b border-slate-100">
        <div className="max-w-7xl mx-auto">

          <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
            <div>
              <span className="text-xs font-bold uppercase tracking-[0.25em] text-[#0EA5E9] mb-3 block">
                Featured Work
              </span>
              <h3 className="text-3xl md:text-4xl font-bold text-[#0F172A] tracking-tight font-headings">
                Proven Deployments
              </h3>
            </div>
            <button
              onClick={() => navigate('/projects')}
              className="bg-[#0F172A] text-white hover:bg-[#0EA5E9] px-6 py-3 rounded-none text-xs font-bold tracking-widest uppercase transition-all duration-300 shadow-md h-fit whitespace-nowrap"
            >
              View All Projects
            </button>
          </div>

          {/* Grid Layout: Symmetric 3-column layout */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            {projects.map((project, idx) => (
              <div
                key={project.id}
                ref={el => featuredCardsRef.current[idx] = el}
                onClick={() => navigate(`/projects/${project.slug}`)}
                className="group relative aspect-[16/10] overflow-hidden bg-slate-900 border border-slate-200 shadow-sm cursor-pointer rounded-none"
              >
                <video
                  src={project.video}
                  poster={project.image}
                  autoPlay
                  loop
                  muted
                  playsInline
                  className="w-full h-full object-cover group-hover:scale-105 transition-all duration-700 opacity-90 group-hover:opacity-100"
                />

                {/* Visual Engineering Overlay */}
                <div className="absolute inset-0 bg-[#0F172A]/85 flex flex-col justify-between p-8 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-20">
                  <div className="flex justify-between items-start">
                    <div>
                      <span className="text-[10px] font-bold tracking-[0.2em] text-[#0EA5E9] uppercase block mb-1">
                        {project.category}
                      </span>
                      <h4 className="text-xl font-bold text-white font-headings">{project.title}</h4>
                    </div>
                    <span className="text-[9px] font-mono text-slate-400 border border-slate-700 px-2 py-0.5">
                      SYS_ID: 0{project.id}
                    </span>
                  </div>

                  <p className="text-slate-200 text-xs leading-relaxed max-w-md font-normal">
                    {project.challenge}
                  </p>

                  <div className="flex items-center gap-3 text-[10px] font-bold tracking-widest text-[#0EA5E9] uppercase">
                    <span className="w-8 h-[1px] bg-[#0EA5E9]" />
                    Review Specs & Systems
                  </div>
                </div>

                {/* Bottom title bar */}
                <div className="absolute bottom-0 left-0 w-full bg-white border-t border-slate-200 px-6 py-4 flex justify-between items-center z-10 group-hover:translate-y-full transition-transform duration-300">
                  <div>
                    <h5 className="text-[9px] font-bold text-slate-500 uppercase tracking-widest">{project.client}</h5>
                    <h4 className="text-sm font-bold text-[#0F172A] font-headings mt-0.5">{project.title}</h4>
                  </div>
                  <span className="text-[9px] font-bold text-[#0EA5E9] tracking-widest uppercase">
                    View
                  </span>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* 4. TRUST BAR (LOGOS MARQUEE) */}
      <section className="bg-white py-12 border-b border-slate-100 overflow-hidden relative select-none">

        {/* Subtle horizontal gradient fades on edges */}
        <div className="absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-white to-transparent z-10 pointer-events-none" />
        <div className="absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-white to-transparent z-10 pointer-events-none" />

        <div className="max-w-7xl mx-auto px-6 mb-4 text-center">
          <span className="text-[10px] font-mono uppercase tracking-[0.25em] text-slate-400">
            // INTEGRATED SYSTEMS DEPLOYED AT INDUSTRY LEADERS
          </span>
        </div>

        {/* Marquee Track using CSS keyframes animation */}
        <div className="flex items-center whitespace-nowrap overflow-hidden py-4">
          <div className="flex gap-16 items-center animate-marquee">

            {/* Logos Set 1 */}
            <span className="text-lg font-bold tracking-widest text-slate-300 font-headings">AEROTECH SOLUTIONS</span>
            <span className="w-2.5 h-2.5 bg-[#0EA5E9] rounded-none shrink-0" />
            <span className="text-lg font-bold tracking-widest text-slate-300 font-headings">GLOBAL MOTORS CO.</span>
            <span className="w-2.5 h-2.5 bg-slate-300 rounded-none shrink-0" />
            <span className="text-lg font-bold tracking-widest text-slate-300 font-headings">PRIME LOGISTICS INC.</span>
            <span className="w-2.5 h-2.5 bg-[#0EA5E9] rounded-none shrink-0" />
            <span className="text-lg font-bold tracking-widest text-slate-300 font-headings">PHARMA-CONCEPTS</span>
            <span className="w-2.5 h-2.5 bg-slate-300 rounded-none shrink-0" />
            <span className="text-lg font-bold tracking-widest text-slate-300 font-headings">INTELLI-GRIP GROUP</span>
            <span className="w-2.5 h-2.5 bg-[#0EA5E9] rounded-none shrink-0" />

            {/* Repeat Logos for continuous loop */}
            <span className="text-lg font-bold tracking-widest text-slate-300 font-headings">AEROTECH SOLUTIONS</span>
            <span className="w-2.5 h-2.5 bg-[#0EA5E9] rounded-none shrink-0" />
            <span className="text-lg font-bold tracking-widest text-slate-300 font-headings">GLOBAL MOTORS CO.</span>
            <span className="w-2.5 h-2.5 bg-slate-300 rounded-none shrink-0" />
            <span className="text-lg font-bold tracking-widest text-slate-300 font-headings">PRIME LOGISTICS INC.</span>
            <span className="w-2.5 h-2.5 bg-[#0EA5E9] rounded-none shrink-0" />
            <span className="text-lg font-bold tracking-widest text-slate-300 font-headings">PHARMA-CONCEPTS</span>
            <span className="w-2.5 h-2.5 bg-slate-300 rounded-none shrink-0" />
            <span className="text-lg font-bold tracking-widest text-slate-300 font-headings">INTELLI-GRIP GROUP</span>
            <span className="w-2.5 h-2.5 bg-[#0EA5E9] rounded-none shrink-0" />

          </div>
        </div>

      </section>

      {/* Marquee Animation CSS added via style block */}
      <style>{`
        @keyframes marquee {
          0% { transform: translateX(0%); }
          100% { transform: translateX(-50%); }
        }
        .animate-marquee {
          display: flex;
          animation: marquee 25s linear infinite;
        }
      `}</style>

    </div>
  );
}
