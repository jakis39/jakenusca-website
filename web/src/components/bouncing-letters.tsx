import React, { useEffect, useState } from "react";
import MatterEnvironment, { BouncingSpriteRect } from "./matter-environment";

import LetterJ from "../assets/images/letters/J.png";
import LetterA from "../assets/images/letters/A.png";
import LetterK from "../assets/images/letters/K.png";
import LetterE from "../assets/images/letters/E.png";
import LetterN from "../assets/images/letters/N.png";
import LetterU from "../assets/images/letters/U.png";
import LetterS from "../assets/images/letters/S.png";
import LetterC from "../assets/images/letters/C.png";
import LetterSpace from "../assets/images/letters/space.png";

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

export interface BouncingLettersProps {
  obstacles?: Array<HTMLElement>;
}

const name = "Jake Nusca";

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

const BouncingLetters = (props: BouncingLettersProps) => {
  const { obstacles } = props;
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

    const newBodies = [];
    for (let i = 0; i < name.length; i++) {
      const letter = name[i].toLowerCase();

      if (LetterPaths[letter]) {
        newBodies.push({
          label: letter,
          sprite: {
            path: LetterPaths[letter],
            height: letterSizeMap[letter].height,
            width: letterSizeMap[letter].width
          }
        });
      }
    }
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
