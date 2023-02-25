import "../styles/globals.css";
import { getServerSession } from "next-auth";
import SessionProvider from "../components/SessionProvider";
import { authOptions } from "../pages/api/auth/[...nextauth]";
import Login from "../components/Login";
import Sidebar from "../components/Sidebar";

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {

  const session = await getServerSession(authOptions);
  console.log(session);
  return (
    <html>
      <head />
      <body>
        <SessionProvider session={session} >
          {
            (session)
            ?
            <div className="flex" >
              <Sidebar />
              {children}
            </div>
            :
            <Login />
          }
        </SessionProvider>
      </body>
    </html>
  )
}

