import React from "react";
import { css, styled } from "styled-components";

import { AiOutlineHeart } from "react-icons/ai";
import { MdOutlineModeComment } from "react-icons/md";
import { LuEye } from "react-icons/lu";
import { VscBookmark } from "react-icons/vsc";
import { GoShare } from "react-icons/go";

const BlogActions = ({
  noBorder,
  noViews,
}: {
  noBorder?: boolean;
  noViews?: boolean;
}) => {
  return (
    <ActionContainer noBorder={noBorder}>
      <InfoContainer>
        {!noViews && (
          <div>
            <LuEye />
            <p>5.2M</p>
          </div>
        )}
        <div>
          <AiOutlineHeart />
          <p>13.2k</p>
        </div>
        <div>
          <MdOutlineModeComment />
          <p>191</p>
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
    </ActionContainer>
  );
};

export default BlogActions;

const ActionContainer = styled.div<{ noBorder?: boolean }>`
  display: flex;
  justify-content: space-between;
  width: 100%;
  padding: 1.8rem 0;
  justify-content: space-between;
  align-items: center;
  ${({ noBorder }) =>
    noBorder
      ? null
      : css`
          border-top: 1px solid var(--small-dim-rgb);
          border-bottom: 1px solid var(--small-dim-rgb);
        `}
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
