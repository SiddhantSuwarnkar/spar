import React, { useRef, useState, useEffect, Suspense } from 'react';
import { Canvas, useFrame, useThree, useLoader } from '@react-three/fiber';
import { OrbitControls, useGLTF, Center, useProgress } from '@react-three/drei';
import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader';
import * as THREE from 'three';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { Compass, ArrowDown, ChevronRight, CheckCircle2, ShieldCheck, Cpu, Database, Award } from 'lucide-react';
import { useNavigation } from '../context/NavigationContext';

gsap.registerPlugin(ScrollTrigger);

// Custom Error Boundary for 3D Model Loading
class ModelErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    console.error("Error loading model:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="flex flex-col items-center justify-center w-full h-full text-center p-8 bg-[#090E17] border border-red-500/20 rounded-md">
          <span className="text-red-500 font-bold mb-2 font-headings text-lg">WebGL Render Error</span>
          <span className="text-slate-400 text-sm font-mono max-w-sm">
            Failed to load the 3D model. Ensure the model files exist in the public directory.
          </span>
        </div>
      );
    }
    return this.props.children;
  }
}

// High-tech Preloader Overlay blocking the page until model is 100% loaded
function LoaderOverlay() {
  const { active, progress } = useProgress();
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    if (!active && progress === 100) {
      const timeout = setTimeout(() => setIsVisible(false), 800);
      return () => clearTimeout(timeout);
    } else {
      setIsVisible(true);
    }
  }, [active, progress]);

  if (!isVisible) return null;

  return (
    <div
      className={`fixed inset-0 z-[9999] bg-[#F0F9FF] flex flex-col items-center justify-center text-[#0F172A] select-none transition-opacity duration-700 ${!active && progress === 100 ? 'opacity-0 pointer-events-none' : 'opacity-100'
        }`}
    >
      <div className="absolute inset-0 bg-[linear-gradient(rgba(240,249,255,0.96),rgba(240,249,255,0.96)),repeating-linear-gradient(0deg,rgba(14,165,233,0.02)_0px,rgba(14,165,233,0.02)_1px,transparent_1px,transparent_4px)] pointer-events-none" style={{ backgroundSize: '100% 100%, 100% 8px' }} />

      <div className="relative z-10 flex flex-col items-center text-center max-w-sm w-full px-8">
        <div className="mb-8 relative flex items-center justify-center">
          <div className="w-16 h-16 border border-slate-200 rounded-full flex items-center justify-center animate-spin" style={{ animationDuration: '3s' }}>
            <div className="w-12 h-12 border-t-2 border-[#0EA5E9] border-r-transparent border-b-transparent border-l-transparent rounded-full animate-spin" style={{ animationDuration: '1s' }} />
          </div>
          <div className="absolute font-mono text-[9px] text-[#0EA5E9] font-bold uppercase tracking-widest animate-pulse">SPAR</div>
        </div>

        <h4 className="text-[10px] font-mono text-[#0EA5E9] uppercase tracking-[0.3em] mb-2 font-bold animate-pulse">
          INITIALIZING 3D ENGINE
        </h4>
        <h3 className="text-sm font-bold uppercase tracking-[0.2em] font-headings text-slate-700 mb-6">
          Buffering Robotic Assets...
        </h3>

        {/* Loading Progress Bar */}
        <div className="w-full h-[2px] bg-slate-200 rounded-full overflow-hidden relative">
          <div
            className="h-full bg-[#0EA5E9] transition-all duration-300 ease-out"
            style={{ width: `${progress}%` }}
          />
        </div>

        <span className="text-[10px] font-mono text-slate-600 mt-4 uppercase tracking-widest font-bold">
          {Math.round(progress)}% LOADED
        </span>
      </div>
    </div>
  );
}

