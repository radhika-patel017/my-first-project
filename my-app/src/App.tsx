import { useState } from "react";

function App() {
  const [task, setTask] = useState("");
  const [todos, setTodos] = useState([]);
  const [editIndex, setEditIndex] = useState(null);

  const addOrUpdateTodo = () => {
    if (task.trim() === "") return;

    if (editIndex !== null) {
      const updatedTodos = todos.map((todo, index) =>
        index === editIndex ? { ...todo, text: task } : todo
      );
      setTodos(updatedTodos);
      setEditIndex(null);
    } else {
      setTodos([...todos, { text: task, completed: false }]);
    }

    setTask("");
  };

  const deleteTodo = (index) => {
    const newTodos = todos.filter((_, i) => i !== index);
    setTodos(newTodos);
  };

  const editTodo = (index) => {
    setTask(todos[index].text);
    setEditIndex(index);
  };

  const toggleComplete = (index) => {
    const updatedTodos = todos.map((todo, i) =>
      i === index ? { ...todo, completed: !todo.completed } : todo
    );
    setTodos(updatedTodos);
  };

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h1>Todo App 📝</h1>

      <input
        type="text"
        placeholder="Enter task..."
        value={task}
        onChange={(e) => setTask(e.target.value)}
      />

      <button onClick={addOrUpdateTodo}>
        {editIndex !== null ? "Update" : "Add"}
      </button>

      <ul style={{ listStyle: "none", padding: 0 }}>
        {todos.map((todo, index) => (
          <li key={index} style={{ margin: "10px" }}>
            
            <input
              type="checkbox"
              checked={todo.completed}
              onChange={() => toggleComplete(index)}
            />

            <span
              style={{
                marginLeft: "10px",
                textDecoration: todo.completed ? "line-through" : "none",
                color: todo.completed ? "gray" : "black"
              }}
            >
              {todo.text}
            </span>

            <button
              style={{ marginLeft: "10px" }}
              onClick={() => editTodo(index)}
            >
              ✏ Edit
            </button>

            <button
              style={{ marginLeft: "5px" }}
              onClick={() => deleteTodo(index)}
            >
              ❌ Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;