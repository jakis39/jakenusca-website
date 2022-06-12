import React from "react";
import styled, { css } from "styled-components";

import { RoundedBox } from "../rounded-box";
import { Section } from "../section";
import { DeviceWidth } from "../../styles/mediaQueries";

import download from "../../assets/images/social-icons/download.png";
import email from "../../assets/images/social-icons/mail.png";
import linkedin from "../../assets/images/social-icons/linkedin.png";
import github from "../../assets/images/social-icons/github.png";
import soundcloud from "../../assets/images/social-icons/soundcloud.png";
import instagram from "../../assets/images/social-icons/instagram.png";

import resume from "../../assets/Jake Nusca Resume.pdf";
import { font } from "../../styles/typography";

interface ContactLink {
  label: string;
  icon: any;
  link?: string;
  specialMarkup?: any;
}

const CONTACT_LINKS: ContactLink[] = [
  {
    label: "Email me",
    icon: email,
    link: "mailto:hello@jakenusca.com"
  },
  {
    label: "Linkedin",
    icon: linkedin,
    link: "https://www.linkedin.com/in/jakenusca/"
  },
  {
    label: "Github",
    icon: github,
    link: "https://github.com/jakis39"
  },
  {
    label: "Soundcloud",
    icon: soundcloud,
    link: "https://soundcloud.com/djpotsnpans"
  },
  {
    label: "Instagram",
    icon: instagram,
    link: "https://www.instagram.com/stainesmd/"
  }
];

export const ContactSection = () => {
  return (
    <Section title="Contact me">
      <ContactWrapper>
        <ListSection>
          <ContactLink href={resume} index={0}>
            <ResumeImgBubble>
              <img src={download} alt="Resume" />
            </ResumeImgBubble>
            Download my resume
          </ContactLink>
          {CONTACT_LINKS.map(
            (link, index) =>
              index < 2 && (
                <ContactLink key={link.label} href={link.link} index={index + 1}>
                  <ImgBubble>
                    <img src={link.icon} alt={link.label} />
                  </ImgBubble>
                  {link.label}
                </ContactLink>
              )
          )}
        </ListSection>
        <ListSection>
          {CONTACT_LINKS.map(
            (link, index) =>
              index >= 2 && (
                <ContactLink key={link.label} href={link.link} index={index}>
                  <ImgBubble>
                    <img src={link.icon} alt={link.label} />
                  </ImgBubble>
                  {link.label}
                </ContactLink>
              )
          )}
        </ListSection>

        {/* <ContactBubble>
          <ResumeLink href={resume} target="_blank" rel="noopener noreferrer">
            <div>
              <span>Resume</span>
              <img src={download} alt="Resume" />
            </div>
          </ResumeLink>
        </ContactBubble>
        {CONTACT_LINKS.map(link => (
          <ContactBubble key={link.label}>
            <ImgLink href={link.link} target="_blank" rel="noopener noreferrer">
              <img src={link.icon} alt={link.label} />
            </ImgLink>
          </ContactBubble>
        ))} */}
      </ContactWrapper>
    </Section>
  );
};

const ContactWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  padding-bottom: 1em;
  justify-content: center;
`;

const ListSection = styled.div`
  display: flex;
  flex-direction: column;
  /* flex-basis: 49%; */
  align-items: flex-start;

  @media (${DeviceWidth.mediaMaxMedium}) {
    flex-basis: 100%;
  }
`;

const ContactLink = styled.a<{ index?: number }>`
  ${font("interface16")}
  display: flex;
  align-items: center;
  text-decoration: none;
  color: var(--color-body-text);
  margin-bottom: 1em;

  &:hover,
  &:active {
    color: var(--color-active-link-text);
    text-shadow: 1px 1px var(--color-active-link-shadow-text);
  }

  ${({ index }) => css`
    @media (${DeviceWidth.mediaMinMedium}) {
      margin-left: ${index * 2}em;
    }
  `}
`;

const ImgBubble = styled.div`
  flex-shrink: 0;
  border: 3px solid white;
  border-radius: 50%;
  overflow: hidden;
  height: 2.5em;
  width: 2.5em;
  margin-right: 1em;

  img {
    height: 100%;
  }
`;

const ResumeImgBubble = styled(ImgBubble)`
  background-color: white;
  display: flex;
  align-items: center;
  justify-content: center;

  img {
    height: 70%;
  }
`;

const ContactBubble = styled.div`
  flex-basis: 16%;
  border: 3px solid white;
  border-radius: 50%;
  overflow: hidden;

  &:nth-child(2n) {
    margin-top: 8%;
  }

  &:first-child {
    /* flex-basis: 20%; */
    /* align-self: stretch; */
    /* border-radius: 2em; */

    /* margin: 0; */
  }

  &:not(:first-child) {
    margin-left: -3em;
  }

  /* &:nth-child(2) {
    margin-left: -1em;
  } */

  &:nth-child(5),
  &:nth-child(6) {
    flex-basis: 10%;
  }
`;

const ImgLink = styled.a`
  position: relative;
  display: block;
  width: 100%;
  padding-top: 100%;
  border-radius: 50%;
  overflow: hidden;

  & > img {
    height: 100%;
    width: 100%;
    object-fit: cover;
    position: absolute;
    top: 0;
    left: 0;
  }
`;

const ResumeLink = styled(ImgLink)`
  background: var(--color-box-background);
  text-decoration: none;

  div {
    height: 100%;
    width: 100%;
    position: absolute;
    top: 0;
    left: 0;
    display: flex;
    flex-direction: column;
    justify-content: center;
  }

  span {
    font-size: min(2vw, 1em);
    padding-bottom: 1vw;
    text-align: center;
    font-family: "Bungee";
    font-weight: 300;
    color: var(--color-body-text);
  }

  img {
    display: block;
    width: 40%;
    margin: 0 auto;
  }
`;

// const ResumeLink = styled.a`
//   display: flex;
//   flex-direction: column;
//   width: 100%;
//   height: 100%;
//   background: rgba(255, 255, 255, 0.9);
//   text-decoration: none;
//   font-weight: 500;

//   span {
//     padding: 1em;
//     text-align: center;
//   }

//   img {
//     display: block;
//     width: 45%;
//     margin: auto;
//   }
// `;

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
