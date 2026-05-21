import React, { useRef, useEffect, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import Lenis from 'lenis';

// Component Imports
import Navbar from './components/Navbar';
import Footer from './components/Footer';

// Pages Imports
import HomePage from './pages/HomePage';
import SolutionsPage from './pages/SolutionsPage';
import ProjectsPage from './pages/ProjectsPage';
import ProjectDetailPage from './pages/ProjectDetailPage';
import AboutPage from './pages/AboutPage';
import ContactPage from './pages/ContactPage';

import { NavigationProvider, useNavigation } from './context/NavigationContext';

gsap.registerPlugin(ScrollTrigger);

function AppContent() {
  const { path, isTransitioning } = useNavigation();
  const canvasRef = useRef(null);
  const mainWrapperRef = useRef(null);
  const loaderRef = useRef(null);
  const lenisRef = useRef(null);

  // Text Refs for syncing with the video
  const sub1Ref = useRef(null);
  const sub2Ref = useRef(null);
  const blastTextRef = useRef(null);

  // Optimized Frames
  const frameCount = 353;

  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [progress, setProgress] = useState(0);
  const [loadingStage, setLoadingStage] = useState("Initializing Core...");
  const [firstFrameLoaded, setFirstFrameLoaded] = useState(false);

  // sequence ref no longer needed for scrubbing — replaced by targetFrame/displayFrame
  const targetFrame = useRef(0);
  const displayFrame = useRef(0);

  // 1. Initialize Lenis Smooth Scroll
  useEffect(() => {
    const lenis = new Lenis({ duration: 2.0, smooth: true });
    lenisRef.current = lenis;
    lenis.on('scroll', ScrollTrigger.update);

    const rafHandler = (time) => lenis.raf(time * 1000);
    gsap.ticker.add(rafHandler);
    gsap.ticker.lagSmoothing(0);

    return () => {
      lenis.destroy();
      gsap.ticker.remove(rafHandler);
      document.body.style.overflow = '';
      document.documentElement.style.overflow = '';
    };
  }, []);

  // Lock/Unlock scroll based on loading state or transitions
  useEffect(() => {
    if (!lenisRef.current) return;
    if ((loading && path === '/') || isTransitioning) {
      lenisRef.current.stop();
      document.body.style.overflow = 'hidden';
      document.documentElement.style.overflow = 'hidden';
    } else {
      lenisRef.current.start();
      document.body.style.overflow = '';
      document.documentElement.style.overflow = '';
    }
  }, [loading, path, isTransitioning]);

  // Reset scroll to top on page transition
  useEffect(() => {
    if (lenisRef.current) {
      lenisRef.current.scrollTo(0, { immediate: true });
    }
    setTimeout(() => {
      ScrollTrigger.refresh();
    }, 100);
  }, [path]);

  // Preload Images
  useEffect(() => {
    let loadedCount = 0;
    const loadedImages = [];

    const updateProgress = () => {
      loadedCount++;
      const currentProgress = Math.round((loadedCount / frameCount) * 100);
      setProgress(currentProgress);

      if (currentProgress < 20) setLoadingStage("CONNECTING TO HOST...");
      else if (currentProgress < 40) setLoadingStage("ALLOCATING GRAPHICS BUFFER...");
      else if (currentProgress < 60) setLoadingStage("CACHING SEQUENTIAL FRAMES...");
      else if (currentProgress < 85) setLoadingStage("SYNCHRONIZING DIGITAL TWIN...");
      else if (currentProgress < 100) setLoadingStage("VERIFYING SYSTEM INTEGRITY...");
      else setLoadingStage("SYSTEM ONLINE");

      if (loadedCount === frameCount) {
        setTimeout(() => {
          if (loaderRef.current) {
            gsap.to(loaderRef.current, {
              opacity: 0,
              duration: 0.8,
              ease: "power2.out",
              onComplete: () => setLoading(false)
            });
          } else {
            setLoading(false);
          }
        }, 500);
      }
    };

    for (let i = 1; i <= frameCount; i++) {
      const img = new Image();
      if (i === 1) {
        img.onload = () => {
          setFirstFrameLoaded(true);
          updateProgress();
        };
      } else {
        img.onload = updateProgress;
      }
      img.onerror = updateProgress;
      img.src = `/hero-sequence/frame_${i.toString().padStart(4, '0')}.webp`;
      loadedImages.push(img);
    }
    setImages(loadedImages);
  }, [frameCount]);

  // THE LIVING HERO: Lerp-Smoothed Frame Scrubbing
  useGSAP(() => {
    if (images.length === 0 || path !== '/') return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const context = canvas.getContext("2d");

    // Draw frame 0 immediately on mount
    const firstImg = images[0];
    if (firstImg && firstImg.naturalWidth !== 0) {
      context.drawImage(firstImg, 0, 0, canvas.width, canvas.height);
    }

    // --- SCROLL → TARGET FRAME (no rendering here) ---
    // ScrollTrigger only updates the target; rendering is handled by the RAF ticker below
    ScrollTrigger.create({
      trigger: mainWrapperRef.current,
      start: "top top",
      end: "+=12000",
      onUpdate: (self) => {
        targetFrame.current = self.progress * (frameCount - 1);
      }
    });

    // --- LERP RAF LOOP → SMOOTH CANVAS DRAW ---
    // displayFrame chases targetFrame at LERP_FACTOR speed each tick.
    // Fast scroll = large diff = fast catch-up.
    // Slow/stopped scroll = diff shrinks = gentle ease-out. No jitter.
    const LERP_FACTOR = 0.08;
    const lastRenderedFrame = { current: -1 };

    const ticker = gsap.ticker.add(() => {
      const diff = targetFrame.current - displayFrame.current;

      // Skip redraw if we're already close enough — avoids wasted draws at rest
      if (Math.abs(diff) < 0.05) return;

      displayFrame.current += diff * LERP_FACTOR;

      const frameIndex = Math.min(
        frameCount - 1,
        Math.max(0, Math.round(displayFrame.current))
      );

      // Skip if same frame as last draw
      if (frameIndex === lastRenderedFrame.current) return;

      const img = images[frameIndex];
      if (!img || img.naturalWidth === 0) return;

      context.clearRect(0, 0, canvas.width, canvas.height);
      context.drawImage(img, 0, 0, canvas.width, canvas.height);
      lastRenderedFrame.current = frameIndex;
    });

    // --- TEXT TIMELINE (separate, scroll-driven) ---
    // Text uses its own ScrollTrigger with scrub: 1 for slight smoothing.
    // Kept decoupled from canvas so text never blocks frame rendering.
    const textTl = gsap.timeline({
      scrollTrigger: {
        trigger: mainWrapperRef.current,
        start: "top top",
        end: "+=12000",
        scrub: 1,
      }
    });

    textTl
      .fromTo(sub1Ref.current, { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 0.05 }, 0.2)
      .to(sub1Ref.current, { opacity: 0, y: -30, duration: 0.05 }, 0.4)
      .fromTo(sub2Ref.current, { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 0.05 }, 0.5)
      .to(sub2Ref.current, { opacity: 0, y: -30, duration: 0.05 }, 0.7)
      .fromTo(blastTextRef.current, { opacity: 0, scale: 0.8 }, { opacity: 1, scale: 1, duration: 0.1 }, 0.9);

    // Cleanup ticker on unmount / dependency change
    return () => gsap.ticker.remove(ticker);

  }, { dependencies: [images, path, firstFrameLoaded] });

  // Routing switch logic
  const renderPage = () => {
    if (path === '/') return <HomePage />;
    if (path === '/solutions') return <SolutionsPage />;
    if (path === '/projects') return <ProjectsPage />;
    if (path.startsWith('/projects/')) return <ProjectDetailPage />;
    if (path === '/about') return <AboutPage />;
    if (path === '/contact') return <ContactPage />;
    return <HomePage />;
  };

  const isHome = path === '/';

  return (
    <div id="root" className="bg-white font-sans overflow-x-hidden text-[#0F172A]">

      {/* HIGH-TECH PAGE SHIFT WIPE OVERLAY */}
      <PageTransitionOverlay active={isTransitioning} />

      {/* PERSISTENT STICKY NAVBAR AT THE ROOT LEVEL */}
      <Navbar />

      {/* HIGH-TECH PRELOADER OVERLAY */}
      {loading && isHome && (
        <div
          ref={loaderRef}
          className="fixed inset-0 z-50 bg-white flex flex-col items-center justify-center select-none"
        >
          <div className="relative flex flex-col items-center max-w-sm w-full px-6 text-center">

            {/* Spinning Diagnostic Circle */}
            <div className="mb-8 relative">
              <div className="w-16 h-16 border-2 border-slate-100 rounded-full flex items-center justify-center animate-spin" style={{ animationDuration: '4s' }}>
                <div className="w-12 h-12 border-2 border-t-[#0EA5E9] border-r-transparent border-b-transparent border-l-transparent rounded-full animate-spin" style={{ animationDuration: '1.5s' }} />
              </div>
              <div className="absolute inset-0 flex items-center justify-center font-bold text-xs text-[#0F172A] tracking-[0.2em] font-headings">
                SPAR
              </div>
            </div>

            {/* Title / Diagnostic Info */}
            <h3 className="text-[#0F172A] text-xs font-bold uppercase tracking-[0.3em] mb-2 font-headings">
              Initializing Core Sequence
            </h3>
            <p className="text-slate-400 text-[10px] font-mono mb-6 uppercase tracking-wider h-4">
              {loadingStage}
            </p>

            {/* Progress Bar */}
            <div className="w-full h-[2px] bg-slate-100 rounded-full overflow-hidden relative mb-4">
              <div
                className="h-full bg-[#0EA5E9] shadow-[0_0_8px_rgba(14,165,233,0.3)] transition-all duration-300 ease-out"
                style={{ width: `${progress}%` }}
              />
            </div>

            {/* Metrics */}
            <div className="flex justify-between w-full text-[9px] font-mono text-slate-400 font-bold uppercase tracking-widest">
              <span>SYS_LOAD // STATUS_OK</span>
              <span className="text-[#0F172A]">{progress}%</span>
            </div>

          </div>
        </div>
      )}

      {/* RENDER THE SCROLL SEQUENCE PINNING WRAPPER ONLY ON THE HOMEPAGE */}
      {isHome && (
        <div ref={mainWrapperRef} className="relative h-[12000px] bg-white">

          {/* GLOBAL TRANSLUCENT CANVAS OVER WHITE BACKGROUND */}
          <div className="fixed inset-0 w-full h-full z-0 pointer-events-none flex items-center justify-center bg-white">
            <canvas
              ref={canvasRef}
              width={1920}
              height={1080}
              className="absolute inset-0 w-full h-full object-cover opacity-[0.8]"
              style={{ willChange: 'transform' }}
            />
          </div>

          {/* FIXED UI OVERLAYS */}
          <div className="fixed inset-0 pointer-events-none z-20 flex flex-col items-center justify-center text-center px-4">
            <h2 ref={sub1Ref} className="absolute bottom-[15%] text-3xl md:text-5xl font-bold text-[#0F172A] drop-shadow-[0_2px_8px_rgba(255,255,255,0.9)] tracking-wide font-headings">
              Precision redefined.
            </h2>
            <h2 ref={sub2Ref} className="absolute bottom-[15%] text-3xl md:text-5xl font-bold text-[#0F172A] drop-shadow-[0_2px_8px_rgba(255,255,255,0.9)] tracking-wide font-headings">
              Connecting hardware to the digital twin.
            </h2>
            <div ref={blastTextRef} className="absolute inset-0 flex flex-col items-center justify-center">
              <h1 className="text-7xl md:text-[140px] font-black text-[#0F172A] tracking-tighter leading-none drop-shadow-[0_4px_15px_rgba(255,255,255,0.9)] font-headings">
                SYSTEM <br /><span className="text-slate-500">ONLINE.</span>
              </h1>
            </div>
          </div>

          {/* HERO TEXT OVERLAY */}
          <div className="relative z-30 pointer-events-auto">
            <HomePageHero />
          </div>
        </div>
      )}

      {/* RENDER THE ACTIVE ROUTE PAGE CONTENT */}
      <div className="relative z-30">
        {renderPage()}
      </div>

      {/* PERSISTENT FOOTER */}
      <Footer />

    </div>
  );
}

// High-tech navigation wipe overlay using GSAP animations
function PageTransitionOverlay({ active }) {
  const overlayRef = useRef(null);
  const textRef = useRef(null);
  const barRef = useRef(null);

  useEffect(() => {
    if (active) {
      gsap.killTweensOf([overlayRef.current, textRef.current, barRef.current]);

      gsap.set(overlayRef.current, {
        display: 'flex',
        opacity: 0,
        pointerEvents: 'auto'
      });
      gsap.set(textRef.current, { y: 30, opacity: 0 });
      gsap.set(barRef.current, { width: '0%' });

      gsap.to(overlayRef.current, { opacity: 1, duration: 0.4, ease: 'power3.out' });
      gsap.to(textRef.current, { y: 0, opacity: 1, duration: 0.4, delay: 0.15, ease: 'power2.out' });
      gsap.to(barRef.current, { width: '100%', duration: 0.6, ease: 'power2.inOut' });
    } else {
      gsap.killTweensOf([overlayRef.current, textRef.current, barRef.current]);

      gsap.to(textRef.current, { y: -30, opacity: 0, duration: 0.35, ease: 'power3.in' });
      gsap.to(overlayRef.current, {
        opacity: 0,
        duration: 0.4,
        delay: 0.1,
        ease: 'power3.inOut',
        onComplete: () => {
          gsap.set(overlayRef.current, { display: 'none', pointerEvents: 'none' });
        }
      });
    }
  }, [active]);

  return (
    <div ref={overlayRef} className="fixed inset-0 z-[9999] bg-[#0F172A] flex flex-col items-center justify-center pointer-events-none select-none text-white" style={{ display: 'none' }}>
      <div className="absolute inset-0 bg-[linear-gradient(rgba(15,23,42,0.96),rgba(15,23,42,0.96)),repeating-linear-gradient(0deg,rgba(0,0,0,0.2) 0px,rgba(0,0,0,0.2) 1px,transparent 1px,transparent 3px)] pointer-events-none" style={{ backgroundSize: '100% 100%, 100% 6px' }} />
      <div ref={textRef} className="relative z-10 flex flex-col items-center text-center max-w-sm w-full px-8">
        <div className="mb-6 relative flex items-center justify-center">
          <div className="w-14 h-14 border border-slate-800 rounded-full flex items-center justify-center animate-spin" style={{ animationDuration: '4s' }}>
            <div className="w-10 h-10 border-t border-[#0EA5E9] border-r-transparent border-b-transparent border-l-transparent rounded-full animate-spin" style={{ animationDuration: '1.2s' }} />
          </div>
          <div className="absolute font-mono text-[9px] text-slate-500 font-bold uppercase tracking-widest">
            SPAR
          </div>
        </div>
        <h4 className="text-[10px] font-mono text-[#0EA5E9] uppercase tracking-[0.3em] mb-2 font-bold">System Node Transition</h4>
        <h3 className="text-xs font-bold uppercase tracking-[0.2em] font-headings text-slate-300">Routing Sequence Active</h3>
        <div className="w-full h-[1px] bg-slate-800 mt-6 rounded-full overflow-hidden">
          <div ref={barRef} className="h-full bg-[#0EA5E9] w-0" />
        </div>
        <span className="text-[8px] font-mono text-slate-600 mt-3 uppercase tracking-widest">SYS_ROUTE_CONNECTING // PORT_80_OK</span>
      </div>
    </div>
  );
}

// Simple Home Hero spacer component for AppContent scroll trigger mapping
function HomePageHero() {
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
    tl.to(textRef.current, { opacity: 0, y: -50, duration: 1 }, 0);
  });

  return (
    <section ref={sectionRef} className="h-screen w-full relative bg-transparent overflow-hidden flex items-center">
      <div className="relative z-20 w-full max-w-7xl mx-auto px-6 md:px-20 grid grid-cols-12 pointer-events-none">
        <div ref={textRef} className="col-span-12 lg:col-span-6 text-left p-8 md:p-10 bg-white/60 backdrop-blur-[4px] border-l-4 border-[#0EA5E9] shadow-sm rounded-none">
          <span className="text-xs font-bold uppercase tracking-[0.25em] text-[#0EA5E9] mb-4 block">Advanced Robotics & Custom Integration</span>
          <h1 className="text-5xl md:text-7xl font-bold text-[#0F172A] mb-6 tracking-tight leading-[1.1] font-headings">
            Industrial <br /> Intelligence.
          </h1>
          <p className="text-slate-700 text-base md:text-lg max-w-md mb-10 leading-relaxed font-normal">
            We engineer bespoke automation systems and robotic workcells that maximize manufacturing throughput, eliminate human error, and deliver high-precision performance at scale.
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

export default function App() {
  return (
    <NavigationProvider>
      <AppContent />
    </NavigationProvider>
  );
}