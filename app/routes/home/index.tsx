import type { Route } from "./+types/index";
import type { PostData, Project, StrapiResponse, StrapiProject } from '~/types';
import FeaturedProjects from '~/components/FeaturedProjects';
import AboutPreview from '~/components/AboutPreview';
import LatestPosts from '~/components/LatestPosts';

export function meta({ }: Route.MetaArgs) {
    return [
        { title: "Friendly DEV | Home" },
        { name: "description", content: "Custom Website Development" },
    ];
}

export async function loader({
    request,
}: Route.LoaderArgs): Promise<{ projects: Project[]; posts: PostData[] }> {
    const url = new URL(request.url);

    const [projectRes, postRes] = await Promise.all([
        fetch(`${import.meta.env.VITE_API_URL}/projects?filters[featured][$eq]=true&populate=*`),
        fetch(new URL('/posts-meta.json', url)),
    ]);

    if (!projectRes.ok || !postRes.ok) {
        throw new Error('Failed to fetch projects or posts');
    }

    const projectJson: StrapiResponse<StrapiProject> = await projectRes.json();
    const postsJson = await postRes.json();

    const projects = projectJson.data.map((item: any) => ({
        id: item.id,
        documentId: item.documentId,
        title: item.title,
        description: item.description,
        image: item.image?.url
            ? `${import.meta.env.VITE_STRAPI_URL}${item.image.url}`
            : '/images/no-image.png',
        url: item.url,
        date: item.date,
        category: item.category,
        featured: item.featured,
    }))

    return { projects, posts: postsJson };
}

const HomePage = ({ loaderData }: Route.ComponentProps) => {
    const { projects, posts } = loaderData;

    return (
        <>
            <FeaturedProjects projects={projects} count={2} />
            <AboutPreview />
            <LatestPosts posts={posts} />
        </>
    );
};

export default HomePage;
