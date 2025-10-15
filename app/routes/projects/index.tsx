import ProjectCard from '~/components/ProjectCard';
import type { Route } from './+types/index';
import type { Project } from '~/types';
import { useState } from 'react';
import Pagination from '~/components/Pagination';
import { AnimatePresence, motion } from 'framer-motion';

export async function loader({ request }: Route.LoaderArgs): Promise<{ projects: Project[] }> {
  const res = await fetch('http://localhost:8000/projects');
  const data = await res.json();

  return { projects: data }
}


const ProjectsPage = ({ loaderData }: Route.ComponentProps) => {
  const { projects } = loaderData as { projects: Project[] };

  const [currentPage, setCurrentPage] = useState(1);
  const projectsPerPage = 2;

  const [selectedQuery, setSelectedQuery] = useState("All");
  const categories = [
    'All',
    ...new Set(projects.map((project) => project.category)),
  ]

  const filteredProject = selectedQuery === 'All' ? projects : projects.filter(project => project.category === selectedQuery);

  const totalPage = Math.ceil(filteredProject.length / projectsPerPage);

  const indexOfLast = currentPage * projectsPerPage;
  const indexOfFirst = indexOfLast - projectsPerPage;
  const currentProjects = filteredProject.slice(indexOfFirst, indexOfLast);

  return (
    <>
      <h2 className='text-3xl font-bold mb-8 text-white'>
        🚀 Projects
      </h2>

      <div className='flex flex-wrap gap-2 mb-8'>
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => {
              setSelectedQuery(cat);
              setCurrentPage(1);
            }}
            className={`px-3 py-1 rounded text-sm ${selectedQuery === cat
              ? 'bg-blue-600 text-white'
              : 'bg-gray-700 text-gray-200'
              }`}
          >
            {cat}
          </button>
        ))}
      </div>

      <AnimatePresence mode='wait'>
        <motion.div layout className='grid gap-6 sm:grid-cols-2'>
          {currentProjects.map((project) => (
            <motion.div layout key={project.id}>
              <ProjectCard project={project} />
            </motion.div>
          ))}
        </motion.div>
      </AnimatePresence>


      <Pagination
        totalPages={totalPage}
        currentPage={currentPage}
        onPageChange={setCurrentPage}
      />
    </>
  );
};

export default ProjectsPage;