import {
  ChangeEvent,
  Dispatch,
  SetStateAction,
  useCallback,
  useState,
} from "react";

import { deleteTodo, updateTodo } from "services/todoInstance";
import { Todo } from "types/todo";

interface Props {
  todo: Todo;
  setTodoList: Dispatch<SetStateAction<Todo[]>>;
}

export const TodoElement = ({ todo, setTodoList }: Props) => {
  const [isEditing, setIsEditing] = useState(false);
  const [newTodoTitle, setNewTodoTitle] = useState(todo.todo);

  const handleChangeCheckbox = useCallback(() => {
    updateTodo(todo.id, todo.todo, !todo.isCompleted).then((data) => {
      setTodoList((prev) =>
        prev.map((element) => (element.id === todo.id ? data : element))
      );
    });
  }, [todo, setTodoList]);

  const handleChangeInput = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    setNewTodoTitle(e.target.value);
  }, []);

  const handleClickModify = useCallback(() => {
    setIsEditing(true);
  }, []);

  const handleClickSubmitModify = useCallback(() => {
    updateTodo(todo.id, newTodoTitle, todo.isCompleted).then((data) => {
      setTodoList((prev) =>
        prev.map((element) => (element.id === todo.id ? data : element))
      );
      setIsEditing(false);
    });
  }, [todo, newTodoTitle, setTodoList]);

  const handleClickCancelModify = useCallback(() => {
    setIsEditing(false);
    setNewTodoTitle(todo.todo);
  }, [todo]);

  const handleClickDelete = useCallback(() => {
    // eslint-disable-next-line no-restricted-globals
    if (confirm("정말 삭제하시겠습니까?")) {
      deleteTodo(todo.id).then(() => {
        setTodoList((prev) => prev.filter((element) => element.id !== todo.id));
      });
    }
  }, [setTodoList, todo]);

  if (isEditing)
    return (
      <li className="flex flex-row items-center mb-3">
        <label>
          <input
            type="checkbox"
            checked={todo.isCompleted}
            onChange={handleChangeCheckbox}
            className="mr-3"
          />
        </label>
        <input
          type="text"
          value={newTodoTitle}
          data-testid="modify-input"
          onChange={handleChangeInput}
          className="border-b border-b-slate-300 w-60 text-slate-600"
        />
        <button
          disabled={newTodoTitle.length <= 0}
          data-testid="submit-button"
          onClick={handleClickSubmitModify}
          className="disabled:bg-slate-300 bg-slate-400 px-3 ml-3 rounded-md text-white">
          제출
        </button>
        <button
          data-testid="cancel-button"
          onClick={handleClickCancelModify}
          className="disabled:bg-slate-300 bg-slate-400 px-3 ml-3 rounded-md text-white">
          취소
        </button>
      </li>
    );

  return (
    <li className="flex flex-row items-center mb-3">
      <label>
        <input
          type="checkbox"
          checked={todo.isCompleted}
          onChange={handleChangeCheckbox}
          className="mr-3"
        />
        <span className="text-slate-600">{todo.todo}</span>
      </label>
      <button
        data-testid="modify-button"
        onClick={handleClickModify}
        className="bg-slate-400 px-3 ml-3 rounded-md text-white">
        수정
      </button>
      <button
        data-testid="delete-button"
        onClick={handleClickDelete}
        className=" bg-slate-400 px-3 ml-3 rounded-md text-white">
        삭제
      </button>
    </li>
  );
};
