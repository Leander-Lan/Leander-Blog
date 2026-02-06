"use client";

import Link from "next/link";
import Image from "next/image";
import { Mail, Github, Gamepad2, Palette, Terminal } from "lucide-react";
import PageTransition from "@/components/PageTransition";
import ScrollRevealItem from "@/components/ScrollRevealItem";

export default function AboutPage() {
    return (
        <div className="min-h-screen bg-[#121212] text-gray-300 font-mono relative overflow-hidden selection:bg-ak-cyan selection:text-black">
             {/* Background Elements */}
             <div className="fixed inset-0 ak-border-grid opacity-30 pointer-events-none" />
             <div className="fixed top-0 right-0 w-1/3 h-full bg-gradient-to-l from-ak-cyan/5 to-transparent pointer-events-none" />

            <main className="max-w-6xl mx-auto relative z-10 pt-32 pb-20 px-6">
                <PageTransition>
                    <div className="flex flex-col lg:flex-row gap-12">
                        
                        {/* Left Column: ID Card & Quick Stats */}
                        <aside className="w-full lg:w-1/3 space-y-8">
                            {/* ID Card */}
                            <ScrollRevealItem>
                                <div className="bg-[#1F1F1F] ak-clip-corner p-1 border border-white/10 relative group">
                                    <div className="absolute top-0 right-0 p-2 opacity-50">
                                        <div className="w-16 h-16 border-t-2 border-r-2 border-ak-cyan/50 rounded-tr-lg" />
                                    </div>
                                    
                                    <div className="bg-[#121212] p-6 relative overflow-hidden">
                                        <div className="absolute top-4 right-4 text-xs font-bold text-ak-yellow tracking-widest opacity-80">
                                            LEVEL 02
                                        </div>
                                        
                                        <div className="w-32 h-32 mx-auto mb-6 relative border border-white/10 ak-clip-corner overflow-hidden">
                                            <Image
                                                src="/avatar.png"
                                                alt="Leander Avatar"
                                                fill
                                                className="object-cover"
                                                priority
                                            />
                                            <div className="absolute inset-0 bg-gradient-to-t from-ak-bg via-transparent to-transparent opacity-80" />
                                            <div className="absolute inset-0 bg-[url('/noise.png')] opacity-20 mix-blend-overlay" />
                                            <div className="absolute bottom-0 left-0 w-full h-1 bg-ak-cyan" />
                                        </div>

                                        <div className="text-center space-y-2">
                                            <h1 className="text-3xl font-black text-white tracking-tighter uppercase">
                                                Leander
                                            </h1>
                                        <div className="text-xs text-ak-cyan tracking-[0.2em] font-bold">
                                                环境设计专业学生 / 游戏爱好者
                                            </div>
                                        </div>

                                        <div className="mt-8 space-y-4 text-sm">
                                            <div className="flex justify-between border-b border-white/10 pb-2">
                                                <span className="text-gray-500">代号</span>
                                                <span className="text-white font-bold">LEANDER LAN</span>
                                            </div>
                                            <div className="flex justify-between border-b border-white/10 pb-2">
                                                <span className="text-gray-500">年龄</span>
                                                <span className="text-white">19岁</span>
                                            </div>
                                            <div className="flex justify-between border-b border-white/10 pb-2">
                                                <span className="text-gray-500">就读院校</span>
                                                <span className="text-white">南京林业大学</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </ScrollRevealItem>

                            {/* Status */}
                            <ScrollRevealItem delay={0.2}>
                                <div className="p-6 bg-[#1F1F1F] border-l-2 border-ak-yellow relative">
                                    <h3 className="text-white font-bold mb-4 flex items-center gap-2">
                                        <span className="w-2 h-2 bg-ak-yellow rounded-full animate-pulse"></span>
                                        当前状态
                                    </h3>
                                    <p className="text-sm text-gray-400 leading-relaxed">
                                        这里是 Leander（也可以叫我 Tianiel）运营的个人博客，主要记录设计学习，以及一些生活碎片。
                                    </p>
                                </div>
                            </ScrollRevealItem>
                        </aside>

                        {/* Right Column: Detailed Intel */}
                        <div className="flex-1 space-y-12">
                            
                            {/* Header */}
                            <ScrollRevealItem delay={0.3}>
                                <div className="border-b border-ak-cyan/30 pb-4">
                                    <h2 className="text-4xl font-black text-white uppercase italic tracking-tighter">
                                        个人 <span className="text-ak-cyan">档案</span>
                                    </h2>
                                    <div className="text-xs text-gray-500 mt-2 font-mono tracking-widest">
                                        {"// 仅用于快速了解站长 //"}
                                    </div>
                                </div>
                            </ScrollRevealItem>

                            {/* Skill Assessment */}
                            <ScrollRevealItem delay={0.4}>
                                <section>
                                    <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-3">
                                        <Palette className="text-ak-cyan" size={20} />
                                        <span>技能概览</span>
                                    </h3>
                                    <div className="grid md:grid-cols-2 gap-6">
                                        <SkillModule name="Adobe Photoshop" level={85} type="DESIGN" />
                                        <SkillModule name="Adobe Illustrator" level={80} type="DESIGN" />
                                        <SkillModule name="Autodesk AutoCAD" level={75} type="TECH" />
                                        <SkillModule name="SketchUp" level={80} type="3D" />
                                        <SkillModule name="D5 Render" level={70} type="3D" />
                                        <SkillModule name="Office Suite" level={90} type="ADMIN" />
                                    </div>
                                </section>
                            </ScrollRevealItem>

                            {/* Combat Experience (Games) */}
                            <ScrollRevealItem delay={0.5}>
                                <section>
                                    <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-3">
                                        <Gamepad2 className="text-ak-yellow" size={20} />
                                        <span>游戏记录</span>
                                    </h3>
                                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                                        <GameRecord title="APEX" rank="FPS" />
                                        <GameRecord title="OVERWATCH" rank="FPS" />
                                        <GameRecord title="DESTINY 2" rank="FPS" />
                                        <GameRecord title="MINECRAFT" rank="Sandbox" />
                                    </div>
                                </section>
                            </ScrollRevealItem>

                            {/* Additional Info */}
                            <ScrollRevealItem delay={0.6}>
                                <section className="bg-[#1F1F1F]/50 p-6 border border-dashed border-white/20">
                                    <h3 className="text-white font-bold mb-2 flex items-center gap-2">
                                        <Terminal size={16} className="text-ak-cyan"/> 
                                        额外备注
                                    </h3>
                                    <p className="text-sm text-gray-400">
                                        目前是环境设计学生。偶尔会把一些设计灵感和工具心得同步到这里。
                                    </p>
                                </section>
                            </ScrollRevealItem>

                            {/* Contact */}
                            <ScrollRevealItem delay={0.7}>
                                <section className="pt-8 border-t border-white/10">
                                    <h3 className="text-xl font-bold text-white mb-6">联系方式</h3>
                                    <div className="flex flex-wrap gap-4">
                                        <a href="mailto:me@tianiel.top" className="flex items-center gap-3 px-6 py-3 bg-[#1F1F1F] border border-white/10 hover:border-ak-cyan text-gray-300 hover:text-ak-cyan transition-all group ak-clip-corner">
                                            <Mail size={18} />
                                            <span className="font-bold tracking-wider">电子邮件</span>
                                        </a>
                                        <Link href="https://github.com/Leander-Lan" target="_blank" className="flex items-center gap-3 px-6 py-3 bg-[#1F1F1F] border border-white/10 hover:border-white text-gray-300 hover:text-white transition-all group ak-clip-corner">
                                            <Github size={18} />
                                            <span className="font-bold tracking-wider">GitHub 仓库</span>
                                        </Link>
                                    </div>
                                </section>
                            </ScrollRevealItem>

                        </div>
                    </div>
                </PageTransition>
            </main>
        </div>
    );
}

