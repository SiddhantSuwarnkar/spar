import React, { useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
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
import RoboticArmPage from './pages/RoboticArmPage';

import { NavigationProvider, useNavigation } from './context/NavigationContext';

gsap.registerPlugin(ScrollTrigger);

function AppContent() {
  const { path, isTransitioning, isInitialLoad } = useNavigation();

  // 1. Initialize Lenis Smooth Scroll (Global)
  useEffect(() => {
    const lenis = new Lenis({ duration: 2.0, smooth: true });
    window.lenis = lenis;

    lenis.on('scroll', ScrollTrigger.update);
    const rafHandler = (time) => lenis.raf(time * 1000);

    gsap.ticker.add(rafHandler);
    gsap.ticker.lagSmoothing(0);

    return () => {
      lenis.destroy();
      gsap.ticker.remove(rafHandler);
      delete window.lenis;
    };
  }, []);

  // Lock scroll during page transitions
  useEffect(() => {
    if (isTransitioning) {
      document.body.style.overflow = 'hidden';
      if (window.lenis) window.lenis.stop();
    } else {
      document.body.style.overflow = '';
      if (window.lenis) window.lenis.start();
    }
  }, [isTransitioning]);

  // Reset scroll to top on page transition
  useEffect(() => {
    if (window.lenis) {
      window.lenis.scrollTo(0, { immediate: true });
    } else {
      window.scrollTo(0, 0);
    }
    
    setTimeout(() => {
      ScrollTrigger.refresh();
    }, 100);
  }, [path]);

  // Routing switch logic
  const renderPage = () => {
    if (path === '/') return <HomePage />;
    if (path === '/solutions') return <SolutionsPage />;
    if (path === '/robotic-arm') return <RoboticArmPage />;
    if (path === '/projects') return <ProjectsPage />;
    if (path.startsWith('/projects/')) return <ProjectDetailPage />;
    if (path === '/about') return <AboutPage />;
    if (path === '/contact') return <ContactPage />;
    return <HomePage />;
  };

  return (
    <div id="root" className="bg-white font-sans overflow-x-hidden text-[#0F172A]">
      <PageTransitionOverlay active={isTransitioning} isInitialLoad={isInitialLoad} />
      <Navbar />

      <div className="relative z-30">
        {renderPage()}
      </div>

      <Footer />
    </div>
  );
}

// High-tech navigation wipe overlay using GSAP
function PageTransitionOverlay({ active, isInitialLoad }) {
  const overlayRef = React.useRef(null);
  const textRef = React.useRef(null);
  const barRef = React.useRef(null);

  useEffect(() => {
    if (active) {
      gsap.killTweensOf([overlayRef.current, textRef.current, barRef.current]);
      
      // If it's initial load, we don't fade in the overlay, it's already there
      if (isInitialLoad) {
        gsap.set(overlayRef.current, { display: 'flex', opacity: 1, pointerEvents: 'auto' });
      } else {
        gsap.set(overlayRef.current, { display: 'flex', opacity: 0, pointerEvents: 'auto' });
        gsap.to(overlayRef.current, { opacity: 1, duration: 0.4, ease: 'power3.out' });
      }

      gsap.set(textRef.current, { y: 30, opacity: 0 });
      gsap.set(barRef.current, { width: '0%' });

      gsap.to(textRef.current, { y: 0, opacity: 1, duration: 0.4, delay: 0.15, ease: 'power2.out' });
      // For initial load we give a longer progress bar fill
      gsap.to(barRef.current, { width: '100%', duration: isInitialLoad ? 1.8 : 0.6, ease: 'power2.inOut' });
    } else {
      gsap.killTweensOf([overlayRef.current, textRef.current, barRef.current]);
      gsap.to(textRef.current, { y: -30, opacity: 0, duration: 0.35, ease: 'power3.in' });
      gsap.to(overlayRef.current, {
        opacity: 0,
        duration: 0.4,
        delay: 0.1,
        ease: 'power3.inOut',
        onComplete: () => gsap.set(overlayRef.current, { display: 'none', pointerEvents: 'none' })
      });
    }
  }, [active]);

  return (
    <div ref={overlayRef} className="fixed inset-0 z-[9999] bg-[#0F172A] flex flex-col items-center justify-center pointer-events-none select-none text-white" style={{ display: isInitialLoad ? 'flex' : 'none', opacity: isInitialLoad ? 1 : 0 }}>
      <div className="absolute inset-0 bg-[linear-gradient(rgba(15,23,42,0.96),rgba(15,23,42,0.96)),repeating-linear-gradient(0deg,rgba(0,0,0,0.2) 0px,rgba(0,0,0,0.2) 1px,transparent 1px,transparent 3px)] pointer-events-none" style={{ backgroundSize: '100% 100%, 100% 6px' }} />
      <div ref={textRef} className="relative z-10 flex flex-col items-center text-center max-w-sm w-full px-8">
        <div className="mb-6 relative flex items-center justify-center">
          <div className="w-14 h-14 border border-slate-800 rounded-full flex items-center justify-center animate-spin" style={{ animationDuration: '4s' }}>
            <div className="w-10 h-10 border-t border-[#0EA5E9] border-r-transparent border-b-transparent border-l-transparent rounded-full animate-spin" style={{ animationDuration: '1.2s' }} />
          </div>
          <div className="absolute font-mono text-[9px] text-slate-500 font-bold uppercase tracking-widest">SPAR</div>
        </div>
        <h4 className="text-[10px] font-mono text-[#0EA5E9] uppercase tracking-[0.3em] mb-2 font-bold">
          {isInitialLoad ? 'SYSTEM BOOT SEQUENCE' : 'System Node Transition'}
        </h4>
        <h3 className="text-xs font-bold uppercase tracking-[0.2em] font-headings text-slate-300">
          {isInitialLoad ? 'INITIALIZING CORE...' : 'Routing Sequence Active'}
        </h3>
        <div className="w-full h-[1px] bg-slate-800 mt-6 rounded-full overflow-hidden">
          <div ref={barRef} className="h-full bg-[#0EA5E9] w-0" />
        </div>
        <span className="text-[8px] font-mono text-slate-600 mt-3 uppercase tracking-widest">
          {isInitialLoad ? 'SYS_KERNEL_LOAD // 100%' : 'SYS_ROUTE_CONNECTING // PORT_80_OK'}
        </span>
      </div>
    </div>
  );
}

export default function App() {
  return (
    <NavigationProvider>
      <AppContent />
    </NavigationProvider>
  );
}