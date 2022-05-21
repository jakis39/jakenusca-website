import React from "react";
import styled from "styled-components";
import { Section } from "../section";

import jake from "../../assets/images/jake2.jpg";
import { RoundedBox } from "../rounded-box";
import { DeviceWidth } from "../../styles/mediaQueries";
// https://upload.wikimedia.org/wikipedia/commons/thumb/e/e0/SNice.svg/1200px-SNice.svg.png

export interface AboutSectionProps {
  content?: string;
}

export const AboutSection = (props: AboutSectionProps) => {
  return (
    <AboutWrapper>
      <ReallyRoundedBox>
        <ImageContainer>
          <img src={jake} alt="jake" />
        </ImageContainer>
      </ReallyRoundedBox>
      <ContentBox>
        <Content>{props.content}</Content>
      </ContentBox>
    </AboutWrapper>
  );
};

const AboutWrapper = styled.section`
  display: flex;
  flex-direction: column;
  margin-bottom: 2em;
`;

const ContentBox = styled(RoundedBox)`
  width: 66%;
  margin-top: -26%;

  @media (${DeviceWidth.mediaMaxSmall}) {
    width: 100%;
    margin-top: 10%;
  }
`;

const ReallyRoundedBox = styled(RoundedBox)`
  flex-shrink: 0;
  border-radius: 50%;
  width: 60%;
  align-self: flex-end;

  @media (${DeviceWidth.mediaMaxSmall}) {
    width: 100%;
  }
`;

const ImageContainer = styled.div`
  position: relative;
  width: 100%;
  padding-top: 100%;
  border-radius: 50%;
  overflow: hidden;
  flex-shrink: 0;

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
