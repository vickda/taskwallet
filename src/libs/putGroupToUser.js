export default async function putGroupToUser(email, link, title) {
  const url = `${process.env.URL}/api/user/${email}`;
  console.log(email, link, "insiude TODOAOSD");
  try {
    await fetch(`${url}`, {
      method: "PUT",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, link, title }),
    });
  } catch (error) {
    console.log("Cannot Delete todo in db", error);
  }
}
