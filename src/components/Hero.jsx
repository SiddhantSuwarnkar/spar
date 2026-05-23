import React, { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(ScrollTrigger);

export default function Hero() {
  const sectionRef = useRef(null);
  const videoRef = useRef(null);
  
  const [videoSrc] = useState(() => 
    typeof window !== 'undefined' && window.innerWidth < 768 
      ? "/mobile_scrub.mp4" 
      : "/optimized_scrub.mp4"
  );

  const heroBoxRef = useRef(null);
  // Vision Cards Refs
  const card1Ref = useRef(null);
  const card2Ref = useRef(null);
  const card3Ref = useRef(null);

  // New HUD & Wow refs
  const progressRef = useRef(null);
  const coordsRef = useRef(null);
  
  // Left-side HUD console refs
  const hudRef = useRef(null);
  const hudLine1Ref = useRef(null);
  const hudLine2Ref = useRef(null);

  const { contextSafe } = useGSAP(() => {
    const video = videoRef.current;
    if (!video) return;

    const initAnimation = contextSafe(() => {
      const masterTl = gsap.timeline({ paused: true });

      const dur = video.duration && !isNaN(video.duration) ? video.duration : 10;
      masterTl.to(video, { currentTime: dur, ease: "none", duration: 10 }, 0);

      masterTl
        .addLabel("trans1", 1)
        .to(heroBoxRef.current, { opacity: 0, y: -50, duration: 1 }, "trans1")
        .fromTo(hudRef.current, { x: -50, opacity: 0 }, { x: 0, opacity: 1, duration: 1 }, "trans1")
        .fromTo(card1Ref.current, { x: 50, opacity: 0 }, { x: 0, opacity: 1, duration: 1 }, "trans1+=0.5")
        
        .addLabel("trans2", 4)
        .to(card1Ref.current, { opacity: 0, y: -30, duration: 1 }, "trans2")
        .fromTo(card2Ref.current, { y: 50, opacity: 0 }, { y: 0, opacity: 1, duration: 1 }, "trans2")
        .fromTo(hudLine1Ref.current, { opacity: 0, x: -20 }, { opacity: 1, x: 0, duration: 0.5 }, "trans2")
        .fromTo(hudLine2Ref.current, { opacity: 0, x: -20 }, { opacity: 1, x: 0, duration: 0.5 }, "trans2+=0.5")

        .addLabel("trans3", 7)
        .to(card2Ref.current, { opacity: 0, y: -30, duration: 1 }, "trans3")
        .to(hudRef.current, { opacity: 0, x: -50, duration: 1 }, "trans3")
        .fromTo(card3Ref.current, { scale: 0.9, opacity: 0 }, { scale: 1, opacity: 1, duration: 1 }, "trans3");

      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: "top top",
        end: "+=10000",
        pin: true,
        animation: masterTl,
        scrub: 1, // Built-in smooth scrubbing
        onUpdate: (self) => {
          if (progressRef.current) {
            progressRef.current.style.height = `${self.progress * 100}%`;
          }
          if (coordsRef.current) {
            const num1 = (Math.random() * 100 * self.progress).toFixed(4);
            const num2 = (Math.random() * 100 * self.progress).toFixed(4);
            coordsRef.current.innerText = `X: ${num1} | Y: ${num2}`;
          }
        }
      });
    });

    if (video.readyState >= 1) {
      initAnimation();
    } else {
      video.addEventListener('loadedmetadata', initAnimation, { once: true });
      return () => video.removeEventListener('loadedmetadata', initAnimation);
    }
  }, { dependencies: [] });

  return (
    <section ref={sectionRef} className="w-full h-screen relative bg-[#0F172A] overflow-hidden">
      
      <video
        ref={videoRef}
        src={videoSrc}
        playsInline
        muted
        preload="auto"
        className="absolute inset-0 w-full h-full object-cover opacity-90"
      />
      <NoiseOverlay />

      {/* Vertical HUD Progress Tracker */}
      <div className="absolute right-8 top-1/2 -translate-y-1/2 h-1/3 w-[2px] bg-slate-800 z-40 hidden md:block">
        <div ref={progressRef} className="absolute top-0 left-0 w-full bg-[#0EA5E9] shadow-[0_0_8px_#0EA5E9]" style={{ height: '0%' }}></div>
        <div className="absolute -left-8 top-1/2 -translate-y-1/2 -rotate-90 text-[9px] font-bold tracking-[0.4em] text-[#0EA5E9] whitespace-nowrap opacity-80">SYS_DEPL_SEQ</div>
      </div>

      {/* Dynamic Coordinates HUD */}
      <div className="absolute bottom-10 right-10 z-40 text-[10px] font-mono tracking-widest text-slate-500 hidden md:flex flex-col items-end text-right pointer-events-none">
        <span className="text-[#0EA5E9] font-bold mb-1 opacity-80">LIVE TELEMETRY</span>
        <span ref={coordsRef} className="opacity-70">X: 0.0000 | Y: 0.0000</span>
      </div>

      <div className="absolute inset-0 w-full h-full flex flex-col items-center justify-center text-center px-4 pointer-events-none">

        <div ref={heroBoxRef} className="absolute inset-0 flex items-center justify-start pointer-events-auto">
          <div className="w-full max-w-7xl mx-auto px-6 md:px-20 grid grid-cols-12 pointer-events-none">
            <div className="relative col-span-12 lg:col-span-6 p-1 bg-[#090E17]/30 backdrop-blur-lg border border-white/10 rounded-sm shadow-2xl pointer-events-auto flex flex-col">
              {/* Glowing Corner Accents */}
              <div className="absolute top-0 left-0 w-8 h-8 border-t-[3px] border-l-[3px] border-[#0EA5E9]"></div>
              <div className="absolute bottom-0 right-0 w-8 h-8 border-b-[3px] border-r-[3px] border-[#0EA5E9]"></div>
              
              {/* Content */}
              <div className="p-8 md:p-12 text-left">
                <span className="text-[10px] font-bold uppercase tracking-widest text-[#0EA5E9] mb-4 block font-mono">
                  [ SYS_ONLINE ] Industrial Automation
                </span>
                <h1 className="text-4xl md:text-5xl lg:text-[80px] font-black tracking-tighter mb-6 bg-clip-text text-transparent bg-gradient-to-r from-white via-slate-200 to-[#0EA5E9] leading-[1.1] font-headings">
                  Engineered <br /> Perfection.
                </h1>
                <p className="text-slate-200 text-sm md:text-base max-w-md mb-8 leading-relaxed font-normal drop-shadow-md">
                  We design and deploy intelligent robotic systems that operate with absolute precision and unyielding reliability.
                </p>
                <div className="flex items-center gap-4 text-[10px] font-bold tracking-widest uppercase text-white font-mono">
                  <span className="w-12 h-[2px] bg-[#0EA5E9]"></span>
                  Initiate Sequence
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Left Side Telemetry HUD */}
        <div ref={hudRef} className="hidden md:flex absolute left-6 md:left-20 top-[40%] flex-col gap-4 font-mono text-[10px] md:text-xs text-[#0EA5E9] pointer-events-none opacity-0 text-left">
          <div className="border-l-[3px] border-[#0EA5E9] pl-4 py-1.5 bg-[#090E17]/60 backdrop-blur-md rounded-r-sm shadow-md">
            <span className="opacity-70 tracking-widest block mb-1">SYS_DIAGNOSTIC_RUN</span>
            <span className="text-[#F8FAFC] font-bold tracking-wider">[ OK ] KINEMATICS ENGINE</span>
          </div>
          <div ref={hudLine1Ref} className="border-l-[3px] border-slate-500 pl-4 py-1.5 bg-[#090E17]/60 backdrop-blur-md rounded-r-sm shadow-md opacity-0">
            <span className="opacity-70 tracking-widest block mb-1">SENSORS_CALIBRATING</span>
            <span className="text-[#F8FAFC] font-bold tracking-wider">[ OK ] OPTICAL ARRAY</span>
          </div>
          <div ref={hudLine2Ref} className="border-l-[3px] border-slate-500 pl-4 py-1.5 bg-[#090E17]/60 backdrop-blur-md rounded-r-sm shadow-md opacity-0">
            <span className="opacity-70 tracking-widest block mb-1">NETWORK_HANDSHAKE</span>
            <span className="text-[#F8FAFC] font-bold tracking-wider">[ ESTABLISHED ] SECURE UPLINK</span>
          </div>
        </div>

        {/* New Vision Cards */}
        <div className="hidden md:flex absolute right-6 md:right-20 top-1/2 -translate-y-1/2 flex-col gap-6 w-[85%] md:w-[45%] max-w-md text-left pointer-events-none">
          
          {/* Card 1 */}
          <div ref={card1Ref} className="bg-[#1E293B]/80 backdrop-blur-md border border-white/10 p-6 md:p-8 rounded-sm shadow-2xl absolute w-full opacity-0 pointer-events-auto">
            <span className="text-[10px] font-bold text-[#0EA5E9] uppercase tracking-widest font-mono mb-3 block">
              // Core Capability
            </span>
            <h3 className="text-2xl font-bold text-[#F8FAFC] mb-4 font-headings">
              Zero-Defect Robotics
            </h3>
            <p className="text-slate-400 text-sm leading-relaxed">
              We engineer machine vision and robotic assembly systems capable of sub-millimeter precision, guaranteeing zero-defect production at maximum throughput.
            </p>
          </div>

          {/* Card 2 */}
          <div ref={card2Ref} className="bg-[#1E293B]/80 backdrop-blur-md border border-white/10 p-6 md:p-8 rounded-sm shadow-2xl absolute w-full opacity-0 pointer-events-auto">
            <span className="text-[10px] font-bold text-[#0EA5E9] uppercase tracking-widest font-mono mb-3 block">
              // Neural Networks
            </span>
            <h3 className="text-2xl font-bold text-[#F8FAFC] mb-4 font-headings">
              AI-Driven Quality Control
            </h3>
            <p className="text-slate-400 text-sm leading-relaxed">
              Our proprietary edge-computing nodes process optical data in under 8ms, allowing for dynamic, real-time adjustments without slowing down your line.
            </p>
          </div>

          {/* Card 3 */}
          <div ref={card3Ref} className="bg-[#1E293B]/80 backdrop-blur-md border border-white/10 p-6 md:p-8 rounded-sm shadow-2xl absolute w-full opacity-0 pointer-events-auto">
            <span className="text-[10px] font-bold text-[#0EA5E9] uppercase tracking-widest font-mono mb-3 block">
              // Deployment
            </span>
            <h3 className="text-2xl font-bold text-[#F8FAFC] mb-4 font-headings">
              Ready for 24/7 Operations
            </h3>
            <p className="text-slate-400 text-sm leading-relaxed">
              Built for high-stress manufacturing environments. We deploy turn-key solutions worldwide with integrated thermal compensation and auto-calibration.
            </p>
          </div>

        </div>

      </div>
    </section>
  );
}

function NoiseOverlay() {
  return (
    <div className="pointer-events-none absolute inset-0 z-50 h-full w-full opacity-20 mix-blend-overlay">
      <svg className="absolute inset-0 h-full w-full">
        <filter id="noiseFilter">
          <feTurbulence type="fractalNoise" baseFrequency="0.65" numOctaves="3" stitchTiles="stitch" />
        </filter>
        <rect width="100%" height="100%" filter="url(#noiseFilter)" />
      </svg>
    </div>
  );
}