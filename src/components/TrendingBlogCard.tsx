import React from "react";
import { styled } from "styled-components";
import Image from "next/image";
import Link from "next/link";
import { device } from "@/styles/utils.styled";

interface ImageStyle {
  borderRadius: String;
  height: String;
  width: String;
  style?: String;
}

const TrendingBlogCard: React.FC = () => {
  const imageStyle = {
    borderRadius: "50%",
  };
  return (
    <BlogCardContainer>
      <PostPosition>
        <span>01</span>
      </PostPosition>
      <Content>
        <Author>
          <Image
            src={
              "https://miro.medium.com/v2/resize:fill:40:40/0*ZeXspjgRt9P0n3a3.png"
            }
            style={imageStyle}
            width={"24"}
            height={"24"}
            alt={"Author image"}
          />
          <h4>Barrack Obama</h4>
        </Author>
        <Link href={"#"}>
          <h2>
            Thank You to America’s Librarians for Protecting Our Freedom to Read
          </h2>
        </Link>
        <Details>
          <small>July 17</small>
          <span>﹒</span>
          <small>6 min read</small>
        </Details>
      </Content>
    </BlogCardContainer>
  );
};

export default TrendingBlogCard;

const BlogCardContainer = styled.div`
  display: flex;
  align-items: flex-start;
  max-width: 33.3333333%;
  flex-basis: 33.333333%;
  margin-bottom: 1rem;
  gap: 1.6rem;
  justify-content: flex-start;

  ${() => device.down("md")} {
    max-width: 50%;
    flex-basis: 50%;
  }

  ${() => device.down("sm")} {
    max-width: 100%;
    flex-basis: 100%;
  }
`;

const PostPosition = styled.div`
  display: flex;
  /* background: var(--primary-rgb); */
  /* border-radius: var(--border-radius); */
  flex: 0 0 auto;
  top: -1rem;

  & span {
    font-size: 3.2rem;
    font-weight: 700;
    color: var(--secondary-rgb);
  }
`;

const Content = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;

  h2 {
    font-size: 1.6rem;
    font-weight: 700;
  }
`;

const Author = styled.div`
  display: flex;
  gap: 0.5rem;
  align-items: center;

  & h4 {
    font-size: 1.3rem;
    font-weight: 500;
  }
`;

const Details = styled.div`
  display: flex;
  /* gap: 2px; */
  align-items: center;
  color: var(--tertiary-rgb);

  & small {
    font-size: 1.3rem;
  }

  & span {
    font-size: 2.4rem;
  }
`;
