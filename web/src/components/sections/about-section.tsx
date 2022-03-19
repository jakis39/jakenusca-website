import React from "react";
import styled from "styled-components";
import { Section } from "../section";

export interface AboutSectionProps {
  content?: string;
}

export const AboutSection = (props: AboutSectionProps) => {
  return (
    <>
      <Section>
        <ImageContainer>
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/thumb/e/e0/SNice.svg/1200px-SNice.svg.png"
            alt="jake"
          />
        </ImageContainer>
        <Content>{props.content}</Content>
      </Section>
    </>
  );
};

const ImageContainer = styled.div`
  height: 150px;
  width: 150px;
  border-radius: 50%;
  overflow: hidden;
  flex-shrink: 0;
  margin-right: 24px;
  border: 1px solid white;

  & img {
    height: 100%;
    width: 100%;
    object-fit: cover;
  }
`;

const Content = styled.div`
  padding: 16px 24px;
  background-color: white;
  border-radius: 25px;
`;
