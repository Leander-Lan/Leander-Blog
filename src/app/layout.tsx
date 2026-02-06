import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";


import { Toaster } from "sonner";
import AnimatedBackground from "@/components/AnimatedBackground";
import CookieConsent from "@/components/CookieConsent";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";

const inter = Inter({ subsets: ["latin"] });
const jetbrainsMono = JetBrains_Mono({
    subsets: ["latin"],
    variable: '--font-mono'
});

export const metadata: Metadata = {
    title: "Leander's Blog",
    description: "Leander 的个人博客，记录设计、开发与生活。",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="zh-CN">
            <body className={`${inter.className} ${jetbrainsMono.variable} antialiased bg-[#050505] text-gray-300`}>
                <AnimatedBackground />
                <SiteHeader />
                {children}
                <SiteFooter />
                <Toaster position="top-center" richColors />
                <CookieConsent />
            </body>
        </html>
    );
}
