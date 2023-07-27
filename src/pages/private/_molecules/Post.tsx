import React from "react";
import { css, styled } from "styled-components";
import FeaturedCard from "../homePage/_molecules/FeaturedCard";
import { device } from "@/styles/utils.styled";
import BlogActions from "../blogpost/_molecules/BlogActions";

const Post = ({ column }: { column?: boolean }) => {
  return (
    <PostContainer column={column}>
      <ImageCover column={column}></ImageCover>
      <FeaturedCard noImage fullWidth />
      <BlogActions noViews noBorder />
    </PostContainer>
  );
};

export default Post;

const PostContainer = styled.div<{ column?: boolean }>`
  display: flex;
  gap: 3rem;
  width: ${({ column }) => (column ? "45%" : "100%")};
  ${({ column }) =>
    column
      ? css`
          flex-direction: column;
        `
      : css``};

  ${() => device.down("xs")} {
    flex-direction: column;
  }
`;

const ImageCover = styled.div<{ column?: boolean }>`
  width: ${({ column }) => (column ? "100%" : "26.6rem")};
  border-radius: 5px;
  background: #d9d9d9;
  ${({ column }) =>
    column
      ? css`
          height: 16.4rem;
        `
      : css``};

  ${() => device.down("xs")} {
    width: 100%;
    height: auto;
  }
`;
