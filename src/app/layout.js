import { getServerSession } from "next-auth"
import { authOptions } from "../../pages/api/auth/[...nextauth]"
// import { SessionProvider } from "next-auth/react"
import Login from "./Login"
import Home from "./page"
import SessionProvider from "./SessionProvider"

export const metadata = {
  title: 'Next.js',
  description: 'Generated by Next.js',
}

export default async function RootLayout({ children }) {
  const session = await getServerSession(authOptions)
  // console.log(session, "layout");
 return (
    <html lang="en">
      <body>
        <SessionProvider session={session}>
          {!session ? <Login/> : <Home/>}
        </SessionProvider>
      </body>
    </html>
  )
}