import React from "react";
import { buildImageObj } from "../lib/gatsby-helpers";
import { imageUrlFor } from "../lib/image-url";
import BlockContent from "./block-content";
import styled from "styled-components";
import { font } from "../styles/typography";
import { DeviceWidth } from "../styles/mediaQueries";

export interface JobBlockProps {
  job?: any;
}

export const JobBlock = (props: JobBlockProps) => {
  const { job } = props;

  const createDatesDisplay = () => {
    const startDate = new Date(job.startedAt);
    const endDate = new Date(job.endedAt);
    return `${startDate.getFullYear()} - ${job.isCurrent ? "Present" : endDate.getFullYear()}`;
  };

  console.log(job.notableProjects);

  return (
    <JobWrapper>
      {job.companyLogo && (
        <LogoContainer>
          <img
            src={imageUrlFor(buildImageObj(job.companyLogo))
              .width(200)
              .url()}
            alt={job.companyLogo.alt}
          />
        </LogoContainer>
      )}

      <Content>
        <JobDescription>
          <JobTitle>{job.title ?? ""}</JobTitle>
          <DetailsBox>
            <CompanyName>{job.companyName ?? ""}</CompanyName>
            <span> | </span>
            <CompanyName>{createDatesDisplay()}</CompanyName>
          </DetailsBox>
          {job._rawBody && <BlockContent blocks={job._rawBody || []} />}
        </JobDescription>

        {job.notableProjects && job.notableProjects.length > 0 && (
          <>
            <ProjectsListTitle>Notable Projects</ProjectsListTitle>
            <ProjectsList>
              {job.notableProjects.map(project => (
                <ProjectBlock>
                  <ProjectLogo href={project.url} target="_blank" rel="noopener noreferrer">
                    <img
                      src={imageUrlFor(buildImageObj(project.logo))
                        .width(200)
                        .url()}
                      alt={project.logo.alt}
                    />
                  </ProjectLogo>
                  {project._rawBody && <BlockContent blocks={project._rawBody || []} />}
                </ProjectBlock>
              ))}
            </ProjectsList>
          </>
        )}
      </Content>
    </JobWrapper>
  );
};

const JobWrapper = styled.div`
  margin-bottom: 24px;
  display: flex;
`;

const LogoContainer = styled.div`
  flex-shrink: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  width: min(15vw, 100px);
  height: min(15vw, 100px);
  margin-right: 24px;
  border-radius: 50%;
  overflow: hidden;
  border: 2px solid white;
  background: white;

  & img {
    width: 94%;
    object-fit: contain;
  }
`;

const Content = styled.div`
  flex-grow: 1;

  & ul {
    padding-left: 24px;
    margin: 0;

    li {
      white-space: pre-wrap;
    }
  }
`;

const JobDescription = styled.div`
  padding: 16px 24px;
  background-color: var(--color-box-background);
  border-radius: 25px;
`;

const JobTitle = styled.div`
  ${font("title24")}
`;

const DetailsBox = styled.div`
  display: flex;
  align-items: center;

  span {
    white-space: pre;
  }

  @media (${DeviceWidth.mediaMaxMedium}) {
    flex-direction: column;
  }
`;

const CompanyName = styled.div`
  ${font("title16")}
`;

const ProjectsListTitle = styled.div`
  ${font("title16")}
`;

const ProjectsList = styled.div`
  /* flex-grow: 1; */
  padding: 16px 24px;
  background-color: var(--color-box-background);
  border-radius: 25px;
`;

const ProjectBlock = styled.div`
  display: flex;
  align-items: center;
`;

const ProjectLogo = styled.a`
  flex: 0 0 20%;
  margin-top: 0.5em;
  margin-right: 1em;

  img {
    width: 100%;
    object-fit: contain;
  }
`;
