import React from "react";
import styled from "styled-components";
import { imageUrlFor } from "../../lib/image-url";
import { buildImageObj } from "../../lib/gatsby-helpers";
import { DeviceWidth } from "../../styles/mediaQueries";
import useWindowDimensions from "../../hooks/useWindowDimensions";
import { isMobileBrowser } from "../../lib/helpers";

import { Section } from "../section";

import vid1 from "../../assets/website-pics/PXL_20211205_051445416.TS.mp4";
// import vid2 from "../../assets/website-pics/waterfall-jump.mp4";
import vid3 from "../../assets/website-pics/PXL_20220428_145209171.LS.mp4";

const GRID_VIDS = [vid1, vid3];

export interface MoreSectionProps {
  images?: any;
}

export const MoreSection = (props: MoreSectionProps) => {
  const { images } = props;
  const { width: screenWidth } = useWindowDimensions({
    debounce: true,
    // mobile browser address bar shenanigans cause a redraw of whole environment,
    //  so ignore height changes on mobile devices
    ignoreHeight: isMobileBrowser()
  });

  return (
    <Section title="Get to know me ">
      <AssetGrid>
        {GRID_VIDS.map((vid, i) => (
          <VideoGridContainer key={"vid" + i}>
            <div>
              <video width="100%" src={vid} playsInline autoPlay muted loop />
            </div>
          </VideoGridContainer>
        ))}
        {images.map(image => (
          <div key={image._key}>
            <div>
              <img
                src={imageUrlFor(buildImageObj(image))
                  // .width(screenWidth * (isMobileBrowser() ? 2 : 1)) // TODO: broken due to screenwidth sometimes being 0
                  .width(1000)
                  .url()}
                alt={image.alt}
              />
            </div>
          </div>
        ))}
      </AssetGrid>
    </Section>
  );
};

const AssetGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  grid-gap: 0.5em;

  @media (${DeviceWidth.mediaMaxSmall}) {
    grid-template-columns: 1fr 1fr;
  }

  > div {
    aspect-ratio: 1;
    position: relative;
    overflow: hidden;
    border-radius: 3px;

    div {
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
    }

    img,
    video {
      height: 100%;
      width: 100%;
      object-fit: cover;
    }
  }
`;

const VideoGridContainer = styled.div`
  /* yuck */
  @media (${DeviceWidth.mediaMinSmall}) {
    :nth-child(2) {
      grid-column-start: 3;
      grid-row-start: 2;
    }
    /* :nth-child(3) {
      grid-column-start: 1;
      grid-row-start: 3;
    } */
  }

  @media (${DeviceWidth.mediaMaxSmall}) {
    :nth-child(2) {
      grid-row-start: 3;
      grid-column-start: 2;
    }
    /* :nth-child(3) {
      grid-row-start: 5;
    } */
  }
`;
