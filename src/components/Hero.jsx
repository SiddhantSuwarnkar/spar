import React, { useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(ScrollTrigger);

export default function Hero() {
  const sectionRef = useRef(null);
  const textRef = useRef(null);
  
  useGSAP(() => {
    const tl = gsap.timeline({
      scrollTrigger: { 
        trigger: sectionRef.current, 
        start: "top top", 
        end: "+=1500", 
        scrub: 1, 
        pin: true 
      }
    });

    // Fade out the landing text as you start scrolling
    tl.to(textRef.current, { opacity: 0, y: -50, duration: 1 }, 0);
  });

  return (
    <section ref={sectionRef} className="h-screen w-full relative bg-transparent overflow-hidden flex items-center">
      
      {/* Text Container (Left 50%) */}
      <div className="relative z-20 w-full max-w-7xl mx-auto px-6 md:px-20 grid grid-cols-12 pointer-events-none">
        <div ref={textRef} className="col-span-12 lg:col-span-6 text-left p-8 md:p-10 bg-white/60 backdrop-blur-[4px] border-l-4 border-[#0EA5E9] shadow-sm rounded-none">
          
          <span className="text-xs font-bold uppercase tracking-[0.25em] text-[#0EA5E9] mb-4 block">
            System Integration & Precision Robotics
          </span>

          <h1 className="text-5xl md:text-7xl font-bold text-[#0F172A] mb-6 tracking-tight leading-[1.1] font-headings">
            Precision <br/>
            Redefined.
          </h1>
          
          <p className="text-slate-600 text-base md:text-lg max-w-md mb-10 leading-relaxed font-normal">
            We architect advanced, clean-room robotic solutions that eliminate manufacturing bottlenecks, scale throughput, and achieve absolute repeat accuracy.
          </p>

          <div className="flex items-center gap-4 text-xs font-bold tracking-[0.2em] uppercase text-[#0F172A]">
            <span className="w-12 h-[2px] bg-[#0F172A]"></span>
            Scroll to Deploy Sequence
          </div>

        </div>
      </div>
    </section>
  );
}