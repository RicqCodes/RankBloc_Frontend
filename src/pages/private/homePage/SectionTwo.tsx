import React from "react";
import { styled } from "styled-components";
import { PiNotePencilFill } from "react-icons/pi";

import TopPostContainer from "./_molecules/TopPostContainer";
import FeaturedCard from "./_molecules/FeaturedCard";
import Authors from "./_molecules/Authors";
import Ad from "./_molecules/Ad";

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
          <Content>
            <AuthorContainer>
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
            </AuthorContainer>
            <Ad />
            <TopPostContainer title="Categories">
              <CategoryContainer>
                <div>
                  <h6>Lifesyle</h6>
                  <h6>09</h6>
                </div>
                <div>
                  <h6>Travel</h6>
                  <h6>05</h6>
                </div>
                <div>
                  <h6>Food</h6>
                  <h6>09</h6>
                </div>
                <div>
                  <h6>Healthcare</h6>
                  <h6>10</h6>
                </div>
                <div>
                  <h6>Technology</h6>
                  <h6>03</h6>
                </div>
              </CategoryContainer>
            </TopPostContainer>
            <TopPostContainer title="Today's update">
              <UpdateContainer>
                <Update>
                  <div>
                    <h2>14</h2>
                    <p>New Posts</p>
                  </div>
                </Update>
                <Update>
                  <div>
                    <h2>480</h2>
                    <p>Total Visitors</p>
                  </div>
                </Update>
                <Update>
                  <div>
                    <h2>29</h2>
                    <p>New Subscribers</p>
                  </div>
                </Update>
                <Update>
                  <div>
                    <h2>138</h2>
                    <p>Blog Read</p>
                  </div>
                </Update>
              </UpdateContainer>
            </TopPostContainer>
            <TopPostContainer title="Search with tags"></TopPostContainer>
          </Content>
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
  gap: 6.8rem;
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

const AuthorContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 5.4rem;
`;

const CategoryContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;

  > div {
    width: 100%;
    display: flex;
    justify-content: space-between;
    padding: 1.8rem 0;

    h6 {
      color: var(--small-rgb);
      font-size: 1.6rem;
      font-weight: 500;
      line-height: 150%;
    }
  }

  > div:not(:last-child) {
    border-bottom: 1px dashed var(--secondary-rgb);
  }
`;

const UpdateContainer = styled.div`
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  gap: 3.2rem;
`;

const Update = styled.div`
  width: 45%;
  height: 111px;
  border-radius: 10px;
  background: var(--secondary-rgb);
  display: flex;
  align-items: center;
  justify-content: center;

  > div {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    gap: 5px;

    & h2 {
      color: var(--tertiary-rgb);
      font-size: 2.4rem;
      font-weight: 600;
      line-height: 150%;
      text-transform: capitalize;
    }

    & p {
      color: var(--small-rgb);
      font-size: 1.5rem;
      font-weight: 400;
      line-height: 150%;
    }
  }
`;
