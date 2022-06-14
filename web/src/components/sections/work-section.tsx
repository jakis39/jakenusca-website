import React from "react";
import styled from "styled-components";

import { Section } from "../section";
import { ProjectBlock } from "../project-block";

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

  return (
    <Section title="Notable Freelance Work">
      <WorkWrapper>
        {projects.map(project => (
          <ProjectBlock key={project.clienName + project.title} project={project} />
        ))}
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
