import PrivateLayout from "@/layout/protected";

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <PrivateLayout>{children}</PrivateLayout>;
}
