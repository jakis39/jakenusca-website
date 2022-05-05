import React from "react";
import { buildImageObj } from "../lib/gatsby-helpers";
import { imageUrlFor } from "../lib/image-url";
import BlockContent from "./block-content";
import styled from "styled-components";
import { font } from "../styles/typography";
import { DeviceWidth } from "../styles/mediaQueries";

export interface ProjectBlockProps {
  project?: any;
}

export const ProjectBlock = (props: ProjectBlockProps) => {
  const { project } = props;

  return (
    <JobWrapper>
      {project.logo && (
        <LogoContainer href={project.url}>
          <img
            src={imageUrlFor(buildImageObj(project.logo))
              .width(200)
              .url()}
            alt={project.logo.alt}
          />
        </LogoContainer>
      )}

      <Content>
        <JobDescription>
          <JobTitle>{project.title ?? ""}</JobTitle>
          <DetailsBox>
            <CompanyName>{project.clientName ?? ""}</CompanyName>
          </DetailsBox>
          {project._rawBody && <BlockContent blocks={project._rawBody || []} />}
        </JobDescription>
      </Content>
    </JobWrapper>
  );
};

const JobWrapper = styled.div`
  margin-bottom: 24px;
  display: flex;
`;

const LogoContainer = styled.a`
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
