import type { Metadata } from "next";
import { Noto_Sans } from "next/font/google";
import PrivateLayout from "@/layout/protected";
import StyledComponentsRegistry from "@/lib/registry";
import PublicLayout from "@/layout/public";
import { Global } from "@/styles/global.styled";

const inter = Noto_Sans({
  subsets: ["greek"],
  weight: ["400", "500", "600", "700", "800"],
});

export const metadata: Metadata = {
  title: "Rank Bloc",
  description: "The next gen blogging application",
};

async function authState() {
  return false;
}

export default function RootLayout({
  user,
  site,
}: {
  user: React.ReactNode;
  site: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <StyledComponentsRegistry>
          <Global />
          {true ? user : site}
        </StyledComponentsRegistry>
      </body>
    </html>
  );
}
