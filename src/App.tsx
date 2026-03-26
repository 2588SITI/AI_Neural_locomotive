/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { motion } from "motion/react";
import { 
  Camera, 
  Zap, 
  Cpu, 
  Hash, 
  Shield, 
  Radio, 
  Info,
  ExternalLink,
  ChevronRight
} from "lucide-react";

interface ComponentItem {
  id: string;
  name: string;
  brand: string;
  modelNumber: string;
  origin: string;
  price: string;
  use: string;
  details: string;
  icon: React.ReactNode;
  color: string;
  imageUrl: string;
}

const components: ComponentItem[] = [
  {
    id: "1",
    name: "Line Scan Cameras",
    brand: "Basler",
    modelNumber: "racer raL2048-48gm",
    origin: "Germany",
    price: "₹2,50,000",
    use: "High-speed continuous imaging of moving objects.",
    details: "The Basler racer series is the industry standard for high-speed line scan applications. The raL2048-48gm offers 2k resolution with a GigE interface, perfect for capturing fine details of trains moving at 100+ km/h.",
    icon: <Camera className="w-6 h-6" />,
    color: "bg-blue-500",
    imageUrl: "https://www.baslerweb.com/fp-1649844444/media/main/products/cameras/line-scan-cameras/racer/basler_racer_raL2048-48gm_front_left.png"
  },
  {
    id: "2",
    name: "Strobe Lighting",
    brand: "CCS",
    modelNumber: "LDR2-90-SW2 / PD3 Controller",
    origin: "Japan",
    price: "₹85,000",
    use: "High-intensity pulsed illumination for clear capture.",
    details: "CCS is the global leader in machine vision lighting. The LDR2 series paired with a PD3 strobe controller ensures that the camera receives enough light in microseconds to 'freeze' high-speed motion.",
    icon: <Zap className="w-6 h-6" />,
    color: "bg-yellow-500",
    imageUrl: "https://www.ccs-grp.com/products/series/1/images/main.jpg"
  },
  {
    id: "3",
    name: "Edge AI Unit",
    brand: "NVIDIA Jetson AGX",
    modelNumber: "Orin 64GB Developer Kit",
    origin: "USA/Global",
    price: "₹1,80,000",
    use: "Real-time AI processing at the source.",
    details: "The AGX Orin is the most powerful AI computer for energy-efficient autonomous machines. It delivers up to 275 TOPS, allowing it to run multiple neural networks in parallel for real-time defect detection.",
    icon: <Cpu className="w-6 h-6" />,
    color: "bg-green-500",
    imageUrl: "https://www.nvidia.com/content/dam/en-zz/Solutions/embedded/jetson-agx-orin-developer-kit-625-ud@2x.png"
  },
  {
    id: "4",
    name: "Axle Counter",
    brand: "Teknis",
    modelNumber: "TAC-200 Series",
    origin: "Australia",
    price: "₹4,50,000",
    use: "Detecting and counting train axles for safety.",
    details: "Teknis TAC-200 is a highly reliable axle counting system used for track vacancy detection. It is SIL-4 certified, ensuring the highest level of safety for railway signaling operations.",
    icon: <Hash className="w-6 h-6" />,
    color: "bg-red-500",
    imageUrl: "https://www.teknis.com.au/images/products/axle-counter.jpg"
  },
  {
    id: "5",
    name: "IP67 Enclosure",
    brand: "Rittal",
    modelNumber: "AX 1038.000 (Compact)",
    origin: "Germany",
    price: "₹45,000",
    use: "Weatherproof protection for sensitive electronics.",
    details: "The Rittal AX series offers superior protection with its high-quality seals and robust construction. The 1038.000 model is ideal for housing cameras and AI units in harsh outdoor environments.",
    icon: <Shield className="w-6 h-6" />,
    color: "bg-slate-600",
    imageUrl: "https://www.rittal.com/imf/none/5_1234/Rittal_AX_Enclosure_Compact_IP66.jpg"
  },
  {
    id: "6",
    name: "5G Comm Module",
    brand: "Cisco",
    modelNumber: "IR1101 Industrial Router",
    origin: "USA",
    price: "₹65,000",
    use: "Ultra-fast, low-latency data transmission.",
    details: "The Cisco IR1101 is a modular industrial router designed for mission-critical IoT. With a 5G pluggable module, it provides the high-speed connectivity required for remote monitoring and data offloading.",
    icon: <Radio className="w-6 h-6" />,
    color: "bg-indigo-500",
    imageUrl: "https://www.cisco.com/c/en/us/products/routers/industrial-routers/index/_jcr_content/Grid/category_cards/layout-grid-0/column-0/tile.img.png"
  }
];

export default function App() {
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
            <span className="flex items-center gap-1"><Info className="w-4 h-4" /> Technical Guide</span>
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
            <div className="text-sm text-slate-500 font-medium">6 Items Listed</div>
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
                  
                  <button className="mt-6 w-full py-2.5 rounded-lg bg-slate-50 text-slate-600 text-sm font-bold hover:bg-blue-50 hover:text-blue-600 transition-colors flex items-center justify-center gap-2">
                    Technical Docs <ExternalLink className="w-3.5 h-3.5" />
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Summary Table */}
        <section className="mt-20">
          <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm">
            <div className="px-6 py-4 bg-slate-50 border-b border-slate-200">
              <h3 className="font-bold text-slate-800">Quick Reference Table</h3>
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
                    <td colSpan={4} className="px-6 py-4 font-bold text-slate-800 text-right">Total Estimated Hardware Cost:</td>
                    <td className="px-6 py-4 text-right font-mono font-black text-blue-600 text-lg">₹10,85,000</td>
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
