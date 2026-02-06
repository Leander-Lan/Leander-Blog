// Define the Post type matches the API structure
export interface Post {
    cid: number;
    title: string;
    text: string;
    created: number; // Unix timestamp
    author?: { screenName: string };
    tag?: { name: string }[];
    directory?: string;
}

export interface ApiResponse<T> {
    data: T;
    total?: number;
}

type RawPost = {
    cid: number | string;
    title?: string;
    text?: string;
    created?: number | string;
    author?: { screenName: string };
    tag?: { name: string }[];
    directory?: string | null;
};

const API_BASE_URL = 'https://blog.tianiel.top/api';

const TOTAL_COUNT_CACHE_TAG = 'blog-total-count';

async function getTotalCount(): Promise<number> {
    try {
        // Fetch a large number to count total posts (Workaround for missing total header)
        // Cached for 5 minutes
        const res = await fetch(`${API_BASE_URL}/posts?page=1&pageSize=1000`, {
            next: { revalidate: 300, tags: [TOTAL_COUNT_CACHE_TAG] }
        });
        if (!res.ok) return 0;
        const data = await res.json();
        return Array.isArray(data.data) ? data.data.length : 0;
    } catch (e) {
        console.error("Error fetching total count:", e);
        return 0;
    }
}

export async function getAllPosts(page = 1, pageSize = 10): Promise<{ posts: Post[], total: number }> {
    try {
        // Parallel fetch: posts for current page + total count (cached)
        const [postsResponse, totalCount] = await Promise.all([
            fetch(`${API_BASE_URL}/posts?page=${page}&pageSize=${pageSize}`, {
                next: { revalidate: 60 }
            }).then(r => r.json()),
            getTotalCount()
        ]);

        // Parse posts from data.data
        // Response structure is { status: 200, data: [...] } based on curl verification
        const rawPosts = Array.isArray(postsResponse.data) ? (postsResponse.data as RawPost[]) : [];

        let posts: Post[] = [];
        if (Array.isArray(rawPosts)) {
            posts = rawPosts.map((item) => ({
                cid: Number(item.cid),
                title: item.title ?? "",
                text: item.text ?? "",
                created: Number(item.created), // API returns explicit "created" timestamp string
                author: item.author,
                tag: item.tag,
                directory: item.directory ?? undefined
            }));
        }

        return {
            posts,
            total: totalCount || posts.length
        };
    } catch (error) {
        console.error("Error fetching posts:", error);
        return { posts: [], total: 0 };
    }
}

export async function getPostById(id: string): Promise<Post | undefined> {
    try {
        const res = await fetch(`${API_BASE_URL}/post?cid=${id}`, {
            next: { revalidate: 60 }
        });

        if (!res.ok) {
            // API might return 404 or just null data
            return undefined;
        }

        const data: ApiResponse<Post> = await res.json();

        if (!data.data) return undefined;

        // Ensure created is a number
        return {
            ...data.data,
            created: Number(data.data.created)
        };
    } catch (error) {
        console.error(`Error fetching post ${id}:`, error);
        return undefined;
    }
}
