import { useEffect, useState } from "react";
import { getTodos } from "services/todoInstance";
import { Todo } from "types/todo";

export const TodoPage = () => {
  const [todoList, setTodoList] = useState<Todo[]>([]);
  useEffect(() => {
    getTodos().then((res) => {
      console.log(res);
    });
  }, []);

  return (
    <div>
      <h1>todos</h1>
      <ul>
        {todoList.map((todo) => (
          <li key={todo.id}>{todo.todo}</li>
        ))}
      </ul>
    </div>
  );
};
