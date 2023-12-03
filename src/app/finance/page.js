import React from "react"
import Navbar from "../../Components/Navbar"
import { getServerSession } from "next-auth";
import Login from "../../Components/Login";
import DisplayGroups from '../../Components/DisplayGroups'




export default async function finance() {
    const session = await getServerSession();

    if(!session) return <Login/>
    
    return (
        <>
        <Navbar/>
        <div className="todo min-h-screen flex flex-col items-center justify-center bg-gradient-to-r from-indigo-900 via-purple-900 to-blue-800">
            <DisplayGroups/>
        </div>

        </>
    )
}
