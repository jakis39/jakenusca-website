import { useState, useEffect } from "react";
import debounce from "lodash.debounce";

const DEBOUNCE_TIME = 300;

function getWindowDimensions() {
  if (typeof window === "undefined") {
    return {
      width: 0,
      height: 0,
      screenSize: null,
      isSmall: null
    };
  }
  const { innerWidth: width, innerHeight: height } = window;

  let screenSize;
  if (width < 450) {
    screenSize = "small";
  } else if (width < 675) {
    screenSize = "medium";
  } else {
    screenSize = "large";
  }
  const isSmall = screenSize === "small";

  return {
    width,
    height,
    screenSize,
    isSmall
  };
}

export interface useWindowDimensionsProps {
  debounce?: boolean;
  debounceTime?: number;
  ignoreHeight?: boolean;
}

export default function useWindowDimensions(props: useWindowDimensionsProps = {}) {
  const { debounce: shouldDebounce, debounceTime: userDebounceTime, ignoreHeight = false } = props;
  const [windowDimensions, setWindowDimensions] = useState(getWindowDimensions());
  const debounceTime = userDebounceTime ?? DEBOUNCE_TIME;

  useEffect(() => {
    const handleResize = () => {
      setWindowDimensions(getWindowDimensions());
    };

    let debouncedResize;
    if (shouldDebounce) {
      debouncedResize = debounce(handleResize, debounceTime, {
        leading: false,
        trailing: true
      });
      window.addEventListener("resize", debouncedResize);
    } else {
      window.addEventListener("resize", handleResize);
    }

    return () =>
      window.removeEventListener("resize", debouncedResize ? debouncedResize : handleResize);
  }, []);

  return ignoreHeight
    ? {
        ...windowDimensions,
        height: 0
      }
    : windowDimensions;
}
