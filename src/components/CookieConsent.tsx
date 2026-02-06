"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Cookie, Check, FileText } from "lucide-react";
import Link from "next/link";

export default function CookieConsent() {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        // Check if user has already consented
        const consent = localStorage.getItem("cookie_consent");
        if (!consent) {
            // Small delay to show animation smoothly after page load
            const timer = setTimeout(() => setIsVisible(true), 1000);
            return () => clearTimeout(timer);
        }
    }, []);

    const handleAccept = () => {
        localStorage.setItem("cookie_consent", "true");
        setIsVisible(false);
    };

    return (
        <AnimatePresence>
            {isVisible && (
                <motion.div
                    initial={{ y: 100, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: 100, opacity: 0 }}
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                    className="fixed bottom-6 left-6 right-6 md:left-auto md:right-6 md:w-96 z-[9000]"
                >
                    <div className="bg-[#1F1F1F] border border-ak-cyan/30 p-1 ak-clip-corner shadow-[0_0_20px_rgba(0,0,0,0.5)]">
                        <div className="bg-[#121212] p-5 relative overflow-hidden ak-clip-corner-tl">
                            
                            {/* Decorative Elements */}
                            <div className="absolute top-0 right-0 p-2 opacity-30">
                                <div className="text-[10px] font-mono text-ak-cyan text-right">SYS_ALERT</div>
                            </div>
                            <div className="absolute -left-2 top-1/2 w-1 h-8 bg-ak-yellow transform -translate-y-1/2" />

                            <div className="relative z-10">
                                <div className="flex items-start gap-4 mb-4">
                                    <div className="p-2 bg-ak-cyan/10 border border-ak-cyan/30 text-ak-cyan shrink-0">
                                        <Cookie size={20} />
                                    </div>
                                    <div>
                                        <h3 className="text-white font-bold text-sm mb-1 tracking-wider">使用条款确认</h3>
                                        <p className="text-xs text-gray-400 leading-relaxed font-mono">
                                            为保证正常功能与更好的浏览体验，本站会在本地存储少量必要信息。<br/>
                                            不会用于广告追踪或跨站分析。
                                        </p>
                                    </div>
                                </div>
                                
                                <div className="flex gap-3 mt-4">
                                    <Link 
                                        href="/privacy" 
                                        className="flex-1 px-4 py-2 bg-[#1F1F1F] border border-white/10 hover:border-white/30 text-xs text-gray-300 font-mono transition-all text-center flex items-center justify-center gap-2 group"
                                    >
                                        <FileText size={12} className="group-hover:text-ak-cyan transition-colors" />
                                        <span>查看详情</span>
                                    </Link>
                                    <button
                                        onClick={handleAccept}
                                        className="flex-1 px-4 py-2 bg-ak-cyan/10 border border-ak-cyan text-xs text-ak-cyan hover:bg-ak-cyan hover:text-black font-bold font-mono transition-all flex items-center justify-center gap-2 group"
                                    >
                                        <Check size={12} />
                                        <span>同意并继续</span>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
