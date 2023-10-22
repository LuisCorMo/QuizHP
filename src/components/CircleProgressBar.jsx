import React from "react";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

const CircleProgressBar = ({seconds}) => {

  return (
    <div className="bg-black aspect-auto rounded-full">
      <CircularProgressbar
        value={seconds}
        maxValue={15}
        text={`${seconds < 10 ? `0${seconds}` : seconds}`}
        counterClockwise
        styles={buildStyles({
          textColor: "white",
          pathColor: "#D4AF37",
        })}
      />
    </div>
  );
};

export default CircleProgressBar;
