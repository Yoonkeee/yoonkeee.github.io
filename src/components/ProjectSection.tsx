import type { EditorialProject, FigureProject, Point, Project, StageProject } from "@/data/portfolio";
import { ArrowDownIcon } from "./icons";
import { ShotGroup, ShotNotes } from "./ShotGroup";
import { Stage } from "./Stage";
import { StageCopy } from "./StageCopy";
import styles from "./ProjectSection.module.css";

export function ProjectSection({ project }: { project: Project }) {
  const titleId = `${project.id}-title`;
  const meta = [
    { term: "기간", detail: project.period },
    { term: "사용자", detail: project.users },
    { term: "기술", detail: project.stack.join(" · ") },
  ];

  return (
    <section id={project.id} className={`container ${styles.project}`} aria-labelledby={titleId}>
      <header className={styles.head}>
        <p className={styles.no}>{project.no}</p>
        <h2 id={titleId} className={styles.title}>
          {project.title}
        </h2>
        <p className={styles.sub}>{project.sub}</p>
        <p className={styles.summary}>{project.summary}</p>
        <dl className={styles.meta}>
          {meta.map(
            ({ term, detail }) =>
              detail && (
                <div key={term}>
                  <dt>{term}</dt>
                  <dd>{detail}</dd>
                </div>
              ),
          )}
        </dl>
      </header>
      <div className={styles.body}>
        <ProjectBody project={project} />
      </div>
    </section>
  );
}

function ProjectBody({ project }: { project: Project }) {
  switch (project.kind) {
    case "editorial":
      return <EditorialBody project={project} />;
    case "figure":
      return <FigureBody project={project} />;
    case "stage":
      return <StageBody project={project} />;
    default:
      return project satisfies never;
  }
}

function PointItem({ point }: { point: Point }) {
  return (
    <li>
      <h3 className={styles.pointTitle}>{point.title}</h3>
      <p className={styles.pointBody}>{point.body}</p>
      {point.link && <SectionLink href={point.link.href} label={point.link.label} />}
    </li>
  );
}

function SectionLink({ href, label }: { href: string; label: string }) {
  return (
    <a className={styles.link} href={href}>
      {label}
      <ArrowDownIcon width={16} height={16} />
    </a>
  );
}

function EditorialBody({ project }: { project: EditorialProject }) {
  return (
    <div className={styles.column}>
      <dl className={styles.metrics}>
        {project.metrics.map((metric) => (
          <div key={metric.label}>
            <dt>{metric.label}</dt>
            <dd>{metric.value}</dd>
          </div>
        ))}
      </dl>
      <ul className={styles.points}>
        {project.points.map((point) => (
          <PointItem key={point.title} point={point} />
        ))}
      </ul>
      <div className={styles.story}>
        <h3 className={styles.pointTitle}>{project.story.title}</h3>
        <div className={styles.storyText}>
          {project.story.paragraphs.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
          <SectionLink href={project.story.link.href} label={project.story.link.label} />
        </div>
      </div>
    </div>
  );
}

function FigureBody({ project }: { project: FigureProject }) {
  const shots = [project.figure];

  return (
    <div className={styles.split}>
      <div>
        <ul className={styles.points}>
          {project.points.map((point) => (
            <PointItem key={point.title} point={point} />
          ))}
        </ul>
        <ShotNotes frame="diagram" shots={shots} />
      </div>
      <div className={styles.splitFigure}>
        <ShotGroup frame="diagram" shots={shots} />
      </div>
    </div>
  );
}

function StageBody({ project }: { project: StageProject }) {
  return (
    <Stage
      label={`${project.title} 주요 화면`}
      steps={project.steps.map((step) => ({
        id: step.label,
        label: step.label,
        copy: <StageCopy step={step} />,
        visual: <ShotGroup frame={step.frame} shots={step.shots} />,
      }))}
    />
  );
}
