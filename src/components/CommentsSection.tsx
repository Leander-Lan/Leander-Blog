"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import type { ReactNode } from "react";
import Image from "next/image";
import { Send, Loader2, Trash2, MessageSquare, MapPin, Monitor } from "lucide-react";
import CustomPopup from "./CustomPopup";

import { MD5 } from "crypto-js";
import UAParser from "ua-parser-js";


// Interface definitions based on demo
interface Comment {
    coid: number;
    cid: number;
    created: number;
    author: string;
    authorId: string;
    ownerId: string;
    mail: string;
    url: string | null;
    ip: string;
    agent: string;
    text: string;
    type: string;
    status: string;
    parent: string;
    stars: string;
}

interface CommentsSectionProps {
    postId: string;
    isAdmin: boolean;
}

type RawComment = Omit<Comment, "created" | "parent"> & {
    created?: number | string;
    parent?: string | number | null;
};

type CommentsApiResponse = {
    data?: RawComment[];
};

type IpLookupResponse = {
    country?: string;
    province?: string;
    city?: string;
    region?: string;
    addr?: string;
};

// Helper to get all descendant comments
function getAllDescendants(comments: Comment[], parentId: string): Comment[] {
    const result: Comment[] = [];
    function findChildren(pid: string) {
        comments.forEach(c => {
            if (c.parent === pid) {
                result.push(c);
                findChildren(c.coid.toString());
            }
        });
    }
    findChildren(parentId);
    return result;
}

