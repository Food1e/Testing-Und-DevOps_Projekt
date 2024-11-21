import { useState } from "react";
import { FaPlusCircle } from "react-icons/fa";

const InputTodo = ({ addTodoProps, addCategory, categories }) => {
  const [inputText, setInputText] = useState({ title: "" });
  const [category, setCategory] = useState("");
  const [newCategory, setNewCategory] = useState("");

  const onChange = (e) => {
    setInputText({
      ...inputText,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (inputText.title.trim()) {
      addTodoProps(inputText.title, category || newCategory);
      setInputText({ title: "" });
      setCategory("");
      setNewCategory("");
    } else {
      alert("Bitte geben Sie eine Aufgabe ein.");
    }
  };

  const handleNewCategory = (e) => {
    if (e.key === "Enter") {
      addCategory(newCategory);
      setCategory(newCategory);
      setNewCategory("");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="form-container">
      <input
        type="text"
        className="input-text"
        placeholder="Aufgabe hinzufügen..."
        value={inputText.title}
        name="title"
        onChange={onChange}
      />
      <select
        className="category-select"
        value={category}
        onChange={(e) => setCategory(e.target.value)}
      >
        <option value="">Kategorie wählen...</option>
        {categories.map((cat, index) => (
          <option key={index} value={cat}>
            {cat}
          </option>
        ))}
      </select>
      <input
        type="text"
        placeholder="Neue Kategorie erstellen..."
        value={newCategory}
        onChange={(e) => setNewCategory(e.target.value)}
        onKeyDown={handleNewCategory}
      />
      <button className="input-submit">
        <FaPlusCircle />
      </button>
    </form>
  );
};

export default InputTodo;
