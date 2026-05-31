import { notFound } from 'next/navigation';
import Navbar from '@/components/Navbar';
import ProjectRoom from '@/components/home/ProjectRoom';
import { PROJECTS, getProjectById } from '@/data/projects';

// Projects with their own bespoke static routes take precedence over this
// dynamic segment, so we don't pre-generate them here.
const STATIC_ROUTE_IDS = new Set(['time-management', 'youtube-scholar']);

export function generateStaticParams() {
  return PROJECTS.filter((project) => !STATIC_ROUTE_IDS.has(project.id)).map((project) => ({
    id: project.id,
  }));
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
