import { NextResponse } from "next/server";
import connectMongoDB from "../../../libs/mongodb";
import UserData from "../../../models/user";

// GET REQUEST
export async function GET(req, { params }) {
  const email = req.nextUrl.searchParams.get("email");
  await connectMongoDB();

  const userdata = await UserData.findOne({ email });
  const todos = await userdata["todos"];

  return NextResponse.json({ status: 200, todos });
}

// POST METHOD

export async function POST(req, { params }) {
  try {
    const email = req.nextUrl.searchParams.get("email");
    const data = await req.json();

    if (!data) throw "No Data";

    console.log(data, "Inside Todo/ Post Method");

    await connectMongoDB();

    // Find the user by email
    const user = await UserData.findOne({ email });

    // Add a new todo to the user's todos array
    user.todos.push(data);

    // Save the updated user document
    await user.save();

    return NextResponse.json({
      status: 200,
      message: "Todo added successfully",
      user,
    });
  } catch (error) {
    console.error("Error adding todo:", error);
    return NextResponse.json({
      status: 500,
      message: "Failed to add todo",
    });
  }
}

// DELETE METHOD

export async function DELETE(req, { params }) {
  try {
    const email = req.nextUrl.searchParams.get("email");
    const todoId = req.nextUrl.searchParams.get("todoId");

    await console.log("Inside Delete TODO Route", todoId);
    await connectMongoDB();

    // Find the user by email
    const user = await UserData.findOne({ email });

    // Find the index of the todo with the specified todoId
    const todoIndex = user.todos.findIndex(
      (todo) => todo._id.toString() === todoId
    );

    await console.log(user.todos, todoIndex);

    if (todoIndex === -1) {
      return NextResponse.json({
        status: 404,
        message: "Todo not found",
      });
    }

    // Remove the todo from the user's todos array
    user.todos.splice(todoIndex, 1);

    // Save the updated user document
    await user.save();

    return NextResponse.json({
      status: 200,
      message: "Todo deleted successfully",
      user,
    });
  } catch (error) {
    console.error("Error deleting todo:", error);
    return NextResponse.json({
      status: 500,
      message: "Failed to delete todo",
    });
  }
}

// PUT METHOD

export async function PUT(req, { params }) {
  try {
    const email = req.nextUrl.searchParams.get("email");
    const todoId = req.nextUrl.searchParams.get("todoId");

    const data = await req.json();

    console.log("inside put", data);

    await connectMongoDB();

    // Find the user by email
    const user = await UserData.findOne({ email });

    // Find the index of the todo with the specified todoId
    const todoIndex = user.todos.findIndex(
      (todo) => todo._id.toString() === todoId
    );

    if (todoIndex === -1) {
      return NextResponse.json({
        status: 404,
        message: "Todo not found",
      });
    }

    // Update the todo with the new data
    user.todos[todoIndex] = { ...user.todos[todoIndex], ...data };

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
