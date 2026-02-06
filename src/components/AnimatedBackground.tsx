"use client";

import { motion } from "framer-motion";

type Particle = {
  width: number;
  height: number;
  left: number;
  top: number;
  x: number;
  duration: number;
  delay: number;
};

const particles: Particle[] = Array.from({ length: 5 }, (_, index) => ({
  width: 80 + (index * 37) % 70,
  height: 30 + (index * 29) % 40,
  left: (index * 21) % 100,
  top: (index * 43) % 100,
  x: (index % 2 === 0 ? 1 : -1) * (20 + (index * 13) % 40),
  duration: 6 + (index * 1.3) % 4,
  delay: (index * 0.7) % 5
}));

export default function AnimatedBackground() {
  return (
    <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden bg-ak-bg">
      {/* 1. Hexagon Grid (Originium Dust) */}
      <div 
        className="absolute inset-0 opacity-10"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M30 0l25.98 15v30L30 60 4.02 45V15z' fill-opacity='0.2' fill='%23ffffff' fill-rule='evenodd'/%3E%3C/svg%3E")`,
          backgroundSize: '120px 120px',
        }}
      />

      {/* 2. Scanning Lines (CRT Effect) */}
      <motion.div
        className="absolute inset-0 z-0"
        style={{
          background: "linear-gradient(to bottom, rgba(255,255,255,0) 50%, rgba(0,0,0,0.2) 50%)",
          backgroundSize: "100% 4px"
        }}
        animate={{ opacity: [0.1, 0.15, 0.1] }}
        transition={{ duration: 0.2, repeat: Infinity }}
      />

      {/* 3. Random Floating Tech Particles */}
      {particles.map((particle, i) => (
        <motion.div
          key={i}
          className="absolute bg-ak-cyan/20 border border-ak-cyan/40"
          style={{
            width: particle.width,
            height: particle.height,
            left: `${particle.left}%`,
            top: `${particle.top}%`,
          }}
          initial={{ opacity: 0, scale: 0 }}
          animate={{ 
            opacity: [0, 0.3, 0], 
            scale: [0.8, 1, 0.8],
            x: [0, particle.x]
          }}
          transition={{ 
            duration: particle.duration, 
            repeat: Infinity,
            delay: particle.delay
          }}
        />
      ))}

      {/* 4. Large Decor Elements (Rhodes Island style) */}
      <div className="absolute top-20 right-0 w-[500px] h-[500px] border-[20px] border-white/5 rounded-full -translate-y-1/2 translate-x-1/2 blur-sm" />
      <div className="absolute bottom-0 left-20 w-[300px] h-[300px] border-[2px] border-ak-yellow/10 rotate-45" />

      {/* 5. Vignette */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,rgba(0,0,0,0.8)_100%)]" />

      {/* 6. Active Scanline */}
      <motion.div
        className="absolute top-0 left-0 w-full h-1 bg-ak-cyan/30 shadow-[0_0_10px_rgba(35,173,229,0.5)]"
        animate={{ top: ["0%", "100%"] }}
        transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
      />
    </div>
  );
}
