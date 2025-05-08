import React from "react";
import {fetchWithAuth} from './utils/fetchWithAuth.js'

//Task Check/update
const CheckedInput = (props) => {
  const { taskList, setTaskList, id, completed } = props;

  const handleChecked = (id) => {
    const checkedTasks = taskList.map((task) => {
      if (task._id === id) {
        return {
          ...task,
          completed: !task.completed,
        };
      }
      return task;
    });
    setTaskList(checkedTasks);
    const updatedTask = checkedTasks.find((task) => task._id === id);

    const updateCheckedTask = async () => {
  
      try {
        const response = await fetchWithAuth(
          `/api/tasks/${updatedTask._id}`,
          {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
              
            },
            body: JSON.stringify({ completed: updatedTask.completed }),
          }
        );
        if (!response.ok) {
          console.log("Failed to fetch response");
        } else {
          console.log("Task successfully updated in backend!");
        }
      } catch (error) {
        console.log("Error updating Checked: ", error);
        alert("Server busy, please try again")
      }
    };
    updateCheckedTask();
  };
  return (
    <div>
      <input
        type="checkbox"
        checked={!!completed}
        onChange={() => handleChecked(id)}
        className="align-sub accent-lime-400 font-light cursor-pointer border border-lime-400 scale-150"
      />
    </div>
  );
};

export default CheckedInput;
