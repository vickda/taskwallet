"use client";

import { useEffect, useState } from "react";
import Modal from "../Components/Modal";

const url = `http://localhost:3000/api/todo?`;

const addTodo = async (newTodo, email) => {
  try {
    await fetch(`${url}${new URLSearchParams({ email })}`, {
      method: "POST",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
        // 'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: JSON.stringify(newTodo),
    });
  } catch (error) {
    console.log("Cannot add todo in db", error);
  }
};
const deleteTodo = async (email, id) => {
  try {
    await fetch(`${url}${new URLSearchParams({ email: email, todoId: id })}`, {
      method: "DELETE",
      mode: "cors",
    });
  } catch (error) {
    console.log("Cannot Delete todo in db", error);
  }
};
const updateTodo = async (email, id, newTodo) => {
  try {
    await fetch(`${url}${new URLSearchParams({ email: email, todoId: id })}`, {
      method: "PUT",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
        // 'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: JSON.stringify(newTodo),
    });
  } catch (error) {
    console.log("Cannot Delete todo in db", error);
  }
};

function TodoList({ email }) {
  // state for the input value
  const [value, setValue] = useState("");

  // state for the todo list
  const [todos, setTodos] = useState([]);

  // state for the active tab
  const [active, setActive] = useState("All");

  // function to handle input change
  const handleChange = (e) => {
    setValue(e.target.value);
  };

  // function to Add Todo
  const handleSubmit = async (e) => {
    e.preventDefault();
    // check if the input is not empty
    if (value.trim()) {
      // create a new todo object with the input value and a unique id
      const newTodo = { title: value, done: false };

      // Add data into db
      await addTodo(newTodo, email);

      // update the todo list with the new todo
      await fetchData();
      // setTodos((prevTodos) => [newTodo, ...prevTodos]);
      // clear the input value
      setValue("");
    }
  };

  // function to Makr Todo Complete
  const handleComplete = async (id) => {
    // find the index of the todo with the given id

    const index = todos.findIndex((todo) => todo._id === id);
    // create a copy of the todo list
    const newTodos = [...todos];

    // set the done property of the todo at the index to true
    newTodos[index].done = true;

    await updateTodo(email, id, newTodos[index]);
    await fetchData();
  };

  // function to handle todo deletion
  const handleDelete = async (id) => {
    await deleteTodo(email, id);

    // filter out the todo with the given id
    const newTodos = todos.filter((todo) => todo.id !== id);
    // update the todo list with the filtered copy
    setTodos(newTodos);
    fetchData();
  };

  // function to filter the todos based on the active tab
  const filterTodos = () => {
    // console.log(todos, "Insie");
    switch (active) {
      case "All":
        return todos;
      case "Open":
        return todos.filter((todo) => !todo.done);
      case "Completed":
        return todos.filter((todo) => todo.done);
      default:
        return todos;
    }
  };

  const fetchData = async () => {
    try {
      const response = await fetch(`${url}${new URLSearchParams({ email })}`, {
        method: "GET",
        mode: "cors",
        cache: "no-store",
      });

      if (!response.ok) {
        throw new Error("Failed to fetch todos");
      }

      const data = await response.json();
      setTodos(data.todos);
    } catch (error) {
      console.error("Error fetching todos:", error);
    }
  };

  // // Use effect to fill data from database
  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="todo min-h-screen flex flex-col items-center justify-center bg-gradient-to-r from-purple-400 via-pink-500 to-red-500">
      <h1 className="text-6xl font-bold text-white mb-10">TODO List</h1>
      <form onSubmit={handleSubmit} className="flex w-3/4 md:w-1/2">
        <input
          type="text"
          value={value}
          onChange={handleChange}
          placeholder="Enter a new task"
          className="flex-1 px-4 py-2 rounded-l-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
        />
        <button
          type="submit"
          className="px-4 py-2 bg-purple-600 text-white rounded-r-lg hover:bg-purple-700 transition-colors duration-300 ease-in-out"
        >
          Add
        </button>
      </form>
      <div className="w-3/4 md:w-1/2 mt-10">
        <div className="flex justify-between">
          {["All", "Open", "Completed"].map((type, idx) => (
            <button
              key={idx}
              className={`text-xl font-medium px-4 py-2 rounded-lg ${
                active === type
                  ? "bg-white text-gray-900 shadow-lg"
                  : "bg-gray-800 text-gray-300 hover:bg-gray-700 transition-colors duration-300 ease-in-out"
              }`}
              onClick={() => setActive(type)}
            >
              {type}
            </button>
          ))}
        </div>
        <ul className="mt-10">
          {filterTodos().map((todo) => (
            <li
              key={todo._id}
              className={`flex items-center justify-between px-4 py-2 mb-2 rounded-lg shadow-lg ${
                todo.done ? "bg-green-200" : "bg-white"
              }`}
            >
              <span
                onClick={() => handleComplete(todo._id)}
                className={`text-lg font-medium cursor-pointer ${
                  todo.done ? "line-through text-gray-500" : "text-gray-800"
                }`}
              >
                {todo.title}
              </span>
              <div className="flex space-x-2">
                {!todo.done && (
                  <button
                    onClick={() => handleComplete(todo._id)}
                    className="px-2 py-1 bg-green-600 text-white rounded hover:bg-green-700 transition-colors duration-300 ease-in-out"
                  >
                    Done
                  </button>
                )}
                <button
                  onClick={() => handleDelete(todo._id)}
                  className="px-2 py-1 bg-red-600 text-white rounded hover:bg-red-700 transition-colors duration-300 ease-in-out"
                >
                  Delete
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default TodoList;
