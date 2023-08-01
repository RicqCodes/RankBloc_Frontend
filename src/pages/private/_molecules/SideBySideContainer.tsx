import { device } from "@/styles/utils.styled";
import React from "react";
import { styled } from "styled-components";

const SideBySideContainer = ({ children }: { children: React.ReactNode }) => {
  const leftDiv = React.Children.toArray(children).find(
    (child) => React.isValidElement(child) && child.props.slot === "left"
  );

  const rightDiv = React.Children.toArray(children).find(
    (child) => React.isValidElement(child) && child.props.slot === "right"
  );

  return (
    <Container>
      <InnerContainer>
        <LeftContainer>{leftDiv}</LeftContainer>
        <RightContainer>{rightDiv}</RightContainer>
      </InnerContainer>
    </Container>
  );
};

export default SideBySideContainer;

const Container = styled.div`
  width: 100%;
  padding: 2.4rem 8.4rem;
  width: 100%;

  ${() => device.down("sm")} {
    padding: 2.4rem;
  }
`;

const InnerContainer = styled.div`
  display: flex;
  justify-content: space-evenly;
`;

const LeftContainer = styled.main`
  ${() => device.up("md")} {
    min-width: 72.8rem;
    max-width: 72.8rem;
  }
  width: 100%;
  padding-top: 3.6rem;
  display: flex;
  flex-direction: column;
  gap: 5.2rem;

  h1 {
    font-size: 3.6rem;
    font-weight: 600;
  }
`;

const RightContainer = styled.div`
  min-width: 36.8rem;
  max-width: 36.8rem;
  width: 100%;
  min-height: 100vh;
  border-left: 1px solid var(--primary-rgb);

  padding-left: clamp(24px, 24px + 100vw - 1080px, 40px);

  > div {
    display: flex;
    flex-direction: column;
    gap: 3.2rem;
  }

  ${() => device.down("md")} {
    display: none;
  }
`;
