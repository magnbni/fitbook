import { SessionProvider } from "../components/SessionProvider";

import { getServerSession } from "next-auth";
import "../styles/globals.css";
import Header from "./Header";
import { authOptions } from "../pages/api/auth/[...nextauth]";
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
            <Login />
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