// Sub-components

function SkillModule({ name, level, type }: { name: string; level: number; type: string }) {
    return (
        <div className="bg-[#0a0a0a] p-4 border-l-2 border-gray-700 hover:border-ak-cyan transition-all duration-300 group relative overflow-hidden hover:-translate-y-1">
             {/* Background Tech Lines */}
             <div className="absolute right-0 top-0 p-1 opacity-20">
                <div className="text-[10px] font-mono text-right">{type}</div>
            </div>
            
            <div className="flex justify-between items-end mb-2">
                <span className="font-bold text-gray-200 group-hover:text-ak-cyan transition-colors">{name}</span>
                <span className="font-mono text-ak-cyan text-sm">{level}%</span>
            </div>
            <div className="h-1 w-full bg-[#1F1F1F]">
                <div 
                    className="h-full bg-ak-cyan/80 group-hover:bg-ak-cyan transition-all duration-500 ease-out"
                    style={{ width: `${level}%` }}
                />
            </div>
        </div>
    );
}

function GameRecord({ title, rank }: { title: string; rank: string }) {
    return (
        <div className="aspect-square bg-[#1F1F1F] border border-white/5 p-4 flex flex-col justify-between hover:border-ak-yellow/50 transition-all duration-300 group relative overflow-hidden group-hover:-translate-y-1">
             <div className="absolute inset-0 bg-ak-yellow/5 opacity-0 group-hover:opacity-100 transition-opacity" />
            
            <div className="font-black text-xl text-white/20 group-hover:text-ak-yellow transition-colors z-10">
                {title}
            </div>
            <div className="z-10">
                <div className="text-xs text-gray-500 font-mono mb-1">游玩类型</div>
                <div className="font-bold text-white text-sm">{rank}</div>
            </div>
        </div>
    );
}
