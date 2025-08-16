import { createGlobalStyle } from "styled-components";
// import { theme } from "./theme";

const GlobalStyle = createGlobalStyle`
  :root {
    --white-box-border-radius: 20px;
  }
    
  * {
    box-sizing: border-box;
  }
  html {
    font-family: var(--font-family-sans);
    font-size: var(--font-base-size);
    line-height: var(--font-base-line-height);
    overflow: hidden;
  }

  body {
    -webkit-font-smoothing: antialiased;
    background: var(--color-white);
    color: var(--color-black);
    margin: 0;

    overflow: auto;
  }

  html,
  body {
    height: auto;
    overflow: auto;
  }

  body > div#___gatsby,
  body > div#___gatsby > div {
    height: 100%;
  }
`;

export default GlobalStyle;
