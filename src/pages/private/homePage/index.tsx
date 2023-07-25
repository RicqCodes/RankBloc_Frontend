"use client";

import React from "react";
import { styled } from "styled-components";

import SectionOne from "./SectionOne";
import SectionTwo from "./SectionTwo";
import { device } from "@/styles/utils.styled";

const Homepage = () => {
  return (
    <>
      <SectionOne />
      <SectionTwo />
    </>
  );
};

export default Homepage;
