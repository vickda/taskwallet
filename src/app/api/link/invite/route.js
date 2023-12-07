import connectMongoDB from "../../../../libs/mongodb";
import LinkTodo from "../../../../models/linkTodo";
import UserData from "../../../../models/user";
import { NextResponse } from "next/server";
import addGroupToUser from "../../../../libs/putGroupToUser";
import getLinkTitle from "../../../../libs/fetchLinkTitle";

export async function GET(req, { params }) {
  const status = req.nextUrl.searchParams.get("status");
  const link = req.nextUrl.searchParams.get("url");
  const email = req.nextUrl.searchParams.get("email");

  await connectMongoDB();

  const linkdata = await LinkTodo.findOne({ link });
  //   const user = await linkdata["users"].filter((val) => val.email === email);
  const user = linkdata["users"].filter((val) => val.email === email);
  if (user.length > 0) {
    // Assuming status is a property of the user object
    if (status === "accepted") {
      user[0].status = true;
      const title = await getLinkTitle(link);
      await addGroupToUser(email, link, title);
    }
  }

  console.log(user);

  await linkdata.save();

  return NextResponse.json({ status: 200, linkdata: user });
}
