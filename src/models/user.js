import mongoose from "mongoose";

const { Schema } = mongoose;

const userTodoSchema = new Schema({
  email: {
    type: String,
    unique: true,
    required: true,
  },
  username: {
    type: String,
    required: true,
  },
  todos: [
    {
      title: String,
      done: Boolean,
    },
  ],
  sharedTodo: {
    groupList: [
      {
        title: String,
        link: String,
      },
    ],
    invitations: [
      {
        title: String,
        link: String,
        accepted: Boolean,
      },
    ],
  },
  finance: {
    groupList: [
      {
        title: String,
        link: String,
        accepted: Boolean,
      },
    ],
    invitations: [
      {
        title: String,
        link: String,
        accepted: Boolean,
      },
    ],
  },
});

// Use a singular model name (UserData instead of UserDatas)
const UserData =
  mongoose.models.UserData || mongoose.model("UserData", userTodoSchema);

export default UserData;
