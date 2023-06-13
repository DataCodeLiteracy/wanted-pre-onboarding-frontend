import React, { useState } from "react";
import TodoInput from "../components/TodoInput";
import TodoList from "../components/TodoList";

export default function Todo() {
  const [todos, setTodos] = useState([]);

  const handleAdd = (todo) => {
    setTodos([...todos, todo]);
  };

  const handleDelete = (deleted) => {
    setTodos(todos.filter((todo) => todo.id !== deleted.id));
  };

  const handleCheck = (checked) => {
    setTodos(todos.map((todo) => (todo.id === checked.id ? checked : todo)));
  };

  const handleEdit = (edited) => {
    setTodos(
      todos.map((todo) =>
        todo.id === edited.id ? { ...todo, text: edited.text } : todo
      )
    );
  };

  return (
    <div>
      <h1>TODO LIST</h1>
      <TodoInput onAdd={handleAdd} />
      <ul className="todos">
        {todos.map((item) => (
          <TodoList
            key={item.id}
            todo={item}
            onEdit={handleEdit}
            onCheck={handleCheck}
            onDelete={handleDelete}
          />
        ))}
      </ul>
    </div>
  );
}
