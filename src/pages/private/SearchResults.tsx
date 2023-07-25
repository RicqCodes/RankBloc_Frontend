"use client";

import { device } from "@/styles/utils.styled";
import React from "react";
import { styled } from "styled-components";
import Post from "./_molecules/Post";

const SearchResults = () => {
  return (
    <SearchResultContainer>
      <InnerContainer>
        <SearchTitle>
          <h5>
            Search result for
            <span> travel</span>
          </h5>
        </SearchTitle>
        <Body>
          <Post />
          <Post />
          <Post />
          <Post />
        </Body>
      </InnerContainer>
    </SearchResultContainer>
  );
};

export default SearchResults;

const SearchResultContainer = styled.div`
  padding: 2.4rem 8.4rem;
  width: 100%;

  ${() => device.down("sm")} {
    padding: 2.4rem;
  }
`;

const InnerContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 6rem;
  padding: 6rem 0;

  ${() => device.down("sm")} {
    gap: 2.4rem;
  }
`;

const SearchTitle = styled.div`
  width: 100%;
  padding-bottom: 1rem;
  border-bottom: 1px solid var(--grey-background-rgb);
  position: relative;

  & h5 {
    color: var(--small-dim-rgb);
    font-size: 1.7rem;
    font-weight: 500;
    line-height: 150%;
    text-transform: capitalize;

    span {
      color: var(--title-rgb);
      font-size: 1.7rem;
    }
  }

  &::before {
    content: "";
    width: 3px;
    height: 20rem;
    transform: rotate(-90deg);
    position: absolute;
    top: -6.4rem;
    left: 9.3rem;

    border-radius: 3px;
    background: #00aaa1;
  }
`;

const Body = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4rem;

  ${() => device.down("sm")} {
    gap: 2.4rem;
  }
`;
