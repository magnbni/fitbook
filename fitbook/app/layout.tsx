import "../styles/globals.css";

import { SessionProvider } from "../components/SessionProvider";
import { getServerSession } from "next-auth";

import { authOptions } from "../pages/api/auth/[...nextauth]";

import Header from "../components/Header";
import Login from "../components/Login";
import Nav from "../components/Nav";

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession(authOptions);
  return (
    <html>
      <head />

      <body>
        <SessionProvider session={session}>
          {!session ? (
            <div>
              <Login />
            </div>
          ) : (
            <div>
              <Header />
              <div className="relative flex justify-center pb-4 h-fit top-14">
                <div className="fixed left-0 z-0 flex justify-center w-1/5 p-2 ">
                  <Nav />
                </div>
                <div className="flex justify-center w-3/5 pt-4 ">
                  {children}
                </div>
                <div className="fixed right-0 z-0 flex justify-center w-1/5 ">
                  Advertisement
                </div>
              </div>
            </div>
          )}
        </SessionProvider>
      </body>
    </html>
  );
}
