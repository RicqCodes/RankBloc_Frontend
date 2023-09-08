"use client";
import React, { useEffect, useRef, useState } from "react";
import styled, { css } from "styled-components";
import { BiSearch } from "react-icons/bi";
import { AiOutlineUser } from "react-icons/ai";
import { PiNotePencilFill } from "react-icons/pi";
import { IoMdNotifications, IoMdStats } from "react-icons/io";
import { HiOutlineLibrary } from "react-icons/hi";
import { CgFileDocument } from "react-icons/cg";
import { FaPaintRoller } from "react-icons/fa";
import { ImStatsBars2 } from "react-icons/im";
import Logo from "../../components/Logo";
import { device } from "@/styles/utils.styled";
import UserIcon from "@/components/ui/UserIcon";
import Link from "next/link";
import { useUser } from "@/hooks/useUser";
import { shortenAddress } from "@/utils/helpers";
import useToggle from "@/hooks/useToggle";

const Header = () => {
  const [scrollY, setScrollY] = useState(0);
  const [headerTransform, setHeaderTransform] = useState(0);
  const { user } = useUser();
  const { toggle, toggleRef, toggledElementRef, handleToggle } = useToggle({
    eventType: "click",
  });

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      setScrollY(currentScrollY);

      if (currentScrollY > scrollY) {
        setHeaderTransform((prevTransform) => Math.max(prevTransform - 8, -68));
      } else if (currentScrollY < scrollY) {
        setHeaderTransform((prevTransform) => Math.min(prevTransform + 8, 0));
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [scrollY]);

  return (
    <>
      <MainContainer>
        <HeaderContainer $transformy={headerTransform}>
          <InnerContainer>
            <Logo />
            <RightContainer>
              <IconContainer>
                <BiSearch />
                <Link href="/write">
                  <PiNotePencilFill />
                </Link>
                <Link href="/user/notifications">
                  <IoMdNotifications />
                </Link>
                <Background>
                  <FaPaintRoller />
                </Background>
              </IconContainer>
              <div onClick={handleToggle} ref={toggleRef}>
                <UserIcon user={user} />
              </div>
            </RightContainer>
          </InnerContainer>
        </HeaderContainer>
        {toggle && (
          <NavContainer ref={toggledElementRef}>
            <TopLinks>
              <li onClick={handleToggle}>
                <Link href={`/user/${user?.user.publicAddress}`}>
                  <AiOutlineUser />
                  Profile
                </Link>
              </li>
              <li onClick={handleToggle}>
                <Link href="/user/library">
                  <HiOutlineLibrary />
                  Library
                </Link>
              </li>
              <li onClick={handleToggle}>
                <Link href="/user/story">
                  <CgFileDocument />
                  Story
                </Link>
              </li>
              <li onClick={handleToggle}>
                <Link href="/user/stats">
                  <ImStatsBars2 />
                  Stats
                </Link>
              </li>
            </TopLinks>
            <Divider />
            <MiddleLinks>
              <li>
                <Link href="">Settings</Link>
              </li>
              <li>
                <Link href="">Rankings</Link>
              </li>
              <li>
                <Link href="">Manage Publications</Link>
              </li>
              <li>
                <Link href="">Help</Link>
              </li>
            </MiddleLinks>
            <Divider />
            <BottomLinks>
              <li>
                Signout from
                <span> {shortenAddress(user?.user?.publicAddress)}</span>
              </li>
            </BottomLinks>
          </NavContainer>
        )}
      </MainContainer>
    </>
  );
};

export default Header;

const MainContainer = styled.header`
  position: relative;
  width: 100%;
  display: flex;
  flex-direction: column;
`;

const HeaderContainer = styled.div<{ $transformy: number }>`
  width: 100%;
  background: var(--secondary-rgb);
  top: 0;
  height: 7rem;
  position: sticky;
  transform: translateY(${({ $transformy }) => $transformy}px);
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

  & svg,
  a {
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

const NavContainer = styled.nav`
  max-width: 28rem;
  width: 100%;
  background: #fff;
  position: absolute;
  top: 7.4rem;
  right: 2rem;
  z-index: 9;
  box-shadow: 0 4px 8px 4px var(--secondary-rgb);
`;

const TopLinks = styled.ul`
  display: flex;
  flex-direction: column;
  gap: 2rem;
  padding: 2.4rem;

  > li {
    font-size: 1.4rem;
    cursor: pointer;

    a {
      font-size: 1.4rem;
      display: flex;
      gap: 1rem;
      align-items: center;

      > svg {
        font-size: 2.4rem;
        color: var(--tertiary-rgb);
      }
    }

    > span {
      color: var(--tertiary-rgb);
      font-weight: 600;
    }
  }
`;

const Divider = styled.div`
  width: 100%;
  height: 0.1px;
  background: var(--tertiary-rgb);
`;

const MiddleLinks = styled(TopLinks)``;

const BottomLinks = styled(TopLinks)``;
