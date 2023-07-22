import { TodoType } from './../pages/Todo'
import { REQUEST_URL } from './requestUrl'
import APIClient from './Apiclient'

const accessToken = localStorage.getItem('access_token')

const api = new APIClient(REQUEST_URL, {
  headers: {
    Authorization: `Bearer ${accessToken}`
  }
})

export const createTodo = async (accessToken: string | null, todo: string) => {
  return await api.post(
    `${REQUEST_URL}/todos`,
    { todo: todo },
    {
      Authorization: `Bearer ${accessToken}`,
      'Content-Type': 'application/json'
    }
  )
}

export const getTodos = async (accessToken: string | null) => {
  return await api.get(`${REQUEST_URL}/todos`, {
    Authorization: `Bearer ${accessToken}`
  })
}

export const updateTodo = async (
  accessToken: string | null,
  checked: TodoType
) => {
  return await api.put(
    `${REQUEST_URL}/todos/${checked.id}`,
    {
      todo: checked.todo,
      isCompleted: checked.isCompleted
    },
    {
      Authorization: `Bearer ${accessToken}`,
      'Content-Type': 'application/json'
    }
  )
}

export const deleteTodo = async (
  accessToken: string | null,
  deleted: TodoType
) => {
  return await api.delete(`${REQUEST_URL}/todos/${deleted.id}`, {
    Authorization: `Bearer ${accessToken}`,
    'Content-Type': 'application/json'
  })
}
