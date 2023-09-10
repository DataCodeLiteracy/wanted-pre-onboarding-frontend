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
        alert(error.response?.data.message)
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
        alert(error.response?.data.message)
      }
    }
  }

  const handleDelete = (id: number) => {
    deleteTodo(id)
    setTodos(todos.filter((item) => item.id !== id))
  }

  const handleCheck = (todoItem: ITodo) => {
    updateTodo(todoItem)
    setTodos(todos.map((item) => (item.id === todoItem.id ? todoItem : item)))
  }

  const handleEdit = (todoItem: ITodo) => {
    updateTodo(todoItem)
    setTodos(todos.map((item) => (item.id === todoItem.id ? todoItem : item)))
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
