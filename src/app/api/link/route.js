import connectMongoDB from "../../../libs/mongodb";
import LinkTodo from "../../../models/linkTodo";
import { NextResponse } from "next/server";
import postSendInviteEmails from "../../../libs/postSendInviteEmails";

export async function GET(req, { params }) {
  const link = req.nextUrl.searchParams.get("link");
  await connectMongoDB();

  const linkdata = await LinkTodo.findOne({ link });
  const todos = await linkdata["todos"];

  return NextResponse.json({ todos });
}

// POST METHOD

export async function POST(req, { params }) {
  try {
    const data = await req.json();
    const userArr = data["users"];

    if (!data) throw "No Data";

    await connectMongoDB();

    await LinkTodo.create(data);

    let inviteremail = userArr[0]["email"];
    for (let i = 1; i < userArr.length; i++) {
      const body = {
        inviterEmail: inviteremail,
        inviterUsername: "Test",
        inviteeEmail: userArr[i]["email"],
        link: data["link"],
      };

      await postSendInviteEmails(body);
    }

    return NextResponse.json({
      status: 200,
      message: "Link Created successfully",
    });
  } catch (error) {
    console.error("Error Creating Link:", error);
    return NextResponse.json({
      status: 500,
      message: "Failed to Create Link",
    });
  }
}

// DELETE METHOD

export async function DELETE(req, { params }) {
  try {
    const link = req.nextUrl.searchParams.get("link");
    const todoId = req.nextUrl.searchParams.get("todoId");

    await console.log("Inside Delete TODO Route", todoId);
    await connectMongoDB();

    // Find the user by link
    const user = await LinkTodo.findOne({ link });

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

// // PUT METHOD

// export async function PUT(req, { params }) {
//   try {
//     const link = req.nextUrl.searchParams.get("link");
//     const todoId = req.nextUrl.searchParams.get("todoId");

//     const data = await req.json();

//     console.log("inside put", data);

//     await connectMongoDB();

//     // Find the user by link
//     const user = await LinkTodo.findOne({ link });

//     // Find the index of the todo with the specified todoId
//     const todoIndex = user.todos.findIndex(
//       (todo) => todo._id.toString() === todoId
//     );

//     if (todoIndex === -1) {
//       return NextResponse.json({
//         status: 404,
//         message: "Todo not found",
//       });
//     }

//     // Update the todo with the new data
//     user.todos[todoIndex] = { ...user.todos[todoIndex], ...data };

//     // Save the updated user document
//     await user.save();

//     return NextResponse.json({
//       status: 200,
//       message: "Todo updated successfully",
//       user,
//     });
//   } catch (error) {
//     console.error("Error updating todo:", error);
//     return NextResponse.json({
//       status: 500,
//       message: "Failed to update todo",
//     });
//   }
// }
