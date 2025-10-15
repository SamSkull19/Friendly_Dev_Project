import type { Route } from './+types/index';

export async function loader({ request }: Route.LoaderArgs): Promise<any> {
  const res = await fetch('http://localhost:8000/projects');
  const data = await res.json();

  return { projects: data }
}


const ProjectsPage = ({ loaderData }: Route.ComponentProps) => {
  const { projects } = loaderData;
  console.log(projects);
  return (
    <section>
      <h2 className='text-3xl font-bold mb-8 text-white'>🚀 Projects</h2>
    </section>
  );
};

export default ProjectsPage;