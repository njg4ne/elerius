import { useSelector } from "react-redux";
import calcBaseSize from "./calculator.js";
import {
  selectHoursVisible,
  selectIncrementsPerHour,
} from "../../features/pageSlice";
import { useState, useEffect } from "react";

export default function Scale(props) {
  const hours = useSelector(selectHoursVisible);
  const incrementsPerHour = useSelector(selectIncrementsPerHour);
  const [scale, setScale] = useState({
    base: calcBaseSize(hours, incrementsPerHour, window.innerHeight),
  });
  useEffect(() => {
    function handleResize() {
      setScale({
        base: calcBaseSize(hours, incrementsPerHour, window.innerHeight),
      });
    }
    window.addEventListener("resize", handleResize);
    return (_) => {
      window.removeEventListener("resize", handleResize);
    };
  });
  return (
    <td
      rowSpan={props.rowSpan}
      className="border-2 border-black h-full bg-yellow-200 p-0"
    >
      <div className="flex flex-col p-0">
        {[...Array(props.numIncs)].map((element, index) => {
          return (
            <div
              key={index}
              className="border border-green-700 bg-green-300 blankcell"
              style={{
                height: Number(scale.base).toString() + "px",
                minWidth: "calc(1vw + 1vh)",
              }}
            />
          );
        })}
      </div>
    </td>
  );
}
