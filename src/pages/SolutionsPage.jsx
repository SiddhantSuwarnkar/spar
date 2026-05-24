import React, { useRef, useState, Suspense, Component } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Stage, useGLTF } from '@react-three/drei';
import { useNavigation } from '../context/NavigationContext';

gsap.registerPlugin(ScrollTrigger);

const products = [
  {
    id: 1,
    title: "Advanced Machine Vision Systems",
    desc: "We design integrated vision systems that allow for real-time quality control, dynamic part localization, and millimeter-perfect sorting, ensuring zero-defect production lines. Utilizing deep learning algorithms running on high-power edge nodes, our systems verify geometric parameters and detect surface micro-cracks in less than 8ms.",
    image: "/machine_vision_system.png",
    video: "/showcase/IMG_7543.mp4",
    specs: ["2D/3D camera integration", "Sub-millimeter accuracy", "AI-driven defect detection", "Optical character verification"],
    details: [
      { label: "Vision Sensors", value: "12MP Global Shutter, 3D Laser Profilers" },
      { label: "Compute Node", value: "NVIDIA Jetson AGX Orin Edge AI" },
      { label: "Latency", value: "<8ms classification time" }
    ]
  },
  {
    id: 2,
    title: "High-Speed Robotic Assembly",
    desc: "Our automated assembly lines integrate precision actuators and synchronized dual-arm kinematics to handle delicate electronic components or heavy automotive parts with speed and repeat accuracy. Armed with custom pneumatic and vacuum end effectors, they conform to complex geometries and force parameters instantly.",
    image: "/robotic_assembly_arm.png",
    video: "/showcase/IMG_7544.mp4",
    specs: ["Auto-calibration sensors", "150kg payload capacity", "Multi-system synchronization", "Dynamic payload adjustment"],
    details: [
      { label: "Kinematic Reach", value: "Up to 3,100 mm per arm" },
      { label: "Payload Limit", value: "150kg maximum capacity" },
      { label: "Axis Limits", value: "6-Axis articulated motion" }
    ]
  },
  {
    id: 3,
    title: "Precision Robotic Welding",
    desc: "Engineered for high-stress manufacturing, our robotic welding cells deliver clean, consistent spot and seam welds on complex aerospace and automotive structural components. Integrated path tracking sensors dynamically adjust current parameters and torch angle to compensate for thermal distortion in real time.",
    image: "/robotic_welding_cell.png",
    video: "/showcase/IMG_7548.mp4",
    specs: ["Real-time heat compensation", "Sub-millimeter path planning", "Multi-axis reach envelopes", "Clean weld-slag control"],
    details: [
      { label: "Torch Integration", value: "MIG / TIG / Laser configurable" },
      { label: "Path Tracking", value: "Optical seam tracking at 200Hz" },
      { label: "Repeatability", value: "±0.04 mm precision" }
    ]
  }
];

const SpecBoard = ({ details }) => {
  return (
    <div className="mt-8 flex flex-col gap-3 border-t border-white/10 pt-6">
      <h4 className="text-xs font-bold uppercase tracking-widest text-[#F8FAFC] mb-2 font-mono">
        Engineering Specifications:
      </h4>
      {details.map((d, i) => (
        <div key={i} className="flex flex-col sm:flex-row sm:justify-between sm:items-center border-b border-white/5 pb-2 gap-1.5 sm:gap-4">
          <span className="text-xs font-mono text-slate-500 uppercase tracking-widest">{d.label}</span>
          <span className="text-sm font-bold text-[#0EA5E9] font-headings text-left sm:text-right break-words">{d.value}</span>
        </div>
      ))}
    </div>
  );
};

class ModelErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    console.error("Error loading 3D Model:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="flex flex-col items-center justify-center w-full h-full text-center p-8 bg-[#090E17]">
          <span className="text-red-500 font-bold mb-2">Failed to load 3D Model</span>
          <span className="text-slate-400 text-sm font-mono max-w-sm">
            If you downloaded this .gltf from Sketchfab, please ensure you also placed the associated <b>.bin</b> file and <b>textures/</b> folder in the public directory!
          </span>
        </div>
      );
    }
    return this.props.children;
  }
}

