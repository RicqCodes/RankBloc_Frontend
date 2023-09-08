"use client";

import React, { useState } from "react";
import Link from "next/link";
import { styled } from "styled-components";
import useSWR from "swr";
import {
  FaTwitter,
  FaInstagram,
  FaLinkedin,
  FaTiktok,
  FaFacebook,
} from "react-icons/fa";
import { RiEdit2Line } from "react-icons/ri";

import SideBySideContainer from "../_molecules/SideBySideContainer";
import Tab from "../_molecules/Tab";

import TopPostContainer from "../_molecules/TopPostContainer";
import { useUser } from "@/hooks/useUser";
import { baseQuery } from "@/utils/baseHandlers/baseQuery";
import Image from "next/image";
import Modal from "@/components/ui/Modal";
import EditProfile from "./_molecules/EditProfile";
import { Button } from "@/styles/element.styled";

interface PlatformIcons {
  [platformName: string]: React.ComponentType;
}

const platformIcons: PlatformIcons = {
  facebook: FaFacebook,
  twitter: FaTwitter,
  instagram: FaInstagram,
  linkedin: FaLinkedin,
  tiktok: FaTiktok,
};

const UserProfilePage = ({ initialData }: { initialData: any }) => {
  const [active, setActive] = useState(1);
  const [openModal, setOpenModal] = useState(false);
  const { user } = useUser();
  const { data } = useSWR(
    `http://localhost:8000/api/v1/user-relationships/${user?.user._id}`,
    baseQuery,
    { fallbackData: initialData }
  );

  return (
    <SideBySideContainer>
      <LeftContainer slot="left">
        <UserInfoContainer>
          {openModal && (
            <Modal setIsOpen={setOpenModal}>
              <EditProfile setIsOpen={setOpenModal} />
            </Modal>
          )}
          <Edit onClick={() => setOpenModal(true)}>
            <RiEdit2Line />
          </Edit>
          <ImageContainer>
            <Image
              src={user?.user.photoUrl}
              alt={` A display photo of user ${user?.user._id}`}
              height="20"
              width="20"
            />
          </ImageContainer>
          <div>
            <NameContainer>
              <h2>{user?.user.name ?? "John Doe"}</h2>
              <small>{user?.user.publicAddress}</small>
              <div>
                <p>
                  <span>{data?.followers?.results || 0}</span>
                  Followers
                </p>
                <p>
                  <span>{data?.following?.results || 0}</span>
                  Following
                </p>
                <p>
                  <span>{user?.user.reputation}</span>
                  Reputation
                </p>
              </div>
            </NameContainer>
            <button>Follow</button>
            {user?.user.socialMediaLinks?.length > 0 && (
              <Socials>
                {user?.user.socialMediaLinks.map(
                  (link: { platform: string; link: string }) => {
                    const platformName = link.platform.toLowerCase();
                    if (platformIcons[platformName]) {
                      const IconComponent = platformIcons[platformName];
                      return (
                        <Link key={link.platform} href={link.link}>
                          <IconComponent />
                        </Link>
                      );
                    }
                  }
                )}
              </Socials>
            )}

            <p>{user?.user.bio ?? ""}</p>
          </div>
        </UserInfoContainer>
        <Tab
          tabContent={[
            { id: 1, title: "Achievements" },
            { id: 2, title: "Stats" },
          ]}
          currentActive={active}
          setCurrentActive={setActive}
        />
      </LeftContainer>
      <RightContainer slot="right">
        <TopPostContainer title="Recent Activity">
          <Activity>
            <li>
              Posted a new blog:
              <span> &quot;Exploring the Great Outdoors&quot;</span>
            </li>
            <li>
              left a like on
              <span> &quot;Journey to the Unknown&quot;</span>
            </li>
            <li>
              left a comment on
              <span> &quot;Delicious Recipes for Summer&quot;</span>
            </li>
          </Activity>
          <SeeMore>See more &rarr;</SeeMore>
        </TopPostContainer>
        <TopPostContainer title="notifications">
          <Activity>
            <li>
              Your article
              <span> &quot;Exploring the Great Outdoors&quot;</span> is trending
            </li>
            <li>
              You have a new follower -<span> @dreamchaser</span>
            </li>
            <li>
              New comment on your post
              <span> &quot;In Search of Serenity&quot;</span>
            </li>
          </Activity>
          <SeeMore>
            <Link href="/user/notifications">See more &rarr;</Link>
          </SeeMore>
        </TopPostContainer>
        <TopPostContainer title="Recommended for you">
          <Activity>
            <li>
              &quot;Unraveling Mysteries&quot;
              <span> @mysterylover</span>
            </li>
            <li>
              &quot;New comment on your post&quot;
              <span> @meditationist</span>
            </li>
            <li>
              &quot;Captivating Landscapes&quot;
              <span> @wanderlust</span>
            </li>
          </Activity>
        </TopPostContainer>
      </RightContainer>
    </SideBySideContainer>
  );
};

export default UserProfilePage;

const LeftContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2.8rem;
`;

const RightContainer = styled.div``;

const UserInfoContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  position: relative;

  h2 {
    font-size: 2.2rem;
    font-weight: 600;
  }

  > p,
  span {
    font-size: 1.6rem;
  }

  > div {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 1.8rem;

    > button {
      background: transparent;
      border: none;
      cursor: pointer;
      font-size: 1.6rem;
      padding: 8px 28px;
      background: var(--tertiary-rgb);
      color: var(--logo-text);
      border-radius: var(--border-radius);
    }

    > p {
      font-size: 1.4rem;
    }
  }
`;

const NameContainer = styled.div`
  display: flex;
  flex-direction: column;
  text-align: center;

  > div {
    display: flex;
    gap: 1.8rem;
    margin-top: 1rem;

    p {
      letter-spacing: 0.8px;
      font-size: 1.5rem;
    }
  }

  span {
    color: var(--tertiary-rgb);
    font-weight: 600;
    margin-right: 0.4rem;
  }

  p {
    font-weight: 400;
  }

  small {
    letter-spacing: 1px;
  }
`;

const ImageContainer = styled.div`
  width: 12rem;
  height: 12rem;
  border-radius: 50%;
  background: var(--secondary-rgb);

  > img {
    height: 100%;
    width: 100%;
  }
`;

const Socials = styled.div`
  display: flex;
  align-items: center;
  gap: 1.2rem;
  font-size: 2.2rem;
  color: var(--tertiary-rgb);
`;

const Activity = styled.ul`
  display: flex;
  flex-direction: column;
  gap: 1.4rem;
  margin-top: -1rem;

  li {
    font-size: 1.4rem;

    span {
      color: var(--tertiary-rgb);
      font-weight: 600;
    }
  }
`;

const SeeMore = styled.div`
  width: 100%;
  margin-top: -2.4rem;
  font-size: 1.4rem;
  text-align: right;
  color: var(--tertiary-rgb);
  cursor: pointer;
`;

const Edit = styled.div`
  position: absolute;
  top: 0;
  right: 16rem;
  cursor: pointer;

  svg {
    font-size: 2.2rem;
    color: var(--tertiary-rgb);
  }
`;
