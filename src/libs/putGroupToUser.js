export default async function putGroupToUser(email, link, title) {
  const url = `${process.env.URL}/api/user/${email}`;
  console.log(email, link, "insiude TODOAOSD");
  try {
    await fetch(`${url}?${new URLSearchParams({ email, link, title })}`, {
      method: "PUT",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
      },
      //   body: JSON.stringify({
      //     /* your data here */
      //   }),
    });
  } catch (error) {
    console.log("Cannot Delete todo in db", error);
  }
}
