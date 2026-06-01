import { notFound } from 'next/navigation';
import Navbar from '@/components/Navbar';
import ProjectRoom from '@/components/home/ProjectRoom';
import { PROJECTS, getProjectById } from '@/data/projects';

export function generateStaticParams() {
  return PROJECTS.map((project) => ({ id: project.id }));
}

export function generateMetadata({ params }) {
  const project = getProjectById(params.id);
  if (!project) return { title: 'Project not found' };
  return {
    title: project.title,
    description: project.tagline,
  };
}

export default function ProjectRoomPage({ params }) {
  const project = getProjectById(params.id);
  if (!project) notFound();

  return (
    <>
      <Navbar />
      <ProjectRoom project={project} />
    </>
  );
}
