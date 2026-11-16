import { Fragment, type ReactNode } from "react";
import type { EditorialProject, Point, Project, StageStep } from "@/data/portfolio";
import { LinkedText } from "./LinkedText";
import { ShotGroup } from "./ShotGroup";
import { Stage, type StageStepView } from "./Stage";
import { StageCopy } from "./StageCopy";
import styles from "./ProjectSection.module.css";

export function ProjectSection({ project }: { project: Project }) {
  const titleId = `${project.id}-title`;

  return (
    <section id={project.id} className={`container ${styles.project}`} aria-labelledby={titleId}>
      <div className={styles.frame}>
        <ProjectBody project={project} head={<ProjectHead project={project} titleId={titleId} />} />
      </div>
    </section>
  );
}

function ProjectHead({ project, titleId }: { project: Project; titleId: string }) {
  const meta = [
    { term: "기간", detail: project.period },
    { term: "사용자", detail: project.users },
    { term: "기술", detail: <StackList items={project.stack} /> },
  ];

  return (
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
  );
}

function StackList({ items }: { items: string[] }) {
  const last = items.length - 1;

  return items.map((item, index) => (
    <Fragment key={item}>
      <span className={styles.stackItem}>{index < last ? `${item} ·` : item}</span>
      {index < last && " "}
    </Fragment>
  ));
}

function ProjectBody({ project, head }: { project: Project; head: ReactNode }) {
  switch (project.kind) {
    case "editorial":
      return (
        <>
          {head}
          <EditorialBody project={project} />
        </>
      );
    case "figure":
      return (
        <Stage
          head={head}
          steps={[stepView({ frame: "diagram", shots: [project.figure] }, <PointList points={project.points} />)]}
        />
      );
    case "stage":
      return <Stage head={head} steps={project.steps.map((step) => stepView(step))} />;
    default:
      return project satisfies never;
  }
}

function stepView(step: StageStep, detail?: ReactNode): StageStepView {
  return {
    id: step.shots.map((shot) => shot.image).join("+"),
    label: step.shots.map((shot) => shot.caption).join(", "),
    copy: (
      <>
        <StageCopy step={step} />
        {detail}
      </>
    ),
    visual: <ShotGroup frame={step.frame} shots={step.shots} />,
  };
}

function PointList({ points }: { points: Point[] }) {
  return (
    <ul className={styles.points}>
      {points.map((point) => (
        <li key={point.body}>
          <LinkedText text={point.body} link={point.link} />
        </li>
      ))}
    </ul>
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
      <PointList points={project.points} />
      <div className={styles.story}>
        {project.story.paragraphs.map((paragraph) => (
          <p key={paragraph}>
            <LinkedText text={paragraph} link={project.story.link} />
          </p>
        ))}
      </div>
    </div>
  );
}
