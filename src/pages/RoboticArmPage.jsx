import React, { useRef, useState, useEffect, Suspense } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { OrbitControls, useGLTF, Line } from '@react-three/drei';
import * as THREE from 'three';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { Cpu, ShieldCheck, Activity, Compass, Zap, ArrowDown, HelpCircle } from 'lucide-react';
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

// 3D Model Subcomponent
function RoboticArm({ proxy, onRobotRef }) {
  const { scene } = useGLTF('/scene.gltf');
  const robotRef = useRef();

  useEffect(() => {
    if (onRobotRef) onRobotRef(robotRef);
  }, [onRobotRef]);

  // Adjust material colors based on scroll proxy values
  useFrame(() => {
    if (!robotRef.current) return;

    const activeColor = new THREE.Color(proxy.current.paintColor);
    scene.traverse((node) => {
      if (node.isMesh) {
        node.castShadow = true;
        node.receiveShadow = true;
        
        const name = node.name.toLowerCase();
        // Dynamic paint color injection on robot body panels
        if (
          name.includes('body') || 
          name.includes('arm') || 
          name.includes('link') || 
          name.includes('base') ||
          name.includes('housing')
        ) {
          if (node.material) {
            node.material.color.lerp(activeColor, 0.1);
          }
        }
      }
    });
  });

  return (
    <primitive 
      ref={robotRef}
      object={scene} 
      scale={[1.8, 1.8, 1.8]} 
      position={[0, -1.2, 0]} 
    />
  );
}

// Glowing 3D Orb Component
function FloatingOrb({ proxy }) {
  const orbRef = useRef();
  const pointLightRef = useRef();

  useFrame((state) => {
    if (!orbRef.current) return;

    // Follow proxy coordinates
    orbRef.current.position.x = THREE.MathUtils.lerp(orbRef.current.position.x, proxy.current.orbX, 0.1);
    orbRef.current.position.y = THREE.MathUtils.lerp(orbRef.current.position.y, proxy.current.orbY, 0.1);
    orbRef.current.position.z = THREE.MathUtils.lerp(orbRef.current.position.z, proxy.current.orbZ, 0.1);

    // Subtle sinusoidal floating micro-movement
    const time = state.clock.getElapsedTime();
    orbRef.current.position.y += Math.sin(time * 3) * 0.003;

    // Set dynamic color
    const color = new THREE.Color(proxy.current.orbColor);
    if (orbRef.current.material) {
      orbRef.current.material.color.lerp(color, 0.1);
      orbRef.current.material.emissive.lerp(color, 0.1);
    }
    if (pointLightRef.current) {
      pointLightRef.current.color.lerp(color, 0.1);
    }
  });

  return (
    <mesh ref={orbRef}>
      <sphereGeometry args={[0.07, 32, 32]} />
      <meshPhysicalMaterial 
        roughness={0.1}
        metalness={0.1}
        clearcoat={1.0}
        emissiveIntensity={3.5}
      />
      <pointLight 
        ref={pointLightRef}
        intensity={3.5} 
        distance={4} 
        decay={2}
        castShadow
      />
    </mesh>
  );
}

