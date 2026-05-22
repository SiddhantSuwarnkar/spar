import React, { useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(ScrollTrigger);

const capabilities = [
  {
    id: 1,
    title: "Advanced Machine Vision Systems",
    desc: "We design integrated vision systems that allow for real-time quality control, dynamic part localization, and millimeter-perfect sorting, ensuring zero-defect production lines. Utilizing deep learning algorithms running on high-power edge nodes, our systems verify geometric parameters and detect surface micro-cracks in less than 8ms.",
    image: "/machine_vision_system.png",
    video: "/showcase/IMG_7543.mp4",
    specs: ["2D/3D camera integration", "Sub-millimeter accuracy", "AI-driven defect detection", "Optical character verification"]
  },
  {
    id: 2,
    title: "High-Speed Robotic Assembly",
    desc: "Our automated assembly lines integrate precision actuators and synchronized dual-arm kinematics to handle delicate electronic components or heavy automotive parts with speed and repeat accuracy. Armed with custom pneumatic and vacuum end effectors, they conform to complex geometries and force parameters instantly.",
    image: "/robotic_assembly_arm.png",
    video: "/showcase/IMG_7544.mp4",
    specs: ["Auto-calibration sensors", "150kg payload capacity", "Multi-system synchronization", "Dynamic payload adjustment"]
  },
  {
    id: 3,
    title: "Precision Robotic Welding",
    desc: "Engineered for high-stress manufacturing, our robotic welding cells deliver clean, consistent spot and seam welds on complex aerospace and automotive structural components. Integrated path tracking sensors dynamically adjust current parameters and torch angle to compensate for thermal distortion in real time.",
    image: "/robotic_welding_cell.png",
    video: "/showcase/IMG_7548.mp4",
    specs: ["Real-time heat compensation", "Sub-millimeter path planning", "Multi-axis reach envelopes", "Clean weld-slag control"]
  }
];

export default function SolutionsPage() {
  const containerRef = useRef(null);
  const capabilityRowsRef = useRef([]);

  useGSAP(() => {
    // Staggered slide up of capability rows on scroll
    capabilityRowsRef.current.forEach((row) => {
      gsap.fromTo(row,
        { y: 80, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.9,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: row,
            start: 'top 80%',
          }
        }
      );
    });
  }, { scope: containerRef });

  return (
    <div ref={containerRef} className="w-full relative z-40 bg-[#090E17]">
      
      {/* 1. HERO SECTION: Solid Dark Background (#0F172A) */}
      <section className="bg-[#0F172A] text-white pt-36 pb-24 px-6 md:px-20 text-center">
        <div className="max-w-4xl mx-auto">
          <span className="text-xs font-bold uppercase tracking-[0.3em] text-[#0EA5E9] mb-4 block">
            Capabilities & Core Engineering
          </span>
          <h1 className="text-4xl md:text-6xl font-bold text-white tracking-tight mb-6 font-headings">
            Precision Engineering for Complex Operations
          </h1>
          <div className="w-16 h-[2px] bg-[#0EA5E9] mx-auto mb-6"></div>
          <p className="text-slate-300 text-base md:text-lg max-w-2xl mx-auto leading-relaxed font-normal">
            We architect and fabricate custom automation systems for high-stress environments. Our capabilities cover the entire lifecycle, ensuring absolute repeat accuracy under 24/7 industrial loads.
          </p>
        </div>
      </section>
      
      {/* 2. ALTERNATING CONTENT ROWS */}
      <section className="py-24 px-6 md:px-20">
        <div className="max-w-7xl mx-auto flex flex-col gap-32">
          
          {capabilities.map((cap, index) => {
            const isImageLeft = index % 2 === 0;
            return (
              <div 
                key={cap.id} 
                ref={el => capabilityRowsRef.current[index] = el}
                className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-center"
              >
                
                {/* Visual (Left/Right depending on index) */}
                <div 
                  className={`col-span-12 lg:col-span-6 ${
                    isImageLeft ? 'lg:order-1' : 'lg:order-2'
                  }`}
                >
                  <div className="border-2 border-white/10 p-2 bg-[#1E293B]/50 rounded-sm shadow-[0_10px_30px_rgba(0,0,0,0.5)] relative overflow-hidden aspect-[4/3] flex items-center justify-center">
                    <video 
                      src={cap.video} 
                      poster={cap.image}
                      autoPlay 
                      loop 
                      muted 
                      playsInline
                      className="w-full h-full object-cover rounded-[2px] transition-all duration-700"
                    />
                  </div>
                </div>

                {/* Text Content */}
                <div 
                  className={`col-span-12 lg:col-span-6 flex flex-col justify-center ${
                    isImageLeft ? 'lg:order-2' : 'lg:order-1'
                  }`}
                >
                  <span className="text-xs font-bold uppercase tracking-[0.25em] text-[#0EA5E9] mb-3 block font-mono">
                    System Capability 0{cap.id}
                  </span>
                  
                  <h3 className="text-3xl md:text-4xl font-bold text-[#F8FAFC] mb-6 font-headings">
                    {cap.title}
                  </h3>
                  
                  <p className="text-slate-400 text-base leading-relaxed mb-8 font-normal">
                    {cap.desc}
                  </p>

                  {/* Bullet Points / Specs */}
                  <div className="border-t border-white/10 pt-6">
                    <h4 className="text-xs font-bold uppercase tracking-widest text-[#F8FAFC] mb-4 font-mono">
                      Engineering Specifications:
                    </h4>
                    <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {cap.specs.map((spec, sIdx) => (
                        <li key={sIdx} className="flex items-center gap-3 text-sm text-slate-400 font-normal">
                          <span className="w-1.5 h-1.5 bg-[#0EA5E9] rounded-sm shrink-0" />
                          <span>{spec}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                </div>

              </div>
            );
          })}

        </div>
      </section>

    </div>
  );
}
