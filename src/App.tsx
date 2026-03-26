/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { motion, AnimatePresence } from "motion/react";
import { 
  Camera, 
  Zap, 
  Cpu, 
  Hash, 
  Shield, 
  Radio, 
  Info,
  ExternalLink,
  ChevronRight,
  Download,
  X,
  CheckCircle2
} from "lucide-react";
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';

interface ComponentItem {
  id: string;
  name: string;
  brand: string;
  modelNumber: string;
  origin: string;
  price: string;
  use: string;
  details: string;
  specifications: string[];
  workingPrinciple: string;
  icon: React.ReactNode;
  color: string;
  imageUrl: string;
}

const components: ComponentItem[] = [
  {
    id: "1",
    name: "Elite Line Scan Camera",
    brand: "Basler",
    modelNumber: "racer raL8192-80km (8K)",
    origin: "Germany",
    price: "₹6,50,000",
    use: "Ultra-high resolution imaging at 80kHz.",
    details: "The raL8192-80km is the pinnacle of line scan technology. With 8K resolution and Camera Link interface, it captures microscopic defects on trains traveling at speeds exceeding 250 km/h with crystal clarity.",
    specifications: [
      "Resolution: 8192 pixels (8K)",
      "Max Line Rate: 80 kHz",
      "Pixel Size: 3.5 µm x 3.5 µm",
      "Interface: Camera Link (Full/Deca)",
      "Sensor Type: CMOS Line Scan"
    ],
    workingPrinciple: "Unlike standard area-scan cameras that take full frames, this camera captures images one single line at a time at extremely high speeds. As the train moves past the fixed camera, these lines are stitched together in real-time to create a continuous, distortion-free, ultra-high-resolution image of the entire locomotive undercarriage.",
    icon: <Camera className="w-6 h-6" />,
    color: "bg-blue-600",
    imageUrl: "https://www.baslerweb.com/fp-1649844444/media/main/products/cameras/line-scan-cameras/racer/basler_racer_raL2048-48gm_front_left.png"
  },
  {
    id: "2",
    name: "High-Power Strobe Array",
    brand: "CCS",
    modelNumber: "LDR2-120-SW2 / High-Output Controller",
    origin: "Japan",
    price: "₹2,50,000",
    use: "Ultra-bright synchronized illumination.",
    details: "Custom high-power LED array designed for 8K imaging. Provides blinding intensity for microsecond durations, ensuring zero motion blur even at the highest capture frequencies.",
    specifications: [
      "LED Color: Cool White (6500K)",
      "Strobe Duration: 1µs to 100µs",
      "Peak Intensity: >2,000,000 Lux",
      "Trigger Input: TTL / RS-485",
      "Cooling: Passive Heat Sink with Forced Air"
    ],
    workingPrinciple: "The strobe array is electronically synchronized with the line-scan camera's exposure. It emits ultra-short pulses of light that are thousands of times brighter than ambient sunlight. By illuminating the target for only a few microseconds, it 'freezes' the motion of a train moving at 300 km/h, preventing any blurring in the high-resolution image.",
    icon: <Zap className="w-6 h-6" />,
    color: "bg-yellow-500",
    imageUrl: "https://www.ccs-grp.com/products/series/1/images/main.jpg"
  },
  {
    id: "3",
    name: "Dual Edge AI Cluster",
    brand: "NVIDIA Jetson AGX",
    modelNumber: "Orin 64GB (Dual Redundant Setup)",
    origin: "USA/Global",
    price: "₹3,60,000",
    use: "Redundant real-time AI processing.",
    details: "Two AGX Orin units working in parallel for 100% uptime. If one fails, the other takes over instantly. Delivers a combined 550 TOPS of AI performance for complex multi-model inference.",
    specifications: [
      "AI Performance: 275 TOPS per unit",
      "GPU: 2048-core NVIDIA Ampere",
      "Memory: 64GB 256-bit LPDDR5",
      "CPU: 12-core Arm Cortex-A78AE",
      "Storage: 64GB eMMC 5.1 + NVMe Support"
    ],
    workingPrinciple: "The Edge AI Cluster performs 'Inference at the Edge.' Instead of sending terabytes of raw image data to a central server, these units run deep neural networks locally. They analyze the 8K line-scan data in real-time to detect missing bolts, cracks, or overheating components, sending only the critical alerts and cropped defect images to the control room.",
    icon: <Cpu className="w-6 h-6" />,
    color: "bg-green-600",
    imageUrl: "https://www.nvidia.com/content/dam/en-zz/Solutions/embedded/jetson-agx-orin-developer-kit-625-ud@2x.png"
  },
  {
    id: "4",
    name: "Triple-Redundant Axle Counter",
    brand: "Teknis",
    modelNumber: "TAC-300 Elite Series",
    origin: "Australia",
    price: "₹8,00,000",
    use: "Fail-safe track vacancy detection.",
    details: "The TAC-300 is the most advanced axle counter globally. It features triple-modular redundancy (TMR) and is SIL-4 certified, making it virtually impossible for the system to fail or miscount.",
    specifications: [
      "Safety Integrity Level: SIL-4 (Highest)",
      "Redundancy: 2-out-of-3 (2oo3) Voting",
      "Max Speed: 350 km/h",
      "Environmental: IP68 Submersible Sensors",
      "Communication: Dual Fiber Optic Loops"
    ],
    workingPrinciple: "Axle counters use electromagnetic wheel sensors installed on the rails. When a wheel passes, it disturbs a magnetic field, creating a pulse. The system counts these pulses at the entry and exit of a track section. If the 'In' count matches the 'Out' count, the section is declared clear. The TAC-300 uses three independent processors to cross-verify every single axle count.",
    icon: <Hash className="w-6 h-6" />,
    color: "bg-red-600",
    imageUrl: "https://www.teknis.com.au/images/products/axle-counter.jpg"
  },
  {
    id: "5",
    name: "Climate-Controlled Enclosure",
    brand: "Rittal",
    modelNumber: "Stainless Steel AX with Peltier Cooling",
    origin: "Germany",
    price: "₹1,50,000",
    use: "Active thermal management for electronics.",
    details: "A stainless steel, IP67 enclosure equipped with active thermoelectric cooling. Maintains a constant 25°C inside, even if the outside desert temperature hits 50°C, extending hardware life significantly.",
    specifications: [
      "Material: 316L Stainless Steel",
      "Protection: IP66 / NEMA 4X",
      "Cooling Type: Thermoelectric (Peltier)",
      "Cooling Capacity: 100W to 500W",
      "Monitoring: IoT-enabled Smart Controller"
    ],
    workingPrinciple: "The enclosure uses the Peltier Effect for cooling. When electricity passes through two different semiconductors, heat is absorbed on one side and released on the other. This allows for 'solid-state' cooling with no moving parts (like compressors or fans), making it extremely reliable in dusty, high-vibration railway environments.",
    icon: <Shield className="w-6 h-6" />,
    color: "bg-slate-700",
    imageUrl: "https://www.rittal.com/imf/none/5_1234/Rittal_AX_Enclosure_Compact_IP66.jpg"
  },
  {
    id: "6",
    name: "Industrial 5G/Fiber Gateway",
    brand: "Cisco",
    modelNumber: "Catalyst IR8340 Rugged Router",
    origin: "USA",
    price: "₹1,20,000",
    use: "Mission-critical high-bandwidth networking.",
    details: "The IR8340 supports both high-speed Fiber and 5G failover. It ensures that your high-resolution data reaches the control room without interruption, regardless of local network conditions.",
    specifications: [
      "Cellular: Dual 5G Sub-6GHz Modules",
      "Wired: 12x Gigabit Ethernet + 2x SFP+",
      "Operating Temp: -40°C to +70°C",
      "Security: Hardware-based VPN & Firewall",
      "Protocol Support: PTP (Precision Time Protocol)"
    ],
    workingPrinciple: "The gateway acts as the 'Communications Hub.' It uses SD-WAN technology to manage multiple data paths simultaneously. If the primary Fiber optic link is cut, it instantly switches to 5G without losing a single packet of data. It also uses PTP to ensure the camera and axle counter clocks are synchronized to within nanoseconds.",
    icon: <Radio className="w-6 h-6" />,
    color: "bg-indigo-600",
    imageUrl: "https://www.cisco.com/c/en/us/products/routers/industrial-routers/index/_jcr_content/Grid/category_cards/layout-grid-0/column-0/tile.img.png"
  },
  {
    id: "7",
    name: "Automated Air-Knife System",
    brand: "EXAIR",
    modelNumber: "Super Air Knife - Stainless Steel 316",
    origin: "USA",
    price: "₹1,85,000",
    use: "High-velocity debris & grease removal.",
    details: "A precision-engineered air curtain that delivers a high-velocity, uniform sheet of air. It blasts off loose mud, dust, and light grease from locomotive parts before they reach the inspection zone.",
    specifications: [
      "Material: 316 Stainless Steel",
      "Air Amplification: 40:1 Ratio",
      "Max Pressure: 250 PSIG",
      "Noise Level: 69 dBA at 80 PSIG",
      "Length: Custom 1200mm Array"
    ],
    workingPrinciple: "The Air Knife uses the 'Coanda Effect.' A small amount of compressed air is released through a thin slot, which then pulls in a massive volume of surrounding 'free' air. This creates a high-velocity, high-impact sheet of air that acts like a physical scraper, shearing off dirt, water, and grease from the train's surface without any physical contact.",
    icon: <Zap className="w-6 h-6" />,
    color: "bg-cyan-600",
    imageUrl: "https://www.exair.com/media/catalog/product/cache/1/image/9df78eab33525d08d6e5fb8d27136e95/s/u/super-air-knife-ss-316.jpg"
  },
  {
    id: "8",
    name: "Elite ECA Crack Detector",
    brand: "Eddyfi",
    modelNumber: "Reddy 64-Channel ECA System",
    origin: "Canada",
    price: "₹14,50,000",
    use: "Sub-surface crack detection through grease.",
    details: "The ultimate solution for dirty environments. Eddy Current Array (ECA) technology uses electromagnetic fields to detect hairline cracks through paint, grease, and mud without needing surface contact.",
    specifications: [
      "Channels: 64-Channel Parallel Acquisition",
      "Frequency Range: 5 Hz to 10 MHz",
      "Scan Speed: Up to 2 m/s",
      "Display: Real-time C-Scan Color Mapping",
      "Connectivity: GigE / USB 3.0"
    ],
    workingPrinciple: "Eddy Current Array (ECA) works on the principle of electromagnetic induction. A coil carries an alternating current, creating an oscillating magnetic field. When this field is near a metal part, it induces circular 'eddy currents' in the metal. If there is a crack, the eddy currents are disrupted. The system detects this change in impedance and creates a 3D map of the metal's integrity, even through 5mm of grease or paint.",
    icon: <Shield className="w-6 h-6" />,
    color: "bg-orange-600",
    imageUrl: "https://www.eddyfi.com/media/1001/reddy-eca-instrument.png"
  }
];

