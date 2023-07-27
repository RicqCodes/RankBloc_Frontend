import { Button } from "@/styles/element.styled";
import React from "react";
import { styled } from "styled-components";
import Post from "../../_molecules/Post";
import BlogActions from "./BlogActions";

const AboutAuthor = () => {
  return (
    <AboutAuthorContainer>
      <InnerContainer>
        <ImageContainer></ImageContainer>
        <InfoContainer>
          <TextContent>
            <div>
              <h3>Written by Barrack Obama</h3>
              <p>212k followers</p>
            </div>
            <Bio>
              <p>Dad, husband, President, citizen.</p>
            </Bio>
          </TextContent>
          <ActionContent>
            <Button $fontsize="1.5">Follow</Button>
            {/* <Button $fontsize="1.5"></Button> */}
          </ActionContent>
        </InfoContainer>
      </InnerContainer>
      <MorePost>
        <h3>More from Barrack Obama</h3>
        <div>
          <Post column />
          <Post column />
          <Post column />
          <Post column />
        </div>
      </MorePost>
    </AboutAuthorContainer>
  );
};

export default AboutAuthor;

const AboutAuthorContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  max-width: 68rem;
  margin: 0 auto;
  gap: 6rem;
  padding-top: 9rem;
`;

const InnerContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 1.8rem;
  padding-bottom: 4rem;
  border-bottom: 1px solid var(--grey-background-rgb);
`;

const ImageContainer = styled.div`
  width: 7.2rem;
  height: 7.2rem;
  background: #d9d9d9;
  border-radius: 50%;
`;

const InfoContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
`;

const TextContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.8rem;

  > div {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;

    h3 {
      font-size: 2.4rem;
      word-break: break-word;
      font-weight: 500;
      line-height: 3rem;
    }

    p {
      font-size: 1.5rem;
    }
  }
`;

const Bio = styled.div`
  p {
    font-size: 1.5rem;
  }
`;

const ActionContent = styled.div`
  display: flex;
  gap: 7px;
`;

const MorePost = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 2.4rem;

  h3 {
    font-size: 1.6rem;
    font-weight: 600;
  }

  > div {
    width: 100%;
    display: flex;
    flex-wrap: wrap;
    gap: 2.4rem;
  }
`;
