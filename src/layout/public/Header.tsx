import React, { useState } from "react";
import styled from "styled-components";
import { BiSolidWallet } from "react-icons/bi";
import Logo from "../../components/Logo";
import { Button } from "@/styles/element.styled";
import Modal from "@/components/ui/Modal";
import Connector from "@/components/Connector";

const Header: React.FC = () => {
  const [isOpen, setIsOPen] = useState(false);

  return (
    <>
      {isOpen && <Connector setIsOpen={setIsOPen} />}
      <HeaderContainer>
        <HeaderInnerContainer>
          <Logo />
          <Nav>
            <ul>
              <li>Our Story</li>
              <li>Membership</li>
              <li>Write</li>
            </ul>
            <Button
              $primary
              $fontsize="1.6"
              $outline="cover"
              onClick={() => setIsOPen(true)}
            >
              <BiSolidWallet />
              Connect Wallet
            </Button>
          </Nav>
        </HeaderInnerContainer>
      </HeaderContainer>
    </>
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

const HeaderInnerContainer = styled.div`
  display: flex;
  max-width: var(--max-width);
  margin: 0 auto;
  width: 100%;
  height: 100%;
  align-items: center;
  padding: 2.4rem 8.4rem;
  justify-content: space-between;
`;

const Nav = styled.nav`
  display: flex;
  gap: 3.6rem;

  & ul {
    display: flex;
    align-items: center;
    gap: 1.8rem;

    & li {
      font-size: 1.5rem;
      font-style: normal;
      font-weight: 500;
      line-height: 100%;
      color: var(--foreground-rgb);
    }
  }

  button {
    font-weight: 500;

    > svg {
      font-size: 2.4rem;
      margin-right: 1rem;
    }
  }
`;
