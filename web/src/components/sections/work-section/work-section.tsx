import { Link } from "gatsby";
import React from "react";
import { JobBlock } from "../../job-block/job-block";

import * as styles from "./work-section.module.css";
import { Section } from "../../section/section";

export interface WorkSectionProps {
  jobs?: any;
}

export const WorkSection = (props: WorkSectionProps) => {
  const { jobs } = props;
  return (
    <Section title="Work">
      <div className={styles.container}>
        {jobs.map((job: any) => (
          <JobBlock job={job} />
        ))}
      </div>
    </Section>
  );
};