const CommentItem = ({
                         comment,
                         allComments,
                         onReply,
                         isAdmin,
                         onDelete,
                         deletingId,
                         locationMap
                     }: {
    comment: Comment;
    allComments: Comment[];
    onReply: (author: string, parentId: string) => void;
    isAdmin: boolean;
    onDelete: (id: string) => void;
    deletingId: string | null;
    locationMap: Record<string, string>;
}) => {
    const descendants = getAllDescendants(allComments, comment.coid.toString());

    const parseEmoji = (text: string) => {
        const parts: (string | ReactNode)[] = [];
        let lastIndex = 0;
        const regex = /::furry:(\d+)::/g;
        let match;

        while ((match = regex.exec(text)) !== null) {
            if (match.index > lastIndex) {
                parts.push(text.substring(lastIndex, match.index));
            }
            parts.push(
                <Image
                    key={`emoji-${match.index}`}
                    src={`https://blog.tianiel.top/usr/themes/Mirages/usr/biaoqing/furry/${match[1]}.png`}
                    alt={`furry:${match[1]}`}
                    width={32}
                    height={32}
                    unoptimized
                    className="inline-block w-8 h-8 align-text-bottom mx-1"
                />
            );
            lastIndex = regex.lastIndex;
        }

        if (lastIndex < text.length) {
            parts.push(text.substring(lastIndex));
        }

        return parts.length > 0 ? parts : [text];
    };

    const getAvatarUrl = (mail: string) => {
        if (!mail) return null;
        if (mail.includes('@qq.com')) {
            const qq = mail.replace('@qq.com', '');
            if (/^\d+$/.test(qq)) {
                return `https://q1.qlogo.cn/g?b=qq&nk=${qq}&s=100`;
            }
        }

        // Gravatar fallback for non-QQ emails
        const hash = MD5(mail.trim().toLowerCase()).toString();
        // Use Cravatar as a mirror for China (supports Gravatar, QQ, etc.)
        return `https://cravatar.cn/avatar/${hash}?d=mm`;
    };

    const avatarUrl = getAvatarUrl(comment.mail);

    const parser = new UAParser(comment.agent);
    const br = parser.getBrowser();
    const os = parser.getOS();
    const uaText = `${os.name ?? '未知系统'}${os.version ? ' ' + os.version : ''} · ${br.name ?? '未知浏览器'}${br.version ? ' ' + br.version : ''}`;
    const regionText = locationMap[comment.ip] ?? '未知归属地';

    return (
        <div className="relative group bg-[#1F1F1F] border-l-2 border-l-white/10 hover:border-l-ak-cyan transition-colors p-5 mb-4">
            {/* Background Lines */}
            <div className="absolute right-0 top-0 w-32 h-full bg-[linear-gradient(90deg,transparent_0%,rgba(255,255,255,0.02)_100%)] pointer-events-none" />

            {isAdmin && (
                <button
                    onClick={() => onDelete(comment.coid.toString())}
                    disabled={deletingId === comment.coid.toString()}
                    className="absolute top-4 right-4 p-2 text-gray-500 hover:text-red-500 hover:bg-red-500/10 rounded-sm transition-all opacity-0 group-hover:opacity-100 disabled:opacity-50 z-10"
                    title="Delete Comment"
                >
                    {deletingId === comment.coid.toString() ? <Loader2 size={16} className="animate-spin" /> : <Trash2 size={16} />}
                </button>
            )}

            <div className="flex gap-4 relative z-10">
                <div className="shrink-0">
                    {avatarUrl ? (
                        <div className="w-12 h-12 relative">
                            <Image
                                src={avatarUrl}
                                alt={comment.author}
                                fill
                                sizes="48px"
                                unoptimized
                                className="object-cover ak-clip-corner-tl"
                            />
                            <div className="absolute inset-0 border border-white/10 ak-clip-corner-tl pointer-events-none" />
                        </div>
                    ) : (
                        <div className="w-12 h-12 bg-ak-cyan/20 text-ak-cyan flex items-center justify-center font-bold ak-clip-corner-tl border border-ak-cyan/30">
                            {comment.author.charAt(0).toUpperCase()}
                        </div>
                    )}
                </div>
                
                <div className="flex-1 min-w-0">
                    <div className="flex flex-wrap items-center gap-x-3 gap-y-1 mb-2">
                        <span className="text-white font-bold tracking-wide uppercase">{comment.author}</span>
                        <span className="text-xs text-ak-cyan font-mono px-1 bg-ak-cyan/10 border border-ak-cyan/20">
                            ID: {comment.coid}
                        </span>
                        <span className="text-xs text-gray-500 font-mono">
                            {new Date(comment.created * 1000).toLocaleString()}
                        </span>
                    </div>
                    
                    <div className="flex flex-wrap gap-3 text-[10px] text-gray-600 font-mono mb-3 uppercase tracking-wider">
                         <div className="flex items-center gap-1">
                             <Monitor size={10} /> {uaText}
                         </div>
                         <div className="flex items-center gap-1">
                             <MapPin size={10} /> {regionText}
                         </div>
                    </div>

                    <div className="text-gray-300 text-sm leading-relaxed break-words whitespace-pre-wrap mb-4 border-l border-white/10 pl-3">
                        {parseEmoji(comment.text)}
                    </div>

                    <div className="flex items-center gap-3">
                        <button
                            className="text-xs font-bold text-ak-cyan hover:text白 transition-colors flex items-center gap-1 uppercase tracking-wider"
                            onClick={() => onReply(comment.author, comment.coid.toString())}
                        >
                            <MessageSquare size={12} />
                            回复此记录
                        </button>
                        {descendants.length > 0 && (
                            <span className="text-xs text-gray-600 font-mono">{"// 发现 "}{descendants.length}{" 条子回复"}</span>
                        )}
                    </div>
                </div>
            </div>

            {/* Descendants (Flattened logic from demo) */}
            {descendants.length > 0 && (
                <div className="mt-4 pl-4 md:pl-12 border-l border-dashed border-white/10 space-y-4">
                    {descendants.map(child => {
                        const childAvatar = getAvatarUrl(child.mail);
                        return (
                        <div key={child.coid} className="relative group bg-[#161616] p-4 border border-white/5">
                            {isAdmin && (
                                <button
                                    onClick={() => onDelete(child.coid.toString())}
                                    disabled={deletingId === child.coid.toString()}
                                    className="absolute top-2 right-2 p-1.5 text-gray-500 hover:text-red-500 hover:bg-red-500/10 rounded transition-all opacity-0 group-hover:opacity-100 disabled:opacity-50 z-10"
                                >
                                    {deletingId === child.coid.toString() ? <Loader2 size={14} className="animate-spin" /> : <Trash2 size={14} />}
                                </button>
                            )}
                            <div className="flex gap-3">
                                <div className="shrink-0">
                                    {childAvatar ? (
                                        <div className="w-8 h-8 relative">
                                            <Image
                                                src={childAvatar}
                                                alt={child.author}
                                                fill
                                                sizes="32px"
                                                unoptimized
                                                className="object-cover"
                                            />
                                        </div>
                                    ) : (
                                        <div className="w-8 h-8 bg-slate-800 text-gray-400 flex items-center justify-center font-bold text-xs">
                                            {child.author.charAt(0).toUpperCase()}
                                        </div>
                                    )}
                                </div>
                                <div className="flex-1 min-w-0">
                                    <div className="flex items-center gap-2 mb-1">
                                        <span className="text-gray-200 text-sm font-bold">{child.author}</span>
                                        <span className="text-[10px] text-gray-600 font-mono uppercase">
                                            {new Date(child.created * 1000).toLocaleString()}
                                        </span>
                                    </div>
                                    
                                    <div className="text-gray-400 text-xs mt-1 mb-2">
                                        {parseEmoji(child.text)}
                                    </div>
                                    
                                    <button
                                        className="text-[10px] font-bold text-ak-cyan hover:text-white transition-colors uppercase"
                                        onClick={() => onReply(child.author, child.coid.toString())}
                                    >
                                        回复
                                    </button>
                                </div>
                            </div>
                        </div>
                        );
                    })}
                </div>
            )}
        </div>
    );
};

