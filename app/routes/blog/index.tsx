import type { Route } from './+types/index';
import type { PostData } from '~/types';
import { Link } from 'react-router';
import PostCard from '~/components/PostCard';

export async function loader({ request }: Route.LoaderArgs): Promise<{ posts: PostData[] }> {
    const url = new URL('/posts-meta.json', request.url);
    const res = await fetch(url.href);

    if (!res.ok) {
        throw new Error('Failed to fetch posts');
    }

    const data = await res.json();

    data.sort((a:PostData, b:PostData) => {
        return new Date(b.date).getTime() - new Date(a.date).getTime();
    })
    return { posts: data };
}

const BlogPage = ({ loaderData }: Route.ComponentProps) => {
    const { posts } = loaderData as { posts: PostData[] };
    return (
        <div className='max-w-3xl mx-auto mt-10 px-6 py-6 bg-gray-900 rounded-lg'>

            <h2 className='text-3xl font-bold mb-8 text-white'>📝 Blog</h2>

            {
                posts.map((post) => (
                    <PostCard key={post.slug} post={post} />
                ))
            }
        </div>
    );
};

export default BlogPage;

