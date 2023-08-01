import React from "react";
import { styled } from "styled-components";

interface ITabContent {
  id: number;
  title: string;
}

interface TabProps {
  tabContent: ITabContent[];
  currentActive: number;
  setCurrentActive: (id: number) => void;
}

const Tab = ({ tabContent, currentActive, setCurrentActive }: TabProps) => {
  return (
    <TabContainer>
      <InnerContainer>
        {tabContent.map((content, i) => (
          <Content
            key={content.id}
            className={currentActive === content.id ? "active" : ""}
            onClick={() => setCurrentActive(content.id)}
          >
            {content.title}
          </Content>
        ))}
      </InnerContainer>
    </TabContainer>
  );
};

export default Tab;

const TabContainer = styled.div`
  width: 100%;
`;

const InnerContainer = styled.div`
  width: 100%;
  display: flex;
  gap: 2.8rem;
  padding: 1.8rem 0;
  border-bottom: 1px solid var(--primary-rgb);
`;

const Content = styled.div`
  font-size: 1.6rem;
  position: relative;
  text-transform: capitalize;
  cursor: pointer;

  &.active {
    &::after {
      content: "";
      position: absolute;
      width: 100%;
      height: 1px;
      bottom: -1.8rem;
      left: 0;
      background: var(--tertiary-rgb);
    }
  }
`;
