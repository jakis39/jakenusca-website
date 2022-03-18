import React from "react";
import { cn } from "../lib/helpers";

import * as styles from "./container.module.css";

export interface ContainerProps {
  grow?: boolean;
  children?: NonNullable<React.ReactNode>;
}

const Container = (props: ContainerProps) => {
  const { grow = false, children } = props;
  return <div className={cn(styles.root, grow && styles.grow)}>{children}</div>;
};

export default Container;
