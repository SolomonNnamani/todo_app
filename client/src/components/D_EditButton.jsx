import { useState } from "react";
import {fetchWithAuth} from './utils/fetchWithAuth.js'

const EditButton = ({ task, taskList, setTaskList, visible }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editText, setEditText] = useState(task.item);

  const handleInputChange = (e) => {
    setEditText(e.target.value);
  };

  const handleSave = () => {
    const updatedTaskList = taskList.map((t) => {
      if (t._id === task._id) {
        return {
          ...t,
          item: editText,
          edit: true,
          date: new Date().toLocaleDateString("en-GB"),
        };
      }
      return t;
    });
    //
    const editedTask = updatedTaskList.find((t) => t._id === task._id);
    console.log(editedTask.item);

    const updateEditedTask = async () => {
     
      try {
        console.log("Sending data:", {
          item: editedTask.item,
          edit: editedTask.edit,
          date: editedTask.date,
        });

        const response = await fetchWithAuth(
          `/api/edit/${editedTask._id}`,
          {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
           
            },
            body: JSON.stringify({
              item: editedTask.item,
              edit: editedTask.edit,
              date: editedTask.date,
            }),
          }
        );
        if (!response.ok) {
          const errorData = await response.json();
          console.log("Failed to fetch response:", errorData);
        } else {
          console.log("Task successfully updated in backend!");
          setTaskList(updatedTaskList);
          setIsEditing(false);
        }
      } catch (error) {
        console.log("Error updating task: ", error);
        alert("Server busy,try again again")
      }
    };
    updateEditedTask();
  };

  const handleEditToggle = () => {
    if (isEditing) {
      handleSave();
    } else {
      setIsEditing(true);
    }
  };

  return (
    <div className=" forParagaph  px-5  ">
      {isEditing ? (
        <input
          value={editText}
          onChange={handleInputChange}
          className="inputEdit px-1 py-0.5 text-sm"
        />
      ) : (
        <p
          className={`break-words text-sm w-full 
              ${task.completed ? "line-through text-slate-300" : ""}`}
        >
          {task.item}
        </p>
      )}

      <div className="absolute  right-3 top-9 lg:right-22 lg:top-5">
        <button
          onClick={handleEditToggle}
          disabled={task.completed}
          className={`text-xs px-2 py-1 border-2 rounded  w-10
        ${
          task.completed
            ? "text-gray-400 border-gray-300 cursor-not-allowed"
            : "text-black border-lime-400 cursor-pointer"
        }
        ${visible ? "visible" : "hidden"}
        `}
        >
          {isEditing ? "SAVE" : "EDIT"}
        </button>
      </div>
    </div>
  );
};

export default EditButton;
