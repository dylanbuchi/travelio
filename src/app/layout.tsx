import "./styles/globals.css";
import { Inter } from "next/font/google";
import { Navbar } from "./components/navbar/Navbar";
import { APP_NAME } from "./constants/app.constants";
import { RegisterModal } from "./components/modals/RegisterModal";
import { ToasterProvider } from "./providers/ToasterProvider";
import { LoginModal } from "./components/modals/LoginModal";
import { getCurrentUser } from "./services/user.session";

export const metadata = {
  title: APP_NAME,
};

const fontFamily = Inter({
  subsets: ["latin"],
});

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = await getCurrentUser();
  console.log(user);

  return (
    <html lang="en">
      <body className={fontFamily.className}>
        <ToasterProvider />
        <Navbar user={user} />
        <RegisterModal />
        <LoginModal />
        {children}
      </body>
    </html>
  );
}
