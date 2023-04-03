import "./styles/globals.css";
import { Inter } from "next/font/google";
import { Navbar } from "./components/navbar/Navbar";
import { APP_NAME } from "./constants/app.constants";
import { RegisterModal } from "./components/modals/RegisterModal";
import { ToasterProvider } from "./providers/ToasterProvider";

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
        <ToasterProvider />
        <Navbar />
        <RegisterModal />
        {children}
      </body>
    </html>
  );
}
