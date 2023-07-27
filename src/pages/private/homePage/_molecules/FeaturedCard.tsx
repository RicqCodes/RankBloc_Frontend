import React from "react";
import { styled } from "styled-components";
import Image from "next/image";
import { device } from "@/styles/utils.styled";

const imageStyle = {
  borderRadius: "50%",
};

const FeaturedCard = ({
  noImage,
  fullWidth,
  sText,
}: {
  noImage?: boolean;
  fullWidth?: boolean;
  sText?: boolean;
}) => {
  return (
    <FeaturedContainer $fullWidth={fullWidth && true}>
      <InnerContainer>
        <Heading $sText={fullWidth && true}>
          <p>Travel</p>
          <h4>Set video playback speed with javascript</h4>
        </Heading>
        <Body>
          {!noImage && <CoverImage></CoverImage>}
          <Details>
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
            <span>﹒</span>
            <small>June 17</small>
            <span>﹒</span>
            <small>3 min read</small>
          </Details>
          <p>
            Did you come here for something in particular or just general
            Riker-bashing? And blowing into
          </p>
        </Body>
      </InnerContainer>
    </FeaturedContainer>
  );
};

export default FeaturedCard;

const FeaturedContainer = styled.div<{ $fullWidth?: boolean }>`
  max-width: ${({ $fullWidth }) => ($fullWidth ? "100%" : "45%")};

  ${() => device.down("xs")} {
    max-width: 100%;
  }
`;

const InnerContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 1.8rem;
`;

const Heading = styled.div<{ $sText?: boolean }>`
  display: flex;
  flex-direction: column;
  gap: 8px;

  p {
    font-size: 1.2rem;
    font-style: normal;
    font-weight: 400;
    line-height: 100%;
    align-self: flex-start;
    padding: 4px 8px;
    border-radius: 3px;
    background: var(--tertiary-rgb);
    color: var(--logo-text);
    text-transform: capitalize;
  }

  h4 {
    font-size: ${({ $sText }) => ($sText ? "1.7rem" : "2.7rem")};
    font-style: normal;
    font-weight: 600;
    line-height: 140%;
    text-transform: capitalize;
  }
`;

const Body = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;

  > p {
    color: #555555;
    font-size: 15px;
    font-weight: 400;
    line-height: 22.5px;
    word-wrap: break-word;
  }
`;

const CoverImage = styled.div`
  width: 100%;
  height: 22.9rem;
  border-radius: 7px;
  background: #d9d9d9;
`;

const Details = styled.div`
  display: flex;
  color: var(--small-dim-rgb);
  align-items: center;
  flex-wrap: wrap;

  & span {
    font-size: 2.4rem;
  }

  & small {
    font-size: 1.3rem;
  }
`;

const Author = styled.div`
  display: flex;
  gap: 0.5rem;
  align-items: center;

  & h4 {
    font-size: 1.3rem;
    font-weight: 500;
    color: var(--small-dim-rgb);
  }
`;
