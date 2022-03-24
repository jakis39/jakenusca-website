import React from "react";
import { buildImageObj } from "../lib/helpers";
import { imageUrlFor } from "../lib/image-url";
import BlockContent from "./block-content";
import styled from "styled-components";
import { font } from "../styles/typography";

export interface JobBlockProps {
  job?: any;
}

export const JobBlock = (props: JobBlockProps) => {
  const { job } = props;
  return (
    <JobWrapper>
      {job.companyLogo && (
        <LogoContainer>
          <img
            src={imageUrlFor(buildImageObj(job.companyLogo))
              .width(200)
              .height(200)
              .fit("fill")
              .bg("ffffff")
              .url()}
            alt={job.companyLogo.alt}
          />
        </LogoContainer>
      )}

      <Content>
        <JobTitle>{job.title ?? ""}</JobTitle>
        <CompanyName>{job.companyName ?? ""}</CompanyName>
        {job._rawBody && <BlockContent blocks={job._rawBody || []} />}
      </Content>
    </JobWrapper>
  );
};

const JobWrapper = styled.div`
  margin-bottom: 24px;
  display: flex;
`;

const LogoContainer = styled.div`
  max-width: 100px;
  height: 100px;
  margin-right: 24px;
  border-radius: 50%;
  overflow: hidden;
  border: 5px solid white;
  flex-shrink: 0;

  & img {
    width: 100%;
    object-fit: cover;
  }
`;

const Content = styled.div`
  flex-grow: 1;
  padding: 16px 24px;
  background-color: white;
  border-radius: 25px;

  & ul {
    padding-left: 24px;
  }
`;

const JobTitle = styled.div`
  ${font("title24")}
`;

const CompanyName = styled.div`
  ${font("title16")}
`;
