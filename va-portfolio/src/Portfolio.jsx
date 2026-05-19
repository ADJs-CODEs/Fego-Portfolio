import React, { lazy, Suspense } from "react";
import OrbNav from "./components/OrbNav";

const IntroPage = lazy(() => import("./pages/IntroPage"));
const AboutPage = lazy(() => import("./pages/AboutPage"));
const ExperiencePage = lazy(() => import("./pages/ExperiencePage"));
const ProjectsPage = lazy(() => import("./pages/ProjectsPage"));
const ContactPage = lazy(() => import("./pages/ContactPage"));

export default function Portfolio() {
  return (
    <main className="h-screen w-screen overflow-y-scroll snap-y snap-mandatory bg-[#050505] text-white no-scrollbar relative select-none">
      <div className="fixed inset-0 bg-[radial-gradient(circle_at_center,rgba(99,102,241,0.18),transparent_55%)] pointer-events-none z-0" />
      <OrbNav />
      <Suspense fallback={null}>
        {/* scroll-snap-stop: always = browser MUST stop here, cannot skip */}
        <div id="intro" style={{ scrollSnapStop: "always" }}>
          <IntroPage />
        </div>
        <div id="about" style={{ scrollSnapStop: "always" }}>
          <AboutPage />
        </div>
        <div id="experience" style={{ scrollSnapStop: "always" }}>
          <ExperiencePage />
        </div>
        <div id="projects" style={{ scrollSnapStop: "always" }}>
          <ProjectsPage />
        </div>
        <div id="contact" style={{ scrollSnapStop: "always" }}>
          <ContactPage />
        </div>
      </Suspense>
    </main>
  );
}