// Scene controller doing camera lerping and OrbitControl safety
function SceneContent({ proxy, isInteracting, setIsInteracting }) {
  const { camera } = useThree();
  const robotGroupRef = useRef();
  const robotMeshRef = useRef();
  const controlsRef = useRef();
  
  const interactionTimeoutRef = useRef(null);

  const handleStart = () => {
    setIsInteracting(true);
    if (interactionTimeoutRef.current) clearTimeout(interactionTimeoutRef.current);
  };

  const handleEnd = () => {
    interactionTimeoutRef.current = setTimeout(() => {
      setIsInteracting(false);
    }, 2000);
  };

  useFrame(() => {
    if (!robotGroupRef.current) return;

    if (!isInteracting) {
      // Lerp camera position
      camera.position.x = THREE.MathUtils.lerp(camera.position.x, proxy.current.cameraX, 0.05);
      camera.position.y = THREE.MathUtils.lerp(camera.position.y, proxy.current.cameraY, 0.05);
      camera.position.z = THREE.MathUtils.lerp(camera.position.z, proxy.current.cameraZ, 0.05);

      // Lerp robot group parameters
      robotGroupRef.current.position.x = THREE.MathUtils.lerp(robotGroupRef.current.position.x, proxy.current.robotX, 0.08);
      robotGroupRef.current.position.y = THREE.MathUtils.lerp(robotGroupRef.current.position.y, proxy.current.robotY, 0.08);
      robotGroupRef.current.position.z = THREE.MathUtils.lerp(robotGroupRef.current.position.z, proxy.current.robotZ, 0.08);

      robotGroupRef.current.rotation.x = THREE.MathUtils.lerp(robotGroupRef.current.rotation.x, proxy.current.robotRotX, 0.08);
      robotGroupRef.current.rotation.y = THREE.MathUtils.lerp(robotGroupRef.current.rotation.y, proxy.current.robotRotY, 0.08);
      robotGroupRef.current.rotation.z = THREE.MathUtils.lerp(robotGroupRef.current.rotation.z, proxy.current.robotRotZ, 0.08);

      // Smooth look-at target matching robot's active center
      const targetLook = new THREE.Vector3(proxy.current.robotX, proxy.current.robotY + 0.6, proxy.current.robotZ);
      camera.lookAt(targetLook);

      // Keep OrbitControls synced
      if (controlsRef.current) {
        controlsRef.current.target.copy(targetLook);
        controlsRef.current.update();
      }
    }
  });

  // Calculate tip point for laser line dynamically
  const [tipPos, setTipPos] = useState([0, 0, 0]);
  const [orbPos, setOrbPos] = useState([0, 0, 0]);

  useFrame(() => {
    if (!robotGroupRef.current) return;
    
    // Approx robot effector tip coordinates relative to group positioning
    const localTip = new THREE.Vector3(0, 0.8, 0.3);
    localTip.applyMatrix4(robotGroupRef.current.matrixWorld);
    
    setTipPos([localTip.x, localTip.y, localTip.z]);

    // Track real orb world position
    setOrbPos([proxy.current.orbX, proxy.current.orbY, proxy.current.orbZ]);
  });

  return (
    <>
      <ambientLight intensity={0.5} color="#0f172a" />
      
      {/* Dynamic colorful spotlight reacting to scroll colors */}
      <spotLight 
        position={[2, 6, 3]} 
        angle={0.6} 
        penumbra={0.8} 
        intensity={3} 
        color={proxy.current.orbColor} 
        castShadow 
      />
      <directionalLight 
        position={[-4, 5, 2]} 
        intensity={1.5} 
        color="#F8FAFC" 
        castShadow
      />

      <group ref={robotGroupRef}>
        <Suspense fallback={null}>
          <RoboticArm 
            proxy={proxy} 
            onRobotRef={(ref) => { robotMeshRef.current = ref.current; }} 
          />
        </Suspense>
      </group>

      <FloatingOrb proxy={proxy} />

      {/* Laser path planner tracking line */}
      <Line 
        points={[tipPos, orbPos]} 
        color={proxy.current.orbColor} 
        lineWidth={1.5}
        transparent
        opacity={0.65}
      />

      <OrbitControls 
        ref={controlsRef}
        onStart={handleStart}
        onEnd={handleEnd}
        enableZoom={true}
        maxDistance={8}
        minDistance={2}
        enablePan={false}
      />
    </>
  );
}

