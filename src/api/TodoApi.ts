import { ITodo } from './../pages/Todo'
import APIClient from './Apiclient'

export const todoApi = new APIClient(
  process.env.REACT_APP_REQUEST_URL + '/todos'
)

export const createTodo = async (todo: string) => {
  return await todoApi.post<ITodo>('/', { todo })
}

export const getTodos = async () => {
  return await todoApi.get<ITodo[]>('/')
}

export const updateTodo = async (checked: ITodo) => {
  return await todoApi.put<ITodo>(`/${checked.id}`, {
    todo: checked.todo,
    isCompleted: checked.isCompleted
  })
}

export const deleteTodo = async (id: number) => {
  return await todoApi.delete<ITodo[]>(`/${id}`)
}
