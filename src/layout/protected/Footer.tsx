import Logo from "@/components/Logo";
import React from "react";
import { styled } from "styled-components";

const Footer = () => {
  return (
    <FooterContainer>
      <InnerContainer>
        <LogoContainer>
          <Logo />
          <h4>
            Did you come here for something in particular or just general Riker
          </h4>
        </LogoContainer>
        <BlogContainer>
          <h3>Blogs</h3>
          <ul>
            <li>Travel</li>
            <li>Technology</li>
            <li>Lifestyle</li>
            <li>Fashion</li>
            <li>Business</li>
          </ul>
        </BlogContainer>
        <BlogContainer>
          <h3>Quick Links</h3>
          <ul>
            <li>FAQ</li>
            <li>Terms & Conditions</li>
            <li>Support</li>
            <li>Privacy Policy</li>
          </ul>
        </BlogContainer>
        <BlogContainer>
          <h3>Subscribe For Newsletter</h3>
          <EmailContainer>
            <input type="email" placeholder="Your Email" />
            <button>Subscribe</button>
          </EmailContainer>
        </BlogContainer>
      </InnerContainer>
    </FooterContainer>
  );
};

export default Footer;

const FooterContainer = styled.footer`
  width: 100%;
  background: var(--primary-rgb);
  padding: 8rem 0;
`;

const InnerContainer = styled.div`
  max-width: var(--max-width);
  display: grid;
  grid-template-columns: 1.5fr 1fr 1fr 1.5fr;
  margin: 0 auto;
  padding: 2.4rem 8.4rem;
  justify-content: end;
`;

const LogoContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2.4rem;
  width: 23.6rem;

  h4 {
    color: var(--small-dim-rgb);
    font-size: 1.5rem;
    font-weight: 400;
    line-height: 150%;
  }
`;

const BlogContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2.8rem;

  h3 {
    color: var();
    font-size: 1.7rem;
    font-weight: 600;
    line-height: 100%;
  }

  ul {
    display: flex;
    flex-direction: column;
    gap: 1.2rem;

    li {
      color: var(--small-dim-rgb);
      font-size: 1.6rem;
      font-style: normal;
      font-weight: 400;
      line-height: 100%;
      text-transform: capitalize;
    }
  }
`;

const EmailContainer = styled.div`
  width: 100%;
  height: 4.5rem;
  background: var(--secondary-rgb);
  display: flex;

  input {
    height: 100%;
    background: none;
    border: none;
    width: 60%;
    outline: none;
    font-size: 1.6rem;
    padding-left: 1.6rem;
    padding-right: 1.4rem;
  }

  button {
    width: 40%;
    background: var(--tertiary-rgb);
    border: none;
    color: var(--logo-text);
    outline: none;
    font-size: 1.6rem;
    border-radius: 0px 6px 6px 0px;
  }
`;
