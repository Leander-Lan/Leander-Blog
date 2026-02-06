import { getAllPosts } from "@/lib/data";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import SiteHeader from "@/components/SiteHeader";
import {
    Pagination,
    PaginationContent,
    PaginationEllipsis,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
} from "@/components/ui/pagination"
import PageTransition from "@/components/PageTransition"; // 👈 引入动画组件
import ScrollRevealItem from "@/components/ScrollRevealItem"; // 👈 Client Component for scroll reveal

export const dynamic = "force-dynamic";

export default async function BlogIndexPage({
    searchParams,
}: {
    searchParams: Promise<{ page?: string }>;
}) {
    // 等待参数解析 (Next.js 15 写法)
    const { page } = await searchParams;

    // 分页逻辑
    const currentPage = parseInt(page || "1");
    const PAGE_SIZE = 5;

    // 从 API 获取数据
    const { posts, total } = await getAllPosts(currentPage, PAGE_SIZE);
    const totalPages = Math.ceil(total / PAGE_SIZE);
    console.log(`[BlogPage] Page: ${currentPage}, Total: ${total}, TotalPages: ${totalPages}, Posts: ${posts.length}`);

    return (
        <div className="min-h-screen bg-ak-bg text-gray-300 font-mono relative selection:bg-ak-cyan/30 selection:text-ak-cyan">

            <SiteHeader />

            <main className="max-w-5xl mx-auto px-6 pt-36 pb-20 relative z-10">

                {/* 👇👇👇 使用 PageTransition 包裹主要内容区域 */}
                <PageTransition>

                    <ScrollRevealItem className="mb-12 border-b border-white/10 pb-6 flex items-end justify-between">
                        <div>
                            <h1 className="text-4xl md:text-5xl font-black text-white italic tracking-tighter mb-2">
                                ARCHIVES
                            </h1>
                            <div className="flex items-center gap-2 text-ak-cyan font-mono text-sm tracking-[0.3em]">
                                <span className="w-2 h-2 bg-ak-cyan inline-block"></span>
                                {"// 博客归档"}
                            </div>
                        </div>
                        <div className="text-right hidden md:block">
                             <div className="text-xs text-gray-500 tracking-widest mb-1">文章总数</div>
                             <div className="text-2xl font-bold text-ak-yellow">{total.toString().padStart(3, '0')}</div>
                        </div>
                    </ScrollRevealItem>

                    <div className="space-y-6">
                        {posts.map((post, index) => (
                            <ScrollRevealItem key={post.cid} delay={index * 0.1}>
                                <article className="group relative">
                                    {/* 背景装饰 */}
                                    <div className="absolute -inset-0.5 bg-gradient-to-r from-ak-cyan/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 ak-clip-corner" />
                                    
                                    <div className="relative bg-[#1a1a1a] border-l-4 border-white/10 group-hover:border-ak-cyan p-6 transition-all duration-300 ak-clip-corner-br group-hover:-translate-y-1 group-hover:translate-x-1">
                                        
                                        <div className="absolute top-0 right-0 p-2 opacity-20 group-hover:opacity-100 transition-opacity">
                                            <div className="text-[10px] font-bold text-ak-cyan tracking-widest">No.{(currentPage - 1) * PAGE_SIZE + index + 1}</div>
                                        </div>

                                        <div className="flex flex-col md:flex-row gap-6 justify-between items-start">
                                            <div className="space-y-3 flex-1">
                                                <div className="flex items-center gap-3 text-xs text-gray-500 font-bold tracking-wider">
                                                    <span className="text-ak-cyan">[{new Date(post.created * 1000).toLocaleDateString('zh-CN')}]</span>
                                                    <span className="w-px h-3 bg-gray-700" />
                                                    <span className="uppercase text-ak-yellow">
                                                        {post.directory || 'UNCLASSIFIED'}
                                                    </span>
                                                </div>

                                                <Link href={`/blog/${post.cid}`} className="block">
                                                    <h2 className="text-2xl font-bold text-white group-hover:text-ak-cyan transition-colors line-clamp-1 uppercase tracking-tight">
                                                        {post.title}
                                                    </h2>
                                                </Link>

                                                <p className="text-sm text-gray-400 line-clamp-2 leading-relaxed border-l-2 border-white/5 pl-3 group-hover:border-ak-cyan/30 transition-colors">
                                                    {post.text ? post.text.slice(0, 150).replace(/[#*`>]/g, '') : "No content preview..."}...
                                                </p>
                                            </div>

                                            <Link href={`/blog/${post.cid}`} className="self-end md:self-center shrink-0">
                                                <div className="w-12 h-12 bg-white/5 border border-white/10 flex items-center justify-center text-gray-400 group-hover:bg-ak-cyan group-hover:text-black group-hover:border-ak-cyan transition-all clip-path-polygon-[0_0,100%_0,100%_100%,0_100%] group-hover:ak-clip-corner">
                                                    <ArrowRight size={20} />
                                                </div>
                                            </Link>
                                        </div>
                                    </div>
                                </article>
                            </ScrollRevealItem>
                        ))}


                        {/* 空状态提示 */}
                        {posts.length === 0 && (
                            <div className="text-center py-20 text-gray-500 font-mono border border-dashed border-slate-800 rounded-xl">
                                {"// Directory is empty."}
                            </div>
                        )}
                    </div>

                    {/* 分页控制器 (Shadcn UI) - 自定义样式 */}
                    {totalPages > 1 && (
                        <Pagination className="mt-16 pt-8 border-t border-white/10">
                            <PaginationContent>
                                <PaginationItem>
                                    <PaginationPrevious
                                        href={currentPage > 1 ? `/blog?page=${currentPage - 1}` : '#'}
                                        aria-disabled={currentPage <= 1}
                                        className={currentPage <= 1 ? "pointer-events-none opacity-50" : "hover:text-ak-cyan hover:bg-white/5 transition-colors"}
                                    />
                                </PaginationItem>

                                {(() => {
                                    const pages = [];
                                    // Generate page numbers with ellipsis logic
                                    if (totalPages <= 7) {
                                        for (let i = 1; i <= totalPages; i++) pages.push(i);
                                    } else {
                                        if (currentPage <= 4) {
                                            pages.push(1, 2, 3, 4, 5, '...', totalPages);
                                        } else if (currentPage >= totalPages - 3) {
                                            pages.push(1, '...', totalPages - 4, totalPages - 3, totalPages - 2, totalPages - 1, totalPages);
                                        } else {
                                            pages.push(1, '...', currentPage - 1, currentPage, currentPage + 1, '...', totalPages);
                                        }
                                    }

                                    return pages.map((p, i) => (
                                        <PaginationItem key={i}>
                                            {typeof p === 'number' ? (
                                                <PaginationLink
                                                    href={`/blog?page=${p}`}
                                                    isActive={currentPage === p}
                                                    className={currentPage === p
                                                        ? "bg-ak-cyan text-black font-bold border-ak-cyan"
                                                        : "hover:bg-white/5 hover:text-ak-cyan text-gray-500"}
                                                >
                                                    {p}
                                                </PaginationLink>
                                            ) : (
                                                <PaginationEllipsis className="text-gray-600" />
                                            )}
                                        </PaginationItem>
                                    ));
                                })()}

                                <PaginationItem>
                                    <PaginationNext
                                        href={currentPage < totalPages ? `/blog?page=${currentPage + 1}` : '#'}
                                        aria-disabled={currentPage >= totalPages}
                                        className={currentPage >= totalPages ? "pointer-events-none opacity-50" : "hover:text-ak-cyan hover:bg-white/5 transition-colors"}
                                    />
                                </PaginationItem>
                            </PaginationContent>
                        </Pagination>
                    )}

                </PageTransition>
                {/* 👆👆👆 动画包裹结束 */}

            </main>
        </div>
    );
}
