export const AddTodoForm = () => {
  return (
    <form>
      <input type="text" data-testid="new-todo-input" />
      <button data-testid="new-todo-add-button">추가</button>
    </form>
  );
};
