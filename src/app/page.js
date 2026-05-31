import Navbar from "../components/Navbar";
import styles from "./page.module.css";
import { SpeedInsights } from "@vercel/speed-insights/next";
import Hero from "../components/Hero";
import ProjectsShowcase from "../components/home/ProjectsShowcase";
import CareerSections from "../components/career/CareerSections";

export default function Home() {
  return (
    <div className={styles.container}>
      <SpeedInsights />
      <Navbar />
      <Hero />
      <ProjectsShowcase />
      <CareerSections />
    </div>
  );
}
