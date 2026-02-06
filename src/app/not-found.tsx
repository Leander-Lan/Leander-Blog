"use client";

import Link from "next/link";
import { ChevronLeft, AlertTriangle } from "lucide-react";

export default function NotFound() {
    return (
        <div className="min-h-screen bg-[#121212] text-gray-300 font-mono flex flex-col items-center justify-center relative overflow-hidden">
             {/* Background noise/grid */}
             <div className="fixed inset-0 ak-border-grid opacity-20 pointer-events-none" />
             <div className="fixed inset-0 bg-[radial-gradient(circle_at_center,rgba(255,0,0,0.05),transparent)] pointer-events-none" />
             
             <div className="relative z-10 text-center space-y-8 px-4 max-w-2xl w-full">
                 <div className="relative inline-block w-full">
                     <h1 className="text-[10rem] md:text-[12rem] font-black text-[#1F1F1F] select-none tracking-tighter leading-none">404</h1>
                     <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                         <AlertTriangle size={64} className="text-red-500 mb-4 opacity-80" />
                         <h1 className="text-4xl md:text-6xl font-black text-white tracking-widest uppercase">
                             信号 <span className="text-red-500">丢失</span>
                         </h1>
                     </div>
                 </div>

                 <div className="space-y-4 border-t border-b border-red-500/30 py-8 relative bg-red-950/5">
                     {/* Decorative lines */}
                     <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-red-500 to-transparent"></div>
                     <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-red-500 to-transparent"></div>
                     <div className="absolute left-0 top-0 h-full w-1 bg-gradient-to-b from-transparent via-red-500/20 to-transparent"></div>
                     <div className="absolute right-0 top-0 h-full w-1 bg-gradient-to-b from-transparent via-red-500/20 to-transparent"></div>

                    <h2 className="text-xl md:text-2xl text-red-500 font-bold tracking-[0.2em] uppercase animate-pulse">
                        {"// 连接失败"}
                    </h2>
                     <p className="text-gray-500 text-sm max-w-md mx-auto font-mono leading-relaxed">
                         目标坐标无效，请求的资源在当前区段不可用。<br/>
                         请检查链接或返回首页重新导航。
                     </p>
                 </div>

                 <div className="pt-4">
                     <Link
                         href="/"
                         className="inline-flex items-center gap-3 px-8 py-3 bg-red-500/10 border border-red-500 text-red-500 hover:bg-red-500 hover:text-white transition-all group ak-clip-corner font-bold tracking-wider uppercase"
                     >
                         <ChevronLeft size={18} className="group-hover:-translate-x-1 transition-transform"/>
                         <span>返回首页</span>
                     </Link>
                 </div>
                 
                 <div className="text-[10px] text-gray-700 font-mono mt-12">
                     SYSTEM_ID: LEANDER_BLOG_TERMINAL_V1.0 // ERR_CODE: 404
                 </div>
             </div>
        </div>
    );
}
