"use client";
import Cookies from "js-cookie";
import { RequestCookie } from "next/dist/compiled/@edge-runtime/cookies";
import { NextRequest, NextResponse } from "next/server";

export const extractBaseDomain = (url: string) => {
  const matches = url.match(/^(?:https?:\/\/)?(?:www\.)?([^/]+)(?:\/.*)?$/i);
  if (matches) {
    return matches[1];
  }
  return null;
};

export const extractYouTubeVideoId = (url: string): string | null => {
  const match = url.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/)([^&?/]+)/);
  console.log(url);
  return match ? match[1] : null;
};

export const shortenAddress = (address: string) => {
  return `${address?.slice(0, 6)}...${address?.slice(-4)}`;
};

export const constructCookieHeader = ({ cookies }: { cookies: any }) => {
  let cookieString = "";
  const allCookies = cookies.getAll();

  allCookies.forEach((cookie: any) => {
    cookieString += `${cookie.name}=${cookie.value};`;
  });

  return cookieString;
};

export const deleteBrowserCookie = (
  request: NextRequest,
  response: NextResponse,
  cookie: string
) => {
  const { value } = request.cookies.get(cookie)!;
  if (value) {
    response.cookies?.set(cookie, value);
    response.cookies?.delete(cookie);
  }
};
