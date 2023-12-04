import Login from "../Components/Login";
import { getServerSession } from "next-auth";
import Todo from "./todo/page";
import ErrorComponent from "../Components/ErrorComponent";
import { signOut } from "next-auth/react";

// Create New User Entry in DB
const createNewUser = async (email, username) => {
  console.log(email, username, "Inside Create New User Page.js");
  const newUserBody = {
    email: email,
    username: username,
    todos: [],
    sharedTodo: {
      groupList: [],
      invitations: [],
    },
    finance: {
      groupList: [],
      invitations: [],
    },
  };

  const data = await fetch(`/api/user/${email}`, {
    method: "GET",
  }).then((res) => res.json());

  const isUserCreated = await data["userdata"];

  if (!isUserCreated) {
    await fetch(`/api/user`, {
      method: "POST",
      mode: "cors",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newUserBody),
    });
  } else return;
};

export default async function Home() {
  const session = await getServerSession();

  if (session) {
    // If user is not created create new user;
    let email = session.user?.email;
    let name = session.user?.name;
    console.log(email);

    if (email) {
      await createNewUser(email, name);
      return <Todo />;
    } else {
      signOut();
      return (
        <ErrorComponent
          message={"Oops Cant Access Email Make sure its not set to private"}
        />
      );
    }
  }

  return (
    <>
      <Login />
    </>
  );
}
