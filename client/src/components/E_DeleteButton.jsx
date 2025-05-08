import React from "react";
import {fetchWithAuth} from './utils/fetchWithAuth.js'

//Task Delete
const DeleteButton = (props) => {
  const { task, taskList, setTaskList, visible } = props;

  const handleDelete = async () => {
    
    try {
      const response = await fetchWithAuth(
        `http://localhost:3001/api/delete/${task._id}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            
          },
        }
      );
      if (!response.ok) {
        console.log("Error connecting to file");
        return;
      }
      console.log("Task deleted succesfully");
      const deletedTask = taskList.filter((t) => t._id !== task._id);
      setTaskList(deletedTask);
    } catch (error) {
      console.log("Error deleting task", error.message);
      alert("Server busy, please try again")
    }
  };

  return (
    <div className="absolute right-3 top-16 lg:top-5 lg:right-10 ">
      <button
        className={`text-xs  border-2 border-lime-400  w-10 
      text-center rounded px-2 py-1 cursor-pointer text-black 
      ${visible ? "visible" : "hidden"}
      `}
        onClick={handleDelete}
      >
        DEL
      </button>
    </div>
  );
};

export default DeleteButton;
