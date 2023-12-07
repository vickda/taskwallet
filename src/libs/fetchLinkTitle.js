export default async function fetchLinkTitle(link) {
  //   const url = `${process.env.URL}/api/user/${link}`;
  try {
    const linkdata = await fetch(
      `${process.env.URL}/api/link/${link}?${new URLSearchParams({ link })}`,
      {
        method: "GET",
      }
    );

    const data = await linkdata.json();
    return await data["linkdata"]["title"];
  } catch (error) {
    console.log("Cannot Delete todo in db", error);
  }
}
