import "../styles/globals.css";

import { SessionProvider } from "../components/SessionProvider";
import { getServerSession } from "next-auth";

import { authOptions } from "../pages/api/auth/[...nextauth]";

import Header from "../components/Header/Header";
import Login from "../components/Login/Login";

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
              {children}
            </div>
          )}
        </SessionProvider>
      </body>
    </html>
  );
}
