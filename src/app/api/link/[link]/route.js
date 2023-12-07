import { NextResponse } from "next/server";
import connectMongoDB from "../../../../libs/mongodb";
import LinkTodo from "../../../../models/linkTodo";

// GET REQUEST
export async function GET(req, { params }) {
  const { link } = params;
  await connectMongoDB();

  const linkdata = await LinkTodo.findOne({ link });
  const todos = await linkdata["todos"];

  return NextResponse.json({ status: 200, todos });
}

// POST METHOD

export async function POST(req, { params }) {
  try {
    const { link } = params;
    const data = await req.json();

    if (!data) throw "No Data";

    console.log(data, "Inside Todo Post Method");

    await connectMongoDB();

    // Find the user by link
    const linkTodo = await LinkTodo.findOne({ link });

    // Add a new todo to the link's todos array
    linkTodo.todos.push(data);

    // Save the updated linkTodo document
    await linkTodo.save();

    return NextResponse.json({
      status: 200,
      message: "Todo added successfully",
      linkTodo,
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
    const { link, todoId } = await req.json();

    await console.log("Inside Delete TODO Route", todoId);
    await connectMongoDB();

    // Find the user by link
    const linkTodo = await LinkTodo.findOne({ link });

    // console.log(linkTodo);

    // Find the index of the todo with the specified todoId
    const todoIndex = linkTodo.todos.findIndex(
      (todo) => todo._id.toString() === todoId
    );

    if (todoIndex === -1) {
      return NextResponse.json({
        status: 404,
        message: "Todo not found",
      });
    }

    // Remove the todo from the linkTodo's todos array
    linkTodo.todos.splice(todoIndex, 1);

    // Save the updated linkTodo document
    await linkTodo.save();

    return NextResponse.json({
      status: 200,
      message: "Todo deleted successfully",
      linkTodo,
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
    const { link, todoId, data } = await req.json();
    console.log(data, "Inside DELTE of Link", params);

    console.log("inside put", data, todoId);

    await connectMongoDB();

    // Find the user by link
    const linkTodo = await LinkTodo.findOne({ link });

    // Find the index of the todo with the specified todoId
    const todoIndex = linkTodo.todos.findIndex(
      (todo) => todo._id.toString() === todoId
    );

    if (todoIndex === -1) {
      return NextResponse.json({
        status: 404,
        message: "Todo not found",
      });
    }

    // Update the todo with the new data
    linkTodo.todos[todoIndex] = { ...linkTodo.todos[todoIndex], ...data };

    // Save the updated linkTodo document
    await linkTodo.save();

    return NextResponse.json({
      status: 200,
      message: "Todo updated successfully",
      linkTodo,
    });
  } catch (error) {
    console.error("Error updating todo:", error);
    return NextResponse.json({
      status: 500,
      message: "Failed to update todo",
    });
  }
}
