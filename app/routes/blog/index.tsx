import type { Route } from './+types/index';
import type { PostData } from '~/types';
import { Link } from 'react-router';
import PostCard from '~/components/PostCard';
import Pagination from '~/components/Pagination';
import { useState } from 'react';

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
    const [currentPage, setCurrentPage] = useState(1);
    const { posts } = loaderData as { posts: PostData[] };

    const postPerPage = 3;
    const totalPage = Math.ceil(posts.length / postPerPage);

    const indexOfLast = postPerPage * currentPage;
    const indexOfFirst = indexOfLast - postPerPage;
    const currentPosts = posts.slice(indexOfFirst, indexOfLast);

    return (
        <div className='max-w-3xl mx-auto mt-10 px-6 py-6 bg-gray-900 rounded-lg'>

            <h2 className='text-3xl font-bold mb-8 text-white'>📝 Blog</h2>

            {
                currentPosts.map((post) => (
                    <PostCard key={post.slug} post={post} />
                ))
            }

            {
                totalPage > 1 && (
                    <Pagination
                        currentPage={currentPage}
                        totalPages={totalPage}
                        onPageChange={(page) => setCurrentPage(page)}
                    />
                )
            }
        </div>
    );
};

export default BlogPage;

