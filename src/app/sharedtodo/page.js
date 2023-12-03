import React from "react";
import Navbar from "../../Components/Navbar";
import { getServerSession } from "next-auth";
import Login from "../../Components/Login";
import DisplayGroups from "../../Components/DisplayGroups";

export default async function SharedTodo() {
  const session = await getServerSession();
  const email = session?.user?.email;
  console.log(session?.user?.email);

  if (!session) return <Login />;

  return (
    <>
      <Navbar />

      <div className="todo min-h-screen flex flex-col items-center justify-center bg-gradient-to-r from-indigo-800 via-blue-900 to-purple-900">
        <DisplayGroups email={email} />
      </div>
    </>
  );
}
