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
      setTodoTitle("");
    },
    [todoTitle, setTodoList]
  );

  const handleChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    setTodoTitle(e.target.value);
  }, []);

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-row items-center px-5 py-2">
      <input
        type="text"
        placeholder="할 일 제목을 입력하세요"
        data-testid="new-todo-input"
        value={todoTitle}
        onChange={handleChange}
        className="border-b border-b-slate-300 w-60"
      />
      <button
        disabled={todoTitle.length === 0}
        data-testid="new-todo-add-button"
        className="ml-5 disabled:bg-slate-300 bg-slate-400 text-white px-3 rounded-md">
        추가
      </button>
    </form>
  );
};
