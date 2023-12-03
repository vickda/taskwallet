import { NextResponse } from "next/server";
import connectMongoDB from "../../../libs/mongodb";
import UserData from "../../../models/user";

// GET REQUEST
export async function GET(req, { params }) {
  const email = req.nextUrl.searchParams.get("email");
  const type = req.nextUrl.searchParams.get("type");
  await connectMongoDB();
  const userdata = await UserData.findOne({ email });
  const sharedtodos = await userdata["sharedTodo"];
  const invites = await userdata["invitations"];

  if (type === "Todo") {
    return NextResponse.json({ sharedtodos: sharedtodos });
  } else return NextResponse.json({ invites: invites });
}

export async function POST(req, { params }) {
  const email = req.nextUrl.searchParams.get("email");
  const type = req.nextUrl.searchParams.get("type");
  const data = await req.json();

  await connectMongoDB(); // Connect to DB
  // Find the user by email
  const user = await UserData.findOne({ email });

  const userdata = await UserData.findOne({ email });
  const sharedtodos = await userdata["sharedTodo"]["groupList"];
  const invites = await userdata["sharedTodo"]["invitations"];

  if (type === "Todo") {
    return NextResponse.json({ sharedtodos: sharedtodos }, { status: 200 });
  } else {
    invites.push(data);
    await user.save();
    return NextResponse.json({ invites: invites }, { status: 200 });
  }
}
