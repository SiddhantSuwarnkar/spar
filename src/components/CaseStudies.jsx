import React, { useState, useEffect } from 'react';

const projects = [
  {
    id: 1,
    title: "High-Speed Packaging Cell",
    client: "AeroTech Foundry",
    category: "Delta Automation",
    image: "/robotic_assembly_arm.png",
    challenge: "The client needed to increase pick-and-place throughput by 40% and package highly irregular cast-iron components without damaging critical tolerances.",
    solution: "We deployed a custom multi-gripper delta robot system integrated with high-resolution line-scan cameras. An adaptive vacuum gripper conforms to irregular geometries, picking parts dynamically off a moving sorting conveyor.",
    specs: {
      "Payload Capacity": "25 kg",
      "Cycle Time": "1.2 seconds",
      "Axis Count": "4 Axis",
      "Footprint Dimensions": "2.4m x 2.4m"
    },
    angles: ["/robotic_gripper_detail.png", "/control_panel_hmi.png"]
  },
  {
    id: 2,
    title: "Predictive Quality Diagnostics",
    client: "Global Motors",
    category: "Machine Vision",
    image: "/machine_vision_system.png",
    challenge: "Welding anomalies on the automated chassis assembly line were causing high rejection rates, resulting in extensive rework and major bottlenecks.",
    solution: "We engineered a dual-camera 3D thermal imaging inspection ring that monitors welds in real time. Defect detection algorithms analyze weld structure instantly and flag anomalies, avoiding downstream issues.",
    specs: {
      "Scanning Accuracy": "±0.1 mm",
      "Line Frequency": "60 Hz",
      "AI Edge Inference": "< 8ms",
      "Sensor Resolution": "5.0 Megapixel"
    },
    angles: ["/control_panel_hmi.png", "/machine_vision_system.png"]
  },
  {
    id: 3,
    title: "Articulated Sorting System",
    client: "Prime Logistics",
    category: "Robotics & Logistics",
    image: "/robotic_welding_cell.png",
    challenge: "Manual sorting of heavy automotive parts on structural joint lines was creating safety hazards and bottlenecking sorting speeds.",
    solution: "Deployed a heavy-payload articulated robotic arm equipped with custom magnet-pneumatic end effectors. The robot uses 3D area sensors to identify, localize, and sort parts directly into shipping racks.",
    specs: {
      "Payload Capacity": "150 kg",
      "Cycle Time": "2.8 seconds",
      "Axis Count": "6 Axis",
      "Footprint Dimensions": "3.6m x 3.6m"
    },
    angles: ["/robotic_gripper_detail.png", "/industrial_facility.png"]
  }
];

