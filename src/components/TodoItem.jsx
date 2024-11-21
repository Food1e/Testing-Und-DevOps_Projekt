import { useState } from "react";
import { FaTrash } from "react-icons/fa";
import styles from "./TodoItem.module.css";

const TodoItem = ({
  todo,
  handleChangeProps,
  deleteTodoProps,
  setUpdate,
  updateCategoryProps,
  categories,
}) => {
  const [editing, setEditing] = useState(false);

  const handleUpdatedDone = (event) => {
    if (event.key === "Enter") {
      setEditing(false);
    }
  };

  const completedStyle = {
    fontStyle: "italic",
    color: "#595959",
    opacity: 0.4,
    textDecoration: "line-through",
  };

  const { completed, id, title, category } = todo;

  return (
    <li className={styles.item}>
      <div>
        <input
          type="checkbox"
          className={styles.checkbox}
          checked={completed}
          onChange={() => handleChangeProps(id)}
        />
        <span style={completed ? completedStyle : null}>{title}</span>
        <select
          value={category}
          onChange={(e) => updateCategoryProps(id, e.target.value)}
        >
          <option value="">Kategorie wählen...</option>
          {categories.map((cat, index) => (
            <option key={index} value={cat}>
              {cat}
            </option>
          ))}
        </select>
        <button onClick={() => deleteTodoProps(id)}>
          <FaTrash style={{ color: "orangered", fontSize: "16px" }} />
        </button>
      </div>
    </li>
  );
};

export default TodoItem;
