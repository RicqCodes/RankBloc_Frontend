"use client";
import React from "react";
import { usePathname, useSearchParams, useParams } from "next/navigation";
import { styled } from "styled-components";

import { AiOutlineHeart } from "react-icons/ai";
import { MdOutlineModeComment } from "react-icons/md";
import { LuEye } from "react-icons/lu";
import { VscBookmark } from "react-icons/vsc";
import { GoShare } from "react-icons/go";

const BlogPost = () => {
  const params = useParams();

  return (
    <BlogPostContainer>
      <InnerContainer>
        <Heading>
          <h1>
            Thank You to America’s Librarians for Protecting Our Freedom to Read{" "}
          </h1>
          <Author>
            <ImageContainer></ImageContainer>
            <PublishInfo>
              <div>
                <h4>Barrack Obama</h4>
                <span>﹒</span>
                <p>Follow</p>
              </div>
              <div>
                <p>4 min read</p>
                <span>﹒</span>
                <p>Jul 17</p>
              </div>
              <></>
            </PublishInfo>
          </Author>
          <BlogInformation>
            <InfoContainer>
              <div>
                <AiOutlineHeart />
                <p>13.2k</p>
              </div>
              <div>
                <MdOutlineModeComment />
                <p>191</p>
              </div>
              <div>
                <LuEye />
                <p>5.2M</p>
              </div>
            </InfoContainer>
            <InfoContainer>
              <div>
                <VscBookmark />
              </div>
              <div>
                <GoShare />
              </div>
            </InfoContainer>
          </BlogInformation>
        </Heading>
        <Content>
          <Figure>
            <div></div>
            <figcaption>Graphic credit: Prince Nwakanma</figcaption>
          </Figure>
        </Content>
      </InnerContainer>
    </BlogPostContainer>
  );
};

export default BlogPost;

const BlogPostContainer = styled.div`
  padding: 2.4rem 8.4rem;
  width: 100%;
`;

const InnerContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  max-width: 68rem;
  margin: 0 auto;
`;

const Heading = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2.8rem;

  h1 {
    font-size: 3.8rem;
    font-weight: 700;
  }
`;

const Author = styled.div`
  display: flex;
  gap: 2.4rem;
`;

const ImageContainer = styled.div`
  height: 4.4rem;
  width: 4.4rem;
  border-radius: 50%;
  background: #d9d9d9;
`;

const PublishInfo = styled.div`
  display: flex;
  flex-direction: column;

  > div {
    display: flex;

    h4 {
      font-size: 1.5rem;
      font-weight: 500;
    }

    span {
      font-size: 1.8rem;
    }

    p {
      font-size: 1.5rem;
    }
  }

  > div:first-child {
    p {
      color: var(--tertiary-rgb);
    }
  }
  > div:last-child {
    p {
      color: var(--small-dim-rgb);
    }
  }
`;

const BlogInformation = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  padding: 1.8rem 0;
  justify-content: space-between;
  align-items: center;
  border-top: 1px solid var(--small-dim-rgb);
  border-bottom: 1px solid var(--small-dim-rgb);
`;

const InfoContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 1.8rem;

  > div {
    display: flex;
    gap: 0.5rem;
    align-items: center;

    & svg,
    p {
      font-weight: 400;
      color: var(--small-dim-rgb);
    }

    svg {
      font-size: 2.2rem;
    }

    p {
      font-size: 1.4rem;
    }
  }
`;

const Content = styled.div`
  width: 100%;
  padding-top: 6.4rem;
`;

const Figure = styled.figure`
  width: 100%;

  > div {
    width: 100%;
    height: 38rem;
    background: #d9d9d9;
  }

  & figcaption {
    max-width: 72.8rem;
    width: 100%;
    font-size: 1.4rem;
    color: var(--small-dim-rgb);
    margin: auto;
    text-align: center;
  }
`;
