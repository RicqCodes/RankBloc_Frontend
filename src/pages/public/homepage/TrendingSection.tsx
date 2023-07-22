import React from "react";
import { styled } from "styled-components";
import { HiOutlineTrendingUp } from "react-icons/hi";
import TrendingBlogCard from "@/pages/public/homepage/_molecules/TrendingBlogCard";

const TrendingSection: React.FC = () => {
  return (
    <TrendingContainer>
      <InnerContainer>
        <Title>
          <SVG>
            <HiOutlineTrendingUp />
          </SVG>
          <h2>Currently trending on the Bloc</h2>
        </Title>
        <Content>
          <TrendingBlogCard />
          <TrendingBlogCard />
          <TrendingBlogCard />
          <TrendingBlogCard />
          <TrendingBlogCard />
          <TrendingBlogCard />
        </Content>
      </InnerContainer>
    </TrendingContainer>
  );
};

export default TrendingSection;

const TrendingContainer = styled.div`
  width: 100%;
  padding: 4.8rem 8.4rem;
  border-bottom: 1px solid var(--primary-rgb);
`;

const InnerContainer = styled.div`
  width: 100%;
`;

const Title = styled.div`
  display: flex;
  align-items: center;
  gap: 1.8rem;
  margin-bottom: 2rem;

  & h2 {
    font-size: 1.6rem;
    color: var(--title-rgb);
    font-weight: 500;
  }
`;

const SVG = styled.div`
  width: 2.4rem;
  height: 2.4rem;
  border-radius: 50%;
  border: 1px solid var(--tertiary-rgb);
  display: flex;
  align-items: center;
  justify-content: center;

  svg {
    color: var(--tertiary-rgb);
    font-size: 1.8rem;
  }
`;

const Content = styled.div`
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  /* align-items: flex-start; */
`;
