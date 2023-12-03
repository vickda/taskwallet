import Login from "../Components/Login";
import { getServerSession } from "next-auth";
import Todo from "./todo/page";

export default async function Home() {
  const session = await getServerSession();

  if (session) return <Todo />;

  return (
    <>
      <Login />
    </>
  );
}
