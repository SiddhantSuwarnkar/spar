import React from 'react';

const steps = [
  {
    id: "01",
    title: "Discovery & Audit",
    desc: "We analyze your existing workflows, identify manual bottlenecks, and measure key metrics to define target ROI."
  },
  {
    id: "02",
    title: "System Architecture & CAD",
    desc: "Our engineers build comprehensive digital twin simulations, verifying reach envelopes, cycle times, and payloads."
  },
  {
    id: "03",
    title: "Fabrication & Assembly",
    desc: "Components are fabricated in our clean-room facilities, integrated with custom tooling, and wired to control panels."
  },
  {
    id: "04",
    title: "On-Site Deployment",
    desc: "We install systems on your production floor, program HMI controls, and run rigorous zero-defect verification tests."
  },
  {
    id: "05",
    title: "Lifecycle Support",
    desc: "Provide continuous remote diagnostics, regular hardware updates, and on-call engineering field support 24/7."
  }
];

export default function About() {
  return (
    <section id="about-us" className="relative z-40 bg-white py-24 px-6 md:px-20 border-t border-slate-200">
      <div className="max-w-7xl mx-auto">
        
        {/* 1. SECTION TITLE & CINEMATIC FACILITY SHOT */}
        <div className="mb-16">
          <span className="text-xs font-bold uppercase tracking-[0.3em] text-[#0EA5E9] mb-4 block">
            Infrastructure & Scale
          </span>
          <h2 className="text-4xl md:text-5xl font-bold text-[#0F172A] tracking-tight font-headings mb-8">
            Engineered for Stability. Built to Scale.
          </h2>
          
          {/* Cinematic Shot of Facility with absolute clean-room industrial framing */}
          <div className="relative overflow-hidden border-2 border-slate-100 p-2 bg-[#F1F5F9] rounded-[2px] shadow-sm">
            <img 
              src="/industrial_facility.png" 
              alt="SPAR Robotics Engineering Facility" 
              className="w-full h-[300px] md:h-[500px] object-cover rounded-[2px] transition-all duration-1000 ease-out"
            />
            {/* Engineering Overlay Coordinates */}
            <div className="absolute top-6 left-6 bg-[#0F172A]/80 backdrop-blur-sm px-4 py-2 border border-slate-700/50 text-[10px] font-mono text-slate-300 rounded-none pointer-events-none hidden sm:block">
              <span className="text-[#0EA5E9] font-bold">LOC:</span> MH_HQ_FACILITY // 18.5204° N, 73.8567° E
            </div>
            <div className="absolute bottom-6 right-6 bg-[#0F172A]/80 backdrop-blur-sm px-4 py-2 border border-slate-700/50 text-[10px] font-mono text-slate-300 rounded-none pointer-events-none hidden sm:block">
              <span className="text-[#0EA5E9] font-bold">SYS_STATUS:</span> NOMINAL // BUFFER_ACTIVE
            </div>
          </div>
        </div>

        {/* 2. OUR PHILOSOPHY (Two-Column Layout) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-start py-12 border-b border-slate-100">
          
          {/* Left Side: Bold Quote */}
          <div className="lg:col-span-6 border-l-4 border-[#0EA5E9] pl-6 md:pl-10">
            <p className="text-2xl md:text-4xl text-[#0F172A] font-semibold leading-[1.2] font-headings tracking-tight">
              "We do not simply sell machinery. We engineer integrated physical intelligence to force-multiply human capacity and eliminate downtime."
            </p>
          </div>

          {/* Right Side: Philosophy Paragraph */}
          <div className="lg:col-span-6 text-slate-700 text-sm md:text-base leading-relaxed font-normal">
            <p className="mb-6">
              Our engineering philosophy is built on absolute precision and operational durability. In high-stress manufacturing environments, a single millimeter of offset or a minute of unplanned downtime represents major capital loss. That is why we commit to rigorous in-house prototyping, fail-safe CAD simulations, and clean-room fabrication standards.
            </p>
            <p>
              We design every component—from end-effectors to HMI panels—with future scalability in mind. As your product library grows, our modular physical layouts and software controls adapt seamlessly, securing your capital investment for decades.
            </p>
          </div>

        </div>

        {/* 3. THE PROCESS (Horizontal Timeline) */}
        <div className="py-20">
          <div className="mb-12">
            <span className="text-xs font-bold uppercase tracking-[0.25em] text-[#0EA5E9] mb-3 block">
              Execution Roadmap
            </span>
            <h3 className="text-2xl font-bold text-[#0F172A] font-headings">
              Our System Deployment Workflow
            </h3>
          </div>

          {/* Timeline Wrapper - Horizontal Scroll on Mobile, Flex on Desktop */}
          <div className="relative">
            
            {/* Visual Connecting Line (Hidden on Mobile) */}
            <div className="absolute top-[35px] left-8 right-8 h-[2px] bg-slate-100 hidden lg:block z-0">
              {/* Animated/Colored sub-path */}
              <div className="h-full w-2/3 bg-gradient-to-r from-[#0EA5E9] to-sky-300" />
            </div>

            {/* Steps Container */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 lg:gap-6 relative z-10">
              {steps.map((step, idx) => (
                <div key={step.id} className="flex flex-col group">
                  
                  {/* Circle Indicator / Line Node */}
                  <div className="flex items-center gap-4 lg:flex-col lg:items-start mb-4">
                    <div className="w-[70px] h-[70px] rounded-none border border-slate-200 bg-white flex items-center justify-center font-mono font-bold text-lg text-slate-400 group-hover:border-[#0EA5E9] group-hover:text-[#0EA5E9] transition-all duration-300 shadow-sm relative shrink-0">
                      {step.id}
                      {/* Active status pulse */}
                      {idx < 3 && (
                        <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-[#0EA5E9] rounded-none" />
                      )}
                    </div>
                    
                    {/* Small Connector Line for Mobile/Tablet */}
                    <div className="h-[2px] bg-slate-100 flex-grow lg:hidden" />
                  </div>

                  {/* Text Details */}
                  <div className="pt-2">
                    <h4 className="text-base font-bold text-[#0F172A] mb-3 font-headings group-hover:text-[#0EA5E9] transition-colors duration-200">
                      {step.title}
                    </h4>
                    <p className="text-slate-700 text-xs md:text-sm leading-relaxed font-normal">
                      {step.desc}
                    </p>
                  </div>

                </div>
              ))}
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}