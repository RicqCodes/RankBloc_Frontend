import type { Metadata } from "next";
import { Noto_Sans } from "next/font/google";
import { redirect } from "next/navigation";
import PrivateLayout from "@/layout/protected";
import StyledComponentsRegistry from "@/lib/registry";
import PublicLayout from "@/layout/public";
import { Global } from "@/styles/global.styled";
import Providers from "@/_providers/Provider";
import getUser from "@/requests/user/getUser";
import AuthProvider from "@/_providers/AuthProvider";
import { NextResponse } from "next/server";

const noto_sans = Noto_Sans({
  subsets: ["greek"],
  weight: ["400", "500", "600", "700", "800"],
});

export const metadata: Metadata = {
  title: "Rank Bloc",
  description: "The next gen blogging application",
};

const initializeUser = async () => {
  try {
    const response = await getUser();

    if (response.status === "failed") {
      redirect("/");
    }

    return response.data;
  } catch (err) {}
};

export default async function RootLayout({
  user,
  site,
}: {
  user: React.ReactNode;
  site: React.ReactNode;
}) {
  const currentUser = await initializeUser();

  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/favicon.ico" />
      </head>
      <body className={noto_sans.className}>
        <StyledComponentsRegistry>
          <Global />
          <Providers>
            <AuthProvider user={currentUser}>
              {
                <>
                  {currentUser && user}
                  {!currentUser && site}
                </>
              }
            </AuthProvider>
          </Providers>
        </StyledComponentsRegistry>
      </body>
    </html>
  );
}
