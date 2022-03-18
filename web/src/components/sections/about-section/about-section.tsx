import { Link } from "gatsby";
import React from "react";
import { Section } from "../../section/section";

import * as styles from "./about-section.module.css";

export interface AboutSectionProps {
  content?: string;
}

export const AboutSection = (props: AboutSectionProps) => {
  return (
    <>
      <Section>
        <div className={styles.imageContainer}>
          <img
            src="https://scontent-yyz1-1.xx.fbcdn.net/v/t31.18172-8/17973873_10158705302125106_4632392217129348491_o.jpg?_nc_cat=106&ccb=1-3&_nc_sid=09cbfe&_nc_ohc=SHrJlxOR0FoAX8gD06v&_nc_ht=scontent-yyz1-1.xx&oh=86c940f0e18e4de74ab0e80ffad38c34&oe=60D6C7AC"
            alt="jake"
          />
        </div>
        <div className={styles.content}>{props.content}</div>
      </Section>
    </>
  );
};
