'use client';

import { useState } from "react";

function TodoList() {
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

  // function to handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    // check if the input is not empty
    if (value.trim()) {
      // create a new todo object with the input value and a unique id
      const newTodo = { text: value, id: Date.now(), done: false };
      // update the todo list with the new todo
      setTodos((prevTodos) => [newTodo, ...prevTodos]);
      // clear the input value
      setValue("");
    }
  };

  // function to handle todo completion
  const handleComplete = (id) => {
    // find the index of the todo with the given id
    const index = todos.findIndex((todo) => todo.id === id);
    // create a copy of the todo list
    const newTodos = [...todos];
    // set the done property of the todo at the index to true
    newTodos[index].done = true;
    // update the todo list with the modified copy
    setTodos(newTodos);
  };

  // function to handle todo deletion
  const handleDelete = (id) => {
    // filter out the todo with the given id
    const newTodos = todos.filter((todo) => todo.id !== id);
    // update the todo list with the filtered copy
    setTodos(newTodos);
  };

  // function to filter the todos based on the active tab
  const filterTodos = () => {
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
          {["All", "Open", "Completed"].map((type) => (
            <button
              key={type}
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
              key={todo.id}
              className={`flex items-center justify-between px-4 py-2 mb-2 rounded-lg shadow-lg ${
                todo.done ? "bg-green-200" : "bg-white"
              }`}
            >
              <span
                onClick={() => handleComplete(todo.id)}
                className={`text-lg font-medium cursor-pointer ${
                  todo.done ? "line-through text-gray-500" : "text-gray-800"
                }`}
              >
                {todo.text}
              </span>
              <div className="flex space-x-2">
                {!todo.done && (
                  <button
                    onClick={() => handleComplete(todo.id)}
                    className="px-2 py-1 bg-green-600 text-white rounded hover:bg-green-700 transition-colors duration-300 ease-in-out"
                  >
                    Done
                  </button>
                )}
                <button
                  onClick={() => handleDelete(todo.id)}
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
