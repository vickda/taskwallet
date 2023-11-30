import React from "react"
import Navbar from "../../Components/Navbar"
import { getServerSession } from "next-auth";
import Login from "../../Components/Login";



export default async function finance() {
    const session = await getServerSession();

    if(!session) return <Login/>
    
    return (
        <>
        <Navbar/>
        <h1>Hello Finance Page</h1>
        </>
    )
}
