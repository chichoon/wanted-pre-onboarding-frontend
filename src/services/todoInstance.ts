import axios from "axios";

const todoInstance = axios.create({
  baseURL: "https://www.pre-onboarding-selection-task.shop",
  headers: {
    Authorization: `Bearer ${localStorage.getItem("token")}`,
    "Content-Type": "application/json",
  },
});

export function createTodo(todo: string) {
  return todoInstance.post("/todos", { todo }).then((res) => res.data);
}

export function getTodos() {
  return todoInstance
    .get("/todos")
    .then((res) => res.data)
    .catch(() => {
      // eslint-disable-next-line no-restricted-globals
      location.reload();
      return [];
    });
}

export function updateTodo(id: number, todo: string, isCompleted: boolean) {
  return todoInstance
    .put(`/todos/${id}`, { todo, isCompleted })
    .then((res) => res.data);
}

export function deleteTodo(id: number) {
  return todoInstance.delete(`/todos/${id}`).then((res) => res.data);
}
