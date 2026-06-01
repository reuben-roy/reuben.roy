import { notFound } from 'next/navigation';
import Navbar from '@/components/Navbar';
import ProjectRoom from '@/components/home/ProjectRoom';
import { PROJECTS, getProjectById } from '@/data/projects';

export function generateStaticParams() {
  return PROJECTS.map((project) => ({ id: project.id }));
}

export async function generateMetadata({ params }) {
  const { id } = await params;
  const project = getProjectById(id);
  if (!project) return { title: 'Project not found' };
  return {
    title: project.title,
    description: project.tagline,
  };
}

export default async function ProjectRoomPage({ params }) {
  const { id } = await params;
  const project = getProjectById(id);
  if (!project) notFound();

  return (
    <>
      <Navbar />
      <ProjectRoom project={project} />
    </>
  );
}
