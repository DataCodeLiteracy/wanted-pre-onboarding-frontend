import { useEffect, useState } from 'react'
import TodoInput from '../components/TodoInput'
import TodoList from '../components/TodoList'
import { useNavigate } from 'react-router-dom'
import AppHeader from '../components/AppHeader'
import { createTodo, deleteTodo, getTodos, updateTodo } from '../api/TodoApi'
import { TodoWrapper, TodoMain, TodoTitle, UL } from '../styles/TodoStyle'
import useError from '../Hooks/useError'
import localToken from '../api/LocalToken'

export type onAddFunction = (todo: string) => void
export type OnTodoFunction = (todoItem: TodoType) => void
export interface TodoType {
  id: number
  todo: string
  isCompleted: boolean
  userId: number
}

const accessToken = localToken.get()

export default function Todo() {
  const [todos, setTodos] = useState<TodoType[]>([])
  const { showError } = useError()

  useEffect(() => {
    const fetchTodos = async () => {
      const todos = await readTodo()
      setTodos(todos)
    }

    fetchTodos()
  }, [])

  const handleAdd = async (todo: string) => {
    try {
      const createdTodo = await createTodo(accessToken, todo)
      setTodos([...todos, createdTodo])
    } catch (error) {
      showError(error)
    }
  }

  const handleDelete = (todoItem: TodoType) => {
    try {
      deleteTodo(accessToken, todoItem)
      setTodos(todos.filter((item) => item.id !== todoItem.id))
    } catch (error) {
      showError(error)
    }
  }

  const handleCheck = (todoItem: TodoType) => {
    try {
      updateTodo(accessToken, todoItem)
      setTodos(todos.map((item) => (item.id === todoItem.id ? todoItem : item)))
    } catch (error) {
      showError(error)
    }
  }

  const handleEdit = (todoItem: TodoType) => {
    try {
      updateTodo(accessToken, todoItem)
      setTodos(
        todos.map((item) =>
          item.id === todoItem.id ? { ...item, todo: todoItem.todo } : item
        )
      )
    } catch (error) {
      showError(error)
    }
  }

  const navigate = useNavigate()

  useEffect(() => {
    if (!accessToken) {
      window.location.href = '/signin'
      return
    }
  }, [])

  return (
    <TodoWrapper>
      <AppHeader
        navigate={navigate}
        isLogin={false}
        isHomeButton={true}
        isSignupButton={false}
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
  const res = await getTodos(accessToken)
  return res
}
