import React from "react";
import styled from "styled-components";
import { font } from "../styles/typography";
import { RoundedBox } from "./rounded-box";

export interface SectionProps {
  title?: string;
  children?: any;
}

export const Section = ({ title, children }: SectionProps) => {
  return (
    <SectionContainer as="section">
      {title && <Title>{title}</Title>}
      {children}
    </SectionContainer>
  );
};

const SectionContainer = styled(RoundedBox)`
  margin-top: 3em;
`;

const Title = styled.h2`
  ${font("title24caps")}
  color: var(--color-title-text);
  text-transform: uppercase;
  padding: 0px 24px 8px;
  margin-top: 0;

  &::before {
    content: "➜";
    margin-right: 16px;
  }
`;
