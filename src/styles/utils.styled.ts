"use client";
// Retrieves the breakpoints from theme object if any and uses them to form media queries
interface Breakpoints {
  xxs: number;
  xs: number;
  sm: number;
  md: number;
  lg: number;
  touch: number;
  xl: number;
}

const breakpoints: Breakpoints = {
  xxs: 377,
  xs: 480,
  sm: 720,
  md: 960,
  lg: 1024,
  touch: 1200,
  xl: 1440,
};

export const device = {
  up: (screen: keyof Breakpoints = "xs"): string => {
    if (screen in breakpoints) {
      return `@media only screen and (min-width: ${breakpoints[screen]}px)`;
    }

    return `@media only screen and (min-width: ${screen}px)`;
  },
  down: (screen: keyof Breakpoints = "xs"): string => {
    if (screen in breakpoints) {
      return `@media only screen and (max-width: ${breakpoints[screen] - 1}px)`;
    }

    return `@media only screen and (max-width: ${+screen - 1}px)`;
  },
};
