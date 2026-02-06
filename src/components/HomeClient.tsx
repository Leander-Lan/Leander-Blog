'use client';

import { motion, useScroll, useTransform } from "framer-motion";
import Link from "next/link";
import { Terminal, ArrowRight, Calendar, BookOpen, Activity, Database, Cpu, Wifi } from "lucide-react";
import { useState, useEffect } from "react";
import PageTransition from "@/components/PageTransition";

interface Post {
    id: string;
    title: string;
    content: string;
    category: string;
    createdAt: string;
}

interface HomeClientProps {
    initialPosts: Post[];
}

export default function HomeClient({ initialPosts }: HomeClientProps) {
    const { scrollY } = useScroll();
    const y2 = useTransform(scrollY, [0, 500], [0, -50]);

    // Animation Variants - Industrial Reveal
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.15,
                delayChildren: 0.3
            }
        }
    };

    const itemVariants = {
        hidden: { opacity: 0, x: -20, filter: "blur(4px)" },
        visible: {
            opacity: 1,
            x: 0,
            filter: "blur(0px)",
            transition: { duration: 0.6, ease: "easeOut" }
        }
    };

    const dashboardVariants = {
        hidden: { opacity: 0, scale: 0.95 },
        visible: {
            opacity: 1,
            scale: 1,
            transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 0.5 }
        }
    };

    // Simulated Real-time Data
    const [time, setTime] = useState("");
    useEffect(() => {
        const interval = setInterval(() => {
            const now = new Date();
            setTime(now.toLocaleTimeString('en-US', { hour12: false }));
        }, 1000);
        return () => clearInterval(interval);
    }, []);

    return (
        <div className="min-h-screen bg-ak-bg text-gray-300 font-mono overflow-x-hidden relative">
            {/* Background Grid - Parallax */}
            <motion.div 
                style={{ y: y2 }}
                className="absolute inset-0 z-0 pointer-events-none opacity-20"
            >
                <div className="w-full h-full ak-border-grid" />
            </motion.div>

            <PageTransition>
                <main className="max-w-7xl mx-auto px-6 pt-24 sm:pt-28 md:pt-32 pb-16 md:pb-20 relative z-10">

                {/* --- HERO SECTION REFACTORED --- */}
                <section className="mb-32 md:mb-40 lg:mb-48 grid grid-cols-1 lg:grid-cols-12 gap-8 md:gap-10 lg:gap-12 items-start">
                    
                    {/* Left Content (60%) */}
                    <motion.div
                        variants={containerVariants}
                        initial="hidden"
                        animate="visible"
                        className="lg:col-span-7 relative z-10"
                    >
                        {/* Identity Code */}
                        <motion.div variants={itemVariants} className="flex flex-wrap items-center gap-3 mb-6 md:mb-8 text-[10px] sm:text-xs font-bold tracking-[0.18em] text-gray-500">
                            <span className="w-3 h-3 bg-ak-cyan" />
                            <span>ID: 00110101-L</span>
                            <span className="text-ak-yellow">{"// OPERATOR: LEANDER"}</span>
                        </motion.div>

                        {/* Massive Title */}
                        <motion.div variants={itemVariants} className="relative mb-10 md:mb-12 pr-8 md:pr-10 lg:pr-14">
                            <h1 className="text-5xl sm:text-6xl md:text-8xl lg:text-9xl font-black text-white leading-[0.9] sm:leading-[0.85] tracking-tighter italic overflow-visible">
                                SYSTEM<br/>
                                <span className="text-transparent bg-clip-text bg-gradient-to-br from-white via-gray-400 to-gray-600 pr-6 pt-1 pb-1 inline-block">ONLINE</span>
                            </h1>
                            <div className="absolute -right-4 top-0 text-xs font-mono text-ak-cyan writing-vertical-rl h-full hidden md:flex justify-between py-2 opacity-50">
                                <span>VER. 2.0.4</span>
                                <span>NO SIGNAL</span>
                            </div>
                        </motion.div>
                        
                        {/* Subtitle / Description */}
                        <motion.div variants={itemVariants} className="border-l-2 border-ak-yellow pl-5 sm:pl-6 mb-10 md:mb-12 relative overflow-hidden group">
                            <div className="absolute top-0 left-0 w-full h-full bg-ak-yellow/5 -translate-x-full group-hover:translate-x-0 transition-transform duration-500 ease-out" />
                            <p className="text-lg sm:text-xl md:text-2xl font-bold text-white mb-3 md:mb-4 tracking-wide">
                                WELCOME, VISITOR.
                            </p>
                            <p className="text-sm md:text-base text-gray-400 leading-relaxed max-w-xl">
                                正在接入终端... <br/>
                                这是一个记录设计与生活的数字花园。在这里，你可以找到关于开发、设计以及游戏的相关情报。
                            </p>
                        </motion.div>

                        {/* Industrial Action Buttons */}
                        <motion.div variants={itemVariants} className="flex flex-col sm:flex-row gap-3 sm:gap-4">
                            <Link href="/blog" className="relative w-full sm:w-auto px-6 sm:px-8 py-4 bg-ak-cyan text-black font-black uppercase tracking-widest hover:bg-white transition-colors clip-path-polygon-[0_0,100%_0,100%_80%,90%_100%,0_100%] group">
                                <span className="flex items-center justify-center gap-2">
                                    <BookOpen size={20} />
                                    Access Archives
                                </span>
                                <div className="absolute bottom-0 right-0 w-4 h-4 bg-black/20" />
                            </Link>
                            
                            <Link href="/about" className="relative w-full sm:w-auto px-6 sm:px-8 py-4 border border-white/20 text-white font-bold uppercase tracking-widest hover:border-ak-cyan hover:text-ak-cyan transition-colors bg-black/50">
                                <span className="flex items-center justify-center gap-2">
                                    <Terminal size={20} />
                                    Initialize Protocol
                                </span>
                            </Link>
                        </motion.div>
                    </motion.div>

                    {/* Right Dashboard (40%) - Replacement for Avatar */}
                    <motion.div
                        variants={dashboardVariants}
                        initial="hidden"
                        animate="visible"
                        className="lg:col-span-5 relative hidden lg:block lg:mt-10"
                    >
                        {/* Dashboard Container */}
                        <div className="relative bg-[#0a0a0a]/80 backdrop-blur-md border border-white/10 p-6 ak-clip-corner w-full h-[500px] flex flex-col">
                            {/* Header Line */}
                            <div className="flex justify-between items-center border-b border-white/10 pb-4 mb-6">
                                <div className="flex items-center gap-2">
                                    <Activity size={16} className="text-ak-cyan animate-pulse" />
                                    <span className="text-xs font-bold text-white tracking-widest">SYSTEM MONITOR</span>
                                </div>
                                <div className="text-xs font-mono text-ak-yellow">{time}</div>
                            </div>

                            {/* Data Visualization Area */}
                            <div className="flex-1 grid grid-cols-2 gap-4">
                                {/* Block 1: CPU/Core */}
                                <div className="bg-black/50 border border-white/5 p-4 flex flex-col justify-between group hover:border-ak-cyan/30 transition-colors">
                                    <div className="flex justify-between items-start">
                                        <Cpu size={20} className="text-gray-500 group-hover:text-ak-cyan transition-colors" />
                                        <span className="text-[10px] text-gray-600">CORE_LOAD</span>
                                    </div>
                                    <div className="flex items-end gap-1">
                                        <div className="w-2 h-8 bg-ak-cyan/20 rounded-sm overflow-hidden relative">
                                            <motion.div 
                                                animate={{ height: ["40%", "80%", "30%", "60%"] }} 
                                                transition={{ duration: 2, repeat: Infinity }} 
                                                className="w-full bg-ak-cyan bottom-0 absolute" 
                                            />
                                        </div>
                                        <div className="w-2 h-12 bg-ak-cyan/20 rounded-sm overflow-hidden relative">
                                            <motion.div 
                                                animate={{ height: ["60%", "30%", "90%", "50%"] }} 
                                                transition={{ duration: 3, repeat: Infinity }} 
                                                className="w-full bg-ak-cyan bottom-0 absolute" 
                                            />
                                        </div>
                                        <div className="w-2 h-6 bg-ak-cyan/20 rounded-sm overflow-hidden relative">
                                            <motion.div 
                                                animate={{ height: ["20%", "50%", "80%", "40%"] }} 
                                                transition={{ duration: 1.5, repeat: Infinity }} 
                                                className="w-full bg-ak-cyan bottom-0 absolute" 
                                            />
                                        </div>
                                    </div>
                                    <div className="text-2xl font-mono text-white">34%</div>
                                </div>

                                {/* Block 2: Database */}
                                <div className="bg-black/50 border border-white/5 p-4 flex flex-col justify-between group hover:border-ak-yellow/30 transition-colors">
                                    <div className="flex justify-between items-start">
                                        <Database size={20} className="text-gray-500 group-hover:text-ak-yellow transition-colors" />
                                        <span className="text-[10px] text-gray-600">STORAGE</span>
                                    </div>
                                    <div className="w-full bg-gray-800 h-1 mt-2">
                                        <div className="w-[75%] h-full bg-ak-yellow" />
                                    </div>
                                    <div className="text-2xl font-mono text-white">75%</div>
                                </div>

                                {/* Block 3: Network */}
                                <div className="col-span-2 bg-black/50 border border-white/5 p-4 flex items-center justify-between group hover:border-green-500/30 transition-colors">
                                    <div className="flex items-center gap-4">
                                        <div className="p-2 bg-green-500/10 rounded-full">
                                            <Wifi size={20} className="text-green-500" />
                                        </div>
                                        <div>
                                            <div className="text-xs text-gray-500">NETWORK STATUS</div>
                                            <div className="text-sm font-bold text-white">CONNECTED</div>
                                        </div>
                                    </div>
                                    <div className="text-xs font-mono text-green-500 animate-pulse">
                                        PING: 24ms
                                    </div>
                                </div>

                                {/* Block 4: Recent Logs (Text Scroller) */}
                                <div className="col-span-2 bg-black/50 border border-white/5 p-4 relative overflow-hidden group">
                                    <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-black/0 via-transparent to-black pointer-events-none z-10" />
                                    <div className="space-y-2 font-mono text-[10px] text-gray-500 opacity-70 relative z-0">
                                        <p>&gt; Initializing system components...</p>
                                        <p>&gt; Loading user profile [LEANDER]...</p>
                                        <p>&gt; Connecting to secure server...</p>
                                        <p>&gt; Fetching latest blog posts...</p>
                                        <p className="text-ak-cyan">&gt; SYSTEM READY.</p>
                                    </div>
                                    
                                    {/* Blue Overlay Bar - Completely removed */}
                                    <div className="absolute -right-4 -bottom-4 w-24 h-24 bg-ak-cyan/5 rounded-full blur-xl animate-pulse pointer-events-none" />
                                </div>
                            </div>

                            {/* Decorative Corners */}
                            <div className="absolute -top-1 -left-1 w-3 h-3 border-t border-l border-white/50" />
                            <div className="absolute -bottom-1 -right-1 w-3 h-3 border-b border-r border-white/50" />
                        </div>

                        {/* Background Decoration behind Dashboard */}
                        <div className="absolute -z-10 top-10 -right-10 w-full h-full border border-dashed border-white/5 rounded-full opacity-20 animate-[spin_60s_linear_infinite]" />
                    </motion.div>
                </section>

                {/* --- 最新情报（博客文章） --- */}
                <section>

                    <motion.div 
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: "-100px" }}
                        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                        className="flex items-end justify-between mb-12 border-b border-white/10 pb-4"
                    >
                        <div>
                            <h2 className="text-4xl md:text-5xl font-black text-white italic tracking-tighter mb-2">
                                LATEST INTEL
                            </h2>
                            <p className="text-ak-cyan font-mono text-sm tracking-[0.3em]">
                                {"// 最近行动记录"}
                            </p>
                        </div>
                        <Link href="/blog" className="hidden md:flex items-center gap-2 text-sm font-bold text-gray-500 hover:text-white transition-colors">
                            查看全部文章 <ArrowRight size={16} />
                        </Link>
                    </motion.div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        {initialPosts.map((post, index) => (
                            <motion.div
                                key={post.id}
                                initial={{ opacity: 0, y: 40 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true, margin: "-50px" }}
                                transition={{ duration: 0.8, delay: index * 0.1, ease: [0.22, 1, 0.36, 1] }}
                            >
                                <Link href={`/blog/${post.id}`} className="group block h-full">
                                    <div className="relative h-full bg-ak-surface border border-white/10 p-6 ak-clip-corner group-hover:border-ak-cyan group-hover:-translate-y-2 group-hover:shadow-[0_10px_40px_-10px_rgba(35,173,229,0.2)] transition-all duration-300">
                                        {/* Number Index */}
                                        <div className="absolute -top-3 -left-3 bg-ak-bg border border-white/10 px-2 py-1 text-xl font-black text-gray-700 font-mono group-hover:text-ak-cyan group-hover:border-ak-cyan transition-colors">
                                            {String(index + 1).padStart(2, '0')}
                                        </div>

                                        <div className="flex items-center gap-3 mb-4 text-xs font-mono text-gray-500">
                                            <span className="bg-white/10 px-2 py-0.5 rounded text-gray-300 group-hover:bg-ak-cyan group-hover:text-black transition-colors">
                                                {typeof post.category === "string" ? post.category.toUpperCase() : "LIFE"}
                                            </span>
                                            <span className="flex items-center gap-1">
                                                <Calendar size={12} />
                                                {new Date(post.createdAt).toLocaleDateString()}
                                            </span>
                                        </div>

                                        <h3 className="text-xl md:text-2xl font-bold text-white mb-4 line-clamp-2 group-hover:text-ak-cyan transition-colors">
                                            {post.title}
                                        </h3>

                                        <p className="text-gray-400 text-sm line-clamp-3 mb-6 leading-relaxed">
                                            {post.content.replace(/[#*`]/g, '').slice(0, 150)}...
                                        </p>

                                        <div className="mt-auto flex items-center text-xs font-bold text-gray-600 group-hover:text-white transition-colors">
                                            阅读完整内容 <div className="w-8 h-[1px] bg-current mx-2" /> <ArrowRight size={14} />
                                        </div>
                                    </div>
                                </Link>
                            </motion.div>
                        ))}
                    </div>

                    <div className="mt-12 text-center md:hidden">
                        <Link href="/blog" className="ak-button inline-flex items-center gap-2">
                            查看全部文章 <ArrowRight size={16} />
                        </Link>
                    </div>
                </section>

                </main>
            </PageTransition>
        </div>
    );
}
