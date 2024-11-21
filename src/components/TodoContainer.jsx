import { useState, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";
import Header from "./Header";
import InputTodo from "./InputTodo";
import TodosList from "./TodosList";
import styles from "./TodoContainer.module.css";

const TodoContainer = () => {
  const getInitialTodos = () => {
    const temp = localStorage.getItem("todos");
    const savedTodos = JSON.parse(temp);
    return savedTodos || [];
  };

  const [todos, setTodos] = useState(getInitialTodos());
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");

  const handleChange = (id) => {
    setTodos((prevState) =>
      prevState.map((todo) => {
        if (todo.id === id) {
          return {
            ...todo,
            completed: !todo.completed,
          };
        }
        return todo;
      })
    );
  };

  const delTodo = (id) => {
    setTodos([...todos.filter((todo) => todo.id !== id)]);
  };

  const addTodoItem = (title, category) => {
    if (!categories.includes(category) && category.trim() !== "") {
      setCategories([...categories, category]);
    };
    
  const newTodo = {
    id: uuidv4(),
    title,
    completed: false,
    category: category || "Allgemein",
    priority: "none"
  };
    setTodos([...todos, newTodo]);
  };

  const addCategory = (newCategory) => {
    if (newCategory.trim() && !categories.includes(newCategory)) {
      setCategories([...categories, newCategory]);
    }
  };

  const updateTodoCategory = (id, newCategory) => {
    setTodos((prevTodos) =>
      prevTodos.map((todo) =>
        todo.id === id ? { ...todo, category: newCategory } : todo
      )
    );
    if (!categories.includes(newCategory) && newCategory.trim() !== "") {
      addCategory(newCategory);
    }
  };

  const setUpdate = (updatedTitle, id) => {
    setTodos((prevState) =>
      prevState.map((todo) => {
        if (todo.id === id) {
          todo.title = updatedTitle;
        }
        return todo;
      })
    );
  };

  const setPriority = (id, newPriority) => {
    setTodos(
      todos.map((todo) => {
        if (todo.id === id) {
          todo.priority = newPriority;
        }
        return todo;
      })
    );
  };

  // componentDidUpdate
  useEffect(() => {
    const temp = JSON.stringify(todos);
    localStorage.setItem("todos", temp);
  }, [todos]);

  return (
    <div className={styles.inner}>
      <Header />
      <InputTodo
        addTodoProps={addTodoItem}
        addCategory={addCategory}
        categories={categories}
      />
      <div className={styles.filterContainer}>
        <label htmlFor="category-filter">Kategorien filtern:</label>
        <select
          id="category-filter"
          onChange={(e) => setSelectedCategory(e.target.value)}
        >
          <option value="">Alle</option>
          {categories.map((cat, index) => (
            <option key={index} value={cat}>
              {cat}
            </option>
          ))}
        </select>
      </div>
      <TodosList
        todos={
          selectedCategory
            ? todos.filter((todo) => todo.category === selectedCategory)
            : todos
        }
        handleChangeProps={handleChange}
        deleteTodoProps={delTodo}
        setUpdate={setUpdate}
        updateCategoryProps={updateTodoCategory}
        categories={categories}
        setPriority={setPriority}
      />
    </div>
  );
};

export default TodoContainer;
