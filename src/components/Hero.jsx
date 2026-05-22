import React, { useRef } from 'react';
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

  useGSAP(() => {
    const video = videoRef.current;
    if (!video) return;

    video.onloadedmetadata = () => {
      const scrollTl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "+=5000",
          scrub: true,
          pin: true,
        }
      });

      // Video scrub matching duration of text timeline
      scrollTl.to(video, { currentTime: video.duration, ease: "none", duration: 5 }, 0);

      // Text Dwell Times
      scrollTl.to({}, { duration: 0.5 })
        .addLabel("trans1")
        .to(heroBoxRef.current, { opacity: 0, y: -50, duration: 0.5 }, "trans1")
        .fromTo(sub1Ref.current, { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 0.5 }, "trans1")

        .to({}, { duration: 1 })
        .addLabel("trans2")
        .to(sub1Ref.current, { opacity: 0, y: -30, duration: 0.5 }, "trans2")
        .fromTo(sub2Ref.current, { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 0.5 }, "trans2")

        .to({}, { duration: 1 })
        .addLabel("trans3")
        .to(sub2Ref.current, { opacity: 0, y: -30, duration: 0.5 }, "trans3")
        .fromTo(blastTextRef.current, { opacity: 0, scale: 0.8 }, { opacity: 1, scale: 1, duration: 0.5 }, "trans3")

        .to({}, { duration: 1 });
    };
  });

  return (
    <section ref={sectionRef} className="w-full h-screen relative bg-[#0F172A] overflow-hidden">

      {/* Ensure you have optimized_scrub.mp4 in your public folder! */}
      <video
        ref={videoRef}
        src="/optimized_scrub.mp4"
        playsInline
        muted
        preload="auto"
        className="absolute inset-0 w-full h-full object-cover opacity-90"
      />

      <div className="absolute inset-0 w-full h-full flex flex-col items-center justify-center text-center px-4 pointer-events-none">

        {/* STOP 1 */}
        <div ref={heroBoxRef} className="absolute inset-0 flex items-center justify-start pointer-events-auto">
          <div className="w-full max-w-7xl mx-auto px-6 md:px-20 grid grid-cols-12 pointer-events-none">
            <div className="col-span-12 lg:col-span-6 text-left p-8 md:p-10 bg-white/60 backdrop-blur-[4px] border-l-4 border-[#0EA5E9] shadow-sm pointer-events-auto">
              <span className="text-xs font-bold uppercase tracking-[0.25em] text-[#0EA5E9] mb-4 block">System Integration & Precision Robotics</span>
              <h1 className="text-5xl md:text-7xl font-bold text-[#0F172A] mb-6 tracking-tight leading-[1.1] font-headings">
                Precision <br /> Redefined.
              </h1>
              <p className="text-slate-700 text-base md:text-lg max-w-md mb-10 leading-relaxed font-normal">
                We architect advanced, clean-room robotic solutions that eliminate manufacturing bottlenecks, scale throughput, and achieve absolute repeat accuracy.
              </p>
              <div className="flex items-center gap-4 text-xs font-bold tracking-[0.2em] uppercase text-[#0F172A]">
                <span className="w-12 h-[2px] bg-[#0F172A]"></span>
                Scroll to Deploy Sequence
              </div>
            </div>
          </div>
        </div>

        {/* STOP 2 */}
        <h2 ref={sub1Ref} className="absolute bottom-[20%] text-3xl md:text-5xl font-bold text-white drop-shadow-md tracking-wide font-headings opacity-0">
          Absolute accuracy at scale.
        </h2>

        {/* STOP 3 */}
        <h2 ref={sub2Ref} className="absolute bottom-[20%] text-3xl md:text-5xl font-bold text-white drop-shadow-md tracking-wide font-headings opacity-0">
          Connecting hardware to the digital twin.
        </h2>

        {/* STOP 4 */}
        <div ref={blastTextRef} className="absolute inset-0 flex flex-col items-center justify-center opacity-0">
          <h1 className="text-7xl md:text-[140px] font-black text-white drop-shadow-lg tracking-tighter leading-none font-headings">
            SYSTEM <br /><span className="text-slate-400">ONLINE.</span>
          </h1>
        </div>

      </div>
    </section>
  );
}