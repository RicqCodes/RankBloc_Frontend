import React from "react";
import { styled } from "styled-components";

const Ad = () => {
  return <AdContainer>Ad</AdContainer>;
};

export default Ad;

const AdContainer = styled.div`
  width: 100%;
  height: 300px;
  background: var(--tertiary-rgb);
  padding: 2.4rem;
`;
