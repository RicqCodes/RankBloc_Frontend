import React from "react";
import styled from "styled-components";

const SectionOne = () => {
  return (
    <SectionOneContainer>
      <InnerContainer>
        <FeaturedContainer>
          <Title>
            <h2>
              <span>Featured</span> this week{" "}
            </h2>
          </Title>
          <Content></Content>
        </FeaturedContainer>
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
`;

const FeaturedContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
`;

const Title = styled.div``;

const Content = styled.div``;
