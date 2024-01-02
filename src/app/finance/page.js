import React from "react";
import Navbar from "../../Components/Navbar";
import { getServerSession } from "next-auth";
import Login from "../../Components/Login";
import UnderMaintenance from "../../Components/UnderMaintenance";

export default async function finance() {
  const session = await getServerSession();

  if (!session) return <Login />;

  return (
    <>
      <Navbar />
      <div className="todo min-h-screen flex flex-col items-center justify-center bg-gray-300">
        <UnderMaintenance />
      </div>
    </>
  );
}
