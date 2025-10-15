import type { Route } from './+types/index';
import type { Project } from '~/types';

export async function loader({ request }: Route.LoaderArgs): Promise<{ projects: Project[] }> {
  const res = await fetch('http://localhost:8000/projects');
  const data = await res.json();

  return { projects: data }
}


const ProjectsPage = ({ loaderData }: Route.ComponentProps) => {
  const { projects } = loaderData as { projects: Project[] };
  console.log(projects);
  return (
    <section>
      <h2 className='text-3xl font-bold mb-8 text-white'>🚀 Projects</h2>
    </section>
  );
};

export default ProjectsPage;