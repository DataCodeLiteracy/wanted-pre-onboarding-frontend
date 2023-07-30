import { TodoType } from './../pages/Todo'
import { REQUEST_URL } from './requestUrl'
import APIClient from './Apiclient'
import localToken from './LocalToken'

const api = new APIClient(REQUEST_URL, localToken.get())

export const createTodo = async (todo: string) => {
  return await api.post('/todos', { todo })
}

export const getTodos = async () => {
  return await api.get('/todos')
}

export const updateTodo = async (checked: TodoType) => {
  return await api.put(`/todos/${checked.id}`, {
    todo: checked.todo,
    isCompleted: checked.isCompleted
  })
}

export const deleteTodo = async (deleted: TodoType) => {
  return await api.delete(`/todos/${deleted.id}`)
}
