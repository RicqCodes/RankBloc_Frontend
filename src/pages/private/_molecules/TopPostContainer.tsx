import React from "react";
import { styled } from "styled-components";

const TopPostContainer = ({
  children,
  title,
}: {
  children: React.ReactNode;
  title: string;
}) => {
  const [titleSpan, ...titleOther] = title.split(" ");

  return (
    <>
      <Container>
        <Title>
          <h3>
            <span>{titleSpan}</span> {titleOther?.join(" ")}
          </h3>
        </Title>
        {children && children}
      </Container>
    </>
  );
};

export default TopPostContainer;

const Container = styled.div`
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
