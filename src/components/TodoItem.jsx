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

  const { completed, id, priority, category, title } = props.todo;

  const viewMode = {};
  const editMode = {};

  if (editing) {
    viewMode.display = "none";
  } else {
    editMode.display = "none";
  }

  useEffect(
    () => () => {
      console.log("Cleaning up...");
    },
    []
  );

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
      <input
        type="text"
        style={editMode}
        className={styles.textInput}
        value={title}
        onChange={(e) => {
          props.setUpdate(e.target.value, id);
        }}
        onKeyDown={handleUpdatedDone}
      />
      <div style={viewMode}>
        <label htmlFor={`priority-${id}`}>Priority: </label>
        <select
          id={`priority-${id}`}
          value={priority || "none"}
          onChange={(e) => props.setPriority(id, e.target.value)}
        >
          <option value="none">None</option>
          <option value="low">Low</option>
          <option value="medium">Medium</option>
          <option value="high">High</option>
        </select>
      </div>
    </li>
  );
};

export default TodoItem;
