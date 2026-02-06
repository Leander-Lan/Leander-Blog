import { getAllPosts } from "@/lib/data";
import HomeClient from "@/components/HomeClient";
import PageTransition from "@/components/PageTransition";

// 强制动态渲染，保证每次刷新都能看到最新文章
export const dynamic = "force-dynamic";

export default async function HomePage() {
    // 1. 获取所有文章 (API 默认按时间倒序)
    const { posts } = await getAllPosts(1, 4);

    // 2. 格式化数据
    const serializedPosts = posts.map((post) => {
        const rawCategory = post.directory;
        const safeCategory =
            typeof rawCategory === "string" && rawCategory.trim().length > 0
                ? rawCategory
                : "Life";

        return {
            id: post.cid.toString(),
            title: post.title,
            content: post.text,
            category: safeCategory,
            createdAt: new Date(post.created * 1000).toISOString(),
        };
    });

    return (
        <PageTransition>
            <HomeClient initialPosts={serializedPosts} />
        </PageTransition>
    );
}
