import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
  html, body, #root {
    overflow-x: hidden; /* ensure no horizontal scrolling from children */
  }
  body {
    margin: 0;
    padding: 0;
    font-family: 'Segoe UI', 'Roboto', 'Arial', sans-serif;
    background: #f7f7f7;
    color: #222;
    font-size: clamp(14px, 1.6vw, 16px); /* responsive base font size */
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }
  *, *::before, *::after {
    box-sizing: border-box;
  }
`;

export default GlobalStyle;