import { Contact } from "@/components/Contact";
import { FeedbackSection } from "@/components/FeedbackSection";
import { Hero } from "@/components/Hero";
import { LightboxProvider } from "@/components/Lightbox";
import { ProjectSection } from "@/components/ProjectSection";
import { SiteHeader } from "@/components/SiteHeader";
import { Toc } from "@/components/Toc";
import { feedback, profile, projects } from "@/data/portfolio";
import { pageMetadata, ROUTES } from "@/data/site";

export const metadata = pageMetadata(`${profile.name} 포트폴리오`, ROUTES.portfolio);

const TOC = [
  ...projects.map((project) => ({ href: `#${project.id}`, no: project.no, title: project.title, note: project.since })),
  {
    href: "#feedback",
    no: String(projects.length + 1).padStart(2, "0"),
    title: "동료 피드백",
    note: `${feedback.length}건`,
  },
];

export default function PortfolioPage() {
  return (
    <LightboxProvider>
      <a className="skip-link" href="#main">
        본문으로 건너뛰기
      </a>
      <SiteHeader current={ROUTES.portfolio} />
      <main id="main">
        <Hero>
          <Toc entries={TOC} />
        </Hero>
        {projects.map((project) => (
          <ProjectSection key={project.id} project={project} />
        ))}
        <FeedbackSection />
      </main>
      <Contact />
    </LightboxProvider>
  );
}
