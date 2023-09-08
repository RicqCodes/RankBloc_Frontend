"use client";

import { styled, css } from "styled-components";

// import { spin } from "./animation.styled";

interface IButton {
  $primary?: boolean;
  $fullWidth?: boolean;
  $rounded?: boolean;
  $fontsize: string;
  $height?: string;
  $outline?: string;
}

export const Button = styled.button<IButton>`
  color: var(--secondary-rgb);
  font-size: ${(props) => `${props.$fontsize}rem`};
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 1rem 2.8rem;
  border: none;
  border-radius: var(--border-radius);
  cursor: pointer;
  transition: all 200ms ease-in-out;

  &:hover {
    filter: brightness(0.85);
  }

  &:active {
    filter: brightness(1);
  }

  ${(props) =>
    props.$fullWidth &&
    css`
      width: 100%;
    `}

  ${(props) =>
    props.$outline === "cover"
      ? css`
          background: var(--tertiary-rgb);
        `
      : props.$outline === "border"
      ? css`
          border: 1px solid var(--tertiary-rgb);
          background: transparent;
          color: var(--tertiary-rgb);
        `
      : ""}

  ${(props) =>
    props.$rounded &&
    css`
      width: 100%;
      border-radius: 10rem;
    `}

    &:disabled {
    background-color: var(--tertiary-opaque-rgb);
    pointer-events: none;
    :hover {
      background: none;
    }
  }
`;

// export const Loader = styled.div`
//   width: 14px;
//   height: 14px;
//   border: 2px solid var(--secondary-color);
//   border-radius: 50%;
//   border-top: 2px solid var(--accent-color);
//   animation: ${spin} 1s linear infinite;
// `;
