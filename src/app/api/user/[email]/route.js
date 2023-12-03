import { NextResponse } from "next/server";
import connectMongoDB from "../../../../libs/mongodb";
import UserData from "../../../../models/user";

export async function POST(req, { params }) {
  try {
    const { email } = params; // Extract email from params
    await connectMongoDB(); // Corrected missing parentheses for connectMongoDB function

    console.log(params, "asdas");
    const userdata = await UserData.findOne({ email }); // Simplified query

    return NextResponse.json({
      status: 200,
      userdata, // Optionally, include the user data in the response
    });
  } catch (error) {
    console.error("Error fetching user data:", error);
    return NextResponse.json({
      status: 500,
      message: "Failed to fetch user data",
    });
  }
}

export async function GET(req, { params }) {
  try {
    const { email } = params; // Extract email from params
    await connectMongoDB(); // Corrected missing parentheses for connectMongoDB function

    console.log(params, "asdas");
    const userdata = await UserData.findOne({ email }); // Simplified query

    return NextResponse.json({
      status: 200,
      userdata, // Optionally, include the user data in the response
    });
  } catch (error) {
    console.error("Error fetching user data:", error);
    return NextResponse.json({
      status: 500,
      message: "Failed to fetch user data",
    });
  }
}
