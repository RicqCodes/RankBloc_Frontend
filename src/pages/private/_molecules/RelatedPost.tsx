import React from "react";
import { styled } from "styled-components";
import TopPostContainer from "./TopPostContainer";
import Post from "./Post";
import { device } from "@/styles/utils.styled";

const RelatedPost = () => {
  return (
    <RelatedPostContainer>
      <TopPostContainer title="Recommended from RankBloc">
        <PostContainer>
          <Post column />
          <Post column />
          <Post column />
          <Post column />
          <Post column />
          <Post column />
        </PostContainer>
      </TopPostContainer>
    </RelatedPostContainer>
  );
};

export default RelatedPost;

const RelatedPostContainer = styled.div`
  width: 100%;
`;

const PostContainer = styled.div`
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  gap: 2.4rem;

  ${() => device.down("sm")} {
    flex-direction: column;
  }
`;
