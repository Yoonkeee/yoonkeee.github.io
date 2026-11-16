import { Contact } from "@/components/Contact";
import { FeedbackSection } from "@/components/FeedbackSection";
import { Hero } from "@/components/Hero";
import { LightboxProvider } from "@/components/Lightbox";
import { ProjectSection } from "@/components/ProjectSection";
import { SiteHeader } from "@/components/SiteHeader";
import { projects } from "@/data/portfolio";

export default function Page() {
  return (
    <LightboxProvider>
      <a className="skip-link" href="#main">
        본문으로 건너뛰기
      </a>
      <SiteHeader />
      <main id="main">
        <Hero />
        <div id="projects">
          {projects.map((project) => (
            <ProjectSection key={project.id} project={project} />
          ))}
        </div>
        <FeedbackSection />
      </main>
      <Contact />
    </LightboxProvider>
  );
}
