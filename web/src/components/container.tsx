import styled, { css } from "styled-components";

export interface ContainerProps {
  grow?: boolean;
}

const Container = styled.div<ContainerProps>`
  box-sizing: border-box;
  max-width: 960px;
  padding: 1.5em;
  margin: 0 auto;

  @media (--media-min-small) {
    padding: 2em;
  }

  ${({ grow }) =>
    grow &&
    css`
      flex-grow: 1;
      position: relative;
    `}
`;

export default Container;
