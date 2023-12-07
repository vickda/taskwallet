export default async function postSendInviteEmails(body) {
  console.log(body);
  try {
    await fetch(`${process.env.URL}/api/email`, {
      method: "POST",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });
  } catch (error) {
    console.log("Cannot Delete todo in db", error);
  }
}