const totalInvestment = "₹39,65,000";

export default function App() {
  const [selectedComponent, setSelectedComponent] = useState<ComponentItem | null>(null);

  const handleDownloadPDF = () => {
    const doc = new jsPDF();
    
    // Add title
    doc.setFontSize(20);
    doc.setTextColor(15, 23, 42); // slate-900
    doc.text('Industrial Monitoring System', 14, 22);
    
    // Add subtitle
    doc.setFontSize(11);
    doc.setTextColor(100, 116, 139); // slate-500
    doc.text('Elite Technical Specifications & Hardware Investment Analysis', 14, 30);
    
    // Add date
    doc.setFontSize(10);
    doc.text(`Generated on: ${new Date().toLocaleDateString()}`, 14, 38);
    
    // Add components table
    const tableData = components.map(item => [
      item.name,
      item.modelNumber,
      item.brand,
      item.origin,
      item.price
    ]);
    
    autoTable(doc, {
      startY: 45,
      head: [['Component', 'Model Number', 'Brand', 'Origin', 'Price']],
      body: tableData,
      theme: 'grid',
      headStyles: { fillColor: [37, 99, 235], textColor: [255, 255, 255], fontStyle: 'bold' }, // blue-600
      styles: { fontSize: 9, cellPadding: 5 },
      columnStyles: {
        4: { halign: 'right', fontStyle: 'bold' }
      }
    });
    
    // Add total cost
    const finalY = (doc as any).lastAutoTable.finalY + 15;
    doc.setFontSize(14);
    doc.setTextColor(37, 99, 235); // blue-600
    doc.setFont('helvetica', 'bold');
    doc.text(`Total Elite Hardware Investment: ${totalInvestment}`, 14, finalY);
    
    // Add Crack Detection Solution Section in PDF
    doc.setFontSize(16);
    doc.setTextColor(15, 23, 42);
    doc.text('Elite Solution: Crack Detection in Dirty Environments', 14, finalY + 15);
    
    doc.setFontSize(10);
    doc.setTextColor(51, 65, 85);
    const crackSolution = [
      '1. Automated Pre-Cleaning: EXAIR Super Air Knife system removes loose debris and grease.',
      '2. ECA Technology: Eddyfi Reddy 64-channel sensors detect cracks through surface contaminants.',
      '3. AI Filtering: NVIDIA Orin processing with custom deep learning models filters out grease noise.'
    ];
    doc.text(crackSolution, 14, finalY + 25);

    // Add verdict
    doc.setFontSize(11);
    doc.setFont('helvetica', 'normal');
    doc.setTextColor(51, 65, 85); // slate-700
    const verdictText = 'Ultimate Verdict: For a "Money is No Object" system, we recommend an Elite Hybrid Architecture. Use the Jetson AGX Orin Cluster trackside for zero-latency detection, and link them to a NextServer-X 2U Elite in the control room for massive data archiving and global AI analytics.';
    const splitVerdict = doc.splitTextToSize(verdictText, 180);
    doc.text(splitVerdict, 14, finalY + 50);
    
    // Footer
    doc.setFontSize(9);
    doc.setTextColor(148, 163, 184); // slate-400
    doc.text('Confidential Technical Document - Industrial Monitoring Solutions v1.0.4', 14, 285);
    
    // Save the PDF
    doc.save('Industrial_System_Elite_Report.pdf');
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] text-slate-900 font-sans selection:bg-blue-100">
      {/* Header */}
      <header className="bg-white border-b border-slate-200 sticky top-0 z-10">
        <div className="max-w-6xl mx-auto px-4 py-6 flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold tracking-tight text-slate-900 flex items-center gap-2">
              <Cpu className="w-8 h-8 text-blue-600" />
              Industrial Monitoring System
            </h1>
            <p className="text-slate-500 text-sm mt-1">Component Analysis & Technical Specifications</p>
          </div>
          <div className="hidden md:flex items-center gap-4 text-sm font-medium text-slate-600">
            <button 
              onClick={handleDownloadPDF}
              className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-xl hover:bg-blue-700 transition-all shadow-sm hover:shadow-md active:scale-95 cursor-pointer"
            >
              <Download className="w-4 h-4" />
              Download PDF Report
            </button>
            <span className="w-px h-4 bg-slate-200"></span>
            <span className="text-blue-600">v1.0.4</span>
          </div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 py-12">
        {/* Hero Section */}
        <section className="mb-16">
          <div className="bg-slate-900 rounded-3xl p-8 md:p-12 text-white relative overflow-hidden shadow-2xl">
            <div className="relative z-10 max-w-2xl">
              <motion.span 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="inline-block px-3 py-1 rounded-full bg-blue-500/20 text-blue-300 text-xs font-bold uppercase tracking-wider mb-6 border border-blue-500/30"
              >
                System Overview
              </motion.span>
              <motion.h2 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="text-4xl md:text-5xl font-bold mb-6 leading-tight"
              >
                Advanced Railway & Industrial Inspection
              </motion.h2>
              <motion.p 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="text-slate-400 text-lg mb-8 leading-relaxed"
              >
                This guide explains the critical hardware components used in modern high-speed inspection systems. 
                From German precision optics to Japanese lighting and Australian safety sensors.
              </motion.p>
              <div className="flex flex-wrap gap-4">
                <button className="px-6 py-3 bg-blue-600 hover:bg-blue-500 transition-colors rounded-xl font-semibold flex items-center gap-2">
                  View Full Specs <ChevronRight className="w-4 h-4" />
                </button>
                <button className="px-6 py-3 bg-white/10 hover:bg-white/20 transition-colors rounded-xl font-semibold border border-white/10">
                  Download PDF
                </button>
              </div>
            </div>
            
            {/* Background Decoration */}
            <div className="absolute top-0 right-0 w-1/2 h-full opacity-10 pointer-events-none">
              <div className="absolute inset-0 bg-gradient-to-l from-blue-500 to-transparent"></div>
              <div className="grid grid-cols-8 grid-rows-8 gap-4 p-8">
                {Array.from({ length: 64 }).map((_, i) => (
                  <div key={i} className="w-1 h-1 bg-white rounded-full"></div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Components Grid */}
        <section>
          <div className="flex items-center justify-between mb-8">
            <h3 className="text-xl font-bold text-slate-800">Core Components</h3>
            <div className="text-sm text-slate-500 font-medium">{components.length} Items Listed</div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {components.map((item, index) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.1 }}
                className="group bg-white rounded-2xl border border-slate-200 overflow-hidden hover:shadow-xl hover:border-blue-200 transition-all duration-300 flex flex-col h-full"
              >
                {/* Image Section */}
                <div className="relative h-48 overflow-hidden bg-slate-100">
                  <img 
                    src={item.imageUrl} 
                    alt={item.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    referrerPolicy="no-referrer"
                  />
                  <div className={`absolute top-4 left-4 p-2 rounded-lg ${item.color} text-white shadow-lg`}>
                    {item.icon}
                  </div>
                </div>

                <div className="p-6 flex flex-col flex-grow">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h4 className="text-xl font-bold text-slate-900 group-hover:text-blue-600 transition-colors">{item.name}</h4>
                      <div className="flex flex-col mt-1">
                        <div className="flex items-center gap-2">
                          <span className="text-sm font-bold text-blue-600">{item.brand}</span>
                          <span className="w-1 h-1 bg-slate-300 rounded-full"></span>
                          <span className="text-xs text-slate-400 uppercase tracking-tight">{item.origin}</span>
                        </div>
                        <span className="text-xs font-mono text-slate-500 mt-1 bg-slate-100 px-2 py-0.5 rounded w-fit">
                          Model: {item.modelNumber}
                        </span>
                      </div>
                    </div>
                    <div className="text-right">
                      <span className="text-xs font-bold text-slate-400 uppercase tracking-widest block">Price</span>
                      <span className="text-lg font-bold text-blue-600">{item.price}</span>
                    </div>
                  </div>

                  <p className="text-slate-600 text-sm font-medium mb-4 flex-grow">
                    {item.use}
                  </p>

                  <div className="pt-4 border-t border-slate-100 mt-auto">
                    <p className="text-slate-500 text-xs leading-relaxed italic">
                      {item.details}
                    </p>
                  </div>
                  
                  <button 
                    onClick={() => setSelectedComponent(item)}
                    className="mt-6 w-full py-2.5 rounded-lg bg-slate-50 text-slate-600 text-sm font-bold hover:bg-blue-50 hover:text-blue-600 transition-colors flex items-center justify-center gap-2"
                  >
                    View Detailed Specs <ChevronRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Detail Modal */}
        <AnimatePresence>
          {selectedComponent && (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm">
              <motion.div
                initial={{ opacity: 0, scale: 0.9, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9, y: 20 }}
                className="bg-white rounded-3xl w-full max-w-3xl max-h-[90vh] overflow-hidden shadow-2xl flex flex-col"
              >
                {/* Modal Header */}
                <div className="relative h-64 bg-slate-100">
                  <img 
                    src={selectedComponent.imageUrl} 
                    alt={selectedComponent.name}
                    className="w-full h-full object-cover"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 to-transparent"></div>
                  <button 
                    onClick={() => setSelectedComponent(null)}
                    className="absolute top-4 right-4 p-2 bg-white/20 hover:bg-white/40 text-white rounded-full backdrop-blur-md transition-colors"
                  >
                    <X className="w-6 h-6" />
                  </button>
                  <div className="absolute bottom-6 left-8 right-8">
                    <div className="flex items-center gap-3 mb-2">
                      <div className={`p-2 rounded-lg ${selectedComponent.color} text-white shadow-lg`}>
                        {selectedComponent.icon}
                      </div>
                      <span className="text-blue-400 font-bold uppercase tracking-widest text-xs">{selectedComponent.brand}</span>
                    </div>
                    <h2 className="text-3xl font-bold text-white leading-tight">{selectedComponent.name}</h2>
                  </div>
                </div>

                {/* Modal Content */}
                <div className="p-8 overflow-y-auto custom-scrollbar">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {/* Specifications */}
                    <div>
                      <h3 className="text-lg font-bold text-slate-900 mb-4 flex items-center gap-2">
                        <Info className="w-5 h-5 text-blue-600" />
                        Technical Specifications
                      </h3>
                      <ul className="space-y-3">
                        {selectedComponent.specifications.map((spec, i) => (
                          <li key={i} className="flex items-start gap-3 text-slate-600 text-sm">
                            <CheckCircle2 className="w-4 h-4 text-green-500 mt-0.5 shrink-0" />
                            {spec}
                          </li>
                        ))}
                      </ul>
                      
                      <div className="mt-8 p-4 bg-slate-50 rounded-2xl border border-slate-100">
                        <p className="text-xs text-slate-400 uppercase font-bold mb-1">Model Number</p>
                        <p className="text-sm font-mono font-bold text-slate-700">{selectedComponent.modelNumber}</p>
                        <div className="mt-3 flex justify-between items-end">
                          <div>
                            <p className="text-xs text-slate-400 uppercase font-bold mb-1">Origin</p>
                            <p className="text-sm font-bold text-slate-700">{selectedComponent.origin}</p>
                          </div>
                          <div className="text-right">
                            <p className="text-xs text-slate-400 uppercase font-bold mb-1">Investment</p>
                            <p className="text-xl font-bold text-blue-600">{selectedComponent.price}</p>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Working Principle */}
                    <div className="space-y-6">
                      <div>
                        <h3 className="text-lg font-bold text-slate-900 mb-4 flex items-center gap-2">
                          <Zap className="w-5 h-5 text-yellow-500" />
                          Working Principle
                        </h3>
                        <p className="text-slate-600 text-sm leading-relaxed">
                          {selectedComponent.workingPrinciple}
                        </p>
                      </div>

                      <div>
                        <h3 className="text-lg font-bold text-slate-900 mb-4 flex items-center gap-2">
                          <Cpu className="w-5 h-5 text-indigo-500" />
                          Primary Use Case
                        </h3>
                        <p className="text-slate-600 text-sm leading-relaxed">
                          {selectedComponent.use}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Modal Footer */}
                <div className="p-6 border-t border-slate-100 bg-slate-50 flex justify-end gap-4">
                  <button 
                    onClick={() => setSelectedComponent(null)}
                    className="px-6 py-2.5 rounded-xl text-slate-600 font-bold hover:bg-slate-200 transition-colors"
                  >
                    Close
                  </button>
                  <button className="px-6 py-2.5 rounded-xl bg-blue-600 text-white font-bold hover:bg-blue-700 transition-all shadow-md active:scale-95">
                    Download Datasheet
                  </button>
                </div>
              </motion.div>
            </div>
          )}
        </AnimatePresence>

        {/* Hairline Crack Detection Solution */}
        <section className="mt-20">
          <div className="flex items-center gap-3 mb-8">
            <div className="p-2 bg-red-600 rounded-lg text-white">
              <Shield className="w-6 h-6" />
            </div>
            <h3 className="text-2xl font-bold text-slate-800">Hairline Crack Detection in Dirty Environments</h3>
          </div>

          <div className="bg-white rounded-3xl border border-slate-200 overflow-hidden shadow-sm">
            <div className="grid grid-cols-1 lg:grid-cols-3">
              {/* The Challenge */}
              <div className="p-8 border-b lg:border-b-0 lg:border-r border-slate-100 bg-slate-50/30">
                <h4 className="text-lg font-bold text-slate-900 mb-4 flex items-center gap-2">
                  <span className="w-2 h-2 bg-red-500 rounded-full"></span>
                  The Challenge
                </h4>
                <p className="text-slate-600 text-sm leading-relaxed mb-6">
                  Locomotive parts are often covered in <span className="font-bold text-slate-800">thick grease, mud, and iron dust</span>. 
                  Standard optical cameras cannot see through this "noise" to find hairline cracks (0.1mm - 0.5mm).
                </p>
                <div className="space-y-3">
                  <div className="p-3 bg-red-50 rounded-xl border border-red-100 text-xs text-red-700 font-medium">
                    ❌ Optical cameras fail due to surface occlusion.
                  </div>
                  <div className="p-3 bg-red-50 rounded-xl border border-red-100 text-xs text-red-700 font-medium">
                    ❌ Manual cleaning is slow and inconsistent.
                  </div>
                </div>
              </div>

              {/* The Solution */}
              <div className="p-8 lg:col-span-2">
                <h4 className="text-lg font-bold text-slate-900 mb-6 flex items-center gap-2">
                  <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                  The 3-Step Elite Solution
                </h4>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {/* Step 1 */}
                  <div className="space-y-3">
                    <div className="w-10 h-10 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center font-bold">1</div>
                    <h5 className="font-bold text-slate-800 text-sm">Automated Pre-Cleaning</h5>
                    <p className="text-slate-500 text-xs leading-relaxed">
                      Install the <span className="font-bold text-slate-700">EXAIR Super Air Knife</span> system 5 meters before the camera station to blast off loose mud and heavy grease using high-velocity air.
                    </p>
                  </div>

                  {/* Step 2 */}
                  <div className="space-y-3">
                    <div className="w-10 h-10 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center font-bold">2</div>
                    <h5 className="font-bold text-slate-800 text-sm">Eddy Current Array (ECA)</h5>
                    <p className="text-slate-500 text-xs leading-relaxed">
                      Use the <span className="font-bold text-slate-700">Eddyfi Reddy 64-Channel</span> sensors. Unlike cameras, they use electromagnetic fields to "see" through grease and paint to detect cracks in the metal itself.
                    </p>
                  </div>

                  {/* Step 3 */}
                  <div className="space-y-3">
                    <div className="w-10 h-10 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center font-bold">3</div>
                    <h5 className="font-bold text-slate-800 text-sm">AI Noise Filtering</h5>
                    <p className="text-slate-500 text-xs leading-relaxed">
                      Deploy <span className="font-bold text-slate-700">Deep Learning</span> models on the <span className="font-bold text-slate-700">NVIDIA Orin Cluster</span> trained specifically on "Dirty Surface" datasets to distinguish between grease and real cracks.
                    </p>
                  </div>
                </div>

                <div className="mt-8 flex flex-col md:flex-row items-center justify-between gap-4 p-4 bg-indigo-50 rounded-2xl border border-indigo-100">
                  <p className="text-indigo-900 text-sm font-bold flex items-center gap-2">
                    <Zap className="w-4 h-4" /> Pro Tip: Use UV (Ultraviolet) Lighting with Fluorescent Penetrant for critical components during maintenance stops for 100% accuracy.
                  </p>
                  <button 
                    onClick={handleDownloadPDF}
                    className="flex items-center gap-2 bg-indigo-600 text-white px-4 py-2 rounded-xl hover:bg-indigo-700 transition-all shadow-sm text-sm font-bold whitespace-nowrap"
                  >
                    <Download className="w-4 h-4" />
                    Download Solution PDF
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Comparison Section */}
        <section className="mt-20">
          <div className="flex items-center gap-3 mb-8">
            <div className="p-2 bg-blue-600 rounded-lg text-white">
              <Cpu className="w-6 h-6" />
            </div>
            <h3 className="text-2xl font-bold text-slate-800">Edge AI vs. Centralized Server</h3>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Jetson AGX Orin */}
            <div className="bg-white rounded-3xl border-2 border-green-100 p-8 shadow-sm hover:shadow-md transition-shadow">
              <div className="flex justify-between items-start mb-6">
                <div>
                  <span className="px-3 py-1 rounded-full bg-green-100 text-green-700 text-xs font-bold uppercase tracking-wider">Recommended for Trackside</span>
                  <h4 className="text-2xl font-bold text-slate-900 mt-3">NVIDIA Jetson AGX Orin</h4>
                  <p className="text-slate-500 text-sm">64GB Developer Kit</p>
                </div>
                <div className="text-right">
                  <p className="text-xs font-bold text-slate-400 uppercase">AI Power</p>
                  <p className="text-xl font-bold text-green-600">275 TOPS</p>
                </div>
              </div>
              
              <ul className="space-y-4 mb-8">
                <li className="flex items-start gap-3">
                  <div className="mt-1 p-1 bg-green-50 rounded-full text-green-600">
                    <ChevronRight className="w-4 h-4" />
                  </div>
                  <p className="text-slate-600 text-sm"><span className="font-bold text-slate-800">Low Power:</span> Consumes only 15W-60W. Perfect for solar or remote battery power.</p>
                </li>
                <li className="flex items-start gap-3">
                  <div className="mt-1 p-1 bg-green-50 rounded-full text-green-600">
                    <ChevronRight className="w-4 h-4" />
                  </div>
                  <p className="text-slate-600 text-sm"><span className="font-bold text-slate-800">Rugged:</span> Small enough to fit in IP67 enclosures. Handles vibration and heat.</p>
                </li>
                <li className="flex items-start gap-3">
                  <div className="mt-1 p-1 bg-green-50 rounded-full text-green-600">
                    <ChevronRight className="w-4 h-4" />
                  </div>
                  <p className="text-slate-600 text-sm"><span className="font-bold text-slate-800">Real-time:</span> Processes images instantly at the source, reducing 5G data costs.</p>
                </li>
              </ul>
              
              <div className="p-4 bg-green-50 rounded-2xl border border-green-100">
                <p className="text-green-800 text-sm font-bold flex items-center gap-2">
                  <Info className="w-4 h-4" /> Best for: On-site defect detection & axle counting.
                </p>
              </div>
            </div>

            {/* NextServer-X 2U */}
            <div className="bg-white rounded-3xl border-2 border-slate-100 p-8 shadow-sm hover:shadow-md transition-shadow">
              <div className="flex justify-between items-start mb-6">
                <div>
                  <span className="px-3 py-1 rounded-full bg-slate-100 text-slate-700 text-xs font-bold uppercase tracking-wider">Recommended for Control Room</span>
                  <h4 className="text-2xl font-bold text-slate-900 mt-3">NextServer-X 2U</h4>
                  <p className="text-slate-500 text-sm">Rackmount Enterprise Server</p>
                </div>
                <div className="text-right">
                  <p className="text-xs font-bold text-slate-400 uppercase">Compute</p>
                  <p className="text-xl font-bold text-slate-600">Multi-GPU</p>
                </div>
              </div>
              
              <ul className="space-y-4 mb-8">
                <li className="flex items-start gap-3">
                  <div className="mt-1 p-1 bg-slate-50 rounded-full text-slate-600">
                    <ChevronRight className="w-4 h-4" />
                  </div>
                  <p className="text-slate-600 text-sm"><span className="font-bold text-slate-800">Massive Power:</span> Can handle 100+ camera streams simultaneously from multiple sites.</p>
                </li>
                <li className="flex items-start gap-3">
                  <div className="mt-1 p-1 bg-slate-50 rounded-full text-slate-600">
                    <ChevronRight className="w-4 h-4" />
                  </div>
                  <p className="text-slate-600 text-sm"><span className="font-bold text-slate-800">Storage:</span> TBs of NVMe storage for long-term video archiving and training.</p>
                </li>
                <li className="flex items-start gap-3">
                  <div className="mt-1 p-1 bg-slate-50 rounded-full text-slate-600">
                    <ChevronRight className="w-4 h-4" />
                  </div>
                  <p className="text-slate-600 text-sm"><span className="font-bold text-slate-800">Scalable:</span> Easy to upgrade RAM, CPU, and GPUs as your AI models grow.</p>
                </li>
              </ul>
              
              <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100">
                <p className="text-slate-800 text-sm font-bold flex items-center gap-2">
                  <Info className="w-4 h-4" /> Best for: Centralized monitoring & AI model training.
                </p>
              </div>
            </div>
          </div>

          <div className="mt-8 p-6 bg-blue-50 rounded-2xl border border-blue-100 text-center">
            <p className="text-blue-900 font-bold">
              Ultimate Verdict: For a "Money is No Object" system, we recommend an <span className="text-blue-600 underline">Elite Hybrid Architecture</span>. Use the Jetson AGX Orin Cluster trackside for zero-latency detection, and link them to a NextServer-X 2U Elite in the control room for massive data archiving and global AI analytics.
            </p>
          </div>
        </section>

        {/* Summary Table */}
        <section className="mt-20">
          <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm">
            <div className="px-6 py-4 bg-slate-50 border-b border-slate-200">
              <h3 className="font-bold text-slate-800">Elite System Hardware Summary</h3>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="text-xs font-bold text-slate-400 uppercase tracking-wider border-b border-slate-100">
                    <th className="px-6 py-4">Component</th>
                    <th className="px-6 py-4">Model Number</th>
                    <th className="px-6 py-4">Brand</th>
                    <th className="px-6 py-4">Origin</th>
                    <th className="px-6 py-4 text-right">Estimated Cost</th>
                  </tr>
                </thead>
                <tbody className="text-sm">
                  {components.map((item) => (
                    <tr key={item.id} className="border-b border-slate-50 hover:bg-slate-50/50 transition-colors">
                      <td className="px-6 py-4 font-semibold text-slate-700">{item.name}</td>
                      <td className="px-6 py-4 font-mono text-xs text-slate-500">{item.modelNumber}</td>
                      <td className="px-6 py-4 text-slate-600 font-bold">{item.brand}</td>
                      <td className="px-6 py-4 text-slate-500">{item.origin}</td>
                      <td className="px-6 py-4 text-right font-mono font-bold text-slate-900">{item.price}</td>
                    </tr>
                  ))}
                </tbody>
                <tfoot>
                  <tr className="bg-slate-50/80">
                    <td colSpan={4} className="px-6 py-4 font-bold text-slate-800 text-right">Total Elite Hardware Investment:</td>
                    <td className="px-6 py-4 text-right font-mono font-black text-blue-600 text-lg">{totalInvestment}</td>
                  </tr>
                </tfoot>
              </table>
            </div>
          </div>
        </section>
      </main>

      <footer className="bg-white border-t border-slate-200 mt-20 py-12">
        <div className="max-w-6xl mx-auto px-4 flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="flex items-center gap-2">
            <Cpu className="w-6 h-6 text-slate-400" />
            <span className="font-bold text-slate-400 tracking-tight">INDUSTRIAL GUIDE</span>
          </div>
          <p className="text-slate-400 text-sm">
            © 2026 Industrial Systems Analysis. All technical data is for educational purposes.
          </p>
          <div className="flex gap-6">
            <a href="#" className="text-slate-400 hover:text-blue-600 transition-colors text-sm font-medium">Privacy</a>
            <a href="#" className="text-slate-400 hover:text-blue-600 transition-colors text-sm font-medium">Terms</a>
            <a href="#" className="text-slate-400 hover:text-blue-600 transition-colors text-sm font-medium">Contact</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
