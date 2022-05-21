import { Link } from "gatsby";
import React from "react";
import { ProjectBlock } from "../project-block";

import { Section } from "../section";
import styled from "styled-components";

export interface WorkSectionProps {
  jobs?: any;
}

export const WorkSection = (props: WorkSectionProps) => {
  const { jobs } = props;
  let projects = [];
  jobs.forEach(job => {
    if (job.notableProjects?.length) {
      projects = projects.concat(job.notableProjects);
    }
  });

  console.log(projects);
  return (
    <Section title="Notable Freelance Work">
      <WorkWrapper>
        {projects.map(project => (
          <ProjectBlock key={project.id} project={project} />
        ))}
        {/* {jobs.map((job: any) => (
          <JobBlock key={job.id} job={job} />
        ))} */}
      </WorkWrapper>
    </Section>
  );
};

const WorkWrapper = styled.div`
  display: flex;
  align-items: flex-start;
  flex-wrap: wrap;

  & > * {
    flex: 1 0 90%;
  }

  & .content {
    padding: 16px 24px;
    background-color: white;
    border-radius: 25px;
    margin-top: 24px;
  }
`;
