import SmoothScroll from "@/components/SmoothScroll";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Stats from "@/components/Stats";
import Experience from "@/components/Experience";
import Projects from "@/components/Projects";
import Skills from "@/components/Skills";
import Education from "@/components/Education";
import Resume from "@/components/Resume";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import BackToTop from "@/components/BackToTop";

function Divider() {
  return (
    <div className="max-w-5xl mx-auto px-6">
      <div className="section-divider" />
    </div>
  );
}

export default function Home() {
  return (
    <>
      <SmoothScroll />
      <Navbar />
      <main>
        <Hero />
        <Divider />
        <About />
        <Stats />
        <Divider />
        <Experience />
        <Divider />
        <Projects />
        <Divider />
        <Skills />
        <Divider />
        <Education />
        <Divider />
        <Resume />
        <Divider />
        <Contact />
      </main>
      <Footer />
      <BackToTop />
    </>
  );
}