// GLTF Model Component (Product 1: Assembly)
function RoboticArm({ onRobotRef }) {
  const { scene } = useGLTF('/scene.gltf');
  const robotRef = useRef();

  useEffect(() => {
    if (onRobotRef) onRobotRef(robotRef);
  }, [onRobotRef]);

  // Keep original colors/textures and apply shadows and materials
  useFrame(() => {
    if (!robotRef.current) return;

    scene.traverse((node) => {
      if (node.isMesh) {
        node.castShadow = true;
        node.receiveShadow = true;

        // Ensure materials are set to look high-end, preserving their base colors/textures
        if (node.material) {
          const name = node.name.toLowerCase();
          if (
            name.includes('joint') ||
            name.includes('axis') ||
            name.includes('shaft') ||
            name.includes('bearing') ||
            name.includes('chrome') ||
            name.includes('metal')
          ) {
            node.material.metalness = 0.95;
            node.material.roughness = 0.12;
          } else {
            node.material.metalness = 0.25;
            node.material.roughness = 0.35;
          }
        }
      }
    });
  });

  return <primitive ref={robotRef} object={scene} />;
}

// OBJ Model Component (Product 2: Welding)
function ObjRobot({ onRobotRef }) {
  const obj = useLoader(OBJLoader, '/OBJ_Robot.obj');
  const robotRef = useRef();

  useEffect(() => {
    if (onRobotRef) onRobotRef(robotRef);
  }, [onRobotRef]);

  // Hierarchical nesting & material styling setup
  useEffect(() => {
    if (!obj) return;

    // 1. Rebuild the flat OBJ groups into a nested kinematic tree
    const nodesMap = {};
    obj.traverse((node) => {
      if (node.isMesh || node.isGroup) {
        nodesMap[node.name] = node;
      }
    });

    // Sort name keys by length to process parents before children
    const sortedNames = Object.keys(nodesMap).sort((a, b) => a.length - b.length);

    sortedNames.forEach((name) => {
      const node = nodesMap[name];
      if (name.trim() === 'Robot') return; // root base stays at root

      const parts = name.trim().split(' ');
      if (parts.length > 1) {
        parts.pop();
        const parentName = parts.join(' ');
        const parentNode = nodesMap[parentName] || nodesMap[parentName + ' '];
        if (parentNode && parentNode !== node) {
          parentNode.add(node);
        }
      } else {
        const robotNode = nodesMap['Robot'] || nodesMap['Robot '];
        if (robotNode && node !== robotNode && node.parent === obj) {
          robotNode.add(node);
        }
      }
    });

    // 2. Set up high-end professional metallic dual-tone materials
    obj.traverse((node) => {
      if (node.isMesh) {
        node.castShadow = true;
        node.receiveShadow = true;

        const name = node.name.toLowerCase();
        node.material = new THREE.MeshStandardMaterial();

        if (
          name.includes('axis') ||
          name.includes('joint') ||
          name.includes('grasper') ||
          name.includes('head')
        ) {
          // Steel/Chrome joints
          node.material.color = new THREE.Color('#94a3b8');
          node.material.metalness = 0.9;
          node.material.roughness = 0.15;
        } else {
          // Sleek cleanroom light-grey plates
          node.material.color = new THREE.Color('#e2e8f0');
          node.material.metalness = 0.25;
          node.material.roughness = 0.35;
        }
      }
    });
  }, [obj]);

  // No active model joint animations to keep meshes from breaking

  return <primitive ref={robotRef} object={obj} />;
}

