import React, { useEffect, useState } from "react";
import TodoInput from "../components/TodoInput";
import TodoList from "../components/TodoList";
import { useNavigate } from "react-router-dom";
import TodoHeader from "../components/TodoHeader";

export default function Todo() {
  const [todos, setTodos] = useState(() => readTodo());

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

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  const navigate = useNavigate();

  const [accessToken, setAccessToken] = useState(
    localStorage.getItem("access_token") || ""
  );

  useEffect(() => {
    if (!accessToken) {
      navigate("/signin");
    }
  }, [accessToken, navigate]);

  return (
    <section>
      <TodoHeader />
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
    </section>
  );
}

function readTodo() {
  const todos = localStorage.getItem("todos");
  return todos ? JSON.parse(todos) : [];
}
