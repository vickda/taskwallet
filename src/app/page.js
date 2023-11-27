'use client';

import { signOut, useSession } from "next-auth/react";
import Navbar from "./Navbar";

export default function Home() {
    const session = useSession();
    console.log(session);
    return (
    <>
        <Navbar/>
        <div>Welcome {session?.data?.user?.name}</div>
        <button onClick={() => signOut()}>Logout</button>
    </>
    )
    
}