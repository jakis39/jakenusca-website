import React, { useEffect } from "react";
import styled, { keyframes } from "styled-components/macro";

const caretColor = "#6874e8";

const fadeCaret = keyframes`
  0% { opacity: 0; }
  20% { opacity: 1; }
  40% { opacity: 0; }
  100% { opacity: 0; }
`;

const Wrapper = styled.div<{ visible: boolean }>`
  display: flex;
  flex-direction: column;
  align-items: center;
  position: absolute;
  bottom: 24px;
  left: 50%;
  transform: translateX(-50%);
  z-index: 10;
  pointer-events: none;

  ${props => (props.visible ? "opacity: 1;" : "opacity: 0;")}
  transition: opacity 0.3s ease-in-out;
`;

const Caret = styled.svg<{ delay: string }>`
  width: 36px;
  height: 24px;
  display: block;
  margin: 0;
  opacity: 0;
  animation: ${fadeCaret} 3s infinite;
  animation-delay: ${props => props.delay};
`;

const ScrollHint: React.FC = () => {
  const [visible, setVisible] = React.useState<boolean>(true);

  useEffect(() => {
    const handleScroll = () => {
      if (window.pageYOffset > 20) {
        setVisible(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <Wrapper visible={visible}>
      <Caret delay="3s" viewBox="0 0 36 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path
          d="M9 10l9 6 9-6"
          stroke={caretColor}
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </Caret>
      <Caret delay="3.3s" viewBox="0 0 36 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path
          d="M9 10l9 6 9-6"
          stroke={caretColor}
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </Caret>
      <Caret delay="3.6s" viewBox="0 0 36 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path
          d="M9 10l9 6 9-6"
          stroke={caretColor}
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </Caret>
    </Wrapper>
  );
};

export default ScrollHint;
