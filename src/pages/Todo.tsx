import { useEffect, useState } from 'react'
import TodoInput from '../components/TodoInput'
import TodoList from '../components/TodoList'
import { createTodo, deleteTodo, getTodos, updateTodo } from '../api/TodoApi'
import { TodoWrapper, TodoMain, TodoTitle, Ul } from '../styles/TodoStyle'
import { AxiosError } from 'axios'

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

  const readTodo = async (): Promise<ITodo[]> => {
    try {
      const res = await getTodos()
      return res
    } catch (error) {
      if (error instanceof AxiosError) {
        alert(error)
      }
      return []
    }
  }

  useEffect(() => {
    ;(async () => {
      const todos = await readTodo()
      setTodos(todos)
    })()
  }, [])

  const handleAdd = async (todo: string) => {
    try {
      const createdTodo = await createTodo(todo)
      setTodos([...todos, createdTodo])
    } catch (error) {
      if (error instanceof AxiosError) {
        alert(error)
      }
    }
  }

  const handleDelete = async (id: number) => {
    try {
      await deleteTodo(id)
      setTodos(todos.filter((item) => item.id !== id))
    } catch (error) {
      if (error instanceof AxiosError) {
        alert(error)
      }
    }
  }

  const handleCheck = async (todoItem: ITodo) => {
    try {
      await updateTodo(todoItem)
      setTodos(todos.map((item) => (item.id === todoItem.id ? todoItem : item)))
    } catch (error) {
      if (error instanceof AxiosError) {
        alert(error)
      }
    }
  }

  const handleEdit = async (todoItem: ITodo) => {
    try {
      await updateTodo(todoItem)
      setTodos(todos.map((item) => (item.id === todoItem.id ? todoItem : item)))
    } catch (error) {
      if (error instanceof AxiosError) {
        alert(error)
      }
    }
  }

  return (
    <TodoWrapper>
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
