import type { Metadata } from "next";
import { Noto_Sans } from "next/font/google";
import PrivateLayout from "@/layout/protected";
import PublicLayout from "@/layout/public";
import { Global } from "@/styles/global.styled";

import { isAuthenticated } from "@/data";

const inter = Noto_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
});

export const metadata: Metadata = {
  title: "Rank Bloc",
  description: "The next gen blogging application",
};

export default function RootLayout({
  children,
  privateHomepage,
}: {
  children: React.ReactNode;
  privateHomepage: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Global />
        <PrivateLayout>{privateHomepage}</PrivateLayout>
      </body>
    </html>
  );
}
