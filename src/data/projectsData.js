export const projects = [
  {
    id: 1,
    slug: "high-speed-packaging-cell",
    title: "High-Speed Packaging Cell",
    client: "AeroTech Foundry",
    category: "Delta Automation",
    image: "/robotic_assembly_arm.png",
    video: "/showcase/IMG_7564.mp4",
    challenge: "The client needed to increase pick-and-place throughput by 40% and package highly irregular cast-iron components without damaging critical tolerances.",
    solution: "We deployed a custom multi-gripper delta robot system integrated with high-resolution line-scan cameras. An adaptive vacuum gripper conforms to irregular geometries, picking parts dynamically off a moving sorting conveyor.",
    specs: {
      "Payload Capacity": "25 kg",
      "Cycle Time": "1.2 seconds",
      "Axis Count": "4 Axis",
      "Footprint Dimensions": "2.4m x 2.4m"
    },
    metrics: [
      { label: "Cycle Time", value: "-22%" },
      { label: "Throughput", value: "+450/hr" },
      { label: "Defect Rate", value: "0.001%" },
      { label: "ROI Realized", value: "14 Months" }
    ],
    angles: ["/robotic_gripper_detail.png", "/control_panel_hmi.png"]
  },
  {
    id: 2,
    slug: "predictive-quality-diagnostics",
    title: "Predictive Quality Diagnostics",
    client: "Global Motors",
    category: "Machine Vision",
    image: "/machine_vision_system.png",
    video: "/showcase/IMG_7543.mp4",
    challenge: "Welding anomalies on the automated chassis assembly line were causing high rejection rates, resulting in extensive rework and major bottlenecks.",
    solution: "We engineered a dual-camera 3D thermal imaging inspection ring that monitors welds in real time. Defect detection algorithms analyze weld structure instantly and flag anomalies, avoiding downstream issues.",
    specs: {
      "Scanning Accuracy": "±0.1 mm",
      "Line Frequency": "60 Hz",
      "AI Edge Inference": "< 8ms",
      "Sensor Resolution": "5.0 Megapixel"
    },
    metrics: [
      { label: "Detection Speed", value: "<8ms" },
      { label: "Total Yield", value: "+12%" },
      { label: "False Rejects", value: "0.0%" },
      { label: "ROI Realized", value: "8 Months" }
    ],
    angles: ["/control_panel_hmi.png", "/machine_vision_system.png"]
  },
  {
    id: 3,
    slug: "articulated-sorting-system",
    title: "Articulated Sorting System",
    client: "Prime Logistics",
    category: "Robotics & Logistics",
    image: "/robotic_welding_cell.png",
    video: "/showcase/IMG_7550.mp4",
    challenge: "Manual sorting of heavy automotive parts on structural joint lines was creating safety hazards and bottlenecking sorting speeds.",
    solution: "Deployed a heavy-payload articulated robotic arm equipped with custom magnet-pneumatic end effectors. The robot uses 3D area sensors to identify, localize, and sort parts directly into shipping racks.",
    specs: {
      "Payload Capacity": "150 kg",
      "Cycle Time": "2.8 seconds",
      "Axis Count": "6 Axis",
      "Footprint Dimensions": "3.6m x 3.6m"
    },
    metrics: [
      { label: "Sorting Speed", value: "+40%" },
      { label: "Throughput", value: "+200/hr" },
      { label: "Safety Incidents", value: "Zero" },
      { label: "ROI Realized", value: "11 Months" }
    ],
    angles: ["/robotic_gripper_detail.png", "/industrial_facility.png"]
  }
];
