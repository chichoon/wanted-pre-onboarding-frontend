import axios from "axios";

const todoInstance = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
  headers: {
    Authorization: `Bearer ${localStorage.getItem("token")}`,
    "Content-Type": "application/json",
  },
});

export function createTodo(todo: string) {
  return todoInstance.post("/todos", { todo }).then((res) => res.data);
}

export function getTodos() {
  return todoInstance.get("/todos").then((res) => res.data);
}

export function updateTodo(id: string, todo: string, isCompleted: boolean) {
  return todoInstance
    .put(`/todos/${id}`, { todo, isCompleted })
    .then((res) => res.data);
}

export function deleteTodo(id: string) {
  return todoInstance.delete(`/todos/${id}`).then((res) => res.data);
}
