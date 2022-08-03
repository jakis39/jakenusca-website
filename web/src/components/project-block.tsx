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
        <LogoContainer href={project.url} target="_blank" rel="noreferrer noopener">
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
          <HeaderContainer>
            <JobTitle href={project.url} target="_blank" rel="noreferrer noopener">
              {project.title ?? ""}
            </JobTitle>
            <DetailsBox>
              <CompanyName>{project.clientName ?? ""}</CompanyName>
            </DetailsBox>
          </HeaderContainer>
          {project._rawBody && <BlockContent blocks={project._rawBody || []} />}
        </JobDescription>
      </Content>
    </JobWrapper>
  );
};

const JobWrapper = styled.div`
  margin-bottom: 24px;
  display: flex;
  position: relative;
`;

const LogoContainer = styled.a`
  flex-shrink: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  width: min(15vw, 100px);
  height: min(15vw, 100px);
  margin-right: 1rem;
  border-radius: 50%;
  overflow: hidden;
  border: 2px solid white;
  background: white;

  & img {
    width: 90%;
    object-fit: contain;
  }

  @media (${DeviceWidth.mediaMaxSmall}) {
    position: absolute;
    top: 1rem;
    height: 4rem;
    width: 4rem;
    border: 2px solid var(--color-title-text);
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

  @media (${DeviceWidth.mediaMaxSmall}) {
    margin-left: 2rem;
  }
`;

const JobDescription = styled.div`
  padding: 16px 24px;
  background-color: var(--color-box-background);
  border-radius: var(--white-box-border-radius);
`;

const HeaderContainer = styled.div`
  @media (${DeviceWidth.mediaMaxSmall}) {
    margin-left: 1.5rem;
  }
`;

const JobTitle = styled.a`
  ${font("title24")}
  text-decoration: none;
  color: var(--color-body-text);

  &:hover,
  &:active {
    color: var(--color-active-link-text);
    text-shadow: 1px 1px var(--color-active-link-shadow-text);
  }
`;

const DetailsBox = styled.div`
  display: flex;
  align-items: center;

  span {
    white-space: pre;
  }

  @media (${DeviceWidth.mediaMaxMedium}) {
    flex-direction: column;
    align-items: flex-start;
  }
`;

const CompanyName = styled.div`
  ${font("title16")}
`;