// Scene controller doing camera lerping and OrbitControl safety
function SceneContent({ proxy, isInteracting, setIsInteracting, modelId }) {
  const { camera } = useThree();
  const robotGroupRef = useRef();
  const robotMeshRef = useRef();
  const controlsRef = useRef();

  const interactionTimeoutRef = useRef(null);

  const handleStart = () => {
    setIsInteracting(true);
    if (interactionTimeoutRef.current) clearTimeout(interactionTimeoutRef.current);

    // Target OrbitControls to the robot's current offset position for clean local rotation
    if (controlsRef.current) {
      controlsRef.current.target.set(proxy.current.robotX, proxy.current.robotY + 0.2, proxy.current.robotZ);
      controlsRef.current.update();
    }
  };

  const handleEnd = () => {
    interactionTimeoutRef.current = setTimeout(() => {
      setIsInteracting(false);
    }, 1500);
  };

  useFrame(() => {
    if (!robotGroupRef.current) return;

    if (!isInteracting) {
      // Lerp camera position
      camera.position.x = THREE.MathUtils.lerp(camera.position.x, proxy.current.cameraX, 0.05);
      camera.position.y = THREE.MathUtils.lerp(camera.position.y, proxy.current.cameraY, 0.05);
      camera.position.z = THREE.MathUtils.lerp(camera.position.z, proxy.current.cameraZ, 0.05);

      // Lerp robot group parameters
      robotGroupRef.current.position.x = THREE.MathUtils.lerp(robotGroupRef.current.position.x, proxy.current.robotX, 0.06);
      robotGroupRef.current.position.y = THREE.MathUtils.lerp(robotGroupRef.current.position.y, proxy.current.robotY, 0.06);
      robotGroupRef.current.position.z = THREE.MathUtils.lerp(robotGroupRef.current.position.z, proxy.current.robotZ, 0.06);

      robotGroupRef.current.rotation.x = THREE.MathUtils.lerp(robotGroupRef.current.rotation.x, proxy.current.robotRotX, 0.06);
      robotGroupRef.current.rotation.y = THREE.MathUtils.lerp(robotGroupRef.current.rotation.y, proxy.current.robotRotY, 0.06);
      robotGroupRef.current.rotation.z = THREE.MathUtils.lerp(robotGroupRef.current.rotation.z, proxy.current.robotRotZ, 0.06);

      // Smooth look-at target matching the center of the viewport (x = 0)
      const targetLook = new THREE.Vector3(0, proxy.current.robotY + 0.2, 0);
      camera.lookAt(targetLook);

      // Keep OrbitControls synced to viewport center when scrolling
      if (controlsRef.current) {
        controlsRef.current.target.copy(targetLook);
        controlsRef.current.update();
      }
    }
  });

  const scale = modelId === 'welding' ? 0.055 : 4.4;

  return (
    <>
      <ambientLight intensity={1.2} color="#ffffff" />

      {/* Dynamic spotLight matching active phase colors */}
      <spotLight
        position={[4, 7, 3]}
        angle={0.65}
        penumbra={0.7}
        intensity={3.5}
        color={proxy.current.paintColor}
        castShadow
      />
      <directionalLight
        position={[-5, 6, 2]}
        intensity={3.2}
        color="#F8FAFC"
        castShadow
      />
      <directionalLight
        position={[5, 4, -4]}
        intensity={1.8}
        color="#ffffff"
      />

      <group ref={robotGroupRef} scale={[scale, scale, scale]}>
        <Suspense fallback={null}>
          <Center>
            {modelId === 'welding' ? (
              <ObjRobot
                onRobotRef={(ref) => { robotMeshRef.current = ref.current; }}
              />
            ) : (
              <RoboticArm
                onRobotRef={(ref) => { robotMeshRef.current = ref.current; }}
              />
            )}
          </Center>
        </Suspense>
      </group>

      <OrbitControls
        ref={controlsRef}
        onStart={handleStart}
        onEnd={handleEnd}
        enableZoom={true}
        maxDistance={7}
        minDistance={2}
        enablePan={false}
      />
    </>
  );
}

