import React, { useEffect, useState } from "react";
import "./to_do.css";
import { RiDeleteBin6Line } from "react-icons/ri";
import { FaRegEdit } from "react-icons/fa";

const To_do = ({ onLogout }) => {
  const username = localStorage.getItem("loggedInUser");
  const [inputValue, setInputValue] = useState("");
  const [tasks, setTasks] = useState([]);
  const [editingIndex, setEditingIndex] = useState(-1);

  useEffect(() => {
    const allTasks = JSON.parse(localStorage.getItem("tasks")) || {};
    setTasks(allTasks[username] || []);
  }, [username]);

  function addTask() {
    if (inputValue.trim() === "") {
      alert("Please enter a task.");
      return;
    }

    const updatedTasks = [...tasks, inputValue];
    setTasks(updatedTasks);

    const allTasks = JSON.parse(localStorage.getItem("tasks")) || {};
    allTasks[username] = updatedTasks;
    localStorage.setItem("tasks", JSON.stringify(allTasks));

    setInputValue("");
  }

  function deleteTask(index) {
    const updatedTasks = tasks.filter((_, i) => i !== index);
    setTasks(updatedTasks);

    const allTasks = JSON.parse(localStorage.getItem("tasks")) || {};
    allTasks[username] = updatedTasks;
    localStorage.setItem("tasks", JSON.stringify(allTasks));
  }

  function editTask(index, newValue) {
    const updatedTasks = tasks.map((task, i) =>
      i === index ? newValue : task
    );
    setTasks(updatedTasks);

    const allTasks = JSON.parse(localStorage.getItem("tasks")) || {};
    allTasks[username] = updatedTasks;
    localStorage.setItem("tasks", JSON.stringify(allTasks));

    setEditingIndex(-1);
  }

  return (
    <div className="maincontainer1">
      <div className="center-container1">
        <h1>{username}'s To-Do List</h1>

        <input
          type="text"
          placeholder="Enter your task here"
          className="input-field"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
        />

        <div className="button-container  ">
          <button className="add-button" onClick={addTask}>
            Add Task
          </button>
          <button className="logout-button" onClick={onLogout}>
            Logout
          </button>
        </div>

        <ol>
          {tasks.map((task, index) => (
            <li key={index}>
              {editingIndex === index ? (
                <input
                  type="text"
                  defaultValue={task}
                  onBlur={(e) => editTask(index, e.target.value)}
                  onKeyDown={(e) =>
                    e.key === "Enter" && editTask(index, e.target.value)
                  }
                  autoFocus
                />
              ) : (
                <span>{task}</span>
              )}
              <div>
                <button
                  className="delete_btn"
                  onClick={() => deleteTask(index)}
                >
                  <RiDeleteBin6Line color="white" size={18} />
                </button>
                <button
                  className="edit_btn"
                  onClick={() => setEditingIndex(index)}
                >
                  <FaRegEdit color="white" size={18} />
                </button>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </div>
  );
};

export default To_do;
