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
  background: linear-gradient(125deg, var(--base-color-gradient-1), var(--base-color-gradient-2));
  overflow: auto;
}

html,
body,
body > div#___gatsby,
body > div#___gatsby > div {
  height: 100%;
}

`;

export default GlobalStyle;
