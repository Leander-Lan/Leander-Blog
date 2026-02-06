"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function SiteFooter() {
    const pathname = usePathname();

    if (pathname.startsWith("/admin") || pathname === "/login") return null;

    return (
        <footer className="w-full relative z-10 bg-black pt-16 pb-8 overflow-hidden">
            {/* Top Border with Decor */}
            <div className="absolute top-0 left-0 w-full h-[1px] bg-white/10" />
            <div className="absolute top-0 right-12 w-24 h-1 bg-ak-cyan" />
            <div className="absolute top-0 left-12 w-4 h-1 bg-ak-yellow" />

            <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
                {/* 1. SITE LOGO / BRAND */}
                <div className="md:col-span-1 space-y-4">
                    <div className="w-16 h-16 bg-white/5 border border-white/10 flex items-center justify-center ak-clip-corner">
                         <div className="text-4xl font-black text-white/20">LB</div>
                    </div>
                    <div className="space-y-1">
                        <h3 className="text-xl font-bold text-white tracking-widest">LEANDER&apos;S BLOG</h3>
                        <p className="text-xs text-gray-400">个人博客 · 记录设计与生活</p>
                        <p className="text-xs text-gray-500 font-mono">PERSONAL LOG TERMINAL</p>
                    </div>
                </div>

                {/* 2. LINKS */}
                <div className="md:col-span-2 grid grid-cols-2 gap-8">
                    <div>
                        <h4 className="text-ak-cyan font-mono text-sm mb-4 border-l-2 border-ak-cyan pl-2">NAVIGATION</h4>
                        <ul className="space-y-2 text-sm text-gray-400 font-mono">
                            <li><Link href="/" className="hover:text-white transition-colors">&gt;&gt; HOME</Link></li>
                            <li><Link href="/blog" className="hover:text-white transition-colors">&gt;&gt; BLOG</Link></li>
                            <li><Link href="/links" className="hover:text-white transition-colors">&gt;&gt; FRIENDS</Link></li>
                            <li><Link href="/about" className="hover:text-white transition-colors">&gt;&gt; ABOUT</Link></li>
                        </ul>
                    </div>
                    <div>
                        <h4 className="text-ak-yellow font-mono text-sm mb-4 border-l-2 border-ak-yellow pl-2">LEGAL</h4>
                        <ul className="space-y-2 text-sm text-gray-400 font-mono">
                            <li><Link href="/privacy" className="hover:text-white transition-colors">&gt;&gt; PRIVACY POLICY</Link></li>
                            <li><Link href="/cookies" className="hover:text-white transition-colors">&gt;&gt; COOKIE POLICY</Link></li>
                        </ul>
                    </div>
                </div>

                {/* 3. SYSTEM STATUS */}
                <div className="md:col-span-1">
                     <h4 className="text-gray-500 font-mono text-xs mb-4">SYSTEM STATUS</h4>
                     <div className="space-y-2">
                         <div className="flex justify-between text-xs font-mono text-gray-300">
                             <span>SERVER</span>
                             <span className="text-green-500">ONLINE</span>
                         </div>
                         <div className="w-full h-1 bg-gray-800 rounded-full overflow-hidden">
                             <div className="w-full h-full bg-green-500/50" />
                         </div>
                         
                         <div className="flex justify-between text-xs font-mono text-gray-300 mt-2">
                             <span>SECURITY</span>
                             <span className="text-ak-cyan">MAXIMUM</span>
                         </div>
                         <div className="w-full h-1 bg-gray-800 rounded-full overflow-hidden">
                             <div className="w-[90%] h-full bg-ak-cyan/50" />
                         </div>
                     </div>
                </div>
            </div>

            {/* Bottom Bar */}
            <div className="max-w-7xl mx-auto px-6 pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4">
                <div className="text-[10px] text-gray-600 font-mono">
                    <p>版权 © 2025-2026 LEANDER 保留所有权利 · ALL RIGHTS RESERVED.</p>
                    <p>基于 Next.js 构建 · PERSONAL BLOG OF LEANDER</p>
                </div>

                {/* FILINGS */}
                <div className="flex flex-wrap justify-center gap-4">
                     <FilingItem href="https://beian.miit.gov.cn/" text="苏ICP备2025203869号-1" />
                     <FilingItem href="https://beian.mps.gov.cn/" text="苏公网安备32111102000680号" />
                     <FilingItem href="https://icp.gov.moe/" text="萌ICP备20253211号" />
                </div>
            </div>
        </footer>
    );
}

function FilingItem({ href, text }: { href: string, text: string }) {
    return (
        <Link
            href={href}
            target="_blank"
            className="px-2 py-1 bg-white/5 border border-white/10 text-[10px] text-gray-500 hover:text-white hover:border-white/30 hover:bg-white/10 transition-all font-mono"
        >
            {text}
        </Link>
    );
}
