import React, { useState } from "react";

//Task Button
const G_Button = (props) => {
  const [activeBtn, setActiveBtn] = useState(0);

  const { setFilter } = props;

  const buttonNames = ["All", "Active", "Completed"];

  const handleAllTasks = () => {
    setFilter("all");
  };

  const handleActiveTask = () => {
    setFilter("active");
  };

  const handleCompletedTask = () => {
    setFilter("completed");
  };

  const btnActions = [handleAllTasks, handleActiveTask, handleCompletedTask];

  const handleClick = (index) => {
    return () => {
      setActiveBtn(index);

      btnActions[index]();
    };
  };
  return (
    <div>
      <div className="btnContainer flex justify-between mt-5">
        {buttonNames.map((btnNames, index) => (
          <button
            key={index}
            className={` ${activeBtn === index ? "active" : ""} cursor-pointer`}
            onClick={handleClick(index)}
          >
            {btnNames}
          </button>
        ))}
      </div>
    </div>
  );
};

export default G_Button;
