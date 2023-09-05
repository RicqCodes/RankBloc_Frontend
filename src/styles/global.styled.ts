"use client";

import { createGlobalStyle } from "styled-components";
import { device } from "./utils.styled";

export const Global = createGlobalStyle`
:root {
  --max-width: 1440px;
  --border-radius: 8px;
  --title-rgb: #222;
  --foreground-rgb: #333333;
  --grey-background-rgb: #C4C4C4;

  --logo-text: rgb(255,255,255);
  --background-rgb: 214, 219, 220;

  --primary-rgb:rgb(242, 248, 247);
  --secondary-rgb: rgb(232, 243, 243);
  --tertiary-rgb: rgb(0, 170, 161);


  --small-rgb: #222222;
  --small-light-rgb:#6B6B6B;
  --small-dim-rgb:#777777;

}

/* @media (prefers-color-scheme: dark) {
  :root {
    --foreground-rgb: 255, 255, 255;
    --background-rgb: 0, 0, 0;

  }
} */

html {
    font-size: 62.5%;
    font-family:var(--font-noto-sans);
    scroll-behavior: smooth;
    line-height: 1.5;
    font-weight: 400;
    font-synthesis: none;
    text-rendering: optimizeLegibility;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    -webkit-text-size-adjust: 100%;
}

/* Apply dark mode styles to the entire document by adding the class to the html element */
html.dark-mode {
  /* Dark mode styles */
  /* ... */
}

* {
  box-sizing: border-box;
  padding: 0;
  margin: 0;
}

html,
body {
  min-height: 100vh;
}

body {
  color: var(--foreground-rgb);
  width: 100%;
}

a {
  color: inherit;
  text-decoration: none;
}

ul, ol {
        list-style-type: none;
    }



p {
    font-size: 1.8rem;
}

a {
  color: var(--accent-color);
  text-decoration: none;
}

span {
        font-size: 1.4rem;
}

small {
        font-size: 1.2rem;
}

/* @media (prefers-color-scheme: dark) {
  html {
    color-scheme: dark;
  }
} */

`;
