import Navbar from '@/components/Navbar';
import ProjectWallGallery from '@/components/home/ProjectWallGallery';

export const metadata = {
    title: 'Projects',
    description: 'Interactive project gallery — run through the wall of things I have built.',
};

export default function ProjectsPage() {
    return (
        <>
            <Navbar />
            <ProjectWallGallery />
        </>
    );
}
