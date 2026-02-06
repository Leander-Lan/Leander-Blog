import { getPostById } from "@/lib/data";
import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { ArrowLeft, Calendar, Clock, FileText } from "lucide-react";
import SiteHeader from "@/components/SiteHeader";
import CommentsSection from "@/components/CommentsSection";
import PageTransition from "@/components/PageTransition";
import MarkdownRender from "@/components/MarkdownRender";

export const dynamic = "force-dynamic";

export default async function BlogPostPage({
    params,
}: {
    params: Promise<{ id: string }>;
}) {
    const { id } = await params;
    const post = await getPostById(id);

    if (!post) {
        return notFound();
    }

    const isAdmin = false;

    return (
        <div className="min-h-screen bg-ak-bg text-gray-300 font-mono selection:bg-ak-cyan/30 selection:text-ak-cyan">

            <SiteHeader />

            <main className="max-w-4xl mx-auto px-6 pt-32 pb-20 relative z-10">

                <PageTransition>

                    {/* Navigation Bar */}
                    <div className="flex items-center justify-between mb-12 border-b border-white/10 pb-4">
                         <Link href="/blog" className="inline-flex items-center gap-2 text-gray-500 hover:text-ak-cyan transition-colors group text-sm tracking-widest uppercase">
                            <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
                            {"// Return to Archives"}
                        </Link>
                        <div className="text-xs text-ak-cyan tracking-[0.2em] animate-pulse">
                            SECURE CONNECTION ESTABLISHED
                        </div>
                    </div>

                    <article className="relative">
                        {/* Decorative Background Elements */}
                        <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-ak-cyan/10 to-transparent pointer-events-none opacity-50" />
                        <div className="absolute top-4 right-4 w-16 h-1 border-t border-r border-ak-cyan/50 rounded-tr-xl" />

                        <header className="mb-16 relative">
                            <div className="inline-block bg-ak-yellow text-black text-xs font-bold px-2 py-1 mb-6 tracking-widest uppercase">
                                Confidential // Level 3
                            </div>

                            <h1 className="text-3xl md:text-5xl font-black text-white leading-tight mb-8 tracking-tight">
                                {post.title}
                            </h1>

                            {/* Metadata Grid */}
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 border-y border-white/10 py-6 bg-white/5 backdrop-blur-sm">
                                <div className="flex items-center gap-3 px-4 border-r border-white/5 last:border-0">
                                    <div className="p-2 bg-white/5 rounded-full text-ak-cyan">
                                        <Calendar size={14} />
                                    </div>
                                    <div className="flex flex-col">
                                        <span className="text-[10px] text-gray-500 uppercase tracking-wider">Date</span>
                                        <span className="text-xs font-bold text-white">{new Date(post.created * 1000).toLocaleDateString('zh-CN')}</span>
                                    </div>
                                </div>
                                
                                <div className="flex items-center gap-3 px-4 border-r border-white/5 last:border-0">
                                    <div className="p-2 bg-white/5 rounded-full text-ak-cyan">
                                        <Clock size={14} />
                                    </div>
                                    <div className="flex flex-col">
                                        <span className="text-[10px] text-gray-500 uppercase tracking-wider">Time</span>
                                        <span className="text-xs font-bold text-white">{new Date(post.created * 1000).toLocaleTimeString('zh-CN')}</span>
                                    </div>
                                </div>

                                <div className="flex items-center gap-3 px-4 border-r border-white/5 last:border-0">
                                    <div className="p-2 bg-white/5 rounded-full text-ak-cyan">
                                        <FileText size={14} />
                                    </div>
                                    <div className="flex flex-col">
                                        <span className="text-[10px] text-gray-500 uppercase tracking-wider">Category</span>
                                        <span className="text-xs font-bold text-ak-yellow uppercase">{post.directory || 'System'}</span>
                                    </div>
                                </div>

                                <div className="flex items-center gap-3 px-4">
                                    <div className="relative w-8 h-8 rounded-full overflow-hidden border border-ak-cyan/50">
                                        <Image
                                            src="/avatar.png"
                                            alt="Leander"
                                            fill
                                            className="object-cover"
                                        />
                                    </div>
                                    <div className="flex flex-col">
                                        <span className="text-[10px] text-gray-500 uppercase tracking-wider">Operator</span>
                                        <span className="text-xs font-bold text-white">{post.author?.screenName || 'Leander'}</span>
                                    </div>
                                </div>
                            </div>
                        </header>

                        <div className="mb-20 p-1 md:p-8 border border-white/5 bg-[#0a0a0a] relative overflow-hidden rounded-sm">
                             {/* Scanline Effect (Optional, kept subtle) */}
                             <div className="absolute inset-0 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] z-[1] bg-[length:100%_4px,3px_100%] pointer-events-none opacity-20" />
                            
                             <div className="relative z-10">
                                <MarkdownRender content={post.text} />
                             </div>
                        </div>
                    </article>

                    <CommentsSection postId={post.cid.toString()} isAdmin={isAdmin} />

                </PageTransition>

            </main>
        </div>
    );
}
