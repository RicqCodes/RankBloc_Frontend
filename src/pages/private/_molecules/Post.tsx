import React from "react";
import { styled } from "styled-components";
import FeaturedCard from "../homePage/_molecules/FeaturedCard";
import { device } from "@/styles/utils.styled";

const Post = () => {
  return (
    <PostContainer>
      <ImageCover></ImageCover>
      <FeaturedCard noImage />
    </PostContainer>
  );
};

export default Post;

const PostContainer = styled.div`
  display: flex;
  gap: 3rem;
  /* align-items: flex-start; */

  ${() => device.down("xs")} {
    flex-direction: column;
    width: 100%;
  }
`;

const ImageCover = styled.div`
  width: 26.6rem;
  border-radius: 5px;
  background: #d9d9d9;

  ${() => device.down("xs")} {
    width: 100%;
    height: auto;
  }
`;
