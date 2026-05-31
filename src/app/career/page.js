import Navbar from '../../components/Navbar';
import CareerRunnerRoom from '../../components/career/CareerRunnerRoom';

export const metadata = {
  title: 'Career',
  description: 'Interactive work history, skills, certifications, and portfolio highlights in a runner-style gallery.',
};

export default function Career() {
  return (
    <>
      <Navbar />
      <CareerRunnerRoom />
    </>
  );
}