const pageContent = {
  assembly: {
    title: "High-Speed Robotic Assembly",
    subtitle: "Core Kinematics // Assembly Node",
    description: "A high-speed, high-precision industrial robotic arm. Designed with custom pneumatic end effectors and synchronized kinematics to handle complex electronics or heavy payloads in 24/7 manufacturing environments.",
    systemName: "SPAR-6X Assembly System",
    accuracyText: "EST. ACCURACY: ±0.02mm",
    specs1: [
      { label: "PAYLOAD LIMIT", value: "150.0 kg" },
      { label: "MAX REACH", value: "3,100 mm" },
      { label: "REPEATABILITY", value: "±0.02 mm" },
      { label: "ENCLOSURE INDEX", value: "IP67 Waterproof" }
    ],
    specs2: {
      title: "Engineering Kinematics",
      description: "Designed with synchronized kinematics and absolute encoders to perform high-speed repetitions with millimeter-exact precision. Perfect for complex electronics and assembly cells.",
      items: [
        { label: "Payload Capacity", value: "150.0 kg Max" },
        { label: "Max Reach Envelope", value: "3,100 mm Radius" },
        { label: "Pose Repeatability", value: "±0.02 mm" },
        { label: "Motion Envelopes", value: "6-Axis Articulated" },
        { label: "Base Joint Speed", value: "Up to 360°/sec" }
      ]
    },
    specs3: {
      title: "AI Diagnostics & Safety",
      description: "Equipped with deep-learning machine vision loops and dynamic collision monitoring. Allows safely working side-by-side with human operators in clean-rooms or hot foundries.",
      items: [
        { label: "Vision Engine", value: "NVIDIA Jetson AGX Orin" },
        { label: "Collision Avoidance", value: "Torque-Feedback safety" },
        { label: "Environmental Spec", value: "IP67 Waterproof" },
        { label: "Path Controller", value: "ROS2 / EtherCAT Loop" },
        { label: "HMI Protocols", value: "Modbus / TCP/IP" }
      ]
    },
    cta: {
      title: "Deploy Autonomous Kinematics",
      description: "Our engineering team architects custom end-effectors, safety gates, and digital twin environments. We coordinate live integration loops with 24/7 SLA guarantees."
    }
  },
  welding: {
    title: "Precision Robotic Welding",
    subtitle: "Thermal Precision // Welding Cell",
    description: "High-stress manufacturing welder delivering clean, consistent spot and seam welds. Features integrated path-tracking sensors and real-time heat compensation to minimize thermal distortion.",
    systemName: "SPAR-WELD Precision Welder",
    accuracyText: "EST. ACCURACY: ±0.04mm",
    specs1: [
      { label: "PAYLOAD LIMIT", value: "25.0 kg" },
      { label: "MAX REACH", value: "2,850 mm" },
      { label: "REPEATABILITY", value: "±0.04 mm" },
      { label: "ENCLOSURE INDEX", value: "IP65 Enclosure" }
    ],
    specs2: {
      title: "Welding Performance",
      description: "Engineered for high-stress manufacturing, delivering clean spot and seam welds on complex aerospace and automotive structural components.",
      items: [
        { label: "Torch Integration", value: "MIG / TIG / Laser Configurable" },
        { label: "Path Tracking", value: "Optical Seam Tracking (200Hz)" },
        { label: "Repeatability", value: "±0.04 mm Precision" },
        { label: "Payload Capacity", value: "25.0 kg Max" },
        { label: "Cooling System", value: "Liquid-Cooled Torch" }
      ]
    },
    specs3: {
      title: "Path Planning & AI Control",
      description: "Automated seam tracking and real-time current regulation. Compensates for metal expansion and thermal distortion dynamically during continuous welding arcs.",
      items: [
        { label: "Seam Tracking", value: "Laser profile scanner" },
        { label: "Feedback Loop", value: "EtherCAT at 125µs response" },
        { label: "HMI Interface", value: "15-inch Teach Pendant" },
        { label: "Weld Monitoring", value: "AI arc camera analyzer" },
        { label: "Safety System", value: "Dual-channel safety circuits" }
      ]
    },
    cta: {
      title: "Integrate Seam-Welding Cells",
      description: "Automate your heavy fabrication lines. Our teams deploy certified welding cells that comply with AWS D16.1 and ISO robotic standards."
    }
  }
};

