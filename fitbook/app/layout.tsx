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
              <div className="flex justify-center p-6 mt-14 ">
                <div className="fixed left-0 flex justify-center w-3/12">
                  <Nav />
                </div>
                <div className="flex justify-center w-6/12">{children}</div>
                <div className="fixed right-0 flex justify-center w-3/12 ">
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
