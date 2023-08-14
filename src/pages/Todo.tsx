import { useEffect, useState } from 'react'
import TodoInput from '../components/TodoInput'
import TodoList from '../components/TodoList'
import AppHeader from '../components/AppHeader'
import { createTodo, deleteTodo, getTodos, updateTodo } from '../api/TodoApi'
import { TodoWrapper, TodoMain, TodoTitle, Ul } from '../styles/TodoStyle'
import localToken from '../api/LocalToken'
import { alertError } from '../utils/error'

export type onAddFunction = (todo: string) => void
export type OnTodoFunction = (todoItem: ITodo) => void
export interface ITodo {
  id: number
  todo: string
  isCompleted: boolean
  userId: number
}

export default function Todo() {
  const [todos, setTodos] = useState<ITodo[]>([])

  useEffect(() => {
    const accessToken = localToken.get()

    ;(async () => {
      const todos = await readTodo()
      setTodos(todos)
    })()

    if (!accessToken) {
      window.location.href = '/signin'
      return
    }
  }, [])

  const handleAdd = async (todo: string) => {
    try {
      const createdTodo = await createTodo(todo)
      setTodos([...todos, createdTodo])
    } catch (error) {
      alertError(error)
    }
  }

  const handleDelete = (id: number) => {
    try {
      deleteTodo(id)
      setTodos(todos.filter((item) => item.id !== id))
    } catch (error) {
      alertError(error)
    }
  }

  const handleCheck = (todoItem: ITodo) => {
    try {
      updateTodo(todoItem)
      setTodos(todos.map((item) => (item.id === todoItem.id ? todoItem : item)))
    } catch (error) {
      alertError(error)
    }
  }

  const handleEdit = (todoItem: ITodo) => {
    try {
      updateTodo(todoItem)
      setTodos(todos.map((item) => (item.id === todoItem.id ? todoItem : item)))
    } catch (error) {
      alertError(error)
    }
  }

  return (
    <TodoWrapper>
      <AppHeader />
      <TodoMain>
        <TodoTitle>TODO LIST</TodoTitle>
        <TodoInput onAdd={handleAdd} />
        {todos?.length > 0 && (
          <Ul className="todos">
            {todos.map((item) => (
              <TodoList
                key={item.id}
                todoItem={item}
                onEdit={handleEdit}
                onCheck={handleCheck}
                onDelete={handleDelete}
              />
            ))}
          </Ul>
        )}
      </TodoMain>
    </TodoWrapper>
  )
}

async function readTodo(): Promise<ITodo[]> {
  const res = await getTodos()
  return res
}
