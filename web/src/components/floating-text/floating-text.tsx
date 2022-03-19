import { Link } from "gatsby";
import React from "react";
import { FloatingLetter } from "./floating-letter";

import * as styles from "./floating-text.module.css";

export interface FloatingTextProps {
  parked?: boolean;
  stackWords?: boolean;
  children?: string;
}

export const FloatingText = (props: FloatingTextProps) => {
  const { parked = false, stackWords = false, children } = props;
  const [park, setPark] = React.useState<boolean>(parked);
  const [wordList, setWordList] = React.useState<string[]>([]);

  React.useEffect(() => {
    setPark(parked);
  }, [parked]);

  React.useEffect(() => {
    setWordList(children?.split(" "));
  }, [children, setWordList]);

  function handleMouseEnter() {
    setPark(true);
  }

  function handleMouseLeave() {
    if (!parked) {
      setPark(false);
    }
  }

  return (
    <span
      className={`${styles.wrapper} ${stackWords ? styles.stackWords : ""}`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={handleMouseEnter}
    >
      {stackWords
        ? wordList.map((word, index) => (
            // <>
            <span key={word + index}>
              {word.split("").map(char => (
                <FloatingLetter park={park}>{char}</FloatingLetter>
              ))}
            </span>
            // </>
          ))
        : children.split("").map((char, index) => (
            <FloatingLetter key={char + index} park={park}>
              {char}
            </FloatingLetter>
          ))}
    </span>
  );
};
