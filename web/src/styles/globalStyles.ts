import { createGlobalStyle } from "styled-components";
// import { theme } from "./theme";

const GlobalStyle = createGlobalStyle`
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

/* hack to fix ridiculous mobile address bar background scrolling issues */
body:before {
  content: "";
  display: block;
  position: fixed;
  left: 0;
  top: 0;
  bottom: 0;
  width: 100%;
  height: 100%;
  z-index: -10;
  background: linear-gradient(125deg, var(--base-color-gradient-1), var(--base-color-gradient-2));
  -webkit-background-size: cover;
  -moz-background-size: cover;
  -o-background-size: cover;
  background-size: cover;
}

html,
body,
body > div#___gatsby,
body > div#___gatsby > div {
  height: 100%;
}

`;

export default GlobalStyle;
