import React, { useRef, useEffect, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(ScrollTrigger);

export default function Hero() {
  const sectionRef = useRef(null);
  const videoRef = useRef(null);
  const heroBoxRef = useRef(null);
  const overlayRef = useRef(null);

  const [isMobile, setIsMobile] = useState(() =>
    typeof window !== 'undefined' && window.innerWidth < 768
  );
  const videoSrc = "/optimized_scrub.mp4";

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useGSAP((context, contextSafe) => {
    const video = videoRef.current;
    if (!video) return;

    if (isMobile) {
      // On mobile: play video in a loop, no scroll-trigger animation
      video.play().catch(err => console.log("Video autoPlay failed:", err));
      return;
    }

    const initAnimation = contextSafe(() => {
      const masterTl = gsap.timeline({ paused: true });

      const dur = video.duration && !isNaN(video.duration) ? video.duration : 10;
      masterTl.to(video, { currentTime: dur, ease: "none", duration: 10 }, 0);

      // Smoothly fade out and scale down the centered logo & heading as scrolling begins
      masterTl.to(heroBoxRef.current, {
        opacity: 0,
        y: -40,
        scale: 0.95,
        duration: 3,
        ease: "power1.out"
      }, 0);

      // Smoothly fade out the dark overlay to reveal normal video brightness on scroll
      masterTl.to(overlayRef.current, {
        opacity: 0,
        duration: 4,
        ease: "power1.out"
      }, 0);

      // Smoothly transition video from its initial opacity (80%) to full brightness (100%)
      masterTl.to(video, {
        opacity: 1,
        duration: 4,
        ease: "power1.out"
      }, 0);

      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: "top top",
        end: "bottom bottom",
        animation: masterTl,
        scrub: 1, // Smooth scrolling control
      });
    });

    if (video.readyState >= 1) {
      initAnimation();
    } else {
      video.addEventListener('loadedmetadata', initAnimation, { once: true });
      return () => video.removeEventListener('loadedmetadata', initAnimation);
    }
  }, { dependencies: [isMobile] });

  return (
    <section 
      ref={sectionRef} 
      className="w-full relative bg-[#090E17] h-screen md:h-[300vh] z-10"
    >
      <div className="sticky top-0 w-full h-screen overflow-hidden">
        <video
          key={videoSrc}
          ref={videoRef}
          src={videoSrc}
          playsInline
          muted
          preload="auto"
          autoPlay={isMobile}
          loop={isMobile}
          className="absolute inset-0 w-full h-full object-cover opacity-80"
        />
        {/* Cinematic dark overlay to enhance text and logo visibility, fades out on scroll */}
        <div
          ref={overlayRef}
          className="absolute inset-0 bg-gradient-to-b from-transparent via-[#090E17]/25 to-[#090E17]/75 z-10 pointer-events-none"
        />
        <NoiseOverlay />

        {/* Centered Heading and SPAR Logo container */}
        <div
          ref={heroBoxRef}
          className="absolute inset-x-0 z-40 flex flex-col items-center justify-center text-center px-6 pointer-events-none top-1/2 -translate-y-1/2 bottom-auto md:top-auto md:bottom-24 md:translate-y-0"
        >
          {/* SPAR Logo with Subtle Pulsing Animation */}
          <div className="mb-6 md:mb-6 animate-pulse" style={{ animationDuration: '4s' }}>
            <img
              src="/logo.png"
              alt="SPAR Logo"
              className="h-20 md:h-24 w-auto object-contain drop-shadow-[0_0_20px_rgba(14,165,233,0.25)]"
            />
          </div>

          {/* Big Centered Heading with Slate-Blue Gradient */}
          <h1 className="text-5xl sm:text-6xl md:text-8xl lg:text-[100px] font-black font-headings tracking-tighter bg-clip-text text-transparent bg-gradient-to-r from-white via-slate-200 to-[#0EA5E9] break-words leading-[1.1] max-w-5xl pb-2 drop-shadow-[0_4px_16px_rgba(0,0,0,0.65)]">
            Engineered <br className="md:hidden" /> Perfection
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