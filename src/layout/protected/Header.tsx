import React from "react";
import styled from "styled-components";
import { BiSearch } from "react-icons/bi";
import { PiNotePencilFill } from "react-icons/pi";
import { IoMdNotifications } from "react-icons/io";
import { FaPaintRoller } from "react-icons/fa";

import Logo from "../../components/Logo";
import { device } from "@/styles/utils.styled";

const Header = () => {
  return (
    <HeaderContainer>
      <InnerContainer>
        <Logo />
        <RightContainer>
          <IconContainer>
            {/* <BiSearch />
            <PiNotePencilFill />
            <IoMdNotifications /> */}
            <Background>
              <FaPaintRoller />
            </Background>
          </IconContainer>
          <UserProfileIcon>PN</UserProfileIcon>
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
  z-index: 99;
`;

const InnerContainer = styled.div`
  display: flex;
  margin: 0 auto;
  width: 100%;
  height: 100%;
  align-items: center;
  padding: 2.4rem 8.4rem;
  justify-content: space-between;

  ${() => device.down("xs")} {
    padding: 2.4rem;
  }
`;

const RightContainer = styled.div`
  display: flex;
  gap: 6.4rem;
  align-items: center;
`;

const IconContainer = styled.div`
  display: flex;
  gap: 3.4rem;
  align-items: center;

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
  width: 2.8rem;
  height: 2.8rem;
  border-radius: 50%;
  background: var(--tertiary-rgb);

  & svg {
    height: 1.6rem;
    width: 1.6rem;
    color: var(--logo-text);
  }
`;

const UserProfileIcon = styled.div`
  width: 4.8rem;
  height: 4.8rem;
  border-radius: 50%;
  background-color: var(--primary-rgb);

  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.8rem;
`;
