import React, { useState } from "react";
import "./TodoForm.css";

const TodoForm = () => {
  const [todos, setTodos] = useState([]);
  const [todoText, setTodoText] = useState("");
  const [editText, setEditText] = useState("");
  const [editingTodo, setEditingTodo] = useState();
  const [hideCompleted, setHideCompleted] = useState(false);

  function handleSubmit(e) {
    e.preventDefault();
    const item = {
      id: todos.length,
      text: todoText,
      checked: false,
    };

    setTodos([...todos].concat(item));
    setTodoText("");
  }

  function toggleCheck(id) {
    setTodos(
      [...todos].map((todo) => {
        if (todo.id === id) {
          todo.checked = !todo.checked;
        }
        return todo;
      })
    );
  }

  function removeTodo(id) {
    setTodos([...todos].filter((todo) => todo.id !== id));
  }

  function editTodo(id) {
    setTodos(
      [...todos].map((todo) => {
        if (todo.id === id) {
          todo.text = editText;
        }
        return todo;
      })
    );
    setEditingTodo(null);
    setEditText("");
  }

  return (
    <div>
      <div className="form-container">
        <h2>To Do List</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Write a todo..."
            value={todoText}
            onChange={(e) => setTodoText(e.target.value)}
          />
        </form>

        <ul className="todo-list">
          {todos.map((todo) => (
            <li
              className={hideCompleted && todo.checked ? "hide" : "todo-item"}
              key={todo.id}
            >
              <input
                type="checkbox"
                name="checkbox"
                checked={todo.checked}
                onChange={() => toggleCheck(todo.id)}
              />
              {editingTodo === todo.id ? (
                <div className="container">
                  <input
                    type="text"
                    value={editText}
                    onChange={(e) => setEditText(e.target.value)}
                  />
                  <i
                    className="fa-solid fa-check"
                    onClick={() => editTodo(todo.id)}
                  ></i>
                </div>
              ) : (
                <div className="container">
                  {todo.text}

                  <div className="btns">
                    <i
                      className="fa-solid fa-pen-to-square"
                      onClick={() => setEditingTodo(todo.id)}
                    ></i>
                    <i
                      className="fa-solid fa-trash-can"
                      onClick={() => removeTodo(todo.id)}
                    ></i>
                  </div>
                </div>
              )}
            </li>
          ))}
        </ul>

        <div className="form-footer">
          <input
            type="checkbox"
            onChange={() => {
              setHideCompleted(!hideCompleted);
            }}
          />
          Hide Completed
        </div>
      </div>
    </div>
  );
};

export default TodoForm;
