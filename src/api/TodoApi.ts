import axios from "axios";

const REQUEST_URL = "https://www.pre-onboarding-selection-task.shop";

export const createTodo = async (accessToken, todo) => {
  const res = await axios.post(
    `${REQUEST_URL}/todos`,
    { todo: todo },
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json"
      }
    }
  );
  const createdTodo = res.data;
  return createdTodo;
};

export const getTodos = async (accessToken) => {
  const res = await axios.get(`${REQUEST_URL}/todos`, {
    headers: {
      Authorization: `Bearer ${accessToken}`
    }
  });
  return res.data;
};

export const updateTodo = async (accessToken, checked) => {
  const res = await axios.put(
    `${REQUEST_URL}/todos/${checked.id}`,
    {
      todo: checked.todo,
      isCompleted: checked.isCompleted
    },
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json"
      }
    }
  );
  return res.data;
};

export const deleteTodo = async (accessToken, deleted) => {
  const res = await axios.delete(`${REQUEST_URL}/todos/${deleted.id}`, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
      "Content-Type": "application/json"
    }
  });
  return res.data;
};
