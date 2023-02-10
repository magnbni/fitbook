import "../styles/globals.css";

import { SessionProvider } from "../components/SessionProvider";
import { getServerSession } from "next-auth";

import { authOptions } from "../pages/api/auth/[...nextauth]";

import Header from "../components/Header";
import Login from "../components/Login";

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
              <div className="pt-6">{children}</div>
            </div>
          )}
        </SessionProvider>
      </body>
    </html>
  );
}
