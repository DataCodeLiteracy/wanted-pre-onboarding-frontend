import React, { useEffect, useState } from "react";
import TodoInput from "../components/TodoInput";
import TodoList from "../components/TodoList";
import { useNavigate } from "react-router-dom";
import TodoHeader from "../components/TodoHeader";
import { createTodo, deleteTodo, getTodos, updateTodo } from "../api/TodoApi";
import { TodoWrapper, TodoMain, TodoTitle, UL } from "../styles/TodoStyle";

export default function Todo() {
  const [todos, setTodos] = useState(() => readTodo());
  const [error, setError] = useState("");

  const handleAdd = async (todo) => {
    try {
      const createdTodo = await createTodo(accessToken, todo);
      const newId = createdTodo.id;

      todo.id = newId;

      setTodos([...todos, todo]);
    } catch (error) {
      setError(error.response.data.message);
    }
  };

  const handleDelete = (deleted) => {
    deleteTodo(accessToken, deleted);
    setTodos(todos.filter((todo) => todo.id !== deleted.id));
  };

  const handleCheck = (checked) => {
    updateTodo(accessToken, checked);
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
    const handleError = (e) => {
      e.preventDefault();
      e.stopPropagation();
    };

    window.onerror = handleError;

    if (!accessToken) {
      window.location.href = "/signin";
      return;
    }

    // navigate("/signin");
  }, [accessToken, navigate]);

  return (
    <TodoWrapper>
      <TodoHeader />
      <TodoMain>
        <TodoTitle>TODO LIST</TodoTitle>
        <TodoInput onAdd={handleAdd} />
        <UL className="todos">
          {todos.map((item) => (
            <TodoList
              key={item.id}
              todo={item}
              onEdit={handleEdit}
              onCheck={handleCheck}
              onDelete={handleDelete}
            />
          ))}
        </UL>
      </TodoMain>
    </TodoWrapper>
  );
}

function readTodo() {
  const todos = localStorage.getItem("todos");
  getTodos(localStorage.getItem("access_token"), todos);
  return todos ? JSON.parse(todos) : [];
}
