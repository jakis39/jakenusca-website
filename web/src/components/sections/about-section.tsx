import React, { useEffect, useRef } from "react";
import styled from "styled-components";
import { DeviceWidth } from "../../styles/mediaQueries";

import { RoundedBox } from "../rounded-box";

import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger);

import jake from "../../assets/images/jake2.jpg";
import { isMobileBrowser } from "../../lib/helpers";
// https://upload.wikimedia.org/wikipedia/commons/thumb/e/e0/SNice.svg/1200px-SNice.svg.png

export interface AboutSectionProps {
  content?: string;
}

export const AboutSection = (props: AboutSectionProps) => {
  const imageRef = useRef();
  const boxRef = useRef();

  useEffect(() => {
    if (isMobileBrowser()) {
      gsap.fromTo(
        boxRef.current,
        {
          marginTop: 40
        },
        {
          marginTop: -150,
          scrollTrigger: {
            id: `aboutBox`,
            trigger: imageRef.current,
            start: "top 40%",
            scrub: true
          }
        }
      );
    } else {
      gsap.fromTo(
        boxRef.current,
        {
          marginTop: 300
        },
        {
          marginTop: -300,
          scrollTrigger: {
            id: `aboutBox`,
            trigger: imageRef.current,
            start: "top bottom",
            scrub: true
          }
        }
      );

      gsap.fromTo(
        imageRef.current,
        {
          translateX: -100
        },
        {
          translateX: 0,
          scrollTrigger: {
            id: `aboutBox`,
            trigger: imageRef.current,
            start: "top bottom",
            scrub: true
          }
        }
      );
    }
  }, [boxRef, imageRef]);

  return (
    <AboutWrapper>
      <ReallyRoundedBox ref={imageRef}>
        <ImageContainer>
          <img src={jake} alt="jake" />
        </ImageContainer>
      </ReallyRoundedBox>
      <ContentBox ref={boxRef}>
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
  /* margin-top: -26%; */

  @media (${DeviceWidth.mediaMaxSmall}) {
    width: 100%;
    /* margin-top: 10%; */
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
  border-radius: var(--white-box-border-radius);
  white-space: pre-wrap;
`;
