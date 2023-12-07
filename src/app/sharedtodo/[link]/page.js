import React from "react";
import Navbar from "../../../Components/Navbar";
import { getServerSession } from "next-auth";
import Login from "../../../Components/Login";
import SharedTodoList from "../../../Components/SharedTodoList";

export default async function SharedTodo() {
  const session = await getServerSession();
  const email = session?.user?.email;
  //   console.log(session?.user?.email);

  if (!session) return <Login />;
  return (
    <>
      <Navbar />

      <SharedTodoList email={email} />
      {/* <div className="todo min-h-screen flex flex-col items-center justify-center bg-gradient-to-r from-indigo-800 via-blue-900 to-purple-900">
      </div> */}
    </>
  );
}
