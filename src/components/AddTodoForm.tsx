import {
  ChangeEvent,
  Dispatch,
  FormEvent,
  SetStateAction,
  useCallback,
  useState,
} from "react";

import { createTodo } from "services/todoInstance";
import { Todo } from "types/todo";

interface Props {
  setTodoList: Dispatch<SetStateAction<Todo[]>>;
}

export const AddTodoForm = ({ setTodoList }: Props) => {
  const [todoTitle, setTodoTitle] = useState("");
  const handleSubmit = useCallback(
    (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      createTodo(todoTitle).then((res) => {
        setTodoList((prev) => [...prev, res]);
      });
    },
    [todoTitle, setTodoList]
  );

  const handleChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    setTodoTitle(e.target.value);
  }, []);

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        data-testid="new-todo-input"
        value={todoTitle}
        onChange={handleChange}
      />
      <button data-testid="new-todo-add-button">추가</button>
    </form>
  );
};
