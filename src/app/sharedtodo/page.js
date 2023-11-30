import React from "react"
import Navbar from "../../Components/Navbar"
import { getServerSession } from "next-auth";
import Login from "../../Components/Login";


export default async function SharedTodo() {
    const session = await getServerSession();

    if(!session) return <Login/>
    
    return (
        <>
        <Navbar/>
        <h1>Hello SharedToDO Page</h1>
        </>
    )
}

