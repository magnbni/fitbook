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
              <div className="flex justify-center">
                <div className="fixed left-0 z-0 flex justify-center w-1/5 p-2 top-14">
                  <Nav />
                </div>
                <div className="relative z-10 flex w-3/5 px-4 top-14 ">
                  {children}
                </div>
                <div className="fixed right-0 z-0 flex justify-center w-1/5 p-2 top-14">
                  <div>Annonseeeeeeeeeeeeeeeeeeeee</div>
                </div>
              </div>
            </div>
          )}
        </SessionProvider>
      </body>
    </html>
  );
}