// 3D Placeholder for client model
// Client instructions: Replace this with `const { scene } = useGLTF('/model.glb'); return <primitive object={scene} />`
const PlaceholderModel = () => {
  const { scene } = useGLTF('/scene.gltf');
  return <primitive object={scene} />;
};

export default function SolutionsPage() {
  const { navigate } = useNavigation();
  const containerRef = useRef(null);
  const productRowsRef = useRef([]);

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

    // Staggered slide up of product rows on scroll
    productRowsRef.current.forEach((row) => {
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
      
      {/* Cinematic Header */}
      <section className="header-section relative h-[80vh] flex items-center justify-center overflow-hidden">
        {/* Background Image with Parallax */}
        <div className="absolute inset-0 w-full h-[130%] -top-[15%]">
          <img 
            src="/machine_vision_system.png" 
            alt="Machine Vision Technology"
            className="parallax-bg w-full h-full object-cover opacity-60" 
          />
        </div>
        
        {/* Vibrant Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#0F172A]/90 via-[#0F172A]/60 to-[#090E17] z-10" />
        
        <div className="relative z-20 text-center px-4 reveal-up mt-20 max-w-5xl">
          <span className="text-[#0EA5E9] font-bold tracking-[0.4em] uppercase mb-6 block text-sm shadow-sm font-mono">
            Products & Core Engineering
          </span>
          <h1 className="text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-black font-headings tracking-tighter mb-8 bg-clip-text text-transparent bg-gradient-to-r from-white via-slate-200 to-[#0EA5E9] break-words">
            Precision Engineering <br/> for Complex Operations.
          </h1>
          <p className="text-slate-300 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed font-normal">
            We architect and fabricate custom automation systems for high-stress environments. Our products cover the entire lifecycle, ensuring absolute repeat accuracy under 24/7 industrial loads.
          </p>
        </div>
      </section>
      
      {/* 2. ALTERNATING CONTENT ROWS */}
      <section className="bg-[#090E17] py-24 px-6 md:px-20">
        <div className="max-w-7xl mx-auto flex flex-col gap-32">
          
          {products.map((prod, index) => {
            const isImageLeft = index % 2 === 0;
            return (
              <div 
                key={prod.id} 
                ref={el => productRowsRef.current[index] = el}
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
                      src={prod.video} 
                      poster={prod.image}
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
                    Product Solution 0{prod.id}
                  </span>
                  
                  <h3 className="text-3xl md:text-4xl font-bold text-[#F8FAFC] mb-6 font-headings">
                    {prod.title}
                  </h3>
                  
                  <p className="text-slate-400 text-base leading-relaxed mb-8 font-normal">
                    {prod.desc}
                  </p>

                  {/* Interactive Spec Board */}
                  <SpecBoard details={prod.details} />

                  {/* 3D Showcase Link Buttons */}
                  {prod.id !== 1 && (
                    <div className="mt-8">
                      <button
                        onClick={() => navigate(prod.id === 2 ? '/robotic-arm/assembly' : '/robotic-arm/welding')}
                        className="inline-flex items-center gap-2 px-6 py-3 border border-[#0EA5E9]/40 hover:border-[#0EA5E9] bg-[#0F172A] hover:bg-[#0EA5E9]/10 text-white hover:text-[#0EA5E9] font-mono text-xs font-bold tracking-widest uppercase transition-all duration-300 rounded-sm group shadow-md"
                      >
                        <span>Explore Interactive 3D Showcase</span>
                        <span className="group-hover:translate-x-1.5 transition-transform duration-300">→</span>
                      </button>
                    </div>
                  )}

                </div>

              </div>
            );
          })}

        </div>
      </section>

      {/* 3. INTERACTIVE 3D CANVAS */}
      <section className="py-24 px-6 md:px-20 border-t border-white/10 bg-[#0F172A]">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12 reveal-up">
            <span className="text-xs font-bold uppercase tracking-[0.25em] text-[#0EA5E9] mb-3 block font-mono">
              Engineering Excellence
            </span>
            <h2 className="text-3xl md:text-5xl font-black font-headings text-white">
              Component Deep Dive
            </h2>
          </div>
          
          <div className="w-full aspect-video md:aspect-[21/9] bg-[#1E293B] border border-white/10 rounded-sm overflow-hidden relative cursor-grab active:cursor-grabbing shadow-2xl reveal-up">
            <div className="absolute top-6 left-6 z-10 pointer-events-none">
               <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#0EA5E9] font-mono block mb-1">Interactive CAD Viewer</span>
               <span className="text-white text-lg font-bold font-headings drop-shadow-md">Drag to Rotate</span>
            </div>
            
            {/* The 3D Canvas */}
            <ModelErrorBoundary>
              <Canvas camera={{ position: [0, 0, 4], fov: 50 }}>
                <Suspense fallback={null}>
                  <Stage environment="city" intensity={0.5}>
                    <PlaceholderModel />
                  </Stage>
                </Suspense>
                <OrbitControls autoRotate autoRotateSpeed={1.0} enableZoom={false} />
              </Canvas>
            </ModelErrorBoundary>
          </div>
        </div>
      </section>

      {/* 4. DE-RISKING: LIFECYCLE SUPPORT */}
      <section className="bg-slate-50 py-24 px-6 md:px-20 border-t border-slate-200 relative z-20">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
          <div className="reveal-up">
            <span className="text-xs font-bold uppercase tracking-[0.25em] text-[#0EA5E9] mb-3 block font-mono">
              Lifecycle Support & SLAs
            </span>
            <h2 className="text-3xl md:text-5xl font-black font-headings text-slate-900 leading-[1.1] mb-6">
              Uptime. Guaranteed.
            </h2>
            <p className="text-slate-600 font-medium mb-8">
              What happens when a robotic arm breaks down at 2 AM? Our commitment doesn't end at deployment. We provide dedicated 24/7 support protocols and remote diagnostic capabilities.
            </p>
            <ul className="flex flex-col gap-4">
              {[
                "24/7 Remote Diagnostics via VPN",
                "Predictive Maintenance Software included",
                "4-Hour On-Site SLA for critical failures",
                "Continuous Operator Training & Certification"
              ].map((item, i) => (
                <li key={i} className="flex items-center gap-3 font-mono text-sm text-slate-700 font-bold tracking-tight">
                  <span className="w-2 h-2 bg-[#0EA5E9] rounded-sm shrink-0" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
          <div className="bg-white p-6 sm:p-8 border border-slate-200 shadow-xl rounded-sm reveal-up">
             <h3 className="text-xl font-bold font-headings text-slate-900 mb-6">Live Diagnostic Dashboard</h3>
             <div className="space-y-4">
               {/* Mock bars */}
               <div>
                 <div className="flex flex-col sm:flex-row sm:justify-between text-xs font-mono font-bold text-slate-500 mb-1 gap-1">
                   <span>CELL 01: WELDER</span><span className="text-[#0EA5E9] sm:text-right">ONLINE</span>
                 </div>
                 <div className="w-full h-2 bg-slate-100 rounded-sm"><div className="w-full h-full bg-[#0EA5E9] rounded-sm"></div></div>
               </div>
               <div>
                 <div className="flex flex-col sm:flex-row sm:justify-between text-xs font-mono font-bold text-slate-500 mb-1 gap-1">
                   <span>CELL 02: ASSEMBLY</span><span className="text-amber-500 sm:text-right">MAINTENANCE DUE IN 40HR</span>
                 </div>
                 <div className="w-full h-2 bg-slate-100 rounded-sm"><div className="w-[85%] h-full bg-amber-500 rounded-sm"></div></div>
               </div>
             </div>
          </div>
        </div>
      </section>

    </div>
  );
}
