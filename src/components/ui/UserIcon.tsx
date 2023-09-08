"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { BsFillWalletFill } from "react-icons/bs";
import { styled } from "styled-components";
import { useAccount } from "wagmi";

const UserIcon = ({ user }: { user: any }) => {
  const { address } = useAccount();

  console.log(address);

  return (
    <ProfileContainer>
      <Balance>
        <BsFillWalletFill />
        <p suppressHydrationWarning>
          {/* {shortenAddress(user?.user?.publicAddress)} */}
          0.004 ETH
        </p>
      </Balance>
      <Divider />
      <ImageContainer>
        <Image
          src={user?.user?.photoUrl}
          alt="user profile img"
          width="28"
          height="28"
        />
      </ImageContainer>
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
  gap: 1.2rem;
  border-radius: 12rem;
  cursor: pointer;
`;

const ImageContainer = styled.div`
  display: flex;
  border-radius: 50%;
  align-items: center;
  justify-content: center;
  height: 3.2rem;
  width: 3.2rem;
  border: 0.4px solid var(--tertiary-rgb);
`;

const Balance = styled.div`
  display: flex;
  gap: 1rem;
  align-items: center;

  svg {
    color: var(--tertiary-rgb);
    font-size: 2rem;
  }
  p {
    font-size: 1.4rem;
  }
`;

const Divider = styled.div`
  height: 2.8rem;
  width: 2px;
  background-color: var(--tertiary-rgb);
`;
