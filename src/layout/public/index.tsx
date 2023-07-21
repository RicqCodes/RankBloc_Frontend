"use client";

import React from "react";
import styled from "styled-components";
import Header from "./Header";

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <MainContainer>
        <Header />
        <main>{children}</main>
      </MainContainer>
    </>
  );
};

export default Layout;

const MainContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin: 0 auto;

  & main {
    width: 100%;
    display: flex;
    flex-direction: column;
    height: 100%;
  }
`;
