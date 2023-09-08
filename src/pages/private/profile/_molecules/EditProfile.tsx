"use client";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { styled } from "styled-components";
import { FaTwitter, FaLinkedin, FaTiktok } from "react-icons/fa";
import { BiLogoInstagramAlt } from "react-icons/bi";

import { useUser } from "@/hooks/useUser";
import { Button } from "@/styles/element.styled";
import { useRouter } from "next/router";

const EditProfile = ({
  setIsOpen,
}: {
  setIsOpen: (value: boolean) => void;
}) => {
  const { user } = useUser();
  const router = useRouter();
  const initialFormData = user?.user;
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);
  const [formData, setFormData] = useState(user?.user);

  console.log(router);

  useEffect(() => {
    const isFormChanged =
      JSON.stringify(formData) === JSON.stringify(initialFormData);
    setHasUnsavedChanges(isFormChanged);
  }, [formData, initialFormData]);

  const handleInputChange = (e: { target: { name: any; value: any } }) => {
    const { name, value } = e.target;
    setFormData((prevData: any) => ({
      ...prevData,
      [name]: value,
    }));
  };

  return (
    <ProfileContainer>
      <h2>Profile Information</h2>
      <Content>
        <label htmlFor="photo">Photo</label>
        <TextContainer>
          <ImageContainer>
            <Image src={user?.user.photoUrl} alt="d" height="32" width="32" />
          </ImageContainer>
          <TextContent>
            <ButtonContainer>
              <button>Update</button>
              <button>Remove</button>
            </ButtonContainer>
            <p>
              Recommended: JPG, PNG, or GIF, at least 1,000 pixels per side.
            </p>
          </TextContent>
        </TextContainer>
      </Content>
      <Content>
        <GridContainer>
          <Content>
            <label htmlFor="name">Name</label>
            <InputContainer>
              <input
                placeholder="Enter name here"
                value={formData.name}
                name="name"
                onChange={handleInputChange}
              />
            </InputContainer>
          </Content>
          <Content>
            <label htmlFor="email">Email</label>
            <InputContainer>
              <input
                type="email"
                placeholder="Enter email here"
                value={formData.email}
                name="email"
                onChange={handleInputChange}
              />
            </InputContainer>
          </Content>
        </GridContainer>
      </Content>
      <Content>
        <label htmlFor="bio">Bio</label>
        <InputContainer>
          <input
            placeholder="Enter bio here"
            value={formData.bio}
            name="bio"
            onChange={handleInputChange}
          />
        </InputContainer>
      </Content>
      <SocialMediaLinks>
        <p>Social Media Links</p>
        <GridContainer>
          <Content>
            <label htmlFor="twitter">
              Twitter
              <FaTwitter />
            </label>
            <InputContainer>
              <input
                placeholder="Twitter Username"
                name="twitter"
                onChange={handleInputChange}
              />
            </InputContainer>
          </Content>
          <Content>
            <label htmlFor="instagram">
              Instagram
              <BiLogoInstagramAlt />
            </label>
            <InputContainer>
              <input
                placeholder="Instagram Username"
                name="instagram"
                onChange={handleInputChange}
              />
            </InputContainer>
          </Content>
          <Content>
            <label htmlFor="tiktok">
              Tiktok
              <FaTiktok />
            </label>
            <InputContainer>
              <input
                placeholder="Tiktok Username"
                name="tiktok"
                onChange={handleInputChange}
              />
            </InputContainer>
          </Content>
          <Content>
            <label htmlFor="linkedin">
              LinkedIn
              <FaLinkedin />
            </label>
            <InputContainer>
              <input
                placeholder="LinkedIn Username"
                name="linkedin"
                onChange={handleInputChange}
              />
            </InputContainer>
          </Content>
        </GridContainer>
      </SocialMediaLinks>
      <Action>
        <Button
          onClick={() => setIsOpen(false)}
          $fontsize="1.4"
          $outline="border"
        >
          Cancel
        </Button>
        <Button disabled={hasUnsavedChanges} $fontsize="1.4" $outline="cover">
          Save
        </Button>
      </Action>
    </ProfileContainer>
  );
};

export default EditProfile;

const ProfileContainer = styled.div`
  width: 100%;
  margin-top: -4.8rem;
  display: flex;
  flex-direction: column;
  gap: 3.2rem;
  padding: 0 1.8rem;

  h2 {
    font-size: 2rem;
    font-weight: 700;
  }
`;

const Content = styled.div`
  display: flex;
  width: 100%;
  flex-direction: column;

  > label {
    font-size: 1.4rem;
    font-weight: 400;
    display: flex;
    align-items: center;
    margin-bottom: 1rem;

    svg {
      margin-left: 0.2rem;
    }
  }
`;

const InputContainer = styled.div`
  width: 100%;
  border-bottom: 1px solid var(--tertiary-rgb);
  height: 2.4rem;

  input {
    width: 100%;
    background: transparent;
    border: none;
    outline: none;
    height: 100%;
    font-size: 1.4rem;
  }
`;

const TextContainer = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 2.4rem;
`;

const ImageContainer = styled.div`
  width: 8rem;
  height: 8rem;
  border-radius: 50%;
  background-color: var(--primary-rgb);

  img {
    height: 100%;
    width: 100%;
  }
`;

const TextContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2.4rem;

  p {
    font-size: 1.4rem;
  }
`;

const ButtonContainer = styled.div`
  display: flex;
  gap: 1.4rem;

  button {
    background: transparent;
    font-size: 1.4rem;
    color: var(--tertiary-rgb);
    border: none;
    cursor: pointer;
  }

  button:last-child {
    color: var(--warning-rgb);
  }
`;

const SocialMediaLinks = styled.div`
  width: 100%;

  > p {
    font-size: 1.4rem;
  }
`;

const GridContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 3.2rem;
  margin-top: 1.4rem;
`;

const Action = styled.div`
  width: 100%;
  display: flex;
  justify-content: end;
  gap: 1.4rem;
  margin: 2rem 0;
`;
