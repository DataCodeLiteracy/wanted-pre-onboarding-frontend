import axios from 'axios'
import { REQUEST_URL } from './requestUrl'
import { TodoType } from '../pages/Todo'

export const createTodo = async (accessToken: string | null, todo: string) => {
  const res = await axios.post(
    `${REQUEST_URL}/todos`,
    { todo: todo },
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/json'
      }
    }
  )
  const createdTodo = res.data
  return createdTodo
}

export const getTodos = async (accessToken: string | null) => {
  const res = await axios.get(`${REQUEST_URL}/todos`, {
    headers: {
      Authorization: `Bearer ${accessToken}`
    }
  })
  return res.data
}

export const updateTodo = async (
  accessToken: string | null,
  checked: TodoType
) => {
  const res = await axios.put(
    `${REQUEST_URL}/todos/${checked.id}`,
    {
      todo: checked.todo,
      isCompleted: checked.isCompleted
    },
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/json'
      }
    }
  )
  return res.data
}

export const deleteTodo = async (
  accessToken: string | null,
  deleted: TodoType
) => {
  const res = await axios.delete(`${REQUEST_URL}/todos/${deleted.id}`, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
      'Content-Type': 'application/json'
    }
  })
  return res.data
}
