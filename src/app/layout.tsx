import "./styles/globals.css";
import { Inter } from "next/font/google";
import { Navbar } from "./components/navbar/Navbar";
import { APP_NAME } from "./constants/app.constants";
import { ToasterProvider } from "./providers/ToasterProvider";
import { getCurrentUser } from "./services/user.session";
import Modals from "./components/modals/Modals";
import { Suspense } from "react";
import Loading from "./loading";

export const dynamic = "force-dynamic";

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

  return (
    <html lang="en">
      <body className={fontFamily.className}>
        <ToasterProvider />
        <Navbar user={user} />
        <Modals />
        <Suspense fallback={<Loading />}>
          <div className="container mx-auto">{children}</div>
        </Suspense>
      </body>
    </html>
  );
}
