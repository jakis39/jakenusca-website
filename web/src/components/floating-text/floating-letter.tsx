import { Link } from "gatsby";
import React, { useEffect } from "react";

import * as styles from "./floating-letter.module.css";

function randomDirection() {
  return Math.random() < 0.5 ? -1 : 1;
}

// function randomIncrement(factor = 10) {
//   return Math.random() * factor;
// }

function randomIncrement(min = 4, max = 10) {
  return Math.random() * (max - min) + min;
}

// class Offset {
//   distance: number;
//   direction: number;

//   constructor(distance?: number, direction?: number) {
//     this.distance = distance ?? 0;
//     this.direction = direction ?? randomDirection();
//   }

//   get offset() {
//     return this.distance * this.direction;
//   }

//   getIncremented(factor?: number) {
//     this.distance += randomIncrement(factor);
//     return new Offset(this.distance, this.direction);
//   }
// }

export interface FloatingLetterProps {
  park: boolean;
  children: NonNullable<React.ReactNode>;
}

export const FloatingLetter = (props: FloatingLetterProps) => {
  const { park = false, children } = props;
  const [rotationDirection, setRotationDirection] = React.useState(0);
  const [rotationDistance, setRotationDistance] = React.useState(0);
  const [offsetXDirection, setOffsetXDirection] = React.useState(0);
  const [offsetXDistance, setOffsetXDistance] = React.useState(0);
  const [offsetYDirection, setOffsetYDirection] = React.useState(0);
  const [offsetYDistance, setOffsetYDistance] = React.useState(0);
  // const [offsets, setOffsets] = React.useState({
  //   offsetX: 0,
  //   offsetY: 0
  // });

  const intervalTime = 6000;

  function setAllDirections(direction?: number) {
    setRotationDirection(direction ?? randomDirection());
    setOffsetXDirection(direction ?? randomDirection());
    setOffsetYDirection(direction ?? randomDirection());
  }

  function setAllDistances(distance: number) {
    setRotationDistance(distance);
    setOffsetXDistance(distance);
    setOffsetYDistance(distance);
  }

  function incrementAllDistances() {
    setRotationDistance(rotationDistance + randomIncrement());
    setOffsetXDistance(offsetXDistance + randomIncrement());
    setOffsetYDistance(offsetYDistance + randomIncrement());
  }

  React.useEffect(() => {
    if (!park && rotationDirection === 0) {
      setAllDirections();
    } else if (park && rotationDirection !== 0) {
      setAllDirections(0);
    }
  }, [park, rotationDirection]);

  React.useEffect(() => {
    let timer;
    if (park && rotationDistance !== 0) {
      setAllDistances(0);
    } else if (!park) {
      timer = setInterval(() => {
        incrementAllDistances();
      }, intervalTime);
      if (rotationDistance === 0) {
        setTimeout(() => {
          incrementAllDistances();
        }, 1000);
      }
    }

    return () => {
      clearInterval(timer);
    };
  }, [park, rotationDistance, offsetXDistance, offsetYDistance]);

  // React.useEffect(() => {
  //   if (park) {
  //     setOffsetX(new Offset());
  //     setOffsetY(new Offset());
  //     setRotation(new Offset());
  //     return;
  //   }
  //   var timer = setInterval(() => {
  //     setRotation(rotation.getIncremented());
  //     setOffsetX(offsetX.getIncremented());
  //     setOffsetY(offsetY.getIncremented());
  //     console.log(rotation.offset);
  //   }, intervalTime);

  //   return () => {
  //     clearInterval(timer);
  //   };
  // }, [offsetX, offsetY, rotation, intervalTime, park]);

  return (
    <>
      {/* {offsetX.offset}
    {offsetY.offset}
    {rotation.offset} */}
      <span
        className={`${styles.root} ${park ? styles.parked : ""}`}
        style={{
          transform: `translateX(${offsetXDirection *
            offsetXDistance}px) translateY(${offsetYDirection * offsetYDistance}px)`,
          transitionDuration: `${intervalTime}ms`
        }}
      >
        <span
          style={{
            transform: `rotateZ(${rotationDirection * rotationDistance}deg)`,
            transitionDuration: `${intervalTime}ms`
          }}
        >
          {children}
        </span>
      </span>
    </>
  );
};
