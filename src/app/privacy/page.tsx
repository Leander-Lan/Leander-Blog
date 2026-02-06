"use client";

import Link from "next/link";
import { Shield, Server, Eye, Globe, ChevronLeft } from "lucide-react";
import PageTransition from "@/components/PageTransition";

export default function PrivacyPage() {
    return (
        <div className="min-h-screen bg-[#121212] text-gray-300 font-mono relative overflow-hidden">
             {/* Background Elements */}
             <div className="fixed inset-0 ak-border-grid opacity-30 pointer-events-none" />
             <div className="fixed top-0 left-0 w-full h-32 bg-gradient-to-b from-[#121212] to-transparent z-20 pointer-events-none" />

            <main className="max-w-4xl mx-auto relative z-10 pt-32 pb-20 px-6">

                <PageTransition>
                    
                    {/* Header Section */}
                    <div className="mb-12 border-b-2 border-ak-cyan pb-6 flex flex-col md:flex-row md:items-end justify-between gap-4">
                         <div>
                             <h1 className="text-4xl md:text-5xl font-black text-white uppercase italic tracking-tighter mb-2">
                                 隐私 <span className="text-ak-cyan">政策</span>
                             </h1>
                             <div className="flex items-center gap-2 text-xs text-gray-500 mt-2 tracking-widest font-mono">
                                 <Shield size={14} className="text-ak-cyan"/>
                                 <span>PROTOCOL_ID: P-2026-01-21 // VER. 1.0</span>
                             </div>
                         </div>
                         <div className="text-left md:text-right font-mono">
                             <div className="text-xs text-ak-yellow font-bold bg-ak-yellow/10 px-2 py-1 inline-block mb-1">保密级别：公开</div>
                             <div className="text-[10px] text-gray-500">最后更新：2026-01-21</div>
                         </div>
                    </div>

                    {/* Document Container */}
                    <div className="bg-[#1F1F1F] p-6 md:p-12 ak-clip-corner border border-white/5 relative shadow-2xl">
                         {/* Decorative marks */}
                         <div className="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 border-ak-cyan" />
                         <div className="absolute top-0 right-0 w-8 h-8 border-t-2 border-r-2 border-ak-cyan" />
                         <div className="absolute bottom-0 left-0 w-8 h-8 border-b-2 border-l-2 border-ak-cyan" />
                         <div className="absolute bottom-0 right-0 w-8 h-8 border-b-2 border-r-2 border-ak-cyan" />

                         <div className="prose prose-invert prose-headings:font-mono prose-headings:font-bold prose-headings:uppercase prose-p:text-gray-400 prose-li:text-gray-400 max-w-none">
                            
                            {/* Intro */}
                            <div className="bg-ak-cyan/5 border-l-4 border-ak-cyan p-4 mb-8 not-prose">
                                <p className="text-sm text-ak-cyan font-bold mb-1">
                                    {"// SYSTEM_NOTICE"}
                                </p>
                                <p className="text-sm text-gray-300">
                                    欢迎访问 <strong>tianiel.top</strong>。我们深知隐私对您的重要性，并承诺以透明、安全的方式处理您的数据。
                                    本政策详细说明了当您使用本站功能时，我们如何收集和处理您的信息。
                                </p>
                            </div>

                            <h3 className="text-white flex items-center gap-2">
                                <span className="text-ak-cyan">01.</span> 数据收集
                            </h3>
                            <p>为了提供互动功能，我们需要收集以下特定信息：</p>

                            <div className="grid md:grid-cols-2 gap-4 not-prose my-6">
                                <div className="bg-[#121212] border border-white/10 p-4 relative group hover:border-ak-cyan transition-colors">
                                    <div className="absolute top-2 right-2 text-blue-500"><Globe size={20}/></div>
                                    <h4 className="text-white font-bold text-sm mb-2 uppercase">友链申请数据</h4>
                                    <p className="text-xs text-gray-500 leading-relaxed">
                                        收集：网站名称、URL、描述、Logo 地址、联系邮箱。<br/>
                                        用途：公开展示在友链页面（邮箱除外）。
                                    </p>
                                </div>
                                <div className="bg-[#121212] border border-white/10 p-4 relative group hover:border-ak-cyan transition-colors">
                                    <div className="absolute top-2 right-2 text-purple-500"><Eye size={20}/></div>
                                    <h4 className="text-white font-bold text-sm mb-2 uppercase">评论数据</h4>
                                    <p className="text-xs text-gray-500 leading-relaxed">
                                        收集：昵称、邮箱、评论内容、IP 地址、User-Agent。<br/>
                                        用途：展示评论、反垃圾、安全审计。
                                    </p>
                                </div>
                            </div>

                            <h3 className="text-white flex items-center gap-2">
                                <span className="text-ak-cyan">02.</span> 可见性与展示范围
                            </h3>
                            <ul className="list-none pl-0 space-y-2">
                                <li className="flex items-start gap-2">
                                    <span className="text-ak-yellow font-bold text-xs mt-1">[PUBLIC]</span>
                                    <span>您的昵称、网站链接、评论内容以及友链的公开描述将在网站上对所有人可见。</span>
                                </li>
                                <li className="flex items-start gap-2">
                                    <span className="text-red-500 font-bold text-xs mt-1">[SECRET]</span>
                                    <span>您的<strong>电子邮箱地址</strong>和<strong>IP 地址</strong>将被严格保密，不会在前台直接显示。</span>
                                </li>
                            </ul>

                            <h3 className="text-white flex items-center gap-2">
                                <span className="text-ak-cyan">03.</span> 第三方服务
                            </h3>
                            <p>
                                为了提供更好的用户体验，我们使用了以下外部模块：
                            </p>
                            <div className="p-4 border border-dashed border-white/20 bg-[#121212]/50 my-4 space-y-4 not-prose">
                                <div>
                                    <h4 className="font-bold text-ak-cyan mb-1 text-sm">Cravatar（头像服务）</h4>
                                    <p className="text-xs text-gray-500">
                                        当您留下邮箱时，我们会生成 MD5 哈希值发送给 <strong>Cravatar</strong> 以获取头像。此过程不可逆，不会泄露原始邮箱。
                                    </p>
                                </div>
                                <div>
                                    <h4 className="font-bold text-ak-cyan mb-1 text-sm">IP-API（地理位置服务）</h4>
                                    <p className="text-xs text-gray-500">
                                        您的 IP 地址会被发送至 <strong>ip-api.com</strong> 查询大致地理位置（如“中国·上海”），不存储精确经纬度。
                                    </p>
                                </div>
                            </div>

                            <h3 className="text-white flex items-center gap-2">
                                <span className="text-ak-cyan">04.</span> Cookie 使用说明
                            </h3>
                            <p>
                                我们使用 Cookie 和 LocalStorage 来增强您的浏览体验：
                            </p>
                            <ul className="list-disc pl-5 space-y-2 text-sm text-gray-400">
                                <li><strong>隐私同意：</strong>LocalStorage 中的 <code>cookie_consent</code> 用于记录您是否已阅读并同意本隐私政策。</li>
                                <li><strong>登录状态：</strong>仅在管理员登录后台时才会使用必要的 Cookie 维持会话。</li>
                                <li><strong>无广告追踪：</strong>普通访客浏览时，本站<strong>不会</strong>植入任何广告追踪或跨站分析 Cookie。</li>
                            </ul>

                            <h3 className="text-white flex items-center gap-2">
                                <span className="text-ak-cyan">05.</span> 数据存储与安全
                            </h3>
                            <div className="flex items-start gap-4 p-4 bg-ak-cyan/5 border border-ak-cyan/20 rounded-sm not-prose mb-6">
                                <Server className="text-ak-cyan shrink-0 mt-1" />
                                <div>
                                    <h4 className="text-white font-bold text-sm mb-1">数据库与脱敏</h4>
                                    <p className="text-xs text-gray-500">
                                        您的数据存储在受保护的数据库中。对于评论中记录的 IP 地址，我们在入库前会进行简单的脱敏处理（隐藏最后一段），以最大限度保护您的隐私。
                                    </p>
                                </div>
                            </div>

                            <h3 className="text-white flex items-center gap-2">
                                <span className="text-ak-cyan">06.</span> 联系站长与数据删除
                            </h3>
                            <p>
                                如需删除数据、修改信息或对本隐私政策有任何疑问，请发送邮件至：
                                <a href="mailto:me@tianiel.top" className="text-ak-cyan no-underline hover:underline ml-1 font-bold">
                                    me@tianiel.top
                                </a>
                            </p>

                        </div>

                        {/* Footer Link */}
                        <div className="mt-12 pt-8 border-t border-white/10 text-center">
                            <Link href="/" className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-ak-cyan transition-colors group uppercase font-bold tracking-wider">
                                <ChevronLeft size={16} className="group-hover:-translate-x-1 transition-transform"/> 
                                返回首页
                            </Link>
                        </div>
                    </div>
                </PageTransition>
            </main>
        </div>
    );
}
