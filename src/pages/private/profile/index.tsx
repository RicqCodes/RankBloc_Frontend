"use client";

import React, { useState } from "react";
import Link from "next/link";
import { styled } from "styled-components";
import SideBySideContainer from "../_molecules/SideBySideContainer";
import Tab from "../_molecules/Tab";

import { FaTwitterSquare, FaInstagramSquare, FaLinkedin } from "react-icons/fa";
import TopPostContainer from "../_molecules/TopPostContainer";

const UserProfilePage = () => {
  const [active, setActive] = useState(1);

  return (
    <SideBySideContainer>
      <LeftContainer slot="left">
        <UserInfoContainer>
          <ImageContainer></ImageContainer>
          <div>
            <NameContainer>
              <h2>Prince Nwakanma</h2>
              <small>0x455E8c8970bfCc2F3599bA44365221f48636c0c0</small>
              <div>
                <p>
                  <span>1.5M </span>
                  Followers
                </p>
                <p>
                  <span>150 </span>
                  Following
                </p>
                <p>
                  <span>1M </span>
                  Subscribers
                </p>
              </div>
            </NameContainer>
            <button>Follow</button>
            <Socials>
              <Link href="#">
                <FaLinkedin />
              </Link>
              <Link href="#">
                <FaTwitterSquare />
              </Link>
              <Link href="#">
                <FaInstagramSquare />
              </Link>
            </Socials>

            <p>
              Welcome to my creative corner! 🎨✨ Aspiring writer, explorer, and
              storyteller weaving words into captivating tales. 📚🌏 Join me on
              this journey of imagination and discovery as I share my thoughts,
              adventures, and musings. 🌟💭 Embracing the beauty of life, one
              story at a time. 🌸🌈
            </p>
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

  h2 {
    font-size: 2.2rem;
    font-weight: 600;
  }

  p,
  span {
    font-size: 1.6rem;
  }

  > div {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 1.8rem;

    button {
      background: transparent;
      border: none;
      cursor: pointer;
      font-size: 1.6rem;
      padding: 8px 28px;
      background: var(--tertiary-rgb);
      color: var(--logo-text);
      border-radius: var(--border-radius);
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
    }
  }

  span {
    color: var(--tertiary-rgb);
    font-weight: 600;
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
  background: #d9d9d9;
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
