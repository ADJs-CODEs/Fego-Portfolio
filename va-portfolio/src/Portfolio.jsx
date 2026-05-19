import React, { lazy, Suspense, useRef, useEffect } from "react";
import OrbNav from "./components/OrbNav";

const IntroPage = lazy(() => import("./pages/IntroPage"));
const AboutPage = lazy(() => import("./pages/AboutPage"));
const ExperiencePage = lazy(() => import("./pages/ExperiencePage"));
const ProjectsPage = lazy(() => import("./pages/ProjectsPage"));
const ContactPage = lazy(() => import("./pages/ContactPage"));

export default function Portfolio() {
  const containerRef = useRef(null);
  const isSnapping = useRef(false);
  const COOLDOWN = 1000;

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const onWheel = (e) => {
      // If the event originated inside the experience section,
      // let ExperiencePage handle it — don't interfere
      if (e.target.closest("#experience")) return;

      if (isSnapping.current) {
        e.preventDefault();
        return;
      }

      isSnapping.current = true;
      setTimeout(() => {
        isSnapping.current = false;
      }, COOLDOWN);
    };

    const onScrollEnd = () => {
      isSnapping.current = false;
    };

    container.addEventListener("wheel", onWheel, { passive: false });
    container.addEventListener("scrollend", onScrollEnd, { passive: true });

    return () => {
      container.removeEventListener("wheel", onWheel);
      container.removeEventListener("scrollend", onScrollEnd);
    };
  }, []);

  return (
    <main
      ref={containerRef}
      className="h-screen w-screen overflow-y-scroll snap-y snap-mandatory scroll-smooth bg-[#050505] text-white no-scrollbar relative select-none"
    >
      <div className="fixed inset-0 bg-[radial-gradient(circle_at_center,rgba(99,102,241,0.18),transparent_55%)] pointer-events-none z-0" />
      <OrbNav />
      <Suspense fallback={null}>
        <div id="intro">
          <IntroPage />
        </div>
        <div id="about">
          <AboutPage />
        </div>
        <div id="experience">
          <ExperiencePage />
        </div>
        <div id="projects">
          <ProjectsPage />
        </div>
        <div id="contact">
          <ContactPage />
        </div>
      </Suspense>
    </main>
  );
}
