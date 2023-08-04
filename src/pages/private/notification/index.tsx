"use client";
import React, { useState } from "react";
import { styled } from "styled-components";

import NotificationType from "./_molecules/NotificationType";

import Tab from "../_molecules/Tab";
import TopPostContainer from "../_molecules/TopPostContainer";
import Topic from "../_molecules/Topic";
import Authors from "../homePage/_molecules/Authors";
import SideBySideContainer from "../_molecules/SideBySideContainer";

const Notifications = () => {
  const [active, setActive] = useState(1);
  return (
    <SideBySideContainer>
      <LeftContainer slot="left">
        <TopPostContainer title="Notifications">
          <Tab
            tabContent={[
              { id: 1, title: "all" },
              { id: 2, title: "following" },
            ]}
            currentActive={active}
            setCurrentActive={setActive}
          />
          <NotificationContent>
            <NotificationType notifications={[]} />
            <NotificationType notifications={[]} />
            <NotificationType notifications={[]} />
            <NotificationType notifications={[]} />
            <NotificationType notifications={[]} />
            <NotificationType notifications={[]} />
            <NotificationType notifications={[]} />
          </NotificationContent>
        </TopPostContainer>
      </LeftContainer>

      <RightContainer slot="right">
        <TopPostContainer title={"Recommended topics"}>
          <TopicsContainer>
            <Topic name="Crypto Currency" />
            <Topic name="Ethereum" />
            <Topic name="Layer 2" />
            <Topic name="Zero Knowledge" />
            <Topic name="Writing" />
            <Topic name="Programming" />
            <Topic name="Data Science" />
            <Topic name="Technology" />
            <Topic name="Self Improvement" />
            <Topic name="Relationships" />
          </TopicsContainer>
        </TopPostContainer>
        <TopPostContainer title="Recommended Follow">
          <Authors
            name="Funke Ajasin"
            description="Sassy takes on Big Tech, the Metaverse, NFTs and more"
          />
          <Authors
            name="Funke Fatai"
            description="Sassy takes on Big Tech, the Metaverse, NFTs and more"
          />
          <Authors
            name="Funke Tobey"
            description="Sassy takes on Big Tech, the Metaverse, NFTs and more"
          />
        </TopPostContainer>
      </RightContainer>
    </SideBySideContainer>
  );
};

export default Notifications;

const LeftContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4.8rem;
`;

const RightContainer = styled.div``;

const NotificationContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 3.6rem;
`;

const TopicsContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 1.2rem;
  flex-wrap: wrap;
`;
