import { Button } from "@/styles/element.styled";
import React from "react";
import { styled } from "styled-components";

const HeroSection: React.FC = () => {
  return (
    <HeroContainer>
      <InnerContent>
        <h1>Empowering Writers, Engaging Readers</h1>
        <p>Discover where Blockchain Meets Boundless Creativity!</p>
        <Button $fontsize="1.5">Start Reading</Button>
      </InnerContent>
    </HeroContainer>
  );
};

export default HeroSection;

const HeroContainer = styled.div`
  background-color: var(--primary-rgb);
  padding: 2.4rem 8.4rem;
  max-width: var(--max-width);
  width: 100%;
  border-top: 1px solid var(--tertiary-rgb);
  border-bottom: 1px solid var(--tertiary-rgb);
`;

const InnerContent = styled.div`
  max-width: 84rem;
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 3.2rem;
  align-items: center;
  justify-content: center;
  padding: 6.4rem 0;
  margin: auto;

  & h1 {
    font-size: 6.4rem;
    font-weight: 800;
    color: var(--title-rgb);
    text-align: center;
  }

  & p {
    font-size: 1.8rem;
  }
`;

// const CallToAction = styled(Button)`
//   height: auto;
//   padding: 1.6rem 4.8rem;
// `;
