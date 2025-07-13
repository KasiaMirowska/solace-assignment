import { createGlobalStyle } from "styled-components";

export const GlobalStyle = createGlobalStyle`
  * {
    box-sizing: border-box;
  }

  html, body {
    padding: 0;
    margin: 0;
    background: linear-gradient(135deg,rgb(42, 86, 62),rgb(17, 85, 48),rgb(0, 14, 6));
    background-attachment: fixed;
    background-size: cover;
  }

  a {
    color: inherit;
    text-decoration: none;
  }
`;
