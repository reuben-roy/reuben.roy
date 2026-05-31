import Navbar from "../components/Navbar";
import styles from "./page.module.css";
import { SpeedInsights } from "@vercel/speed-insights/next";
import Hero from "../components/Hero";

export default function Home() {
  return (
    <div className={styles.container}>
      <SpeedInsights />
      <Navbar />
      <Hero />
    </div>
  );
}
