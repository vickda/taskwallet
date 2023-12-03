import React from "react";
import Navbar from "../../Components/Navbar";
import { getServerSession } from "next-auth";
import Login from "../../Components/Login";
import TodoList from "../../Components/TodoList";

export default async function Todo() {
  const session = await getServerSession();

  if (!session) return <Login />;

  return (
    <>
      <Navbar />
      <TodoList email={session.user?.email} />
    </>
  );
}
