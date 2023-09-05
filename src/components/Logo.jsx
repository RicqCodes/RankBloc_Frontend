import Link from "next/link";
import React from "react";
import styled from "styled-components";

const Logo = () => {
  return (
    <Link href="/">
      <LogoText>
        <p>Rank</p>
        <span>
          Bloc<small>.</small>
        </span>
      </LogoText>
    </Link>
  );
};

export default Logo;

const LogoText = styled.div`
  display: flex;
  gap: 4px;
  align-items: flex-end;

  & p,
  & span {
    line-height: 100%;
    font-weight: 800;
  }

  & p {
    color: var(--logo-text);
    font-size: 2.7rem;
    letter-spacing: 0.54px;
    text-transform: capitalize;
    background: var(--tertiary-rgb);
  }

  & span {
    color: var(--grey-rgb);
    font-size: 1.7rem;

    & small {
      font-size: 2.4rem;
      color: var(--tertiary-rgb);
    }
  }
`;
