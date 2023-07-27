import React from "react";
import { styled } from "styled-components";
import FeaturedCard from "./_molecules/FeaturedCard";
import TopPostContainer from "../_molecules/TopPostContainer";
import { device } from "@/styles/utils.styled";

const SectionOne = () => {
  return (
    <SectionOneContainer>
      <InnerContainer>
        <TopPostContainer title="Featured this week">
          <Content>
            <FeaturedCard />
            <FeaturedCard />
            <FeaturedCard />
            <FeaturedCard />
          </Content>
        </TopPostContainer>
        <TopPostContainer title="Popular Posted">
          <TopContent>
            <FeaturedCard noImage fullWidth sText />
            <FeaturedCard noImage fullWidth sText />
          </TopContent>
          <TabContainer>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
          </TabContainer>
        </TopPostContainer>
      </InnerContainer>
    </SectionOneContainer>
  );
};

export default SectionOne;

const SectionOneContainer = styled.div`
  background-color: var(--primary-rgb);
  padding: 2.4rem 8.4rem;
  width: 100%;

  ${() => device.down("sm")} {
    padding: 2.4rem;
  }
`;

const InnerContainer = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: 2fr 1fr;
  padding: 6rem 0;
  gap: 4rem;
  max-width: var(--max-width);

  ${() => device.down("md")} {
    grid-template-columns: 1fr;
  }
`;

const Content = styled.div`
  /* width: 100%; */
  display: flex;
  gap: 3rem;
  flex-wrap: wrap;
  height: 48rem;
  overflow: auto;

  &::before {
    content: "";
    position: absolute;
    top: 8rem;
    right: 0;
    width: 5px; /* Adjust the width as needed */
    height: 86%;
    background-color: #f0f0f0;
  }

  &::after {
    content: "";
    position: absolute;
    top: 8rem;
    right: 0;
    width: 5px;
    height: 40%;
    border-radius: 3px;
    background-color: var(--tertiary-rgb);
  }

  /* Style the scrollbar */
  .scrollable-component::-webkit-scrollbar {
    width: 10px; /* Adjust the width as needed */
  }

  .scrollable-component::-webkit-scrollbar-thumb {
    background-color: #888; /* Set the color for the scrollbar thumb */
  }
`;

const TopContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 3.8rem;
`;

const TabContainer = styled.div`
  width: 50%;
  height: 100%;
  position: relative;
  top: 0;
  left: 50%;
  transform: translateX(-20%);

  > div:nth-child(1),
  div:nth-child(2),
  div:nth-child(3),
  div:nth-child(4) {
    width: 6px;
    height: 12px;
    top: 6px;
    position: absolute;
    transform: rotate(-90deg);
    transform-origin: 0 0;
    border-radius: 3px;
  }

  > div:nth-child(1) {
    left: 0px;
    height: 24px;
    background: #00aaa1;
  }

  > div:nth-child(2) {
    left: 33px;
    background: #c4d1d1;
  }

  > div:nth-child(3) {
    left: 51px;
    background: #c4d1d1;
  }

  > div:nth-child(4) {
    left: 69px;
    background: #c4d1d1;
  }
`;
