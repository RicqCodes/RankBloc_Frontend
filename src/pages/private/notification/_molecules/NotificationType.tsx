import React from "react";
import { styled } from "styled-components";

const NotificationType = ({
  notifications,
}: {
  notifications: Array<string>;
}) => {
  return (
    <NotifContainer>
      <InnerContainer>
        <ImageCover></ImageCover>
        <TextContainer>
          <p>
            <span>Ghani Mengal </span>
            clapped for <span>SKALE NETWORK (A CRASH COURSE)</span>
          </p>
          <span>Jul 19</span>
        </TextContainer>
      </InnerContainer>
    </NotifContainer>
  );
};

export default NotificationType;

const NotifContainer = styled.div`
  width: 100%;
`;

const InnerContainer = styled.div`
  width: 100%;
  display: flex;
  gap: 1.8rem;
  align-items: center;
`;

const ImageCover = styled.div`
  width: 4.8rem;
  height: 4.8rem;
  border-radius: 50%;
  background: #d9d9d9;
`;

const TextContainer = styled.div`
  display: flex;
  flex-direction: column;

  p {
    font-size: 1.6rem;
    color: var(--small-dim-rgb);

    span {
      color: var(--tertiary-rgb);
      font-weight: 600;
    }
  }
`;
