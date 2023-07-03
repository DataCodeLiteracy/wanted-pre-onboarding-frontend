import React, { useEffect, useState } from 'react'
import TodoInput from '../components/TodoInput'
import TodoList from '../components/TodoList'
import { useNavigate } from 'react-router-dom'
import AppHeader from '../components/AppHeader'
import { createTodo, deleteTodo, getTodos, updateTodo } from '../api/TodoApi'
import { TodoWrapper, TodoMain, TodoTitle, UL } from '../styles/TodoStyle'

export default function Todo() {
  const [todos, setTodos] = useState([])
  const [error, setError] = useState('')
  const [accessToken, setAccessToken] = useState(
    localStorage.getItem('access_token') || ''
  )

  useEffect(() => {
    const fetchTodos = async () => {
      const todos = await readTodo()
      setTodos(todos)
    }

    fetchTodos()
  }, [])

  const handleAdd = async (todo) => {
    try {
      const createdTodo = await createTodo(accessToken, todo)

      setTodos([...todos, createdTodo])
    } catch (error) {
      setError(error.response.data.message)
    }
  }

  const handleDelete = (deleted) => {
    deleteTodo(accessToken, deleted)
    setTodos(todos.filter((todo) => todo.id !== deleted.id))
  }

  const handleCheck = (checked) => {
    updateTodo(accessToken, checked)
    setTodos(todos.map((todo) => (todo.id === checked.id ? checked : todo)))
  }

  const handleEdit = (edited) => {
    setTodos(
      todos.map((todo) =>
        todo.id === edited.id ? { ...todo, text: edited.text } : todo
      )
    )
  }

  const navigate = useNavigate()

  useEffect(() => {
    const handleError = (e) => {
      e.preventDefault()
      e.stopPropagation()
    }

    window.onerror = handleError

    if (!accessToken) {
      window.location.href = '/signin'
      return
    }
  }, [accessToken, navigate])

  return (
    <TodoWrapper>
      {/* <TodoHeader /> */}
      <AppHeader
        navigate={navigate}
        showLogoutButton={true}
        showHomeButton={true}
        showSignupButton={false}
        showSigninButton={false}
      />
      <TodoMain>
        <TodoTitle>TODO LIST</TodoTitle>
        <TodoInput onAdd={handleAdd} />
        {todos && (
          <UL className="todos">
            {todos.map((item) => (
              <TodoList
                key={item.id}
                todoItem={item}
                onEdit={handleEdit}
                onCheck={handleCheck}
                onDelete={handleDelete}
              />
            ))}
          </UL>
        )}
      </TodoMain>
    </TodoWrapper>
  )
}

async function readTodo() {
  const res = await getTodos(localStorage.getItem('access_token'))
  return res
}
