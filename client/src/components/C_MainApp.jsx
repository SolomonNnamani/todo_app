import React, { useState } from "react";
import TaskBoard from "./H_TaskBoard.jsx";
import Profile from "./I_Profile.jsx";
import LogOut from "./Auth/LogOut.jsx";
import {fetchWithAuth} from './utils/fetchWithAuth.js'

const MainApp = () => {
  const [formData, setFormData] = useState({
    taskInput: "",
    error: "",
  });
  const [taskList, setTaskList] = useState([]);

  const handleTask = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (formData.taskInput.trim() !== "") {
      const addTask = async () => {
        
        try {
          const response = await fetchWithAuth("http://localhost:3001/api/tasks", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
             
            },
            body: JSON.stringify({ task: formData.taskInput }),
          });
          if(!response) return // Session expired and handled
          const data = await response.json();
          console.log("Task Data: ", data);
          setTaskList([...taskList, data.userTask]);
          setFormData({ taskInput: "" });
        } catch (err) {
          console.log("Error adding tasks: ", err);
          alert("An unexpected error occurred!")

        }
      };
      addTask();
    } else {
      setFormData({
        ...formData,
        error: "Task cannot be empty!!!",
      });
    }
  };

  //for dates

  const options = {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  };
  const formattedDate = new Date().toLocaleDateString("en-US", options);

  return (
    <div className="px-5 py-5 md:w-1/2 md:m-auto relative">
      <Profile />
      <LogOut/>
      {/*Task form */}
      <div className="my-10 ">
        <h1 className="text-3xl font-bold">My Tasks</h1>
        <p className="mb-5">{formattedDate} </p>

        <form onSubmit={handleSubmit}>
          <input
            type="text"
            id="taskInput"
            name="taskInput"
            placeholder="Add a new task"
            value={formData.taskInput}
            onChange={handleTask}
            className="mainInput"
          />
          <button
            type="submit"
            className="bg-black text-lime-400 cursor-pointer submitBtn ml-3 "
          >
            &#43;
          </button>
        </form>
        {/* Error Texts */}
        <div>
          <p id="taskEmpty" className="text-center text-red-600 font-bold">
            {formData.error}
          </p>
        </div>

        <TaskBoard taskList={taskList} setTaskList={setTaskList} />
      </div>
    </div>
  );
};

export default MainApp;
