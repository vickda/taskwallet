import mongoose from "mongoose";

const { Schema } = mongoose;

const linkSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  link: {
    type: String,
    unique: true,
    required: true,
  },
  users: [
    {
      email: {
        type: String,
        required: true,
      },
      status: {
        type: Boolean,
        default: false,
      },
    },
  ],
  todos: [
    {
      title: {
        type: String,
        required: true,
      },
      done: {
        type: Boolean,
        default: false,
      },
    },
  ],
});

// Use a singular model name (LinkTodo instead of LinkTodos)
const LinkTodo =
  mongoose.models.LinkTodo || mongoose.model("LinkTodo", linkSchema);

export default LinkTodo;
