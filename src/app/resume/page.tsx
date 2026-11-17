import { Contact } from "@/components/Contact";
import { Hero } from "@/components/Hero";
import {
  BulletList,
  Entry,
  RecordList,
  ResumeSection,
  SkillList,
  StackLine,
  WorkBlock,
} from "@/components/ResumeSection";
import { SiteHeader } from "@/components/SiteHeader";
import { Toc } from "@/components/Toc";
import { profile } from "@/data/portfolio";
import { activities, education, experience, resumeSections, sideProjects, skills } from "@/data/resume";
import { pageMetadata, ROUTES } from "@/data/site";
import styles from "./page.module.css";

export const metadata = pageMetadata(`${profile.name} 이력서`, ROUTES.resume);

const TOC = resumeSections.map((section) => ({ href: `#${section.id}`, no: section.no, title: section.title }));

export default function ResumePage() {
  return (
    <div className={styles.page}>
      <a className="skip-link" href="#main">
        본문으로 건너뛰기
      </a>
      <SiteHeader current={ROUTES.resume} />
      <main id="main">
        <Hero>
          <Toc entries={TOC} />
        </Hero>
        <ResumeSection id="experience" pinEntries>
          {experience.map((job) => (
            <Entry
              key={job.id}
              title={job.company}
              role={job.role}
              meta={[job.period, ...job.meta]}
              desc={job.desc}
              summary={job.summary}
            >
              {job.works?.map((work) => (
                <WorkBlock key={work.title} work={work} />
              ))}
              {job.bullets && <BulletList bullets={job.bullets} />}
            </Entry>
          ))}
        </ResumeSection>
        <ResumeSection id="side-projects" pinEntries>
          {sideProjects.map((project) => (
            <Entry key={project.id} title={project.title} meta={[project.period]} desc={project.desc}>
              <BulletList bullets={project.bullets} />
              <StackLine items={project.stack} />
            </Entry>
          ))}
        </ResumeSection>
        <ResumeSection id="skills">
          <SkillList skills={skills} />
        </ResumeSection>
        <ResumeSection id="activities">
          <RecordList records={activities} />
        </ResumeSection>
        <ResumeSection id="education">
          <RecordList records={education} />
        </ResumeSection>
      </main>
      <Contact />
    </div>
  );
}