export default function CommentsSection({ postId, isAdmin }: CommentsSectionProps) {
    const [comments, setComments] = useState<Comment[]>([]);
    const [loading, setLoading] = useState(true);
    const [submitting, setSubmitting] = useState(false);
    const [locationMap, setLocationMap] = useState<Record<string, string>>({});
    const [popup, setPopup] = useState<{ isOpen: boolean; message: string; type: "success" | "error" }>({
        isOpen: false,
        message: "",
        type: "success"
    });

    // Form State
    const [commentForm, setCommentForm] = useState({ author: '', mail: '', text: '', parent: '0' });
    const [replyTo, setReplyTo] = useState<string | null>(null);
    const textareaRef = useRef<HTMLTextAreaElement>(null);

    // Deleting State
    const [deletingId, setDeletingId] = useState<string | null>(null);

    // Fetch Comments
    const fetchComments = useCallback(async () => {
        try {
            const res = await fetch(`https://blog.tianiel.top/api/commentsByCid?cid=${postId}`);
            const data = (await res.json()) as CommentsApiResponse;
            const list = Array.isArray(data.data) ? data.data : [];
            const mapped: Comment[] = list.map((c) => ({
                coid: Number(c.coid ?? 0),
                cid: Number(c.cid ?? 0),
                created: Number(c.created ?? 0),
                author: c.author ?? "",
                authorId: c.authorId ?? "",
                ownerId: c.ownerId ?? "",
                mail: c.mail ?? "",
                url: c.url ?? null,
                ip: c.ip ?? "",
                agent: c.agent ?? "",
                text: c.text ?? "",
                type: c.type ?? "",
                status: c.status ?? "",
                parent: String(c.parent ?? "0"),
                stars: c.stars ?? ""
            }));
            setComments(mapped);
        } catch (error) {
            console.error("Failed to fetch comments", error);
        } finally {
            setLoading(false);
        }
    }, [postId]);

    useEffect(() => {
        fetchComments();
    }, [fetchComments]);

    useEffect(() => {
        const ips = Array.from(new Set(comments.map(c => c.ip).filter(Boolean)));
        const pending = ips.filter(ip => !(ip in locationMap));
        if (pending.length === 0) return;
        Promise.all(
            pending.map(async ip => {
                try {
                    const res = await fetch(`https://ip.useragentinfo.com/json?ip=${ip}`);
                    const data = (await res.json()) as IpLookupResponse;
                    const country = typeof data.country === "string" ? data.country.trim() : "";
                    const province = typeof data.province === "string" ? data.province.trim() : "";
                    const city = typeof data.city === "string" ? data.city.trim() : "";
                    const fallbackRegion = typeof data.region === "string" ? data.region.trim() : "";
                    const fallbackAddr = typeof data.addr === "string" ? data.addr.trim() : "";
                    let region = '';
                    if (province || city) {
                        region = [province, city].filter(Boolean).join('·');
                        if (country && country !== '中国') {
                            region = `${country}·${region}`;
                        }
                    } else if (country) {
                        region = country;
                    }
                    const resolved = region || fallbackRegion || fallbackAddr || '未知归属地';
                    return [ip, resolved] as [string, string];
                } catch {
                    return [ip, '未知归属地'] as [string, string];
                }
            })
        ).then(entries => {
            const addition: Record<string, string> = {};
            entries.forEach(([ip, region]) => {
                addition[ip] = region;
            });
            setLocationMap(prev => ({ ...prev, ...addition }));
        });
    }, [comments, locationMap]);


    // Reply Handler
    const handleReply = (author: string, parentId: string) => {
        setReplyTo(author);
        setCommentForm(prev => ({ ...prev, parent: parentId }));
        // Scroll to form
        document.getElementById('comment-form')?.scrollIntoView({ behavior: 'smooth' });
    };

    // Submit Handler
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setSubmitting(true);
        try {
            await fetch('https://blog.tianiel.top/api-comment.php', {
                method: 'POST',
                headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
                body: new URLSearchParams({
                    cid: postId,
                    author: commentForm.author,
                    mail: commentForm.mail,
                    text: commentForm.text,
                    parent: commentForm.parent
                })
            });

            // Allow success even if API doesn't return standard JSON, just refetch
            setCommentForm({ author: '', mail: '', text: '', parent: '0' });
            setReplyTo(null);
            fetchComments();
            setPopup({
                isOpen: true,
                message: "评论已提交！感谢您的分享。\nComment submitted successfully!",
                type: "success"
            });
        } catch (error) {
            console.error(error);
            setPopup({
                isOpen: true,
                message: "评论提交失败，请稍后重试。\nFailed to submit comment.",
                type: "error"
            });
        } finally {
            setSubmitting(false);
        }
    };

    // Delete Handler (Mock or Real if API supports it)
    const handleDelete = async (id: string) => {
        if (!confirm("⚠️ Are you sure? This action might not be supported by the public API yet.")) return;
        setDeletingId(id);
        
        setTimeout(() => {
            setPopup({
                isOpen: true,
                message: "删除功能暂时不可用。\nDelete functionality requires admin token.",
                type: "error"
            });
            setDeletingId(null);
        }, 1000);
    };

    return (
        <section className="mt-16 pt-12 border-t border-ak-cyan/30">
            <h2 className="text-2xl font-bold text-white mb-8 flex items-center gap-2 uppercase tracking-wider">
                <span className="text-ak-cyan">{"//"}</span> Communication_Log <span className="text-gray-500 text-sm font-normal">({comments.length})</span>
            </h2>

            {/* Comment Form */}
            <div id="comment-form" className="mb-12 bg-[#1F1F1F] ak-clip-corner p-6 relative border border-white/5">
                <div className="absolute top-0 right-0 p-2 opacity-20 pointer-events-none">
                     <div className="text-[10px] font-mono text-ak-cyan text-right">INPUT_MODULE_V2</div>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4">
                    {replyTo && (
                        <div className="flex items-center gap-2 text-xs text-ak-yellow bg-ak-yellow/10 p-2 border-l-2 border-ak-yellow">
                            <span>正在回复：</span>
                            <span className="font-bold">{replyTo}</span>
                            <button
                                type="button"
                                onClick={() => {
                                    setReplyTo(null);
                                    setCommentForm(prev => ({ ...prev, parent: '0' }));
                                }}
                                className="ml-auto underline hover:text-white"
                            >
                                取消回复
                            </button>
                        </div>
                    )}

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="relative group">
                            <input
                                required
                                placeholder="昵称（必填）"
                                value={commentForm.author}
                                onChange={e => setCommentForm({ ...commentForm, author: e.target.value })}
                                className="w-full bg-[#121212] border border-white/10 p-3 text-sm text-white focus:border-ak-cyan outline-none transition-all placeholder:text-gray-600 font-mono"
                            />
                            <div className="absolute bottom-0 left-0 h-[1px] w-0 bg-ak-cyan group-focus-within:w-full transition-all duration-300" />
                        </div>
                        <div className="relative group">
                            <input
                                type="email"
                                required
                                placeholder="邮箱（必填，仅用于展示头像与联系）"
                                value={commentForm.mail}
                                onChange={e => setCommentForm({ ...commentForm, mail: e.target.value })}
                                className="w-full bg-[#121212] border border-white/10 p-3 text-sm text-white focus:border-ak-cyan outline-none transition-all placeholder:text-gray-600 font-mono"
                            />
                            <div className="absolute bottom-0 left-0 h-[1px] w-0 bg-ak-cyan group-focus-within:w-full transition-all duration-300" />
                        </div>
                    </div>

                    <div className="relative group">
                        <textarea
                            ref={textareaRef}
                            required
                            placeholder="写下你想说的话……"
                            rows={4}
                            value={commentForm.text}
                            onChange={e => setCommentForm({ ...commentForm, text: e.target.value })}
                            className="w-full bg-[#121212] border border-white/10 p-3 text-sm text-white focus:border-ak-cyan outline-none resize-none transition-all placeholder:text-gray-600 font-mono"
                        />
                        <div className="absolute bottom-1 left-0 h-[1px] w-0 bg-ak-cyan group-focus-within:w-full transition-all duration-300" />
                    </div>

                    <button
                        type="submit"
                        disabled={submitting}
                        className="px-8 py-2 bg-ak-cyan/10 hover:bg-ak-cyan text-ak-cyan hover:text-black border border-ak-cyan rounded-sm font-bold flex items-center gap-2 disabled:opacity-50 transition-all text-sm ml-auto uppercase tracking-widest ak-clip-corner"
                    >
                        {submitting ? <Loader2 className="animate-spin" size={16} /> : <Send size={16} />}
                        发送评论
                    </button>
                </form>
            </div>

            {/* Comment List */}
            {loading ? (
                <div className="flex flex-col items-center justify-center py-12 space-y-4">
                    <Loader2 className="animate-spin text-ak-cyan" size={32} />
                    <div className="text-xs text-gray-500 font-mono animate-pulse">正在同步评论数据...</div>
                </div>
            ) : comments.length > 0 ? (
                <div className="space-y-6">
                    {comments
                        .filter(c => c.parent === '0')
                        .sort((a, b) => b.created - a.created)
                        .map(comment => (
                            <CommentItem
                                key={comment.coid}
                                comment={comment}
                                allComments={comments}
                                onReply={handleReply}
                                isAdmin={isAdmin}
                                onDelete={handleDelete}
                                deletingId={deletingId}
                                locationMap={locationMap}
                            />
                        ))}
                </div>
            ) : (
                <div className="text-center py-12 border border-dashed border-white/10 bg-[#121212]">
                    <p className="text-gray-500 font-mono mb-2">暂时还没有评论</p>
                    <p className="text-xs text-gray-700">欢迎留下第一条想法。</p>
                </div>
            )}
            
            <CustomPopup 
                isOpen={popup.isOpen}
                onClose={() => setPopup(prev => ({ ...prev, isOpen: false }))}
                message={popup.message}
                type={popup.type}
            />
        </section>
    );
}