export default function CaseStudies() {
  const [selectedProject, setSelectedProject] = useState(null);

  useEffect(() => {
    if (selectedProject) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [selectedProject]);

  const openProject = (project) => {
    setSelectedProject(project);
  };

  const closeProject = () => {
    setSelectedProject(null);
  };

  return (
    <section id="work" className="bg-[#F1F5F9] py-24 px-6 md:px-20 relative z-40 border-t border-slate-200">
      <div className="max-w-7xl mx-auto">
        
        {/* Header Layout */}
        <div className="mb-16 text-center md:text-left">
          <span className="text-xs font-bold uppercase tracking-[0.3em] text-[#0EA5E9] mb-4 block">
            Proven Deployments
          </span>
          <h2 className="text-4xl md:text-5xl font-bold text-[#0F172A] tracking-tight font-headings">
            Proven Deployments. Measurable ROI.
          </h2>
          <div className="w-16 h-[2px] bg-[#0EA5E9] mt-6 mx-auto md:mx-0"></div>
        </div>

        {/* The Grid Layout: 3-column Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {projects.map((project) => (
            <div 
              key={project.id}
              onClick={() => openProject(project)}
              className="group relative aspect-[4/3] overflow-hidden bg-slate-900 border border-slate-200 shadow-sm cursor-pointer rounded-none"
            >
              {/* Main Product/Project Image */}
              <img 
                src={project.image} 
                alt={project.title} 
                className="w-full h-full object-cover group-hover:scale-105 transition-all duration-700 opacity-90 group-hover:opacity-100"
              />
              
              {/* Bottom Subtle Bar */}
              <div className="absolute bottom-0 left-0 w-full bg-white border-t border-slate-200 p-4 flex justify-between items-center z-10 transition-transform duration-300">
                <div>
                  <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider">{project.client}</h4>
                  <h3 className="text-sm font-bold text-[#0F172A] font-headings mt-0.5">{project.title}</h3>
                </div>
                <span className="text-[10px] font-bold text-[#0EA5E9] uppercase tracking-widest border border-slate-200 px-3 py-1 group-hover:bg-[#0EA5E9] group-hover:text-white group-hover:border-[#0EA5E9] transition-all duration-300">
                  View Specs
                </span>
              </div>

              {/* Hover Dark Overlay Slides Up */}
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
                  Click to View Specifications
                </div>
              </div>

            </div>
          ))}
        </div>

      </div>

      {/* --- DETAILED PROJECT VIEW MODAL --- */}
      {selectedProject && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#0F172A]/80 backdrop-blur-sm p-4 overflow-y-auto">
          
          <div className="bg-white border-2 border-slate-200 w-full max-w-5xl shadow-2xl relative my-8 overflow-hidden rounded-[2px] animate-fadeIn">
            
            {/* Close Button */}
            <button 
              onClick={closeProject}
              className="absolute top-4 right-4 z-30 bg-[#0F172A] text-white hover:bg-[#0EA5E9] w-8 h-8 flex items-center justify-center font-bold transition-colors duration-200 rounded-none shadow-md"
              aria-label="Close modal"
            >
              ✕
            </button>

            {/* Modal Scroll Container */}
            <div className="max-h-[90vh] overflow-y-auto">
              
              {/* Hero Image: Massive full-width showcase */}
              <div className="relative h-[250px] md:h-[400px] w-full bg-slate-900 border-b border-slate-200">
                <img 
                  src={selectedProject.image} 
                  alt={selectedProject.title} 
                  className="w-full h-full object-cover opacity-90"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0F172A]/80 via-transparent to-transparent pointer-events-none" />
                <div className="absolute bottom-6 left-6 md:left-12 text-white">
                  <span className="text-[10px] font-bold tracking-[0.3em] text-[#0EA5E9] uppercase mb-2 block">
                    {selectedProject.client} // {selectedProject.category}
                  </span>
                  <h2 className="text-3xl md:text-5xl font-bold tracking-tight font-headings">
                    {selectedProject.title}
                  </h2>
                </div>
              </div>

              {/* Grid Content: Challenge/Solution & Specs Table */}
              <div className="p-6 md:p-12 grid grid-cols-1 lg:grid-cols-12 gap-8 md:gap-12">
                
                {/* Left side: Challenge and Solution */}
                <div className="col-span-12 lg:col-span-8 flex flex-col gap-8">
                  <div>
                    <h3 className="text-xs font-bold uppercase tracking-[0.2em] text-[#0EA5E9] mb-3">
                      The Operational Challenge
                    </h3>
                    <p className="text-slate-700 text-sm md:text-base leading-relaxed font-normal">
                      {selectedProject.challenge}
                    </p>
                  </div>

                  <div className="border-t border-slate-100 pt-6">
                    <h3 className="text-xs font-bold uppercase tracking-[0.2em] text-[#0EA5E9] mb-3">
                      The Implemented Solution
                    </h3>
                    <p className="text-slate-700 text-sm md:text-base leading-relaxed font-normal">
                      {selectedProject.solution}
                    </p>
                  </div>

                  {/* Additional Angles Gallery */}
                  <div className="border-t border-slate-100 pt-6">
                    <h3 className="text-xs font-bold uppercase tracking-[0.2em] text-[#0EA5E9] mb-4">
                      Engineering Subsystems
                    </h3>
                    <div className="grid grid-cols-2 gap-4">
                      {selectedProject.angles.map((angleImg, idx) => (
                        <div key={idx} className="border border-slate-200 p-1.5 bg-[#F1F5F9] rounded-none">
                          <img 
                            src={angleImg} 
                            alt={`Angle ${idx + 1}`} 
                            className="w-full aspect-[4/3] object-cover rounded-none"
                          />
                          <span className="text-[9px] font-bold text-slate-500 uppercase tracking-widest mt-2 block text-center">
                            Diag_View_0{idx + 1}.png
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Right side: Key Specs Table */}
                <div className="col-span-12 lg:col-span-4 bg-[#F1F5F9] border border-slate-200 p-6 md:p-8 flex flex-col justify-start h-fit">
                  <h3 className="text-xs font-bold uppercase tracking-[0.25em] text-[#0F172A] border-b border-slate-300 pb-4 mb-6">
                    System Specifications
                  </h3>
                  
                  <div className="flex flex-col gap-4">
                    {Object.entries(selectedProject.specs).map(([key, val]) => (
                      <div key={key} className="flex justify-between border-b border-slate-200/60 pb-3 text-xs">
                        <span className="text-slate-500 font-bold uppercase tracking-wider">{key}</span>
                        <span className="text-[#0F172A] font-bold text-right">{val}</span>
                      </div>
                    ))}
                  </div>

                  <a 
                    href="#contact"
                    onClick={() => {
                      closeProject();
                      const target = document.querySelector('#contact');
                      if (target) target.scrollIntoView({ behavior: 'smooth' });
                    }}
                    className="bg-[#0F172A] text-white hover:bg-[#0EA5E9] text-center py-3 text-xs font-bold uppercase tracking-widest mt-8 transition-colors duration-200"
                  >
                    Request System Integration
                  </a>
                </div>

              </div>

            </div>

          </div>
        </div>
      )}

    </section>
  );
}