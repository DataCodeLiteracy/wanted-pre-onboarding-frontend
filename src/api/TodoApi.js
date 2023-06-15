import axios from "axios";

const accessToken = localStorage.getItem("access_token");

const REQUEST_URL = "https://www.pre-onboarding-selection-task.shop";

export const createTodo = async (accessToken, todo) => {
  const res = await axios.post(
    `${REQUEST_URL}/todos`,
    { todo: JSON.stringify(todo) },
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json"
      }
    }
  );
  const createdTodo = res.data;
  console.log(createdTodo.id);
  return createdTodo;
};

export const getTodos = async (accessToken, todos) => {
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
      todo: JSON.stringify(checked.text),
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
