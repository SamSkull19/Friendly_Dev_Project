import type { Route } from './+types/index';
import type { PostData, StrapiResponse, StrapiPost } from '~/types';
import PostCard from '~/components/PostCard';
import Pagination from '~/components/Pagination';
import { useState } from 'react';
import PostFilter from '~/components/PostFilter';

export async function loader({ request }: Route.LoaderArgs): Promise<{ posts: PostData[] }> {
    const res = await fetch(
        `${import.meta.env.VITE_API_URL}/posts?populate=image&sort=date:desc`
    );

    if (!res.ok) {
        throw new Error('Failed to fetch posts');
    }

    const json: StrapiResponse<StrapiPost> = await res.json();

    const posts = json.data.map((item) => ({
        id: item.id,
        title: item.title,
        excerpt: item.excerpt,
        slug: item.slug,
        date: item.date,
        body: item.body,
        image: item.image?.url
            ? `${import.meta.env.VITE_STRAPI_URL}${item.image.url}`
            : '/images/no-image.png',
    }));

    return { posts };
}

const BlogPage = ({ loaderData }: Route.ComponentProps) => {
    const [currentPage, setCurrentPage] = useState(1);
    const [searchQuery, setSearchQuery] = useState('');

    const { posts } = loaderData;

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

