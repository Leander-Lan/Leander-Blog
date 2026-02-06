"use client";

import { motion } from "framer-motion";
import { Hexagon, Terminal } from "lucide-react";

export default function RootLoading() {
  return (
    <div className="fixed inset-0 bg-[#050505] text-gray-300 font-mono flex items-center justify-center z-[100]">
      {/* Background Grid */}
      <div 
        className="absolute inset-0 opacity-10 pointer-events-none"
        style={{
          backgroundImage: "linear-gradient(rgba(35, 173, 229, 0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(35, 173, 229, 0.1) 1px, transparent 1px)",
          backgroundSize: "40px 40px",
        }}
      />
      
      {/* Scanning Line */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="w-full h-1 bg-ak-cyan/20 blur-sm animate-[scan_3s_linear_infinite]" style={{ top: '-10%' }} />
      </div>

      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="relative z-10 flex flex-col items-center"
      >
        {/* Hexagon Spinner */}
        <div className="relative mb-8">
            <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                className="relative z-10 text-ak-cyan"
            >
                <Hexagon size={64} strokeWidth={1} />
            </motion.div>
            <motion.div
                animate={{ rotate: -180 }}
                transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                className="absolute inset-0 flex items-center justify-center text-ak-yellow/50"
            >
                <Hexagon size={48} strokeWidth={1} />
            </motion.div>
            
            {/* Center Pulse */}
            <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-2 h-2 bg-white rounded-full animate-pulse shadow-[0_0_10px_rgba(255,255,255,0.8)]" />
            </div>
        </div>

        {/* Text Status */}
        <div className="bg-[#1F1F1F] ak-clip-corner px-8 py-4 border border-white/10 relative">
             <div className="absolute top-0 left-0 w-2 h-2 border-t border-l border-ak-cyan" />
             <div className="absolute top-0 right-0 w-2 h-2 border-t border-r border-ak-cyan" />
             <div className="absolute bottom-0 left-0 w-2 h-2 border-b border-l border-ak-cyan" />
             <div className="absolute bottom-0 right-0 w-2 h-2 border-b border-r border-ak-cyan" />

             <div className="flex flex-col items-center gap-2">
                <div className="text-xl font-bold text-white tracking-[0.2em] animate-pulse">
                    LOADING
                </div>
                <div className="text-[10px] text-ak-cyan font-mono flex items-center gap-2">
                    <Terminal size={10} />
                    <span>SYSTEM_INITIALIZATION...</span>
                </div>
             </div>
        </div>

        {/* Loading Bar */}
        <div className="mt-4 w-64 h-1 bg-[#1F1F1F] overflow-hidden relative">
            <motion.div 
                className="absolute top-0 left-0 h-full bg-ak-yellow"
                initial={{ width: "0%" }}
                animate={{ width: "100%" }}
                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            />
        </div>

        <div className="mt-2 text-[10px] text-gray-600 font-mono text-center">
            LEANDER&apos;S BLOG TERMINAL // V2.0 · PERSONAL LOG INITIALIZING
        </div>

      </motion.div>
    </div>
  );
}
