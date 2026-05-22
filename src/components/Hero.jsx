import React, { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(ScrollTrigger);

export default function Hero() {
  const sectionRef = useRef(null);
  const videoRef = useRef(null);

  const heroBoxRef = useRef(null);
  const sub1Ref = useRef(null);
  const sub2Ref = useRef(null);
  const blastTextRef = useRef(null);

  // New HUD & Wow refs
  const progressRef = useRef(null);
  const coordsRef = useRef(null);

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
        .fromTo(sub1Ref.current, { clipPath: "inset(0% 100% 0% 0%)", opacity: 1, y: 0 }, { clipPath: "inset(0% 0% 0% 0%)", opacity: 1, y: 0, duration: 1 }, "trans1")
        .addLabel("trans2", 4)
        .to(sub1Ref.current, { opacity: 0, y: -30, duration: 1 }, "trans2")
        .fromTo(sub2Ref.current, { clipPath: "inset(0% 100% 0% 0%)", opacity: 1, y: 0 }, { clipPath: "inset(0% 0% 0% 0%)", opacity: 1, y: 0, duration: 1 }, "trans2")
        .addLabel("trans3", 7)
        .to(sub2Ref.current, { opacity: 0, y: -30, duration: 1 }, "trans3")
        .fromTo(blastTextRef.current, { clipPath: "inset(0% 100% 0% 0%)", opacity: 1, scale: 0.8 }, { clipPath: "inset(0% 0% 0% 0%)", opacity: 1, scale: 1, duration: 1 }, "trans3")
        // The glitch effect
        .to(blastTextRef.current, { x: 5, textShadow: "4px 0 rgba(255,0,0,0.8), -4px 0 rgba(0,255,255,0.8)", duration: 0.05, yoyo: true, repeat: 7 }, "trans3+=0.8");

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
        src="/optimized_scrub.mp4"
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
            <div className="relative col-span-12 lg:col-span-6 text-left p-8 md:p-10 bg-white/60 backdrop-blur-[4px] border-l-4 border-[#0EA5E9] shadow-sm pointer-events-auto">
              {/* HUD Brackets */}
              <div className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-[#0F172A] -translate-x-1 -translate-y-1"></div>
              <div className="absolute top-0 right-0 w-4 h-4 border-t-2 border-r-2 border-[#0F172A] translate-x-1 -translate-y-1"></div>
              <div className="absolute bottom-0 left-0 w-4 h-4 border-b-2 border-l-2 border-[#0F172A] -translate-x-1 translate-y-1"></div>
              <div className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-[#0F172A] translate-x-1 translate-y-1"></div>

              <span className="text-xs font-bold uppercase tracking-[0.25em] text-[#0EA5E9] mb-4 block">Industrial Automation</span>
              <h1 className="text-5xl md:text-7xl font-bold text-[#0F172A] mb-6 tracking-tight leading-[1.1] font-headings">
                Engineered <br /> Perfection.
              </h1>
              <p className="text-slate-700 text-base md:text-lg max-w-md mb-10 leading-relaxed font-normal">
                We design and deploy intelligent robotic systems that operate with absolute precision and unyielding reliability.
              </p>
              <div className="flex items-center gap-4 text-xs font-bold tracking-[0.2em] uppercase text-[#0F172A]">
                <span className="w-12 h-[2px] bg-[#0F172A]"></span>
                Initiate Sequence
              </div>
            </div>
          </div>
        </div>

        <h2 ref={sub1Ref} className="absolute bottom-[20%] text-3xl md:text-5xl font-bold text-white drop-shadow-md tracking-wide font-headings opacity-0">
          Control the motion.
        </h2>

        <h2 ref={sub2Ref} className="absolute bottom-[20%] text-3xl md:text-5xl font-bold text-white drop-shadow-md tracking-wide font-headings opacity-0">
          Command the outcome.
        </h2>

        <div ref={blastTextRef} className="absolute inset-0 flex flex-col items-center justify-center opacity-0">
          <h1 className="text-7xl md:text-[140px] font-black text-white drop-shadow-lg tracking-tighter leading-none font-headings">
            SYSTEM <br /><span className="text-slate-400">ONLINE.</span>
          </h1>
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