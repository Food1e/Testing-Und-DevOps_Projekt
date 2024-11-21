import TodoItem from "./TodoItem";

const TodosList = ({
  todos,
  handleChangeProps,
  deleteTodoProps,
  setUpdate,
  updateCategoryProps,
  categories,
  setPriority
}) => (
  <ul data-set="todo-list">
    {todos.map((todo) => (
      <TodoItem
        key={todo.id}
        todo={todo}
        handleChangeProps={handleChangeProps}
        deleteTodoProps={deleteTodoProps}
        setUpdate={setUpdate}
        updateCategoryProps={updateCategoryProps}
        categories={categories}
        setPriority={setPriority}
      />
    ))}
  </ul>
);

export default TodosList;
