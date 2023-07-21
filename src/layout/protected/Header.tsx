import React from "react";
import styled from "styled-components";
import { BiSearch } from "react-icons/bi";
import { PiNotePencilFill } from "react-icons/pi";
import { IoMdNotifications } from "react-icons/io";
import { FaPaintRoller } from "react-icons/fa";

import Logo from "../../components/Logo";

const Header = () => {
  return (
    <HeaderContainer>
      <InnerContainer>
        <Logo />
        <RightContainer>
          <IconContainer>
            <BiSearch />
            <PiNotePencilFill />
            <IoMdNotifications />
          </IconContainer>
          <Background>
            <FaPaintRoller />
          </Background>
        </RightContainer>
      </InnerContainer>
    </HeaderContainer>
  );
};

export default Header;

const HeaderContainer = styled.div`
  width: 100%;
  background: var(--secondary-rgb);
  height: 7rem;
  top: 0;
  position: sticky;
`;

const InnerContainer = styled.div`
  display: flex;
  max-width: var(--max-width);
  margin: 0 auto;
  width: 100%;
  height: 100%;
  align-items: center;
  padding: 2.4rem 8.4rem;
  justify-content: space-between;
`;

const RightContainer = styled.div`
  display: flex;
  gap: 6.4rem;
  align-items: center;
`;

const IconContainer = styled.div`
  display: flex;
  gap: 3.4rem;

  & svg {
    height: 2.4rem;
    width: 2.4rem;
    color: var(--tertiary-rgb);
  }
`;

const Background = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 3.8rem;
  height: 3.8rem;
  border-radius: 50%;
  background: var(--tertiary-rgb);

  & svg {
    height: 2rem;
    width: 2rem;
    color: var(--logo-text);
  }
`;
