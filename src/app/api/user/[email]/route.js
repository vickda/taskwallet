import { NextResponse } from "next/server";
import connectMongoDB from "../../../../libs/mongodb";
import UserData from "../../../../models/user";

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

// PUT METHOD INVITE LINK

export async function PUT(req, { params }) {
  try {
    const email = req.nextUrl.searchParams.get("email");
    const link = req.nextUrl.searchParams.get("link");
    const title = req.nextUrl.searchParams.get("title");

    await connectMongoDB();

    // Find the user by email
    const user = await UserData.findOne({ email });
    console.log(email, link, title, "Inside Put user/[email]");

    // Find the index of the todo with the specified todoId

    if (!user) {
      return NextResponse.json({
        status: 404,
        message: "User not found",
      });
    }

    // Update the todo with the new data
    user.sharedTodo["groupList"].push({
      title: title,
      link: link,
    });

    // Save the updated user document
    await user.save();

    return NextResponse.json({
      status: 200,
      message: "Todo updated successfully",
      user,
    });
  } catch (error) {
    console.error("Error updating todo:", error);
    return NextResponse.json({
      status: 500,
      message: "Failed to update todo",
    });
  }
}
