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
    <section>
      {title && <Title>{title}</Title>}
      <RoundedBox>{children}</RoundedBox>
    </section>
  );
};

const Title = styled.h2`
  ${font("title24caps")}
  color: var(--color-title-text);
  text-transform: uppercase;
  padding: 36px 24px 8px;

  &::before {
    content: "➜";
    margin-right: 16px;
  }
`;
