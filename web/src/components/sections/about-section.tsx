import React from "react";
import styled from "styled-components";
import { Section } from "../section";

import jake from "../../assets/images/jake.jpg";
import { RoundedBox } from "../rounded-box";
// https://upload.wikimedia.org/wikipedia/commons/thumb/e/e0/SNice.svg/1200px-SNice.svg.png

export interface AboutSectionProps {
  content?: string;
}

export const AboutSection = (props: AboutSectionProps) => {
  return (
    <AboutWrapper>
      <RoundedBox>
        <Content>{props.content}</Content>
      </RoundedBox>
      <ReallyRoundedBox>
        <ImageContainer>
          <img src={jake} alt="jake" />
        </ImageContainer>
      </ReallyRoundedBox>
    </AboutWrapper>
  );
};

const AboutWrapper = styled.section`
  display: flex;
  align-items: flex-end;
`;

const ReallyRoundedBox = styled(RoundedBox)`
  flex-basis: 50%;
  flex-shrink: 0;
  border-radius: 50%;
  width: 50%;
  margin-left: 1em;
`;

const ImageContainer = styled.div`
  position: relative;
  width: 100%;
  padding-top: 100%;
  border-radius: 50%;
  overflow: hidden;
  flex-shrink: 0;
  margin-right: 24px;

  & img {
    height: 100%;
    width: 100%;
    object-fit: cover;
    position: absolute;
    top: 0;
    left: 0;
  }
`;

const Content = styled.div`
  padding: 16px 24px;
  background-color: white;
  border-radius: 25px;
  white-space: pre-wrap;
`;
