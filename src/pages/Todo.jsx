import React, { useState } from "react";
import TodoInput from "../components/TodoInput";
import TodoList from "../components/TodoList";

export default function Todo() {
  const [todos, setTodos] = useState([]);

  const handleAdd = (todo) => {
    setTodos([...todos, todo]);
  };

  const handleDelete = () => {};

  const handleUpdate = () => {};

  const handleCheck = () => {};

  return (
    <div>
      <h1>TODO LIST</h1>
      <TodoInput onAdd={handleAdd} />
      <ul className="todos">
        {todos.map((item) => (
          <TodoList
            key={item.id}
            todo={item}
            onCheck={handleCheck}
            onUpdate={handleUpdate}
            onDelete={handleDelete}
          />
        ))}
      </ul>
    </div>
  );
}
