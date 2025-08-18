import React, { useEffect, useState } from "react";
import MatterEnvironment from "./matter-environment";

import LetterJ from "../assets/images/letters/J.svg";
import LetterA from "../assets/images/letters/A.svg";
import LetterK from "../assets/images/letters/K.svg";
import LetterE from "../assets/images/letters/E.svg";
import LetterN from "../assets/images/letters/N.svg";
import LetterU from "../assets/images/letters/U.svg";
import LetterS from "../assets/images/letters/S.svg";
import LetterC from "../assets/images/letters/C.svg";
import LetterSpace from "../assets/images/letters/space.svg";

const LetterPaths = {
  j: LetterJ,
  a: LetterA,
  k: LetterK,
  e: LetterE,
  n: LetterN,
  u: LetterU,
  s: LetterS,
  c: LetterC,
  " ": LetterSpace
};

const loadLetterImage = (letter, path) => {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => {
      let height = img.naturalHeight;
      let width = img.naturalWidth;
      const dimensions = {
        [letter]: {
          height,
          width
        }
      };
      resolve(dimensions);
    };
    img.onerror = e => {
      reject(e);
    };
    img.src = path;
  });
};

interface LetterSize {
  height: number;
  width: number;
}

export interface BouncingLettersProps {
  obstacles?: Array<HTMLElement>;
  splitWords?: boolean;
}

const name = "Jake Nusca";
const SHOULD_SPLIT_NAMES = true;

const BouncingLetters = (props: BouncingLettersProps) => {
  const { obstacles, splitWords = SHOULD_SPLIT_NAMES } = props;
  const [bodies, setBodies] = useState([]);
  const [letterSizeMap, setLetterSizeMap] = useState<{ [key: string]: LetterSize }>(null);

  function getLetterSizes() {
    const promises = [];
    for (let i = 0; i < name.length; i++) {
      const letter = name[i].toLowerCase();

      if (LetterPaths[letter]) {
        promises.push(loadLetterImage(letter, LetterPaths[letter]));
      }
    }

    Promise.all(promises).then(values => {
      let obj = {};
      values.forEach(
        val =>
          (obj = {
            ...obj,
            ...val
          })
      );
      setLetterSizeMap(obj);
    });
  }

  function populateBodies() {
    setBodies([]);

    const splitNames = splitWords ? name.split(" ") : [name];

    const newBodies = splitNames.map(n => {
      const letters = [];
      for (let i = 0; i < n.length; i++) {
        const letter = n[i].toLowerCase();

        if (LetterPaths[letter]) {
          letters.push({
            label: letter,
            sprite: {
              path: LetterPaths[letter],
              height: letterSizeMap[letter].height,
              width: letterSizeMap[letter].width
            }
          });
        }
      }
      return letters;
    });
    setBodies(newBodies);
  }

  useEffect(() => {
    getLetterSizes();
  }, []);

  useEffect(() => {
    if (letterSizeMap) {
      populateBodies();
    }
  }, [letterSizeMap]);

  return <MatterEnvironment obstacles={obstacles} bodies={bodies} />;
};

export default BouncingLetters;
