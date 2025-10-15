import type { Route } from './+types/index';
import type { PostData } from '~/types';
import { Link } from 'react-router';
import PostCard from '~/components/PostCard';
import Pagination from '~/components/Pagination';
import { useState } from 'react';
import PostFilter from '~/components/PostFilter';

export async function loader({ request }: Route.LoaderArgs): Promise<{ posts: PostData[] }> {
    const url = new URL('/posts-meta.json', request.url);
    const res = await fetch(url.href);

    if (!res.ok) {
        throw new Error('Failed to fetch posts');
    }

    const data = await res.json();

    data.sort((a: PostData, b: PostData) => {
        return new Date(b.date).getTime() - new Date(a.date).getTime();
    })
    return { posts: data };
}

const BlogPage = ({ loaderData }: Route.ComponentProps) => {
    const [currentPage, setCurrentPage] = useState(1);
    const [searchQuery, setSearchQuery] = useState('');

    const { posts } = loaderData as { posts: PostData[] };

    const postPerPage = 3;


    const filteredPost = posts.filter((post) => {
        const query = searchQuery.toLowerCase();

        return (
            post.title.toLowerCase().includes(query) || post.excerpt.toLowerCase().includes(query)
        );
    });

    const totalPage = Math.ceil(filteredPost.length / postPerPage);

    const indexOfLast = postPerPage * currentPage;
    const indexOfFirst = indexOfLast - postPerPage;
    const currentPosts = filteredPost.slice(indexOfFirst, indexOfLast);



    return (
        <div className='max-w-3xl mx-auto mt-10 px-6 py-6 bg-gray-900 rounded-lg'>

            <h2 className='text-3xl font-bold mb-8 text-white'>📝 Blog</h2>
            <PostFilter
                searchQuery={searchQuery}
                onSearchChange={(query) => {
                    setSearchQuery(query);
                    setCurrentPage(1);
                }}
            />

            <div className='space-y-8'>
                {currentPosts.length === 0 ? (
                    <p className='text-gray-400 text-center'>No posts found.</p>
                ) : (
                    currentPosts.map((post) => <PostCard key={post.slug} post={post} />)
                )}
            </div>

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

