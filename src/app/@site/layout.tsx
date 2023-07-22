import PublicLayout from "@/layout/public";

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <PublicLayout>{children}</PublicLayout>;
}
