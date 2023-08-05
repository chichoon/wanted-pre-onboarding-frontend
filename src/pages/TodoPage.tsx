import { useEffect, useState } from "react";

import { AddTodoForm } from "components";
import { getTodos } from "services/todoInstance";
import { Todo } from "types/todo";

export const TodoPage = () => {
  const [todoList, setTodoList] = useState<Todo[]>([]);
  useEffect(() => {
    getTodos().then((res) => {
      setTodoList(res);
    });
  }, []);

  return (
    <>
      <AddTodoForm />
      <ul>
        {todoList.map((todo) => (
          <li key={todo.id}>{todo.todo}</li>
        ))}
      </ul>
    </>
  );
};
