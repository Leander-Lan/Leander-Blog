"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Search, Menu, X, Terminal, Globe, ChevronRight, Loader2 } from "lucide-react";
import { useEffect, useState } from "react";

interface SearchPost {
    cid: number;
    title: string;
    text: string;
    created: number;
    directory?: string;
}

interface RawPost {
    cid: number | string;
    title?: string;
    text?: string;
    created?: number | string;
    directory?: string | null;
}

export default function SiteHeader() {
    const pathname = usePathname();
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isSearchOpen, setIsSearchOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState("");
    const [allPosts, setAllPosts] = useState<SearchPost[]>([]);
    const [searchResults, setSearchResults] = useState<SearchPost[]>([]);
    const [isSearchLoading, setIsSearchLoading] = useState(false);
    const [hasLoadedPosts, setHasLoadedPosts] = useState(false);

    const navItems = [
        { name: 'HOME', path: '/', id: '01' },
        { name: 'BLOG', path: '/blog', id: '02' },
        { name: 'FRIENDS', path: '/links', id: '03' },
        { name: 'ABOUT', path: '/about', id: '04' },
        { name: 'PRIVACY', path: '/privacy', id: '05' }
    ];

    useEffect(() => {
        if (!isSearchOpen || hasLoadedPosts) return;

        const fetchPosts = async () => {
            try {
                setIsSearchLoading(true);
                const res = await fetch("https://blog.tianiel.top/api/posts?page=1&pageSize=1000");
                const data = await res.json();
                const raw = Array.isArray((data as { data?: unknown }).data) ? (data as { data: RawPost[] }).data : [];

                const posts: SearchPost[] = raw.map((item) => ({
                    cid: Number(item.cid),
                    title: item.title ?? "",
                    text: item.text ?? "",
                    created: Number(item.created ?? 0),
                    directory: item.directory ?? undefined
                }));

                posts.sort((a, b) => b.created - a.created);

                setAllPosts(posts);
                setSearchResults(posts.slice(0, 10));
                setHasLoadedPosts(true);
            } catch (error) {
                console.error("Error loading posts for search", error);
            } finally {
                setIsSearchLoading(false);
            }
        };

        fetchPosts();
    }, [isSearchOpen, hasLoadedPosts]);

    useEffect(() => {
        if (!isSearchOpen) return;

        const handleKeyDown = (event: KeyboardEvent) => {
            if (event.key === "Escape") {
                setIsSearchOpen(false);
            }
        };

        window.addEventListener("keydown", handleKeyDown);
        return () => window.removeEventListener("keydown", handleKeyDown);
    }, [isSearchOpen]);

    if (pathname.startsWith("/admin") || pathname === "/login") return null;

    const handleSearchChange = (value: string) => {
        setSearchQuery(value);
        if (!value.trim()) {
            setSearchResults(allPosts.slice(0, 10));
            return;
        }
        const q = value.toLowerCase();
        const filtered = allPosts.filter((post) => {
            return (
                post.title.toLowerCase().includes(q) ||
                post.text.toLowerCase().includes(q)
            );
        });
        setSearchResults(filtered.slice(0, 20));
    };

    return (
        <header className="fixed top-0 left-0 right-0 z-50 pointer-events-none">
            {/* Top Decoration Line */}
            <div className="absolute top-0 w-full h-1 bg-ak-cyan/50 hidden md:block" />
            <div className="absolute top-1 w-full flex justify-between px-4 text-[10px] text-gray-600 font-mono hidden md:flex">
                <span>LEANDER&apos;S BLOG TERMINAL</span>
                <span>CONNECTION: STABLE</span>
            </div>

            <div className="flex items-start justify-between px-4 md:px-12 pt-6 md:pt-8">
                {/* LOGO AREA */}
                <Link href="/" className="pointer-events-auto flex items-center gap-4 group">
                    <div className="relative w-12 h-12 flex items-center justify-center bg-black border border-white/20 ak-clip-corner transition-colors group-hover:border-ak-cyan group-hover:bg-ak-cyan-dim">
                        <Terminal size={24} className="text-white group-hover:text-ak-cyan transition-colors" />
                        <div className="absolute -top-1 -right-1 w-2 h-2 bg-ak-yellow opacity-0 group-hover:opacity-100" />
                    </div>
                    <div className="hidden md:block">
                        <h1 className="text-2xl font-black italic tracking-tighter text-white leading-none">
                            LEANDER&apos;S<span className="text-ak-cyan">_</span>BLOG
                        </h1>
                        <p className="text-[10px] text-gray-500 font-mono tracking-[0.2em] mt-1">
                            PERSONAL TERMINAL V2.0
                        </p>
                    </div>
                </Link>

                {/* DESKTOP NAV */}
                <nav className="pointer-events-auto hidden md:flex items-center gap-1 bg-black/80 backdrop-blur-md border border-white/10 px-6 py-2 ak-clip-corner-tl">
                    {navItems.map((item) => {
                        const isActive = pathname === item.path || (item.path !== '/' && pathname.startsWith(item.path));
                        return (
                            <Link
                                key={item.name}
                                href={item.path}
                                className={`relative px-4 py-2 font-bold font-mono text-sm tracking-wider transition-all hover:text-ak-cyan ${isActive ? 'text-ak-cyan' : 'text-gray-400'}`}
                            >
                                <span className="text-[10px] mr-1 opacity-50">{item.id}</span>
                                {item.name}
                                {isActive && (
                                    <motion.div
                                        layoutId="nav-active"
                                        className="absolute bottom-0 left-0 w-full h-[2px] bg-ak-cyan"
                                        transition={{ type: "spring", stiffness: 300, damping: 30 }}
                                    />
                                )}
                            </Link>
                        );
                    })}
                    <div className="w-px h-6 bg-white/20 mx-2" />
                    <button
                        className="text-gray-400 hover:text-white transition-colors"
                        onClick={() => setIsSearchOpen(true)}
                        aria-label="搜索文章"
                    >
                        <Search size={18} />
                    </button>
                </nav>

                {/* MOBILE MENU TOGGLE */}
                <button
                    className="pointer-events-auto md:hidden w-12 h-12 flex items-center justify-center bg-black/80 border border-white/20 ak-clip-corner text-white active:bg-ak-cyan active:text-black transition-colors"
                    onClick={() => setIsMenuOpen(!isMenuOpen)}
                >
                    {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
                </button>
            </div>

            {/* MOBILE MENU DROPDOWN */}
            <AnimatePresence>
                {isMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0, x: "100%" }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: "100%" }}
                        transition={{ type: "tween", duration: 0.3 }}
                        className="fixed inset-0 top-20 z-40 bg-black/95 backdrop-blur-xl md:hidden pointer-events-auto border-t border-ak-cyan/30"
                    >
                        <div className="flex flex-col p-8 gap-6 h-full relative overflow-hidden">
                            <div className="absolute top-0 right-0 opacity-10 pointer-events-none">
                                <Globe size={300} />
                            </div>

                            {navItems.map((item, index) => (
                                <motion.div
                                    key={item.name}
                                    initial={{ opacity: 0, x: 20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: index * 0.1 }}
                                >
                                    <Link
                                        href={item.path}
                                        onClick={() => setIsMenuOpen(false)}
                                        className="group flex items-center justify-between border-b border-white/10 pb-4"
                                    >
                                        <div>
                                            <span className="block text-xs text-ak-cyan font-mono mb-1">NO.{item.id}</span>
                                            <span className="text-3xl font-black text-white group-hover:translate-x-4 transition-transform inline-block">
                                                {item.name}
                                            </span>
                                        </div>
                                        <ChevronRight className="text-gray-600 group-hover:text-ak-cyan group-hover:opacity-100 opacity-0 transition-all" />
                                    </Link>
                                </motion.div>
                            ))}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            <AnimatePresence>
                {isSearchOpen && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-[80] bg-black/90 backdrop-blur-xl pointer-events-auto flex items-start justify-center pt-24 px-3 sm:pt-32 sm:px-4"
                        onClick={() => setIsSearchOpen(false)}
                    >
                        <motion.div
                            initial={{ opacity: 0, y: 20, scale: 0.98 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            exit={{ opacity: 0, y: 10, scale: 0.98 }}
                            transition={{ type: "spring", stiffness: 260, damping: 22 }}
                            className="w-full max-w-3xl bg-[#0b0b0b] border border-ak-cyan/40 ak-clip-corner relative p-4 sm:p-6 max-h-[80vh] flex flex-col"
                            onClick={(event) => event.stopPropagation()}
                        >
                            <div className="flex items-center justify-between mb-4">
                                <div className="flex items-center gap-2 text-xs text-ak-cyan font-mono tracking-[0.25em]">
                                    <Search size={14} className="text-ak-cyan" />
                                    <span>SEARCH_CONSOLE</span>
                                </div>
                                <button
                                    onClick={() => setIsSearchOpen(false)}
                                    className="text-gray-500 hover:text-white transition-colors"
                                    aria-label="关闭搜索"
                                >
                                    <X size={18} />
                                </button>
                            </div>

                            <div className="mb-3 sm:mb-4">
                                <input
                                    autoFocus
                                    value={searchQuery}
                                    onChange={(event) => handleSearchChange(event.target.value)}
                                    placeholder="输入关键字搜索文章标题或正文..."
                                    className="w-full bg-black/60 border border-white/10 px-3 py-2.5 sm:px-4 sm:py-3 text-sm text-white outline-none focus:border-ak-cyan transition-colors font-mono"
                                />
                                <div className="mt-2 text-[10px] text-gray-500 font-mono flex justify-between gap-2">
                                    <span>
                                        {isSearchLoading
                                            ? "正在加载文章索引..."
                                            : `共 ${allPosts.length} 篇文章，可按标题 / 内容搜索`}
                                    </span>
                                    <span>ESC 关闭</span>
                                </div>
                            </div>

                            <div className="flex-1 min-h-0 overflow-y-auto border-t border-white/10 pt-4 mt-2 space-y-2">
                                {isSearchLoading && (
                                    <div className="flex items-center justify-center py-10 text-gray-500 text-sm gap-2">
                                        <Loader2 className="animate-spin" size={16} />
                                        <span>正在加载文章列表...</span>
                                    </div>
                                )}

                                {!isSearchLoading && searchResults.length === 0 && (
                                    <div className="py-10 text-center text-gray-500 text-sm">
                                        未找到匹配的文章。
                                    </div>
                                )}

                                {!isSearchLoading &&
                                    searchResults.map((post) => (
                                        <Link
                                            key={post.cid}
                                            href={`/blog/${post.cid}`}
                                            className="block bg-[#111111] border border-white/5 hover:border-ak-cyan/60 px-4 py-3 transition-colors ak-clip-corner"
                                            onClick={() => setIsSearchOpen(false)}
                                        >
                                            <div className="flex items-center justify-between gap-3">
                                                <div className="flex-1 min-w-0">
                                                    <div className="flex items-center gap-2 text-[10px] text-gray-500 font-mono mb-1">
                                                        <span className="text-ak-cyan">
                                                            [{new Date(post.created * 1000).toLocaleDateString("zh-CN")}]
                                                        </span>
                                                        {post.directory && (
                                                            <>
                                                                <span className="w-px h-3 bg-gray-700" />
                                                                <span className="text-ak-yellow uppercase">
                                                                    {post.directory}
                                                                </span>
                                                            </>
                                                        )}
                                                    </div>
                                                    <div className="text-sm text-white font-bold truncate">
                                                        {post.title}
                                                    </div>
                                                    <div className="text-[11px] text-gray-500 mt-1 line-clamp-2">
                                                        {post.text.replace(/[#*`>]/g, "").slice(0, 80)}...
                                                    </div>
                                                </div>
                                                <ChevronRight className="text-gray-600 shrink-0" size={16} />
                                            </div>
                                        </Link>
                                    ))}
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </header>
    );
}
