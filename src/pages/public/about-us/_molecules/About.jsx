"use client";

import React from "react";
import { styled } from "styled-components";

import { device } from "@/styles/utils.styled";

const AboutUs = () => {
  return (
    <AboutContainer>
      <InnerContainer>
        <Title>
          <h1>
            <span>RankBloc is a place</span>
            where you can find your perfect stories
          </h1>
        </Title>
        <Body>
          <SmallText></SmallText>
        </Body>
      </InnerContainer>
    </AboutContainer>
  );
};

export default AboutUs;

const AboutContainer = styled.div`
  width: 100%;
  background: var(--secondary-rgb);
  padding: 2.4rem 8.4rem;

  ${() => device.down("sm")} {
    padding: 2.4rem;
  }
`;

const InnerContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Title = styled.div``;

const Body = styled.div``;

const SmallText = styled.div``;
