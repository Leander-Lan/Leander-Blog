"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link as LinkIcon, Plus, X, Globe, Send, Loader2, WifiOff } from "lucide-react";
import Image from "next/image";
import CustomPopup from "@/components/CustomPopup";
import PageTransition from "@/components/PageTransition";
import ScrollRevealItem from "@/components/ScrollRevealItem";
import { createPortal } from "react-dom";

interface LinkItem {
    id: string | number;
    name: string;
    url: string;
    avatar: string;
    description: string;
    status: string;
    category?: string;
}

export default function LinksPage() {
    const [links, setLinks] = useState<LinkItem[]>([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [submitting, setSubmitting] = useState(false);
    const [mounted, setMounted] = useState(false);
    const [popup, setPopup] = useState<{ isOpen: boolean; message: string; type: "success" | "error" }>({
        isOpen: false,
        message: "",
        type: "success"
    });

    const [formData, setFormData] = useState({
        name: "", url: "", avatar: "", description: "", email: ""
    });

    useEffect(() => {
        setMounted(true);
        if (isModalOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }
        return () => {
            document.body.style.overflow = 'unset';
        };
    }, [isModalOpen]);

    useEffect(() => {
        fetch('https://blog.tianiel.top/friends.json')
            .then(res => res.json())
            .then(data => setLinks(Array.isArray(data) ? data : []));
    }, []);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setSubmitting(true);
        try {
            const res = await fetch('https://blog.tianiel.top/friendlink', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData)
            });
            if (res.ok) {
                setPopup({
                    isOpen: true,
                    message: "申请已发送！请等待站长审核，通过后将邮件通知您。\nApplication sent! Please wait for approval.",
                    type: "success"
                });
                setIsModalOpen(false);
                setFormData({ name: "", url: "", avatar: "", description: "", email: "" });
            } else {
                setPopup({
                    isOpen: true,
                    message: "提交失败，请检查填写内容。\nSubmission failed, please check your input.",
                    type: "error"
                });
            }
        } finally {
            setSubmitting(false);
        }
    };

    const onlineLinks = links.filter(l => l.category === 'online' || !l.category);
    const offlineLinks = links.filter(l => l.category === 'offline');

    return (
        <div className="min-h-screen bg-ak-bg text-gray-300 font-mono relative overflow-hidden pt-36 px-6 selection:bg-ak-cyan/30 selection:text-ak-cyan">
            <div className="max-w-6xl mx-auto relative z-10">
                <PageTransition>
                {/* 头部 */}
                <ScrollRevealItem className="flex flex-col md:flex-row justify-between items-start md:items-center mb-16 gap-6 border-b border-white/10 pb-8">
                    <div className="w-full md:w-auto">
                        <h1 className="text-3xl md:text-5xl font-black text-white mb-4 flex items-center gap-3 italic tracking-tighter">
                            <Globe className="text-ak-cyan" /> 友链网络
                        </h1>
                        <div className="p-4 border-l-2 border-ak-cyan bg-white/5 max-w-2xl text-xs sm:text-[13px]">
                            <p className="text-gray-400 text-xs leading-relaxed font-mono">
                                {"// 协议：LINK_ESTABLISHMENT 友链接入"} <br />
                                {"// 状态：OPEN FOR CONNECTION 开放申请"} <br />
                                <span className="text-gray-500 mt-2 block">
                                    站点：<span className="break-all">https://tianiel.top</span> <br/>
                                    名称：Leander&apos;s Blog <br/>
                                    站点图标：<span className="break-all">https://q1.qlogo.cn/g?b=qq&nk=615207910&s=640</span> <br/>
                                    要求：至少 5 篇原创文章，需先添加本站友链。<br/>
                                    提醒：超过 3 个月无法访问或长期停更的站点可能会被移除。
                                </span>
                            </p>
                        </div>
                    </div>
                    <button
                        onClick={() => setIsModalOpen(true)}
                        className="group flex items-center justify-center gap-2 px-6 py-3 bg-ak-cyan/10 border border-ak-cyan text-ak-cyan hover:bg-ak-cyan hover:text-black transition-all ak-clip-corner font-bold tracking-wider w-full md:w-auto whitespace-nowrap"
                    >
                        <Plus size={18} />
                        <span>提交友链申请</span>
                    </button>
                </ScrollRevealItem>

                <div className="space-y-16 pb-24">
                    <div>
                        <ScrollRevealItem className="flex items-center gap-3 mb-8">
                            <div className="w-1 h-6 bg-ak-cyan" />
                            <h2 className="text-2xl font-bold text-white tracking-widest">在线节点</h2>
                            <span className="text-xs text-ak-cyan border border-ak-cyan/30 px-2 py-0.5 rounded-sm">ONLINE</span>
                        </ScrollRevealItem>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {onlineLinks.map((link, index) => (
                                <motion.a
                                    href={link.url}
                                    target="_blank"
                                    key={link.id}
                                    initial={{ opacity: 0, y: 30 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.5, delay: index * 0.05 }}
                                    whileHover={{ y: -5, transition: { duration: 0.2 } }}
                                    className="group relative bg-[#1a1a1a] p-1 transition-all"
                                >
                                    <div className="absolute inset-0 border border-white/10 group-hover:border-ak-cyan transition-colors ak-clip-corner" />
                                    
                                    <div className="relative flex items-start gap-4 p-5 h-full ak-clip-corner bg-[#1a1a1a]">
                                        <div className="relative shrink-0">
                                            <div className="w-14 h-14 overflow-hidden border border-white/10 group-hover:border-ak-cyan transition-colors">
                                                <Image
                                                    src={link.avatar || "/avatar.png"}
                                                    alt={link.name}
                                                    width={56}
                                                    height={56}
                                                    className="object-cover"
                                                />
                                            </div>
                                            <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-ak-cyan animate-pulse" />
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <h3 className="text-white font-bold text-lg mb-1 truncate group-hover:text-ak-cyan transition-colors uppercase">
                                                {link.name}
                                            </h3>
                                            <p className="text-xs text-gray-500 line-clamp-2 leading-relaxed mb-2 h-9">
                                                {link.description || "暂无情报"}
                                            </p>
                                            <div className="flex items-center gap-2 text-[10px] text-gray-600">
                                                <LinkIcon size={10} />
                                                <span className="truncate max-w-[150px] font-mono">{link.url}</span>
                                            </div>
                                        </div>
                                    </div>
                                </motion.a>
                            ))}
                        </div>
                    </div>

                    <div>
                        <ScrollRevealItem className="flex items-center gap-3 mb-8">
                             <div className="w-1 h-6 bg-gray-700" />
                            <h2 className="text-2xl font-bold text-gray-500 tracking-widest">离线节点</h2>
                            <span className="text-xs text-gray-500 border border-gray-700 px-2 py-0.5 rounded-sm">OFFLINE</span>
                        </ScrollRevealItem>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {offlineLinks.map((link, index) => (
                                <motion.a
                                    href={link.url}
                                    target="_blank"
                                    key={link.id}
                                    initial={{ opacity: 0, y: 30 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.5, delay: index * 0.05 }}
                                    whileHover={{ y: -5, transition: { duration: 0.2 } }}
                                    className="group relative bg-[#0f0f0f] p-1 transition-all opacity-70 hover:opacity-100"
                                >
                                     <div className="absolute inset-0 border border-white/5 group-hover:border-red-500/50 transition-colors ak-clip-corner" />
                                    
                                    <div className="relative flex items-start gap-4 p-5 h-full ak-clip-corner bg-[#0f0f0f]">
                                        <div className="relative shrink-0">
                                            <div className="w-14 h-14 overflow-hidden border border-white/10 group-hover:border-red-500 transition-colors grayscale group-hover:grayscale-0">
                                                <Image
                                                    src={link.avatar || "/avatar.png"}
                                                    alt={link.name}
                                                    width={56}
                                                    height={56}
                                                    className="object-cover"
                                                />
                                            </div>
                                            <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-red-500/50" />
                                        </div>

                                        <div className="flex-1 min-w-0">
                                            <h3 className="text-gray-400 font-bold text-lg mb-1 truncate group-hover:text-red-400 transition-colors uppercase">
                                                {link.name}
                                            </h3>
                                            <p className="text-xs text-gray-600 line-clamp-2 leading-relaxed mb-2 h-9">
                                                {link.description || "信号丢失"}
                                            </p>
                                            <div className="flex items-center gap-2 text-[10px] text-gray-700">
                                                <WifiOff size={10} />
                                                <span className="truncate max-w-[150px] font-mono">{link.url}</span>
                                            </div>
                                        </div>
                                    </div>
                                </motion.a>
                            ))}
                        </div>
                    </div>
                </div>
                </PageTransition>
            </div>

            {/* 申请弹窗 */}
            {mounted && createPortal(
                <AnimatePresence>
                    {isModalOpen && (
                        <>
                            <motion.div
                                initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                                className="fixed inset-0 bg-black/90 backdrop-blur-sm z-[9999]"
                                onClick={() => setIsModalOpen(false)}
                            />
                            <motion.div
                                initial={{ opacity: 0, scale: 0.95, y: 20 }}
                                animate={{ opacity: 1, scale: 1, y: 0 }}
                                exit={{ opacity: 0, scale: 0.95, y: 20 }}
                                className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-md bg-[#121212] border border-ak-cyan/50 p-1 z-[10000] ak-clip-corner"
                            >
                                <div className="bg-[#121212] border border-white/5 p-8 ak-clip-corner relative">
                                    {/* Decorative corners */}
                                    <div className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-ak-cyan" />
                                    <div className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-ak-cyan" />

                                    <div className="flex justify-between items-center mb-8 border-b border-white/10 pb-4">
                                        <h2 className="text-xl font-black text-white italic tracking-tighter">
                                            <span className="text-ak-cyan">友链申请</span> <span>{"// CONNECTION"}</span>
                                        </h2>
                                        <button onClick={() => setIsModalOpen(false)} className="text-gray-500 hover:text-red-500 transition-colors">
                                            <X size={24} />
                                        </button>
                                    </div>

                                    <form onSubmit={handleSubmit} className="space-y-5">
                                        <div className="space-y-1">
                                            <label className="text-[10px] text-ak-cyan font-bold tracking-widest">站点名称 *</label>
                                            <input required className="w-full bg-white/5 border border-white/10 p-3 text-white focus:border-ak-cyan outline-none transition-colors font-mono text-sm placeholder:text-gray-700"
                                                value={formData.name} onChange={e => setFormData({ ...formData, name: e.target.value })} placeholder="例如：Leander's Blog" />
                                        </div>
                                        <div className="space-y-1">
                                            <label className="text-[10px] text-ak-cyan font-bold tracking-widest">站点地址 *</label>
                                            <input required type="url" className="w-full bg-white/5 border border-white/10 p-3 text-white focus:border-ak-cyan outline-none transition-colors font-mono text-sm placeholder:text-gray-700"
                                                value={formData.url} onChange={e => setFormData({ ...formData, url: e.target.value })} placeholder="https://example.com" />
                                        </div>
                                        <div className="space-y-1">
                                            <label className="text-[10px] text-ak-cyan font-bold tracking-widest">站点头像地址 *</label>
                                            <input required type="url" className="w-full bg-white/5 border border-white/10 p-3 text-white focus:border-ak-cyan outline-none transition-colors font-mono text-sm placeholder:text-gray-700"
                                                value={formData.avatar} onChange={e => setFormData({ ...formData, avatar: e.target.value })} placeholder="https://example.com/logo.png" />
                                        </div>
                                        <div className="space-y-1">
                                            <label className="text-[10px] text-gray-500 font-bold tracking-widest">站点描述</label>
                                            <input className="w-full bg-white/5 border border-white/10 p-3 text-white focus:border-ak-cyan outline-none transition-colors font-mono text-sm placeholder:text-gray-700"
                                                value={formData.description} onChange={e => setFormData({ ...formData, description: e.target.value })} placeholder="一句话描述，例如：个人博客 / 技术分享" />
                                        </div>
                                        <div className="space-y-1">
                                            <label className="text-[10px] text-gray-500 font-bold tracking-widest">邮箱（用于接收审核结果）*</label>
                                            <input required type="email" className="w-full bg-white/5 border border-white/10 p-3 text-white focus:border-ak-cyan outline-none transition-colors font-mono text-sm placeholder:text-gray-700"
                                                value={formData.email} onChange={e => setFormData({ ...formData, email: e.target.value })} placeholder="contact@example.com" />
                                        </div>

                                        <button
                                            type="submit"
                                            disabled={submitting}
                                            className="w-full bg-ak-cyan hover:bg-white text-black font-black py-4 mt-6 flex items-center justify-center gap-2 transition-all disabled:opacity-50 uppercase tracking-widest"
                                        >
                                            {submitting ? <Loader2 className="animate-spin" /> : <Send size={18} />}
                                            发送申请
                                        </button>
                                    </form>
                                </div>
                            </motion.div>
                        </>
                    )}
                </AnimatePresence>,
                document.body
            )}

            <CustomPopup
                isOpen={popup.isOpen}
                onClose={() => setPopup(prev => ({ ...prev, isOpen: false }))}
                message={popup.message}
                type={popup.type}
            />
        </div>
    );
}
