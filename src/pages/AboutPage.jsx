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

  useGSAP(() => {
    // Global reveal animations for text and cards
    gsap.utils.toArray('.reveal-up').forEach(elem => {
      gsap.fromTo(elem, 
        { y: 60, opacity: 0 }, 
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

    // Parallax effect on the main header image
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

  }, { scope: containerRef });

  return (
    <div ref={containerRef} className="w-full bg-[#090E17] text-[#F8FAFC] overflow-hidden">
      
      {/* Cinematic Header */}
      <section className="header-section relative h-[80vh] flex items-center justify-center overflow-hidden">
        {/* Background Image with Parallax */}
        <div className="absolute inset-0 w-full h-[130%] -top-[15%]">
          <img 
            src="/industrial_facility.png" 
            alt="SPAR Workshop"
            className="parallax-bg w-full h-full object-cover opacity-60" 
          />
        </div>
        
        {/* Vibrant Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#0F172A]/90 via-[#0F172A]/60 to-[#0F172A] z-10" />
        
        <div className="relative z-20 text-center px-4 reveal-up mt-20">
          <span className="text-[#0EA5E9] font-bold tracking-[0.4em] uppercase mb-6 block text-sm shadow-sm">
            Our Origin Story
          </span>
          <h1 className="text-6xl md:text-8xl lg:text-[120px] font-black font-headings tracking-tighter mb-6 bg-clip-text text-transparent bg-gradient-to-r from-white via-slate-200 to-[#0EA5E9]">
            Beyond <br/> Boundaries.
          </h1>
        </div>
      </section>

      {/* Storytelling Sticky Section */}
      <section className="relative w-full flex flex-col md:flex-row bg-[#090E17] text-slate-300 z-30">
        
        {/* Left: Sticky Text Container */}
        <div className="md:w-5/12 md:sticky top-0 h-auto md:h-screen flex flex-col justify-center p-10 md:p-20 bg-[#1E293B]/50 backdrop-blur-md border-r border-white/10 shadow-[10px_0_30px_rgba(0,0,0,0.5)] z-10">
          <div className="max-w-md reveal-up">
            <h2 className="text-4xl md:text-6xl font-black font-headings mb-8 text-[#F8FAFC] leading-[1.1]">
              We don't just build robots. <br/>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#0EA5E9] to-indigo-500">
                We engineer evolution.
              </span>
            </h2>
            <p className="text-lg md:text-xl text-slate-400 mb-6 leading-relaxed font-medium">
              Based in Pune, India's manufacturing hub, SPAR was built on a singular obsession: achieving absolute physical precision.
            </p>
            <p className="text-lg text-slate-500 leading-relaxed mb-8">
              Backed by one of Pune's leading industrial manufacturing companies, we have the resources and deep industry expertise to deploy synchronized, high-throughput robotic workcells across the globe. We treat hardware as an art form and software as the invisible hand guiding it.
            </p>
            <div className="border-l-[3px] border-[#0EA5E9] pl-6">
              <h3 className="text-xl font-bold text-white font-headings mb-2">Our Mission</h3>
              <p className="text-sm text-slate-400 leading-relaxed mb-6">
                To completely eliminate production bottlenecks and guarantee zero-defect manufacturing through intelligent, autonomous systems.
              </p>
              <h3 className="text-xl font-bold text-white font-headings mb-2">Quality Guarantee</h3>
              <p className="text-sm text-slate-400 leading-relaxed">
                Every robotic cell is aggressively stress-tested under maximum thermal and kinetic loads in our clean-rooms before deployment.
              </p>
            </div>
          </div>
        </div>

        {/* Right: Scrolling Visuals */}
        <div className="md:w-7/12 flex flex-col p-6 md:p-20 gap-24 lg:gap-32 bg-[#090E17]">
          
          <div className="reveal-up group relative overflow-hidden rounded-sm border border-white/10 shadow-[0_20px_40px_-15px_rgba(0,0,0,0.5)] hover:border-[#0EA5E9]/50 transition-all duration-500">
            <div className="absolute inset-0 bg-gradient-to-t from-[#090E17]/90 to-transparent opacity-80 z-10" />
            <video src="/showcase/IMG_7543.mp4" autoPlay loop muted playsInline className="w-full aspect-[4/3] object-cover group-hover:scale-105 transition-transform duration-1000 ease-out" />
            <div className="absolute bottom-8 left-8 z-20">
              <span className="text-[#0EA5E9] font-bold text-xs tracking-widest uppercase mb-2 block font-mono">Chapter 01</span>
              <h3 className="text-3xl font-bold text-[#F8FAFC] font-headings">The Pune Prototyping Lab</h3>
            </div>
          </div>

          <div className="reveal-up group relative overflow-hidden rounded-sm border border-white/10 shadow-[0_20px_40px_-15px_rgba(0,0,0,0.5)] hover:border-[#0EA5E9]/50 transition-all duration-500">
            <div className="absolute inset-0 bg-gradient-to-t from-[#090E17]/90 to-transparent opacity-80 z-10" />
            <video src="/showcase/IMG_7544.mp4" autoPlay loop muted playsInline className="w-full aspect-[4/3] object-cover group-hover:scale-105 transition-transform duration-1000 ease-out" />
            <div className="absolute bottom-8 right-8 z-20 text-right">
              <span className="text-[#0EA5E9] font-bold text-xs tracking-widest uppercase mb-2 block font-mono">Chapter 02</span>
              <h3 className="text-3xl font-bold text-[#F8FAFC] font-headings">Global Industrial Scale</h3>
            </div>
          </div>

          {/* Stat Blocks */}
          <div className="grid grid-cols-2 gap-8 reveal-up">
            <div className="bg-[#1E293B]/50 p-8 rounded-sm border border-white/10 hover:border-[#0EA5E9]/50 transition-colors">
              <span className="text-5xl font-black text-[#F8FAFC] block mb-2 font-headings">100+</span>
              <span className="text-xs font-bold text-[#0EA5E9] uppercase tracking-widest font-mono">Global Deployments</span>
            </div>
            <div className="bg-[#1E293B]/50 p-8 rounded-sm border border-white/10 hover:border-[#0EA5E9]/50 transition-colors">
              <span className="text-5xl font-black text-[#F8FAFC] block mb-2 font-headings">0.1<span className="text-3xl">mm</span></span>
              <span className="text-xs font-bold text-[#0EA5E9] uppercase tracking-widest font-mono">Repeat Accuracy</span>
            </div>
          </div>

        </div>
      </section>

      {/* NEW LIGHT THEME SECTION: The Facility Tour */}
      <section className="bg-slate-50 py-32 px-6 md:px-20 border-t border-b border-slate-200 overflow-hidden relative z-20">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-8 reveal-up">
            <div className="max-w-2xl">
              <span className="text-xs font-bold uppercase tracking-[0.25em] text-[#0EA5E9] mb-3 block font-mono">
                Physical Infrastructure
              </span>
              <h2 className="text-4xl md:text-6xl font-black font-headings text-slate-900 leading-[1.1]">
                The Pune Prototyping & <br/> Testing Facility
              </h2>
            </div>
            <p className="text-slate-600 max-w-md font-medium">
              We don't build in a garage. Our 40,000 sq ft facility houses 5-axis CNC machining, dedicated vision testing clean-rooms, and multi-robot cell staging areas.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 reveal-up">
            <div className="group relative aspect-[16/9] overflow-hidden bg-slate-200 rounded-sm shadow-md">
              <video src="/showcase/IMG_7543.mp4" autoPlay loop muted playsInline className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 opacity-90" />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 to-transparent flex flex-col justify-end p-8">
                <span className="text-[#0EA5E9] font-mono text-xs uppercase tracking-widest font-bold mb-1">01. Fabrication</span>
                <h3 className="text-white text-2xl font-bold font-headings">Custom CNC & Machining</h3>
              </div>
            </div>
            
            <div className="group relative aspect-[16/9] overflow-hidden bg-slate-200 rounded-sm shadow-md">
              <video src="/showcase/IMG_7548.mp4" autoPlay loop muted playsInline className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 opacity-90" />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 to-transparent flex flex-col justify-end p-8">
                <span className="text-[#0EA5E9] font-mono text-xs uppercase tracking-widest font-bold mb-1">02. Integration</span>
                <h3 className="text-white text-2xl font-bold font-headings">Multi-Cell Staging</h3>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Modern Team Section with Hover Effects */}
      <section className="py-32 px-6 md:px-20 bg-[#090E17] relative overflow-hidden z-20">
        {/* Ambient Glow */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-[#0EA5E9]/15 blur-[120px] rounded-full pointer-events-none" />

        <div className="max-w-7xl mx-auto relative z-10">
          <div className="text-center mb-24 reveal-up">
            <h2 className="text-5xl md:text-7xl font-black font-headings text-[#F8FAFC]">The Architects</h2>
            <div className="w-20 h-1 bg-[#0EA5E9] mx-auto mt-8 rounded-full" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {leadership.map((member, idx) => (
              <div 
                key={idx} 
                className="reveal-up group relative bg-[#1E293B]/50 backdrop-blur-md p-10 rounded-sm border border-white/10 hover:border-[#0EA5E9]/80 transition-all duration-500 hover:-translate-y-4 hover:shadow-[0_20px_40px_-15px_rgba(14,165,233,0.2)]"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-[#0EA5E9]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-sm" />
                
                <div className="relative z-10">
                  <div className="w-20 h-20 rounded-sm bg-[#090E17] text-[#0EA5E9] font-black text-3xl flex items-center justify-center mb-8 group-hover:bg-[#0EA5E9] group-hover:text-[#090E17] transition-all duration-500 shadow-xl border border-white/10 group-hover:border-transparent font-headings">
                    {member.name.split(' ').map(n => n[0]).join('')}
                  </div>
                  
                  <h3 className="text-2xl font-bold text-[#F8FAFC] mb-2 font-headings group-hover:text-[#0EA5E9] transition-colors">{member.name}</h3>
                  <h4 className="text-[#0EA5E9] text-xs font-bold uppercase tracking-widest mb-6 font-mono">{member.role}</h4>
                  
                  <p className="text-slate-400 leading-relaxed font-light">{member.bio}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

    </div>
  );
}
