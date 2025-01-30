import React, { useState } from "react";

export default function () {
  const [todos, setTodos] = useState([]);
  const [todo, setTodo] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [currentTodo, setCurrentTodo] = useState({});
  const handleOnSubmit = (e) => {
    e.preventDefault();

    setTodos([...todos, { id: Date.now(), input: todo }]);
    setTodo("");
  };

  const handleOnDelete = (id) => {
    const newTodo = todos.filter((todo) => todo.id != id);
    setTodos(newTodo);
  };
  const handleOnUpdate = (todo) => {
    console.log(todo);
    setIsEditing(true);
    setCurrentTodo(todo);
  };
  const handleEditSubmit = (e) => {
    e.preventDefault();
    console.log(currentTodo);
    handleUpdate(currentTodo);
  };
  const handleUpdate = (currentTodo) => {
    const topa = todos.map((todo) =>
      todo.id === currentTodo.id ? currentTodo : todo
    );
    setTodos(topa);
    setIsEditing(false);
    setCurrentTodo({});
  };
  return (
    <>
      <h1 class="text-4xl font-black text-center">Hello world!</h1>

      <form
        onSubmit={isEditing ? handleEditSubmit : handleOnSubmit}
        className="flex  justify-center mx-auto max-w-md mt-6"
      >
        {isEditing ? (
          <input
            className="border p-4 text-2xl"
            type="text"
            value={currentTodo.input}
            onChange={(e) =>
              setCurrentTodo({ ...currentTodo, input: e.target.value })
            }
            placeholder="Enter the todo here"
          />
        ) : (
          <input
            className="border p-4 text-2xl"
            type="text"
            value={todo}
            onChange={(e) => setTodo(e.target.value)}
            placeholder="Enter the todo here"
          />
        )}

        <button className="border p-2 text-2xl cursor-pointer">
          {isEditing ? "Update" : "Submit"}
        </button>
      </form>
      <ul className="flex mt-14 flex-col items-center justify-center">
        {todos.map((todo) => (
          <li className="text-2xl" key={todo.id}>
            {todo.input}
            <button
              onClick={() => handleOnDelete(todo.id)}
              className="p-1 border cursor-pointer"
            >
              Delete
            </button>
            <button
              onClick={() => handleOnUpdate(todo)}
              className="p-1 border cursor-pointer"
            >
              Update
            </button>
          </li>
        ))}
      </ul>
    </>
  );
}