export default function RoboticArmPage() {
  const { navigate } = useNavigation();
  const pageContainerRef = useRef(null);
  const triggerRef = useRef(null);

  // States
  const [isInteracting, setIsInteracting] = useState(false);
  const [terminalLogs, setTerminalLogs] = useState([
    "SYS_CORE // INITIATING BOOT SEQUENCE",
    "RESOLVING KINEMATIC COEFFICIENTS... DONE",
    "6-AXIS COORDINATE MAP LOADED: 100% OK",
    "LASER ENCODER: ONLINE (0.02mm CALIBRATED)",
    "SAFETY BOUNDARY FIELD: ENGAGED [ACTIVE]"
  ]);
  const [activePhase, setActivePhase] = useState(0); // 0 = Center, 1 = Left, 2 = Right
  const [telemetry, setTelemetry] = useState({
    joint1: 0,
    joint2: -45,
    joint3: 90,
    joint4: 0,
    joint5: 45,
    joint6: 0,
    speed: 0,
    load: 12.4
  });

  // 3D Scene Animation Proxy
  const proxy = useRef({
    robotX: 0,
    robotY: -0.6,
    robotZ: 0,
    robotRotX: 0,
    robotRotY: 0,
    robotRotZ: 0,
    cameraX: 0,
    cameraY: 0.8,
    cameraZ: 4.8,
    orbX: 0.2,
    orbY: 0.8,
    orbZ: 0.5,
    orbColor: '#0EA5E9',
    paintColor: '#64748B' // slate-500 default
  });

  // Simulated live telemetry loop
  useEffect(() => {
    const timer = setInterval(() => {
      // Small jitter to simulate live sensors
      setTelemetry(prev => {
        const speedBase = activePhase === 0 ? 120 : activePhase === 1 ? 45 : 85;
        const loadBase = activePhase === 0 ? 0 : activePhase === 1 ? 3.5 : 14.8;
        return {
          joint1: Math.floor(proxy.current.robotRotY * (180 / Math.PI)) % 360,
          joint2: Math.floor(-45 + Math.sin(Date.now() * 0.002) * 5),
          joint3: Math.floor(90 + Math.cos(Date.now() * 0.001) * 8),
          joint4: Math.floor(Math.sin(Date.now() * 0.003) * 15),
          joint5: Math.floor(45 + Math.sin(Date.now() * 0.001) * 6),
          joint6: Math.floor(Date.now() * 0.05) % 360,
          speed: Math.floor(speedBase + Math.sin(Date.now() * 0.005) * 5),
          load: parseFloat((loadBase + Math.cos(Date.now() * 0.002) * 0.2).toFixed(1))
        };
      });

      // Add a dynamic log occasionally
      if (Math.random() > 0.8) {
        const events = [
          "JOINT_TORQUE_MONITOR // VOLTAGE NORMAL",
          "AI_VISION_MODULE // OPTICAL FEED REFRESH",
          "COLLISION_AVOIDANCE // RADAR ACTIVE",
          "TCP_LOCK // COORDINATES SYNCED",
          "ETHERCAT_SPEED // 1000 Mbps SYNCHRONIZED"
        ];
        const randomEvent = events[Math.floor(Math.random() * events.length)];
        const timeStr = new Date().toLocaleTimeString();
        setTerminalLogs(prev => [...prev.slice(-4), `[${timeStr}] ${randomEvent}`]);
      }
    }, 150);

    return () => clearInterval(timer);
  }, [activePhase]);

  // GSAP ScrollTrigger timeline configuration
  useGSAP(() => {
    if (isInteracting) return; // Skip GSAP timeline values when user is dragging

    const mainTimeline = gsap.timeline({
      scrollTrigger: {
        trigger: triggerRef.current,
        start: 'top top',
        end: 'bottom bottom',
        scrub: 1.5,
        onUpdate: (self) => {
          // Identify phase for HUD & telemetry states
          const prog = self.progress;
          if (prog < 0.28) {
            setActivePhase(0);
          } else if (prog >= 0.28 && prog < 0.65) {
            setActivePhase(1);
          } else {
            setActivePhase(2);
          }
        }
      }
    });

    // Reset proxy initially
    proxy.current.paintColor = '#38bdf8'; // bright cyber-blue start

    // Phase 1 to Phase 2: Centered 360 spin
    mainTimeline.to(proxy.current, {
      robotRotY: Math.PI * 2, // Spin 360
      orbX: 0.8,
      orbY: 1.2,
      orbZ: 0.2,
      duration: 3,
      ease: 'none'
    });

    // Transition to Phase 2: Glide Left, specs appear right
    mainTimeline.to(proxy.current, {
      robotX: -1.8,
      robotRotY: Math.PI * 2.25, // Turn side-profile
      cameraX: -0.2,
      cameraZ: 4.0,
      paintColor: '#ffffff', // Clean sterile white paint
      orbX: -1.8, // Follow effector tip to the left
      orbY: 0.4,
      orbZ: 0.3,
      orbColor: '#10B981', // green for safety/precision highlight
      duration: 3,
      ease: 'power2.inOut'
    });

    // Wait region in Left specs
    mainTimeline.to(proxy.current, {
      robotRotY: Math.PI * 2.35,
      duration: 2,
      ease: 'none'
    });

    // Transition to Phase 3: Glide Right, details appear left
    mainTimeline.to(proxy.current, {
      robotX: 1.8,
      robotRotY: Math.PI * 3.3, // Face alternative direction
      cameraX: 0.2,
      cameraZ: 4.4,
      paintColor: '#f97316', // Electric industrial orange
      orbX: 1.8, // Follow tip to the right
      orbY: 0.5,
      orbZ: 0.2,
      orbColor: '#F97316', // Orange matching payload glow
      duration: 3,
      ease: 'power2.inOut'
    });

    // Wait region in Right specs
    mainTimeline.to(proxy.current, {
      robotRotY: Math.PI * 3.5,
      duration: 2,
      ease: 'none'
    });
  }, { scope: pageContainerRef, dependencies: [isInteracting] });

  return (
    <main ref={pageContainerRef} className="w-full bg-[#090E17] text-slate-100 overflow-x-hidden relative font-sans">
      
      {/* 3D Canvas Background Container */}
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
              />
            </Canvas>
          </ModelErrorBoundary>
        </div>
      </div>

      {/* Grid Scanning Lines & Sci-Fi Background Layer */}
      <div className="fixed inset-0 z-0 bg-[linear-gradient(rgba(15,23,42,0.95),rgba(15,23,42,0.95)),repeating-linear-gradient(0deg,rgba(14,165,233,0.02)_0px,rgba(14,165,233,0.02)_1px,transparent_1px,transparent_4px)] pointer-events-none" style={{ backgroundSize: '100% 100%, 100% 8px' }} />

      {/* Futuristic Telemetry HUD Overlay */}
      <div className="fixed inset-0 z-20 pointer-events-none select-none flex flex-col justify-between p-6 md:p-8">
        
        {/* Top Header Panel */}
        <div className="flex justify-between items-start w-full">
          {/* Node details */}
          <div className="bg-[#0f172a]/70 backdrop-blur-md border border-white/10 px-4 py-2 rounded-sm font-mono flex flex-col gap-0.5">
            <span className="text-[10px] text-[#0EA5E9] font-bold tracking-[0.25em]">// KINEMATIC NODE CORE</span>
            <span className="text-sm font-bold text-white uppercase tracking-wider font-headings">SPAR-6X Articulated System</span>
            <div className="flex items-center gap-2 mt-1">
              <span className={`w-1.5 h-1.5 rounded-full ${isInteracting ? 'bg-amber-500 animate-ping' : 'bg-emerald-500 animate-pulse'}`} />
              <span className="text-[8px] text-slate-400 font-bold uppercase tracking-wider">
                {isInteracting ? 'MANUAL OVERRIDE MOD' : 'NARRATIVE AUTOPILOT'}
              </span>
            </div>
          </div>

          {/* Uptime and status */}
          <div className="bg-[#0f172a]/70 backdrop-blur-md border border-white/10 px-4 py-2 rounded-sm font-mono text-right flex flex-col gap-0.5">
            <span className="text-[10px] text-emerald-400 font-bold tracking-[0.2em]">SYS_CALIBRATED // ONLINE</span>
            <span className="text-xs font-bold text-slate-300">EST. CYCLE EXP: 99.8%</span>
            <span className="text-[8px] text-slate-500 font-bold tracking-widest mt-0.5">PORT_80_OK // TELEM_UP</span>
          </div>
        </div>

        {/* Center Hint Alert when User starts dragging */}
        {isInteracting && (
          <div className="absolute top-1/4 left-1/2 -translate-x-1/2 bg-amber-500/10 border border-amber-500/30 backdrop-blur-lg px-6 py-3 rounded-sm font-mono flex items-center gap-3 animate-fade-in shadow-lg">
            <Compass className="text-amber-500 w-5 h-5 animate-spin" style={{ animationDuration: '6s' }} />
            <div className="flex flex-col">
              <span className="text-xs font-bold text-white uppercase tracking-wider">Free Inspect Mode</span>
              <span className="text-[9px] text-slate-400">Release mouse to snap back to narrative scroll path.</span>
            </div>
          </div>
        )}

        {/* Bottom Panel: Telemetry Dashboard & Logs */}
        <div className="flex flex-col md:flex-row justify-between items-end gap-6 w-full">
          {/* Logs terminal */}
          <div className="bg-[#0f172a]/80 backdrop-blur-md border border-white/10 p-4 rounded-sm font-mono text-[9px] text-slate-400 w-full max-w-sm flex flex-col gap-1 shadow-2xl pointer-events-auto">
            <span className="text-[#0EA5E9] font-bold border-b border-white/10 pb-1.5 mb-1 tracking-wider uppercase block">// DIAGNOSTIC SEQUENCE FEED</span>
            {terminalLogs.map((log, i) => (
              <div key={i} className="flex gap-2 items-center">
                <span className="text-slate-600 shrink-0 font-bold">»</span>
                <span className={`truncate font-semibold ${log.includes('ACTIVE') || log.includes('OK') ? 'text-emerald-400' : log.includes('BOO') ? 'text-[#0EA5E9]' : 'text-slate-300'}`}>{log}</span>
              </div>
            ))}
          </div>

          {/* Telemetry Matrix Grid */}
          <div className="bg-[#0f172a]/85 backdrop-blur-md border border-white/10 p-4 rounded-sm font-mono w-full max-w-md shadow-2xl flex flex-col gap-3">
            <span className="text-[#0EA5E9] font-bold text-[9px] border-b border-white/10 pb-1.5 tracking-wider uppercase block flex justify-between">
              <span>// REAL-TIME KINEMATICS MATRIX</span>
              <span className="text-slate-500">6-AXIS TELEMETRY</span>
            </span>

            {/* Matrix Data */}
            <div className="grid grid-cols-3 gap-2">
              <div className="bg-white/5 border border-white/5 p-2 rounded-sm flex flex-col gap-0.5">
                <span className="text-[7px] text-slate-500 font-bold uppercase tracking-wider">J1 BASE ROT</span>
                <span className="text-xs font-bold text-slate-200">{telemetry.joint1}°</span>
              </div>
              <div className="bg-white/5 border border-white/5 p-2 rounded-sm flex flex-col gap-0.5">
                <span className="text-[7px] text-slate-500 font-bold uppercase tracking-wider">J2 SHOULDER</span>
                <span className="text-xs font-bold text-slate-200">{telemetry.joint2}°</span>
              </div>
              <div className="bg-white/5 border border-white/5 p-2 rounded-sm flex flex-col gap-0.5">
                <span className="text-[7px] text-slate-500 font-bold uppercase tracking-wider">J3 ELBOW</span>
                <span className="text-xs font-bold text-slate-200">{telemetry.joint3}°</span>
              </div>
              <div className="bg-white/5 border border-white/5 p-2 rounded-sm flex flex-col gap-0.5">
                <span className="text-[7px] text-slate-500 font-bold uppercase tracking-wider">J4 ROLL</span>
                <span className="text-xs font-bold text-slate-200">{telemetry.joint4}°</span>
              </div>
              <div className="bg-white/5 border border-white/5 p-2 rounded-sm flex flex-col gap-0.5">
                <span className="text-[7px] text-slate-500 font-bold uppercase tracking-wider">J5 PITCH</span>
                <span className="text-xs font-bold text-slate-200">{telemetry.joint5}°</span>
              </div>
              <div className="bg-white/5 border border-white/5 p-2 rounded-sm flex flex-col gap-0.5">
                <span className="text-[7px] text-slate-500 font-bold uppercase tracking-wider">J6 ROLL EFF</span>
                <span className="text-xs font-bold text-slate-200">{telemetry.joint6}°</span>
              </div>
            </div>

            {/* Speed & Load Gauges */}
            <div className="flex gap-4 border-t border-white/5 pt-2">
              <div className="flex-1 flex flex-col gap-1">
                <div className="flex justify-between text-[8px] text-slate-500 font-bold">
                  <span>JOINT VELOCITY</span>
                  <span className="text-white">{telemetry.speed}°/s</span>
                </div>
                <div className="w-full h-1 bg-slate-800 rounded-full overflow-hidden">
                  <div className="h-full bg-[#0EA5E9] transition-all duration-150" style={{ width: `${(telemetry.speed / 200) * 100}%` }} />
                </div>
              </div>
              <div className="flex-1 flex flex-col gap-1">
                <div className="flex justify-between text-[8px] text-slate-500 font-bold">
                  <span>ACTIVE PAYLOAD</span>
                  <span className="text-[#0EA5E9]">{telemetry.load} kg</span>
                </div>
                <div className="w-full h-1 bg-slate-800 rounded-full overflow-hidden">
                  <div className="h-full bg-emerald-500 transition-all duration-150" style={{ width: `${(telemetry.load / 25) * 100}%` }} />
                </div>
              </div>
            </div>
          </div>
        </div>

      </div>

      {/* Main Scroll Trigger Section (300vh Scroll Length) */}
      <div ref={triggerRef} className="relative z-30 w-full min-h-[300vh] flex flex-col">
        
        {/* Phase 1: Intro (0vh - 100vh) */}
        <section className="relative h-screen w-full flex items-center justify-center pointer-events-none">
          <div className="max-w-4xl text-center px-6 relative z-10 flex flex-col items-center select-none">
            <span className="text-xs font-bold font-mono uppercase tracking-[0.3em] text-[#0EA5E9] mb-4 bg-[#0f172a]/60 backdrop-blur-md px-4 py-1.5 border border-white/5 rounded-sm pointer-events-auto">
              System Demonstration // Core Kinematics
            </span>
            <h1 className="text-5xl sm:text-6xl md:text-8xl font-black font-headings text-white tracking-tighter leading-[1.1] pb-4 drop-shadow-[0_10px_20px_rgba(0,0,0,0.8)]">
              6-Axis Industrial <br /> Precision.
            </h1>
            <p className="text-slate-400 text-sm md:text-base max-w-xl mx-auto leading-relaxed mb-8 drop-shadow-[0_4px_10px_rgba(0,0,0,0.8)]">
              Engineered for continuous peak throughput in high-stress assembly environments. Drag anywhere to orbit, and scroll down to calibrate system configurations and review engineering metrics.
            </p>
            <div className="flex flex-col items-center gap-2 animate-bounce mt-4 pointer-events-auto">
              <span className="text-[10px] font-mono tracking-widest text-[#0EA5E9] uppercase font-bold">Scroll to Initiate</span>
              <ArrowDown size={18} className="text-[#0EA5E9]" />
            </div>
          </div>
        </section>

        {/* Phase 2: Glide Left, Specs on Right (100vh - 200vh) */}
        <section className="relative h-screen w-full flex items-center justify-end px-6 md:px-24 pointer-events-none">
          
          <div className="w-full max-w-md bg-[#0f172a]/60 backdrop-blur-md border border-white/10 p-6 md:p-8 rounded-sm shadow-[0_20px_50px_rgba(0,0,0,0.5)] pointer-events-auto flex flex-col gap-6 transform translate-y-0 opacity-100">
            <div className="flex justify-between items-start border-b border-white/10 pb-4">
              <div>
                <span className="text-[10px] font-mono font-bold tracking-widest text-[#10B981] uppercase block mb-1">SPECIFICATION TABLE // 01</span>
                <h2 className="text-2xl font-bold font-headings text-white">Engineering Kinematics</h2>
              </div>
              <ShieldCheck className="text-[#10B981] w-6 h-6" />
            </div>

            <p className="text-slate-300 text-xs leading-relaxed">
              Designed with synchronized kinematics and absolute encoders to perform high-speed repetitions with millimeter-exact precision. Perfect for complex electronics and assembly cells.
            </p>

            <div className="flex flex-col gap-3 font-mono">
              <div className="flex justify-between items-center border-b border-white/5 pb-2">
                <span className="text-[10px] text-slate-500 uppercase tracking-wider">Payload Rating</span>
                <span className="text-sm font-bold text-white">15.0 kg Max</span>
              </div>
              <div className="flex justify-between items-center border-b border-white/5 pb-2">
                <span className="text-[10px] text-slate-500 uppercase tracking-wider">Max Envelope Reach</span>
                <span className="text-sm font-bold text-white">1,450 mm Radius</span>
              </div>
              <div className="flex justify-between items-center border-b border-white/5 pb-2">
                <span className="text-[10px] text-slate-500 uppercase tracking-wider">Pose Repeatability</span>
                <span className="text-sm font-bold text-[#10B981] font-semibold">±0.02 mm</span>
              </div>
              <div className="flex justify-between items-center border-b border-white/5 pb-2">
                <span className="text-[10px] text-slate-500 uppercase tracking-wider">Motion Envelope</span>
                <span className="text-sm font-bold text-white">6-Axis Articulated</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-[10px] text-slate-500 uppercase tracking-wider">Base Joint Speed</span>
                <span className="text-sm font-bold text-white">Up to 360°/sec</span>
              </div>
            </div>
          </div>

        </section>

        {/* Phase 3: Glide Right, Specs on Left (200vh - 300vh) */}
        <section className="relative h-screen w-full flex items-center justify-start px-6 md:px-24 pointer-events-none">
          
          <div className="w-full max-w-md bg-[#0f172a]/65 backdrop-blur-md border border-white/10 p-6 md:p-8 rounded-sm shadow-[0_20px_50px_rgba(0,0,0,0.5)] pointer-events-auto flex flex-col gap-6 transform translate-y-0 opacity-100">
            <div className="flex justify-between items-start border-b border-white/10 pb-4">
              <div>
                <span className="text-[10px] font-mono font-bold tracking-widest text-[#f97316] uppercase block mb-1">INTEGRATION METRICS // 02</span>
                <h2 className="text-2xl font-bold font-headings text-white">Diagnostics & Controls</h2>
              </div>
              <Cpu className="text-[#f97316] w-6 h-6 animate-pulse" />
            </div>

            <p className="text-slate-300 text-xs leading-relaxed">
              Equipped with deep-learning machine vision loops and dynamic collision monitoring. Allows safely working side-by-side with human operators in clean-rooms or hot foundries.
            </p>

            <div className="flex flex-col gap-3 font-mono">
              <div className="flex justify-between items-center border-b border-white/5 pb-2">
                <span className="text-[10px] text-slate-500 uppercase tracking-wider">Vision Engine</span>
                <span className="text-sm font-bold text-white">NVIDIA Jetson Core</span>
              </div>
              <div className="flex justify-between items-center border-b border-white/5 pb-2">
                <span className="text-[10px] text-slate-500 uppercase tracking-wider">Collision Avoidance</span>
                <span className="text-sm font-bold text-white">Torque-Based Safety</span>
              </div>
              <div className="flex justify-between items-center border-b border-white/5 pb-2">
                <span className="text-[10px] text-slate-500 uppercase tracking-wider">Environmental Index</span>
                <span className="text-sm font-bold text-white">IP67 Waterproof</span>
              </div>
              <div className="flex justify-between items-center border-b border-white/5 pb-2">
                <span className="text-[10px] text-slate-500 uppercase tracking-wider">Path Controller</span>
                <span className="text-sm font-bold text-white">ROS2 / EtherCAT Loop</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-[10px] text-slate-500 uppercase tracking-wider">HMI Integration</span>
                <span className="text-sm font-bold text-[#f97316]">Modbus / TCP/IP</span>
              </div>
            </div>

            {/* Bottom Call to Action inside the scroll page */}
            <button 
              onClick={() => navigate('/contact')}
              className="mt-2 w-full bg-gradient-to-b from-slate-800 to-slate-900 border border-[#f97316]/50 hover:border-[#f97316] text-white py-3 rounded-sm text-xs font-bold tracking-widest uppercase transition-all duration-300 font-mono shadow-md"
            >
              Request Custom Integration
            </button>
          </div>

        </section>

      </div>
      
    </main>
  );
}
