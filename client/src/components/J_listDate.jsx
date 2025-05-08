import React from "react";

const J_listDate = (props) => {
  const { completed, date } = props;
  return (
    <div>
      <div
        className={`mx-10  text-xs mt-3   ${
          completed ? "line-through text-slate-300" : "no-underline"
        } `}
      >
        Date: {date}
      </div>
    </div>
  );
};

export default J_listDate;
