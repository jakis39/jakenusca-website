import React from "react";
import styled, { css } from "styled-components";
import { DeviceWidth } from "../../styles/mediaQueries";
import { font } from "../../styles/typography";

import { Section } from "../section";

import download from "../../assets/images/social-icons/download.png";
import email from "../../assets/images/social-icons/mail.png";
import linkedin from "../../assets/images/social-icons/linkedin.png";
import github from "../../assets/images/social-icons/github.png";
import soundcloud from "../../assets/images/social-icons/soundcloud.png";
import instagram from "../../assets/images/social-icons/instagram.png";
import resume from "../../assets/Jake Nusca Resume.pdf";

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
