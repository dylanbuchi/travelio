import "./styles/globals.css";
import { Inter } from "next/font/google";
import { Navbar } from "./components/navbar/Navbar";
import { APP_NAME } from "./constants/app.constants";

export const metadata = {
  title: APP_NAME,
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
      <body className={fontFamily.className}>
        <Navbar />
        {children}
      </body>
    </html>
  );
}
