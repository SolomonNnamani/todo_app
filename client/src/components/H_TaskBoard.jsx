import React, { useState, useEffect } from "react";

import Checked from "./F_CheckedInput.jsx";
import Buttons from "./G_Button.jsx";
import Edit from "./D_EditButton.jsx";
import Delete from "./E_DeleteButton.jsx";
import Date from "./J_listDate.jsx";
import { MdMoreVert } from "react-icons/md";
import {fetchWithAuth} from './utils/fetchWithAuth.js'

//TaskBoard/List
const H_TaskBoard = (props) => {
  const { taskList, setTaskList } = props;
  const [filter, setFilter] = useState("all");
  const [visibleTaskId, setVisibleTaskId] = useState(null);

  //for getting/fetching listed tasks
  useEffect(() => {
   
    fetchWithAuth("http://localhost:3001/api/tasks",{
      method: "GET",
      
    })
      .then((res) => res.json())
      .then((data) => setTaskList(data))
      .catch((err) =>{ 
        console.log("Error loading tasks", err)
      
      });
  }, []);

  const getFilterTasks = () => {
    if (filter === "completed") {
      let tasks = taskList.filter((task) => task.completed);
      return tasks;
    } else if (filter === "active") {
      let tasks = taskList.filter((task) => !task.completed);
      return tasks;
    } else {
      return taskList;
    }
  };

  const noTasksMessage =
    filter === "completed"
      ? "No Completed Tasks"
      : filter === "active"
      ? "No Active Tasks"
      : "No Tasks";

  const handleVisible = (id) => {
    setVisibleTaskId((prevId) =>(prevId === id ? null : id) )
    
  };

  return (
    <div className="relative block h-[50vh] ">
      <Buttons setFilter={setFilter} />

      {/*TaskBoard/List */}
      <div className="mt-3  h-auto py-5 ">
        <ul>
          {getFilterTasks().map((task) => {
            return (
              <li
                key={task._id}
                className={`bg-slate-100 w-full px-3 py-5 mb-5 text-lg font-semibold 
                 flex flex-wrap relative  ${
                   task.completed ? "text-slate-300" : "text-black"
                 } `}
              >
                <Checked
                  taskList={taskList}
                  setTaskList={setTaskList}
                  completed={task.completed}
                  id={task._id}
                />

                <button
                  onClick={()=> handleVisible(task._id)}
                  className="absolute right-3 text-black top-2 text-3xl cursor-pointer"
                >
                  <MdMoreVert />{" "}
                </button>

                <Edit
                  task={task}
                  taskList={taskList}
                  setTaskList={setTaskList}
                  visible={visibleTaskId === task._id}
                />

                <Delete
                  task={task}
                  taskList={taskList}
                  setTaskList={setTaskList}
                  visible={visibleTaskId === task._id}
                />
                <div className="w-full">
                  <Date completed={task.completed} date={task.date} />
                </div>
              </li>
            );
          })}
        </ul>
      </div>
      {getFilterTasks().length === 0 && (
        <div className="absolute top-0 h-full  w-full -z-10 ">
          <p
            id="noTasks"
            className={`h-full flex justify-center items-center text-2xl
             text-slate-400 opacity-50 font-bold -z-10   `}
          >
            {noTasksMessage}
          </p>
        </div>
      )}
    </div>
  );
};

export default H_TaskBoard;
