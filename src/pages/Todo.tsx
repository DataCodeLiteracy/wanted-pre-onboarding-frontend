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
export type OnTodoFunction = (todoItem: iTodo) => void
export interface iTodo {
  id: number
  todo: string
  isCompleted: boolean
  userId: number
}

export default function Todo() {
  const [todos, setTodos] = useState<iTodo[]>([])
  const { showError } = useError()

  const accessToken = localToken.get()

  useEffect(() => {
    const fetchTodos = async () => {
      const todos = await readTodo()
      setTodos(todos)
    }

    fetchTodos()
  }, [])

  const handleAdd = async (todo: string) => {
    try {
      const createdTodo = await createTodo(todo)
      setTodos([...todos, createdTodo])
    } catch (error) {
      showError(error)
    }
  }

  const handleDelete = (todoItem: iTodo) => {
    try {
      deleteTodo(todoItem.id)
      setTodos(todos.filter((item) => item.id !== todoItem.id))
    } catch (error) {
      showError(error)
    }
  }

  const handleCheck = (todoItem: iTodo) => {
    try {
      updateTodo(todoItem)
      setTodos(todos.map((item) => (item.id === todoItem.id ? todoItem : item)))
    } catch (error) {
      showError(error)
    }
  }

  const handleEdit = (todoItem: iTodo) => {
    try {
      updateTodo(todoItem)
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
        {todos?.length > 0 && (
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

async function readTodo(): Promise<iTodo[]> {
  const res = await getTodos()
  return res
}