export default function RoboticArmPage() {
  const { path, navigate } = useNavigation();
  const modelId = path === '/robotic-arm/welding' ? 'welding' : 'assembly';
  const content = pageContent[modelId];

  const pageContainerRef = useRef(null);
  const triggerRef = useRef(null);

  // Content Refs for GSAP Syncing
  const introLeftRef = useRef(null);
  const introRightRef = useRef(null);
  const specsLeftRef = useRef(null);
  const specsRightRef = useRef(null);
  const ctaLeftRef = useRef(null);
  const ctaRightRef = useRef(null);

  // States
  const [isInteracting, setIsInteracting] = useState(false);

  // 3D Scene Animation Proxy (using premium dark graphite slate-blue default color '#334155')
  const proxy = useRef({
    robotX: 0,
    robotY: -0.25,
    robotZ: 0,
    robotRotX: 0,
    robotRotY: 0,
    robotRotZ: 0,
    cameraX: 0,
    cameraY: 0.2,
    cameraZ: 4.8,
    paintColor: '#334155' // Slate Blue/Graphite Grey Start
  });

  // GSAP ScrollTrigger timeline configuration replicating vsdc-sr video trajectory
  useGSAP(() => {
    if (isInteracting) return; // Skip GSAP timeline values when user is dragging camera

    // Initialize initial opacities
    gsap.set([introLeftRef.current, introRightRef.current], { opacity: 1 });
    gsap.set([specsLeftRef.current, specsRightRef.current, ctaLeftRef.current, ctaRightRef.current], { opacity: 0 });

    const mainTimeline = gsap.timeline({
      scrollTrigger: {
        trigger: triggerRef.current,
        start: 'top top',
        end: 'bottom bottom',
        scrub: 1.2
      }
    });

    // Reset proxy initial state (Phase 1: Center)
    proxy.current.robotX = 0;
    proxy.current.robotY = -0.25;
    proxy.current.robotRotY = 0;
    proxy.current.cameraZ = 4.8;
    proxy.current.paintColor = '#334155'; // Slate blue/gray start

    // 1. Phase 1 (0% to 25% scroll): 360 Spin in Center
    // Fade out Phase 1 Left and Right cards as we leave this phase
    mainTimeline.to(proxy.current, {
      robotRotY: Math.PI * 2, // Rotate 360
      duration: 3.0,
      ease: 'none'
    });

    mainTimeline.to([introLeftRef.current, introRightRef.current], {
      opacity: 0,
      duration: 1.5,
      ease: 'power2.in'
    }, '-=1.2');

    // 2. Transition to Phase 2 (25% to 45% scroll): Slide RIGHT, specs LEFT
    mainTimeline.to(proxy.current, {
      robotX: 2.2, // Slide Right (matches video)
      robotRotY: Math.PI * 2.3, // Profile rotation
      paintColor: '#f1f5f9', // Professional Matte Cleanroom White
      cameraZ: 4.2, // Zoom slightly
      duration: 3.5,
      ease: 'power2.inOut'
    });

    // Fade in Specs Left exactly when robot settles on Right
    mainTimeline.to(specsLeftRef.current, {
      opacity: 1,
      duration: 2.0,
      ease: 'power2.out'
    }, '-=2.0');

    // Phase 2 Hold (45% to 55% scroll)
    mainTimeline.to(proxy.current, {
      robotRotY: Math.PI * 2.4,
      duration: 2,
      ease: 'none'
    });

    // 3. Transition from Right to Left (55% to 75% scroll):
    // First, fade out Specs Left
    mainTimeline.to(specsLeftRef.current, {
      opacity: 0,
      duration: 1.2,
      ease: 'power2.in'
    });

    // Sweep through center: Zoom Max! (Camera Z dips to 2.4 in the middle of transition)
    mainTimeline.to(proxy.current, {
      robotX: 0, // Cross center
      robotRotY: Math.PI * 2.85,
      paintColor: '#1e293b', // Deep Matte Steel Grey
      cameraZ: 2.4, // ZOOM MAX!
      duration: 2.5,
      ease: 'power2.in'
    }, '-=1.0');

    // Slide to Left and retreat (Camera Z shrinks back to 4.2 as it settles left)
    mainTimeline.to(proxy.current, {
      robotX: -2.2, // Settle on Left
      robotRotY: Math.PI * 3.35, // Opposite profile
      paintColor: '#475569', // Professional Graphite Casing (Slate Slate)
      cameraZ: 4.2, // Shrink back to normal zoom
      duration: 2.5,
      ease: 'power2.out'
    });

    // Fade in Specs Right exactly when robot settles on Left
    mainTimeline.to(specsRightRef.current, {
      opacity: 1,
      duration: 2.0,
      ease: 'power2.out'
    }, '-=2.0');

    // Phase 3 Hold (75% to 85% scroll)
    mainTimeline.to(proxy.current, {
      robotRotY: Math.PI * 3.45,
      duration: 2,
      ease: 'none'
    });

    // 4. Transition to Phase 4 (85% to 100% scroll): Slide back to CENTER, Split CTA overlays
    // First, fade out Specs Right
    mainTimeline.to(specsRightRef.current, {
      opacity: 0,
      duration: 1.2,
      ease: 'power2.in'
    });

    mainTimeline.to(proxy.current, {
      robotX: 0, // Slide back to Center
      robotY: -0.05, // Move slightly up
      robotRotY: Math.PI * 4.0, // Face front
      paintColor: '#334155', // Reset to standard graphite paint
      cameraZ: 3.6, // Zoom in
      duration: 3.5,
      ease: 'power2.inOut'
    }, '-=1.0');

    // Fade in Split CTA Cards (Left and Right)
    mainTimeline.to([ctaLeftRef.current, ctaRightRef.current], {
      opacity: 1,
      duration: 2.0,
      ease: 'power2.out'
    }, '-=1.5');
  }, { scope: pageContainerRef, dependencies: [isInteracting, modelId] });

  return (
    <main ref={pageContainerRef} className="w-full bg-[#0B0F19] text-slate-100 overflow-x-hidden relative font-sans">

      {/* 3D Model Loading Overlay */}
      <LoaderOverlay />

      {/* 3D Canvas Fixed Viewport */}
      <div className="fixed inset-0 w-full h-full z-10 pointer-events-none">
        <div className="w-full h-full pointer-events-auto">
          <ModelErrorBoundary>
            <Canvas
              camera={{ position: [0, 0.8, 4.8], fov: 45 }}
              shadows
            >
              <SceneContent
                proxy={proxy}
                isInteracting={isInteracting}
                setIsInteracting={setIsInteracting}
                modelId={modelId}
              />
            </Canvas>
          </ModelErrorBoundary>
        </div>
      </div>

      {/* Grid Scanning Lines Layer */}
      <div className="fixed inset-0 z-0 bg-[linear-gradient(rgba(11,15,25,0.96),rgba(11,15,25,0.96)),repeating-linear-gradient(0deg,rgba(14,165,233,0.015)_0px,rgba(14,165,233,0.015)_1px,transparent_1px,transparent_4px)] pointer-events-none" style={{ backgroundSize: '100% 100%, 100% 8px' }} />

      {/* Solutions Back Button (below Navbar) */}
      <div className="fixed top-28 left-6 md:left-24 z-20 pointer-events-auto">
        <button
          onClick={() => navigate('/solutions')}
          className="flex items-center gap-1.5 px-3.5 py-2 bg-[#0f172a]/95 hover:bg-[#0EA5E9]/20 border border-white/10 hover:border-[#0EA5E9] text-slate-300 hover:text-white font-mono text-[10px] font-bold tracking-wider uppercase transition-all duration-300 rounded-sm shadow-md cursor-pointer"
        >
          <span>← Back to Solutions</span>
        </button>
      </div>

      {/* Grab interaction warning */}
      {isInteracting && (
        <div className="fixed top-1/4 left-1/2 -translate-x-1/2 z-20 bg-amber-500/10 border border-amber-500/30 backdrop-blur-lg px-6 py-3 rounded-sm font-mono flex items-center gap-3 animate-fade-in shadow-lg select-none">
          <Compass className="text-amber-500 w-5 h-5 animate-spin" style={{ animationDuration: '5s' }} />
          <div className="flex flex-col">
            <span className="text-xs font-bold text-white uppercase tracking-wider">Manual Rotational Inspect</span>
            <span className="text-[9px] text-slate-400">Release mouse to snap back to narrative scroll coordinates.</span>
          </div>
        </div>
      )}

      {/* Fixed Specs & Content Overlay Container */}
      <div className="fixed inset-0 z-25 pointer-events-none select-none">

        {/* Phase 1 Left Card (Intro Heading) */}
        <div
          ref={introLeftRef}
          className="absolute left-6 md:left-24 top-1/2 -translate-y-1/2 w-full max-w-md bg-[#0f172a]/70 backdrop-blur-md border border-white/10 p-6 md:p-8 rounded-sm shadow-[0_20px_50px_rgba(0,0,0,0.6)] pointer-events-auto flex flex-col gap-4 opacity-100"
        >
          <span className="text-xs font-bold font-mono uppercase tracking-[0.3em] text-[#0EA5E9] mb-1">
            {content.subtitle}
          </span>
          <h1 className="text-4xl md:text-5xl font-black font-headings text-white tracking-tighter leading-tight">
            {content.title}
          </h1>
          <div className="w-12 h-[2px] bg-[#0EA5E9] my-2"></div>
          <p className="text-slate-400 text-xs leading-relaxed font-normal">
            {content.description}
          </p>
        </div>

        {/* Phase 1 Right Card (Intro Sub-specs) */}
        <div
          ref={introRightRef}
          className="absolute right-6 md:right-24 top-1/2 -translate-y-1/2 w-full max-w-sm bg-[#0f172a]/70 backdrop-blur-md border border-white/10 p-6 md:p-8 rounded-sm shadow-[0_20px_50px_rgba(0,0,0,0.6)] pointer-events-auto flex flex-col gap-4 opacity-100 font-mono text-xs"
        >
          <span className="text-[#0EA5E9] font-bold tracking-wider">// SYSTEM RUN PARAMETERS</span>
          <div className="flex flex-col gap-3 mt-2">
            {content.specs1.map((s, idx) => (
              <div key={idx} className="flex justify-between border-b border-white/5 pb-2">
                <span className="text-slate-500">{s.label}</span>
                <span className="text-white font-bold">{s.value}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Phase 2 Left specs card (Robot on Right) */}
        <div
          ref={specsLeftRef}
          className="absolute left-6 md:left-24 top-1/2 -translate-y-1/2 w-full max-w-md bg-[#0f172a]/70 backdrop-blur-md border border-white/10 p-6 md:p-8 rounded-sm shadow-[0_20px_50px_rgba(0,0,0,0.6)] pointer-events-auto flex flex-col gap-5 opacity-0"
        >
          <div className="flex justify-between items-start border-b border-white/10 pb-4">
            <div>
              <span className="text-[10px] font-mono font-bold tracking-widest text-[#10B981] uppercase block mb-1">SPECIFICATION GRID // 01</span>
              <h2 className="text-2xl font-bold font-headings text-white">{content.specs2.title}</h2>
            </div>
            <ShieldCheck className="text-[#10B981] w-6 h-6 shrink-0" />
          </div>

          <p className="text-slate-300 text-xs leading-relaxed font-normal">
            {content.specs2.description}
          </p>

          <div className="flex flex-col gap-2.5 font-mono text-xs">
            {content.specs2.items.map((s, idx) => (
              <div key={idx} className={`flex justify-between items-center ${idx === content.specs2.items.length - 1 ? '' : 'border-b border-white/5 pb-2'}`}>
                <span className="text-[10px] text-slate-500 uppercase tracking-wider">{s.label}</span>
                <span className={`text-sm font-bold ${s.label.toLowerCase().includes('accuracy') || s.label.toLowerCase().includes('repeat') ? 'text-[#10B981]' : 'text-white'}`}>{s.value}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Phase 3 Right specs card (Robot on Left) */}
        <div
          ref={specsRightRef}
          className="absolute right-6 md:right-24 top-1/2 -translate-y-1/2 w-full max-w-md bg-[#0f172a]/70 backdrop-blur-md border border-white/10 p-6 md:p-8 rounded-sm shadow-[0_20px_50px_rgba(0,0,0,0.6)] pointer-events-auto flex flex-col gap-5 opacity-0"
        >
          <div className="flex justify-between items-start border-b border-white/10 pb-4">
            <div>
              <span className="text-[10px] font-mono font-bold tracking-widest text-[#f97316] uppercase block mb-1">INTEGRATION METRICS // 02</span>
              <h2 className="text-2xl font-bold font-headings text-white">{content.specs3.title}</h2>
            </div>
            <Cpu className="text-[#f97316] w-6 h-6 shrink-0 animate-pulse" />
          </div>

          <p className="text-slate-300 text-xs leading-relaxed font-normal">
            {content.specs3.description}
          </p>

          <div className="flex flex-col gap-2.5 font-mono text-xs">
            {content.specs3.items.map((s, idx) => (
              <div key={idx} className={`flex justify-between items-center ${idx === content.specs3.items.length - 1 ? '' : 'border-b border-white/5 pb-2'}`}>
                <span className="text-[10px] text-slate-500 uppercase tracking-wider">{s.label}</span>
                <span className={`text-sm font-bold ${s.label.toLowerCase().includes('hmi') || s.label.toLowerCase().includes('cooling') || s.label.toLowerCase().includes('torch') ? 'text-[#f97316]' : 'text-white'}`}>{s.value}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Phase 4 Split CTA Left Card (Text details) */}
        <div
          ref={ctaLeftRef}
          className="absolute left-6 md:left-24 top-1/2 -translate-y-1/2 w-full max-w-md bg-[#0f172a]/70 backdrop-blur-md border border-white/10 p-6 md:p-8 rounded-sm shadow-[0_20px_50px_rgba(0,0,0,0.6)] pointer-events-auto flex flex-col gap-4 opacity-0"
        >
          <span className="text-[10px] font-mono font-bold tracking-widest text-[#0ea5e9] uppercase">// INTEGRATION READY</span>
          <h2 className="text-3xl font-bold font-headings text-white">{content.cta.title}</h2>
          <p className="text-slate-300 text-xs leading-relaxed font-normal">
            {content.cta.description}
          </p>
        </div>

        {/* Phase 4 Split CTA Right Card (Buttons & Badges) */}
        <div
          ref={ctaRightRef}
          className="absolute right-6 md:right-24 top-1/2 -translate-y-1/2 w-full max-w-md bg-[#0f172a]/70 backdrop-blur-md border border-white/10 p-6 md:p-8 rounded-sm shadow-[0_20px_50px_rgba(0,0,0,0.6)] pointer-events-auto flex flex-col gap-6 opacity-0"
        >
          <div className="flex flex-col gap-3 font-mono text-[10px] text-slate-400">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="text-[#0ea5e9] w-4 h-4 shrink-0" />
              <span>100-Hour Lab Stress Test</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="text-[#0ea5e9] w-4 h-4 shrink-0" />
              <span>Custom CAD End-Effectors</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="text-[#0ea5e9] w-4 h-4 shrink-0" />
              <span>ISO 9001/10218 Compliant</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="text-[#0ea5e9] w-4 h-4 shrink-0" />
              <span>24/7 Remote VPN SLA</span>
            </div>
          </div>

          <div className="flex flex-col gap-3 mt-2">
            <button
              onClick={() => navigate('/contact')}
              className="w-full bg-gradient-to-b from-[#0EA5E9] to-[#0284c7] text-white hover:from-white hover:to-slate-100 hover:text-slate-900 py-3 rounded-sm text-xs font-bold tracking-widest uppercase transition-all duration-300 shadow-md font-mono flex items-center justify-center gap-2 group"
            >
              <span>Request Consultation</span>
              <ChevronRight size={14} className="group-hover:translate-x-1 transition-transform" />
            </button>
            <button
              onClick={() => navigate('/solutions')}
              className="w-full bg-slate-800/50 hover:bg-slate-700/50 border border-white/10 text-white py-3 rounded-sm text-xs font-bold tracking-widest uppercase transition-all duration-300 shadow-sm font-mono"
            >
              View Capabilities
            </button>
          </div>
        </div>

      </div>

      {/* Pinned Scroll Track (400vh Height) */}
      <div ref={triggerRef} className="relative z-30 w-full min-h-[400vh] flex flex-col">

        {/* Phase 1: Center Spin (0vh - 100vh) */}
        <section className="relative h-screen w-full flex items-center justify-center pointer-events-none">
          <div className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 animate-bounce pointer-events-auto select-none">
            <span className="text-[10px] font-mono tracking-widest text-[#0EA5E9] uppercase font-bold">Scroll to Calibrate & Inspect</span>
            <ArrowDown size={18} className="text-[#0EA5E9]" />
          </div>
        </section>

        {/* Phase 2: Slide RIGHT (100vh - 200vh) - Content handled by fixed overlays */}
        <section className="relative h-screen w-full pointer-events-none" />

        {/* Phase 3: Slide LEFT (200vh - 300vh) - Content handled by fixed overlays */}
        <section className="relative h-screen w-full pointer-events-none" />

        {/* Phase 4: Slide CENTER CTA (300vh - 400vh) - Content handled by fixed overlays */}
        <section className="relative h-screen w-full pointer-events-none" />

      </div>

    </main>
  );
}
