export default async function fetchGroupData(email) {
  try {
    const response = await fetch(`/api/user/${email}`, { method: "GET" });

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.json();
    return data["userdata"]["sharedTodo"];
  } catch (error) {
    console.error("Error fetching user data:", error);
  }
}
