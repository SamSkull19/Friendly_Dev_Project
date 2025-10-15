import type { Route } from './+types/index';
import type { PostData } from '~/types';
import { Link } from 'react-router';

export async function loader({ request }: Route.LoaderArgs): Promise<{ posts: PostData[] }> {
    const url = new URL('/posts-meta.json', request.url);
    const res = await fetch(url.href);

    if (!res.ok) {
        throw new Error('Failed to fetch posts');
    }

    const data = await res.json();
    return { posts: data };
}

const BlogPage = ({ loaderData }: Route.ComponentProps) => {
    const { posts } = loaderData as { posts: PostData[] };
    return (
        <section>
            <h2 className='text-3xl font-bold mb-8 text-white'>📝 Blog</h2>
        </section>
    );
};

export default BlogPage;

