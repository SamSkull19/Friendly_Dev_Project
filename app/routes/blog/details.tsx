import ReactMarkdown from 'react-markdown';
import type { Route } from './+types/details';
import type { PostData } from '~/types';

export async function loader({ request, params }: Route.LoaderArgs) {
    const { slug } = params;

    const url = new URL('/data/posts-meta.json', request.url);
    const res = await fetch(url.href);

    if (!res.ok) throw new Error('Failed to fetch posts');

    const index = await res.json();

    const postData = index.find((post: PostData) => post.slug === slug);

    if (!postData) throw new Response('Not found', { status: 404 });

    const markdown = await import(`../../posts/${slug}.md?raw`);

    return {
        postData,
        markdown: markdown.default
    };
}

type BlogPostDetailsPageProps = {
    loaderData: {
        postData: PostData;
        markdown: string;
    };
};

const BlogPostDetailsPage = ({ loaderData }: BlogPostDetailsPageProps) => {
    const { postData, markdown } = loaderData;
    return (
        <>
            <h1>BlogPost</h1>
        </>
    );
};

export default BlogPostDetailsPage;