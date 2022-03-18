import React, { Children } from "react";

import * as styles from "./rounded-box.module.css";

export interface RoundedBoxProps {
  children?: any;
}

export const RoundedBox = (props: RoundedBoxProps) => {
  return <div className={styles.root}>{props.children}</div>;
};
