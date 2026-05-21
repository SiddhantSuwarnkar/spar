import React from 'react';

const solutionsList = [
  {
    id: 1,
    title: "Advanced Machine Vision Systems",
    desc: "We design integrated vision systems that allow for real-time quality control, dynamic part localization, and millimeter-perfect sorting, ensuring zero-defect production lines.",
    image: "/machine_vision_system.png",
    specs: ["2D/3D camera integration", "Sub-millimeter accuracy", "AI-driven defect detection"]
  },
  {
    id: 2,
    title: "High-Speed Robotic Assembly",
    desc: "Our automated assembly lines integrate precision actuators and synchronized dual-arm kinematics to handle delicate electronic components or heavy automotive parts with speed and repeat accuracy.",
    image: "/robotic_assembly_arm.png",
    specs: ["Auto-calibration sensors", "150kg payload capacity", "Multi-system synchronization"]
  },
  {
    id: 3,
    title: "Precision Robotic Welding",
    desc: "Engineered for high-stress manufacturing, our robotic welding cells deliver clean, consistent spot and seam welds on complex aerospace and automotive structural components.",
    image: "/robotic_welding_cell.png",
    specs: ["Real-time heat compensation", "Sub-millimeter path planning", "Multi-axis reach envelopes"]
  }
];

export default function Showcase() {
  return (
    <section id="solutions" className="relative z-40 bg-white">
      
      {/* 1. Header Section: Dark Solid Background (#0F172A) */}
      <div className="bg-[#0F172A] text-white py-24 px-6 md:px-20 text-center">
        <div className="max-w-4xl mx-auto">
          <span className="text-xs font-bold uppercase tracking-[0.3em] text-[#0EA5E9] mb-4 block">
            Core Capabilities // Industrial Automation
          </span>
          <h2 className="text-4xl md:text-6xl font-bold tracking-tight mb-6 font-headings">
            Precision Engineering for <br className="hidden md:block"/> Complex Operations.
          </h2>
          <p className="text-slate-300 text-base md:text-lg max-w-2xl mx-auto leading-relaxed font-normal">
            We architect and fabricate custom automation systems for high-stress environments. Our systems are built to run 24/7 with zero degradation in accuracy.
          </p>
        </div>
      </div>

      {/* 2. Content Layout: Alternating Rows */}
      <div className="py-24 px-6 md:px-20">
        <div className="max-w-7xl mx-auto flex flex-col gap-32">
          
          {solutionsList.map((sol, index) => {
            const isImageLeft = index % 2 === 0;
            return (
              <div 
                key={sol.id} 
                className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-center"
              >
                
                {/* Visual (Left/Right depending on index) */}
                <div 
                  className={`col-span-12 lg:col-span-6 ${
                    isImageLeft ? 'lg:order-1' : 'lg:order-2'
                  }`}
                >
                  <div className="border-2 border-slate-100 p-2 bg-[#F1F5F9] rounded-[2px] shadow-sm">
                    <img 
                      src={sol.image} 
                      alt={sol.title} 
                      className="w-full aspect-[4/3] object-cover rounded-[2px] transition-all duration-700"
                    />
                  </div>
                </div>

                {/* Text Content */}
                <div 
                  className={`col-span-12 lg:col-span-6 flex flex-col justify-center ${
                    isImageLeft ? 'lg:order-2' : 'lg:order-1'
                  }`}
                >
                  <span className="text-xs font-bold uppercase tracking-[0.25em] text-[#0EA5E9] mb-3 block">
                    System Capability 0{sol.id}
                  </span>
                  
                  <h3 className="text-3xl md:text-4xl font-bold text-[#0F172A] mb-6 font-headings">
                    {sol.title}
                  </h3>
                  
                  <p className="text-slate-700 text-base leading-relaxed mb-8 font-normal">
                    {sol.desc}
                  </p>

                  {/* Bullet Points / Specs */}
                  <div className="border-t border-slate-100 pt-6">
                    <h4 className="text-xs font-bold uppercase tracking-widest text-[#0F172A] mb-4">
                      Engineering Specifications:
                    </h4>
                    <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {sol.specs.map((spec, sIdx) => (
                        <li key={sIdx} className="flex items-center gap-3 text-sm text-slate-700">
                          <span className="w-1.5 h-1.5 bg-[#0EA5E9] rounded-none shrink-0" />
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
      </div>

    </section>
  );
}