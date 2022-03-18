import React, { Children } from "react";
import { RoundedBox } from "../rounded-box/rounded-box";

import * as styles from "./section.module.css";

export interface SectionProps {
  title?: string;
  children?: any;
}

export const Section = ({ title, children }: SectionProps) => {
  return (
    <section>
      {title && <h2 className={styles.sectionTitle}>{title}</h2>}
      <RoundedBox>{children}</RoundedBox>
    </section>
  );
};
