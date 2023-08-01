import React from "react";
import { styled } from "styled-components";

const Topic = ({ name }: { name: string }) => {
  return <TopicContainer>{name}</TopicContainer>;
};

export default Topic;

const TopicContainer = styled.div`
  border-radius: 1.4rem;
  width: auto;
  padding: 8px 16px;
  background: var(--secondary-rgb);
  font-size: 1.4rem;
  text-transform: capitalize;
`;
