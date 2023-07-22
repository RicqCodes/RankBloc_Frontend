import React from "react";
import { styled } from "styled-components";
import { PiNotePencilFill } from "react-icons/pi";

import TopPostContainer from "./_molecules/TopPostContainer";
import FeaturedCard from "./_molecules/FeaturedCard";
import Authors from "./_molecules/Authors";

const SectionTwo = () => {
  return (
    <SectionTwoContainer>
      <InnerContainer>
        <TopPostContainer title="Recently Posted">
          <Content>
            <Post>
              <ImageCover></ImageCover>
              <FeaturedCard noImage />
            </Post>
            <Post>
              <ImageCover></ImageCover>
              <FeaturedCard noImage />
            </Post>
            <Post>
              <ImageCover></ImageCover>
              <FeaturedCard noImage />
            </Post>
            <WriteContainer>
              <h3>Share your knowledge with our readers</h3>
              <div>
                <PiNotePencilFill />
                <p>Write on RankBloc</p>
              </div>
            </WriteContainer>
            <Post>
              <ImageCover></ImageCover>
              <FeaturedCard noImage />
            </Post>
            <Post>
              <ImageCover></ImageCover>
              <FeaturedCard noImage />
            </Post>
            <Post>
              <ImageCover></ImageCover>
              <FeaturedCard noImage />
            </Post>
            <Post>
              <ImageCover></ImageCover>
              <FeaturedCard noImage />
            </Post>
            <Post>
              <ImageCover></ImageCover>
              <FeaturedCard noImage />
            </Post>
            <Post>
              <ImageCover></ImageCover>
              <FeaturedCard noImage />
            </Post>
          </Content>
        </TopPostContainer>
        <TopPostContainer title="Top Authors">
          <Authors
            name="Jenny Kia"
            description="Fashion designer, Blogger, activist"
          />
          <Authors
            name="Andress rasel"
            description="Blogger, activist, content creator, part time designer at: www.gethugothemes.com"
          />
          <Authors
            name="Jenny Kia"
            description="Fashion designer, Blogger, activist"
          />
        </TopPostContainer>
      </InnerContainer>
    </SectionTwoContainer>
  );
};

export default SectionTwo;

const SectionTwoContainer = styled.div`
  padding: 2.4rem 8.4rem;
  width: 100%;
`;

const InnerContainer = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: 2fr 1fr;
  padding: 6rem 0;
  gap: 4rem;
`;

const Content = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4.8rem;
`;

const Post = styled.div`
  display: flex;
  gap: 3rem;
  align-items: flex-start;
`;

const ImageCover = styled.div`
  width: 26.6rem;
  height: 100%;
  border-radius: 5px;
  background: #d9d9d9;
`;

const WriteContainer = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 21.2rem;
  background-color: var(--primary-rgb);
  flex-direction: column;
  gap: 2.4rem;

  & h3 {
    color: var(--small-rgb);
    text-align: center;
    font-size: 2.1rem;
    font-weight: 600;
    line-height: 140%;
    text-transform: capitalize;
  }

  > div {
    color: var(--tertiary-rgb);
    font-style: normal;
    font-weight: 400;
    line-height: 100%;
    text-transform: capitalize;
    padding: 12px 24px;
    border: 1px solid var(--tertiary-rgb);
    border-radius: 6px;

    display: flex;
    gap: 8px;
    align-items: center;

    & svg {
      font-size: 2.4rem;
    }

    & p {
      font-size: 1.6rem;
    }
  }
`;
