import Logo from "@/components/Logo";
import { device } from "@/styles/utils.styled";
import Link from "next/link";
import React from "react";
import { styled } from "styled-components";

const Footer = () => {
  return (
    <FooterContainer>
      <InnerContainer>
        <Link href="#">Help</Link>
        <Link href="#">Status</Link>
        <Link href="#">Writers</Link>
        <Link href="#">Blog</Link>
        <Link href="#">Careers</Link>
        <Link href="#">Privacy</Link>
        <Link href="#">Terms</Link>
        <Link href="#">About</Link>
        <Link href="#">Text to speech</Link>
        <Link href="#">Teams</Link>
      </InnerContainer>
    </FooterContainer>
  );
};

export default Footer;

const FooterContainer = styled.footer`
  width: 100%;
  border-top: 1px solid var(--primary-rgb);
  padding: 2.4rem 0;
`;

const InnerContainer = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 1.8rem;
  flex-wrap: wrap;

  a {
    font-size: 1.4rem;
    color: var(--small-dim-rgb);
  }
`;
