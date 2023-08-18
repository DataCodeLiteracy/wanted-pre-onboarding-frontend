import { ITodo } from './../pages/Todo'
// import { REQUEST_URL } from './requestUrl'
import APIClient from './Apiclient'
import localToken from './LocalToken'

const todoApi = new APIClient(
  process.env.REACT_APP_REQUEST_URL + '/todos',
  localToken.get()
)

export const createTodo = async (todo: string) => {
  return await todoApi.post('/', { todo })
}

export const getTodos = async () => {
  return await todoApi.get('/')
}

export const updateTodo = async (checked: ITodo) => {
  return await todoApi.put(`/${checked.id}`, {
    todo: checked.todo,
    isCompleted: checked.isCompleted
  })
}

export const deleteTodo = async (id: number) => {
  return await todoApi.delete(`/${id}`)
}
