import { Inter } from "next/font/google";

export const metadata = {
  title: "Travelo",
};

const fontFamily = Inter({
  subsets: ["latin"],
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={fontFamily.className}>{children}</body>
    </html>
  );
}
