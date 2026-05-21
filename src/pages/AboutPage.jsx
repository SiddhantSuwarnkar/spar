import React, { useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(ScrollTrigger);

const leadership = [
  {
    name: "Dr. Marcus Vance",
    role: "Co-Founder & Chief Robotics Architect",
    bio: "Marcus holds a Ph.D. in Kinematics from MIT and has spent 15 years designing automated workcells for global automotive plants."
  },
  {
    name: "Sarah Sterling, PE",
    role: "Co-Founder & VP of Control Systems",
    bio: "Sarah is a licensed professional engineer who specializes in fail-safe PLC loops and machine vision synchronization systems."
  },
  {
    name: "Devon Cruz",
    role: "Director of Deployment & Integration",
    bio: "Devon oversees all on-site deployment projects. He has managed complex robotic integrations across five continents."
  }
];

export default function AboutPage() {
  const containerRef = useRef(null);
  const ch1Ref = useRef(null);
  const ch2Ref = useRef(null);
  const ch3Ref = useRef(null);
  const philosophyRef = useRef(null);
  const teamRef = useRef(null);
  const teamCardsRef = useRef([]);

  useGSAP(() => {
    // 1. Chapter 1 animation
    gsap.fromTo(ch1Ref.current.children,
      { y: 40, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.8,
        stagger: 0.15,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: ch1Ref.current,
          start: 'top 85%'
        }
      }
    );

    // 2. Chapter 2 animation
    gsap.fromTo(ch2Ref.current.children,
      { y: 40, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.8,
        stagger: 0.15,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: ch2Ref.current,
          start: 'top 85%'
        }
      }
    );

    // 3. Chapter 3 animation
    gsap.fromTo(ch3Ref.current.children,
      { y: 40, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.8,
        stagger: 0.15,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: ch3Ref.current,
          start: 'top 85%'
        }
      }
    );

    // 4. Philosophy section animations
    gsap.fromTo(philosophyRef.current.children,
      { y: 40, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.8,
        stagger: 0.15,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: philosophyRef.current,
          start: 'top 85%'
        }
      }
    );

    // 5. Team cards stagger slide up
    gsap.fromTo(teamCardsRef.current,
      { y: 50, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.8,
        stagger: 0.15,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: teamRef.current,
          start: 'top 80%'
        }
      }
    );
  }, { scope: containerRef });

  return (
    <div ref={containerRef} className="w-full relative z-40 bg-white">
      
      {/* 1. HERO SECTION: Cinematic wide shot of facility */}
      <section className="relative h-[320px] md:h-[480px] w-full bg-slate-900 border-b border-slate-200 overflow-hidden flex items-center pt-20">
        <img 
          src="/industrial_facility.png" 
          alt="SPAR Assembly Workshop" 
          className="absolute inset-0 w-full h-full object-cover opacity-80"
        />
        <div className="absolute inset-0 bg-[#0F172A]/75 pointer-events-none" />
        
        <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-20 w-full flex flex-col items-start justify-center">
          <span className="text-xs font-bold uppercase tracking-[0.3em] text-[#0EA5E9] mb-4 block">
            // About SPAR Robotics
          </span>
          <h1 className="text-4xl md:text-6xl font-bold tracking-tight font-headings max-w-3xl text-white">
            Stability and high-end infrastructure at scale.
          </h1>
        </div>
      </section>

      {/* 2. STORY CHAPTER 1: 2018 Genesis (Houston Lab) */}
      <section className="py-20 md:py-28 px-6 md:px-20 border-b border-slate-100 bg-white">
        <div ref={ch1Ref} className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-center">
          
          {/* Left Side: Story Text */}
          <div className="lg:col-span-6 flex flex-col justify-center">
            <span className="text-xs font-bold uppercase tracking-[0.25em] text-[#0EA5E9] mb-3 block">
              Chapter 01 // The Houston Lab (2018)
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-[#0F172A] tracking-tight mb-6 font-headings">
              Founding Pune's Kinematics Prototyping Shop
            </h2>
            <p className="text-slate-700 text-sm md:text-base leading-relaxed font-normal mb-4">
              SPAR was founded on a simple realization: manufacturing automation fails when hardware is treated as secondary to software. We began in a Houston prototyping shop designing custom end-effectors for aerospace clients.
            </p>
            <p className="text-slate-700 text-sm md:text-base leading-relaxed font-normal">
              By emphasizing mechanical tolerances and kinematic precision first, our early cells proved that industrial hardware could achieve sub-millimeter repeat accuracy under high-stress cycle rates.
            </p>
          </div>

          {/* Right Side: Showcase Video Loop */}
          <div className="lg:col-span-6">
            <div className="border-2 border-slate-100 p-2 bg-[#F1F5F9] rounded-none shadow-sm relative overflow-hidden aspect-[16/10] flex items-center justify-center">
              <video 
                src="/showcase/IMG_7543.mp4" 
                autoPlay 
                loop 
                muted 
                playsInline
                className="w-full h-full object-cover transition-all duration-700"
              />
              <span className="absolute bottom-4 right-4 bg-[#0F172A]/85 text-white font-mono text-[9px] px-3 py-1 tracking-wider uppercase border border-slate-800">
                SYS_DEV_LOOP_7543
              </span>
            </div>
          </div>

        </div>
      </section>

      {/* 3. STORY CHAPTER 2: 2021 Scale (Austin Expansion) */}
      <section className="py-20 md:py-28 px-6 md:px-20 border-b border-slate-200 bg-[#F1F5F9]">
        <div ref={ch2Ref} className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-center">
          
          {/* Left Side: Video (Alternating Layout) */}
          <div className="lg:col-span-6 lg:order-2">
            <div className="border-2 border-slate-200 p-2 bg-white rounded-none shadow-sm relative overflow-hidden aspect-[16/10] flex items-center justify-center">
              <video 
                src="/showcase/IMG_7544.mp4" 
                autoPlay 
                loop 
                muted 
                playsInline
                className="w-full h-full object-cover transition-all duration-700"
              />
              <span className="absolute bottom-4 right-4 bg-[#0F172A]/85 text-white font-mono text-[9px] px-3 py-1 tracking-wider uppercase border border-slate-800">
                SYS_DEV_LOOP_7544
              </span>
            </div>
          </div>

          {/* Right Side: Story Text & Stats */}
          <div className="lg:col-span-6 lg:order-1 flex flex-col justify-center">
            <span className="text-xs font-bold uppercase tracking-[0.25em] text-[#0EA5E9] mb-3 block">
              Chapter 02 // Scaling Operations (2021)
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-[#0F172A] tracking-tight mb-6 font-headings">
              Moving to Pune & Implementing Core Systems
            </h2>
            <p className="text-slate-700 text-sm md:text-base leading-relaxed font-normal mb-6">
              With growing demand for custom automated cells, we relocated to a dedicated clean-room engineering complex in Pune. We transitioned from specialized end-effectors to complete integrated workcell automation.
            </p>
            
            {/* Stats row */}
            <div className="grid grid-cols-2 gap-6 border-t border-slate-200/80 pt-6">
              <div>
                <span className="text-2xl md:text-3xl font-black text-[#0F172A] tracking-tight font-headings block mb-1">100+</span>
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block">Deployments Global</span>
              </div>
              <div>
                <span className="text-2xl md:text-3xl font-black text-[#0F172A] tracking-tight font-headings block mb-1">0.1mm</span>
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block">Mechanical Precision</span>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* 4. STORY CHAPTER 3: Present Day Platform (Symmetric Grid / Dark Section) */}
      <section className="py-20 md:py-28 px-6 md:px-20 bg-[#0F172A] border-b border-slate-900 text-white">
        <div ref={ch3Ref} className="max-w-7xl mx-auto">
          
          <div className="max-w-3xl mb-16">
            <span className="text-xs font-bold uppercase tracking-[0.25em] text-[#0EA5E9] mb-3 block">
              Chapter 03 // Modern Architecture (Present)
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-white tracking-tight font-headings">
              Unified Physical & Digital Twin Engineering
            </h2>
            <p className="text-slate-300 text-sm md:text-base leading-relaxed font-normal mt-4">
              Today, SPAR designs robotic systems that are fully synchronized with digital twin nodes. Every mechanical workcell is coupled with virtual analytics to eliminate failure loops and predict downtime beforehand.
            </p>
          </div>

          {/* Symmetric Grid of Present Capabilities */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            
            {/* Box 1 */}
            <div className="bg-[#0b1220] border border-slate-800 p-8 flex flex-col justify-between group hover:border-[#0EA5E9]/50 transition-colors duration-300">
              <div>
                <span className="text-xs font-bold text-[#0EA5E9] font-mono block mb-4">// HQ_CALIBRATION_CELL</span>
                <h3 className="text-lg font-bold text-white font-headings mb-3">Pune HQ Facility</h3>
                <p className="text-slate-400 text-xs leading-relaxed font-light">
                  Our clean-room Pune facility handles precision fabrication, assembly, and coordinate calibration of every workcell before deployment.
                </p>
              </div>
            </div>

            {/* Box 2 */}
            <div className="bg-[#0b1220] border border-slate-800 p-8 flex flex-col justify-between group hover:border-[#0EA5E9]/50 transition-colors duration-300">
              <div>
                <span className="text-xs font-bold text-[#0EA5E9] font-mono block mb-4">// DIGITAL_TWIN_NODES</span>
                <h3 className="text-lg font-bold text-white font-headings mb-3">Kinematic Simulation</h3>
                <p className="text-slate-400 text-xs leading-relaxed font-light">
                  We verify Reach envelopes, load distribution, and axis duty cycle limits within highly accurate virtual environments.
                </p>
              </div>
            </div>

            {/* Box 3 */}
            <div className="bg-[#0b1220] border border-slate-800 p-8 flex flex-col justify-between group hover:border-[#0EA5E9]/50 transition-colors duration-300">
              <div>
                <span className="text-xs font-bold text-[#0EA5E9] font-mono block mb-4">// LIFECYCLE_24_7</span>
                <h3 className="text-lg font-bold text-white font-headings mb-3">Remote Diagnostic Desk</h3>
                <p className="text-slate-400 text-xs leading-relaxed font-light">
                  Our engineering team monitors diagnostics on active systems globally, deploying safety updates and keeping systems operational.
                </p>
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* 5. ENGINEERING VALUES: Symmetric 3-column Grid */}
      <section className="py-24 px-6 md:px-20 border-b border-slate-100 bg-white">
        <div className="max-w-7xl mx-auto">
          
          <div className="text-center mb-16">
            <span className="text-xs font-bold uppercase tracking-[0.25em] text-[#0EA5E9] mb-3 block">
              Operational Standards
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-[#0F172A] tracking-tight font-headings">
              Our Core Design Principles
            </h2>
            <div className="w-16 h-[2px] bg-[#0EA5E9] mx-auto mt-4"></div>
          </div>

          <div ref={philosophyRef} className="grid grid-cols-1 md:grid-cols-3 gap-10">
            
            <div className="bg-[#F8FAFC] border border-slate-200/80 hover:border-[#0EA5E9]/50 p-8 shadow-sm hover:shadow-xl hover:-translate-y-2 transition-all duration-300 rounded-none group relative overflow-hidden">
              <div className="absolute top-0 left-0 w-full h-[3px] bg-slate-200 group-hover:bg-[#0EA5E9] transition-colors duration-300" />
              <h3 className="text-lg font-bold text-[#0F172A] font-headings mb-3 group-hover:text-[#0EA5E9] transition-colors duration-300">Kinematic Rigor</h3>
              <p className="text-slate-700 text-xs md:text-sm leading-relaxed font-normal">
                We design with absolute precision, mapping joint constraints, reach patterns, and dynamic payloads under real-world cycle constraints.
              </p>
            </div>

            <div className="bg-[#F8FAFC] border border-slate-200/80 hover:border-[#0EA5E9]/50 p-8 shadow-sm hover:shadow-xl hover:-translate-y-2 transition-all duration-300 rounded-none group relative overflow-hidden">
              <div className="absolute top-0 left-0 w-full h-[3px] bg-slate-200 group-hover:bg-[#0EA5E9] transition-colors duration-300" />
              <h3 className="text-lg font-bold text-[#0F172A] font-headings mb-3 group-hover:text-[#0EA5E9] transition-colors duration-300">Modular Scalability</h3>
              <p className="text-slate-700 text-xs md:text-sm leading-relaxed font-normal">
                Every HMI screen and mechanical toolset follows strict modularity, allowing quick updates as product requirements adapt.
              </p>
            </div>

            <div className="bg-[#F8FAFC] border border-slate-200/80 hover:border-[#0EA5E9]/50 p-8 shadow-sm hover:shadow-xl hover:-translate-y-2 transition-all duration-300 rounded-none group relative overflow-hidden">
              <div className="absolute top-0 left-0 w-full h-[3px] bg-slate-200 group-hover:bg-[#0EA5E9] transition-colors duration-300" />
              <h3 className="text-lg font-bold text-[#0F172A] font-headings mb-3 group-hover:text-[#0EA5E9] transition-colors duration-300">Fail-Safe Loops</h3>
              <p className="text-slate-700 text-xs md:text-sm leading-relaxed font-normal">
                Redundant PLC checkpoints, coordinate verification arrays, and optical sensors ensure human safety on work floors.
              </p>
            </div>

          </div>

        </div>
      </section>

      {/* 6. LEADERSHIP TEAM */}
      <section ref={teamRef} className="py-24 px-6 md:px-20 bg-white">
        <div className="max-w-7xl mx-auto">
          
          <div className="text-center mb-20">
            <span className="text-xs font-bold uppercase tracking-[0.25em] text-[#0EA5E9] mb-3 block">
              Professional Staff
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-[#0F172A] tracking-tight font-headings">
              Our Leadership Team
            </h2>
            <div className="w-16 h-[2px] bg-[#0EA5E9] mx-auto mt-6"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {leadership.map((member, idx) => (
              <div 
                key={idx}
                ref={el => teamCardsRef.current[idx] = el}
                className="bg-[#F8FAFC] border border-slate-200/80 hover:border-[#0EA5E9]/50 p-8 flex flex-col items-center text-center shadow-sm hover:shadow-xl hover:-translate-y-2 transition-all duration-300 rounded-none group"
              >
                {/* Monogram profile graphic */}
                <div className="w-20 h-20 rounded-full bg-[#0F172A] text-white flex items-center justify-center font-bold text-lg mb-6 shadow-md border-2 border-[#0EA5E9] group-hover:bg-[#0EA5E9] group-hover:border-[#0F172A] transition-all duration-500 font-headings select-none">
                  {member.name.split(' ').map(n => n[0]).join('')}
                </div>

                <h3 className="text-lg font-bold text-[#0F172A] font-headings mb-1">
                  {member.name}
                </h3>
                <span className="text-xs font-semibold text-slate-500 uppercase tracking-widest block mb-4">
                  {member.role}
                </span>
                
                <p className="text-slate-700 text-xs leading-relaxed font-normal">
                  {member.bio}
                </p>
              </div>
            ))}
          </div>

        </div>
      </section>

    </div>
  );
}
