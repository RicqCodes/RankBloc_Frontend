// "use client";

import React from "react";
import Image from "next/image";
import axios from "axios";

// import getUser from "@/requests/user/getUser";
import { styled } from "styled-components";
import { env } from "@/utils/env";
import { useUser } from "@/hooks/useUser";
import { useAccount } from "wagmi";
import { shortenAddress } from "@/utils/helpers";

const UserIcon = () => {
  const { user } = useUser();
  const { address } = useAccount();

  console.log(user);

  return (
    <ProfileContainer>
      <ImageContainer>
        <Image
          src={user?.data?.user?.photoUrl}
          alt="user profile img"
          width="38"
          height="38"
        />
      </ImageContainer>
      <p>{shortenAddress(address as string)}</p>
    </ProfileContainer>
  );
};

export default UserIcon;

const ProfileContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  border: 2px solid var(--tertiary-rgb);
  padding: 0.3rem 1.6rem;
  gap: 0.8rem;
  border-radius: 12rem;
  cursor: pointer;
`;

const ImageContainer = styled.div`
  display: flex;
  border-radius: 50%;
  align-items: center;
  justify-content: center;
`;
