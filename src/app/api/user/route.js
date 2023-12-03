import { NextResponse } from "next/server";
import connectMongoDB from "../../../libs/mongodb";
import UserData from "../../../models/user";

export async function POST(req) {
  try {
    const data = await req.json();
    console.log(data.email, "Inside Create User Route"); // Corrected variable name from 'email' to 'data.email'

    await connectMongoDB();

    const newUser = await UserData.create(data);

    return NextResponse.json({
      message: "User created successfully",
      statusCode: 200,
      user: newUser, // Optionally, you can include the created user in the response
    });
  } catch (error) {
    console.error("Error creating user:", error);
    return NextResponse.json({
      message: "Failed to create user",
      statusCode: 500,
    });
  }
}

export async function GET() {
  await connectMongoDB();
  const user = await UserData.find();
  return NextResponse.json({ UserData: user });
}
