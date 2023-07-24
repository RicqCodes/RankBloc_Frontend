import { Button } from "@/styles/element.styled";
import React from "react";
import { styled } from "styled-components";

const Authors = ({
  name,
  description,
}: {
  name: string;
  description: string;
}) => {
  return (
    <AuthorsContainer>
      <ImageContainer></ImageContainer>
      <InfoContainer>
        <div>
          <h3>{name}</h3>
          <p>{description}</p>
        </div>
        <ButtonContainer>
          <Button $fontsize="1.4" $fullWidth $height="1.4">
            Follow
          </Button>
        </ButtonContainer>
      </InfoContainer>
    </AuthorsContainer>
  );
};

export default Authors;

const AuthorsContainer = styled.div`
  width: 100%;
  display: flex;
  align-items: flex-start;
  gap: 2rem;
`;

const ImageContainer = styled.div`
  max-width: 50%;
  width: 80px;
  height: 80px;
  border-radius: 50%;
  background: #d9d9d9;
`;

const InfoContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.2rem;
  width: 50%;

  > div {
    /* width: 80%; */
    display: flex;
    flex-direction: column;
    gap: 1.2rem;

    h3 {
      color: #222;
      font-size: 1.7rem;
      font-style: normal;
      font-weight: 600;
      line-height: 100%;
      text-transform: capitalize;
    }

    p {
      color: #666;
      font-size: 1.2rem;
      font-style: normal;
      font-weight: 300;
      line-height: 150%;
      text-transform: capitalize;
      max-width: 28rem;
      width: 100%;
    }
  }
`;

const ButtonContainer = styled.div`
  max-width: 12rem;
  width: 100%;
`;
