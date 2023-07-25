"use client";
import React from "react";
import { MdNature } from "react-icons/md";
import { HiChip } from "react-icons/hi";
import { GiLargeDress } from "react-icons/gi";
import { BsFillCameraFill, BsFillHeartPulseFill } from "react-icons/bs";

import { device } from "@/styles/utils.styled";
import { styled } from "styled-components";

const Categories = () => {
  return (
    <CategoriesContainer>
      <InnerContainer>
        <h1>Categories</h1>
        <CategoryBox>
          <Category>
            <Inner>
              <MdNature />
              <h5>Environment & Nature</h5>
            </Inner>
          </Category>
          <Category>
            <Inner>
              <HiChip />
              <h5>Technology</h5>
            </Inner>
          </Category>
          <Category>
            <Inner>
              <GiLargeDress />
              <h5>Lifestyle & Fashion</h5>
            </Inner>
          </Category>
          <Category>
            <Inner>
              <BsFillCameraFill />
              <h5>Photography</h5>
            </Inner>
          </Category>
          <Category>
            <Inner>
              <BsFillCameraFill />
              <h5>Photography</h5>
            </Inner>
          </Category>
          <Category>
            <Inner>
              <BsFillCameraFill />
              <h5>Hotel & Travel</h5>
            </Inner>
          </Category>
          <Category>
            <Inner>
              <BsFillHeartPulseFill />
              <h5>Healthcare</h5>
            </Inner>
          </Category>
        </CategoryBox>
      </InnerContainer>
    </CategoriesContainer>
  );
};

export default Categories;

const CategoriesContainer = styled.div`
  background-color: var(--primary-rgb);
  padding: 2.4rem 8.4rem;
  width: 100%;
  margin-bottom: 8rem;

  ${() => device.down("sm")} {
    padding: 2.4rem;
  }
`;

const InnerContainer = styled.div`
  display: flex;
  width: 100%;
  flex-direction: column;
  gap: 6rem;
  padding: 6rem 0;
  justify-content: center;
  align-items: center;

  ${() => device.down("sm")} {
    gap: 2.4rem;

    h1 {
      color: var(--title-rgb);
      font-size: 2.7rem;
      font-weight: 600;
      line-height: 100%;
    }
  }
`;

const CategoryBox = styled.div`
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 2.4rem;
`;

const Category = styled.div`
  width: 26.8rem;
  cursor: pointer;
  border-radius: var(--border-radius);
  background: var(--secondary-rgb);

  ${() => device.down("sm")} {
    width: 100%;
  }

  &:hover {
    background: var(--tertiary-rgb);

    > div {
      & svg,
      h5 {
        color: var(--logo-text);
      }
    }
  }

  transition: all 0.3s ease-in;
`;

const Inner = styled.div`
  padding: 3.6rem;
  display: flex;
  flex-direction: column;
  gap: 1.8rem;
  align-items: center;
  justify-content: center;

  & svg {
    font-size: 4rem;
    color: var(--tertiary-rgb);
  }

  h5 {
    color: #222;
    font-size: 1.7rem;
    font-weight: 500;
    line-height: 150%;
    text-transform: capitalize;
  }
`;
