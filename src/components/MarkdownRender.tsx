"use client"

import React from "react"
import Image from "next/image"
import ReactMarkdown from "react-markdown"
import rehypeHighlight from "rehype-highlight"
import remarkGfm from "remark-gfm"
import "highlight.js/styles/atom-one-dark.css" // Switch to atom-one-dark for better contrast
import Scode from "./Scode"
import { Components } from "react-markdown"

type ScodeType = "warning" | "info" | "success" | "destructive"
type ScodeSize = "sm" | "md" | "lg"

function preprocessMarkdown(markdownContent: string) {
    const result: (string | React.ReactElement)[] = []
    let lastIndex = 0

    // Adjusted regex to match [scode type="..."]...[/scode]
    const regex = /\[scode(?:\s+type="([^"]*)")?(?:\s+size="([^"]*)")?\]([\s\S]*?)\[\/scode\]/g
    let match

    while ((match = regex.exec(markdownContent)) !== null) {

        if (match.index > lastIndex) {
            result.push(markdownContent.slice(lastIndex, match.index))
        }

        // Default to 'info' if type is not specified or invalid, but allow passing string
        const typeStr = match[1] || "info"
        // Validate type
        const type = ["warning", "info", "success", "destructive"].includes(typeStr)
            ? typeStr as ScodeType
            : "info"

        const size = (match[2] || "md") as ScodeSize
        const scodeContent = match[3]

        result.push(
            <Scode key={match.index} type={type} size={size}>
                {scodeContent}
            </Scode>
        )

        lastIndex = match.index + match[0].length
    }

    if (lastIndex < markdownContent.length) {
        result.push(markdownContent.slice(lastIndex))
    }

    return result
}

export default function MarkdownRender({ content }: { content: string }) {
    const components = {
        img: (props: React.ImgHTMLAttributes<HTMLImageElement> & { node?: unknown }) => (
            <div className="relative inline-block my-4">
                <Image
                    src={typeof props.src === "string" ? props.src : ""}
                    alt={props.alt || ""}
                    width={typeof props.width === "number" ? props.width : Number(props.width) || 1200}
                    height={typeof props.height === "number" ? props.height : Number(props.height) || 800}
                    unoptimized
                    className="mx-auto shadow-lg max-w-full h-auto ak-clip-corner border border-white/10"
                    style={{ maxHeight: 600, objectFit: "contain" }}
                />
                 {/* Decorative corners for images */}
                 <div className="absolute -bottom-1 -right-1 w-4 h-4 border-b-2 border-r-2 border-ak-cyan opacity-50 pointer-events-none"></div>
            </div>
        ),
        pre: (props: React.HTMLAttributes<HTMLPreElement> & { node?: unknown }) => (
            <div className="relative group">
                <div className="absolute top-0 right-0 px-2 py-1 bg-white/5 text-[10px] text-gray-500 font-mono rounded-bl">CODE_BLOCK</div>
                <pre
                    {...props}
                    className="ak-clip-corner p-0 overflow-hidden shadow-lg my-8 bg-[#1a1a1a] border-l-2 border-white/10 group-hover:border-ak-cyan transition-colors"
                />
            </div>
        ),
        code: ({ className, children, ...props }: React.HTMLAttributes<HTMLElement> & { node?: unknown, className?: string }) => {
            const match = /language-(\w+)/.exec(className || '')
            const isInline = !match && !String(children).includes('\n')

            return (
                <code
                    {...props}
                    className={className}
                    style={isInline ? {
                        fontSize: '0.9em',
                        backgroundColor: 'rgba(35, 173, 229, 0.1)', // ak-cyan tint
                        color: '#23ADE5', // ak-cyan
                        padding: '0.2em 0.4em',
                        borderRadius: '0px', // Sharp corners
                        fontFamily: 'var(--font-mono)',
                    } : undefined}
                >
                    {children}
                </code>
            )
        },
        a: (props: React.AnchorHTMLAttributes<HTMLAnchorElement> & { node?: unknown }) => (
            <a
                {...props}
                target="_blank"
                rel="noopener noreferrer"
                className="text-ak-cyan hover:text-ak-yellow hover:underline decoration-dashed underline-offset-4 transition-colors"
            />
        ),
        blockquote: (props: React.QuoteHTMLAttributes<HTMLQuoteElement> & { node?: unknown }) => (
            <blockquote {...props} className="border-l-4 border-ak-yellow bg-ak-yellow/5 py-2 px-4 italic text-gray-400 my-6" />
        ),
        hr: (props: React.HTMLAttributes<HTMLHRElement> & { node?: unknown }) => (
            <hr {...props} className="border-t border-dashed border-white/20 my-8 relative after:content-['//'] after:absolute after:left-1/2 after:-top-3 after:-translate-x-1/2 after:bg-[#050505] after:px-2 after:text-gray-600 after:text-xs" />
        )
    } as Components

    const processedContent = preprocessMarkdown(content || "")

    return (
        <div className="prose prose-invert max-w-none prose-headings:font-mono prose-headings:font-bold prose-p:text-gray-400 prose-li:text-gray-400">
            {processedContent.map((part, index) => {
                if (React.isValidElement(part)) {
                    return part
                }
                return (
                    <ReactMarkdown
                        key={index}
                        components={components}
                        remarkPlugins={[remarkGfm]}
                        rehypePlugins={[rehypeHighlight]}
                    >
                        {part as string}
                    </ReactMarkdown>
                )
            })}
        </div>
    )
}
