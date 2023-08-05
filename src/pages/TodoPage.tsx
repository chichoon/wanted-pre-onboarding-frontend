import { useEffect, useState } from "react";

import { AddTodoForm, TodoElement } from "components";
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
      <AddTodoForm setTodoList={setTodoList} />
      <ul>
        {todoList.map((todo) => (
          <TodoElement key={todo.id} todo={todo} setTodoList={setTodoList} />
        ))}
      </ul>
    </>
  );
};
