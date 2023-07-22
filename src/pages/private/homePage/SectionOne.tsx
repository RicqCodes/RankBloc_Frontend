import React from "react";
import { styled } from "styled-components";
import FeaturedCard from "./_molecules/FeaturedCard";
import TopPostContainer from "./_molecules/TopPostContainer";

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
`;

const InnerContainer = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: 2fr 1fr;
  padding: 6rem 0;
  gap: 4rem;
`;

const FeaturedContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 5rem;
  position: relative;
`;

const Title = styled.div`
  h3,
  span {
    font-size: 21px;
    font-style: normal;
    font-weight: 600;
    line-height: 140%;
    text-transform: capitalize;
  }

  span {
    background: var(--tertiary-rgb);
    padding: 1px;
    color: var(--logo-text);
  }
`;

const Content = styled.div`
  width: 100%;
  display: flex;
  gap: 2.4rem;
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
  width: 100%;
  height: 100%;
  position: relative;
  top: 0;
  left: 50%;

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
