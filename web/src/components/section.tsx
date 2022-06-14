import React from "react";
import styled from "styled-components";
import { font } from "../styles/typography";
import { RoundedBox } from "./rounded-box";

export interface SectionProps {
  title?: string;
  children?: any;
}

const Section = ({ title, children }: SectionProps, ref) => {
  return (
    <SectionContainer as="section" ref={ref}>
      {title && <Title>{title}</Title>}
      {children}
    </SectionContainer>
  );
};

export default React.forwardRef(Section);

const SectionContainer = styled(RoundedBox)`
  margin-bottom: 2em;
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
