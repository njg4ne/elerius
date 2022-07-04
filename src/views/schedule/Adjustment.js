import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Split from "react-split";
import {
  selectBlocks,
  selectHoursVisible,
  selectIncrementsPerHour,
  selectSizes,
  setSchedule,
} from "../../features/pageSlice";
import calcBaseSize from "./calculator.js";

export default function Adjustment(props) {
  const blocks = useSelector(selectBlocks(props.whichSchedule));
  const dispatch = useDispatch();
  const hours = useSelector(selectHoursVisible);
  const incrementsPerHour = useSelector(selectIncrementsPerHour);
  const percents = useSelector(selectSizes(props.whichSchedule));
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

  if (props.lockState) return <></>;

  function MultiBlockAdjust() {
    return (
      <Split
        className="split"
        gutterSize={4}
        direction="vertical"
        minSize={scale.base - 2}
        dragInterval={scale.base}
        snapOffset={0}
        style={{
          height:
            Number(scale.base * hours * incrementsPerHour).toString() + "px",
          minWidth: "calc(1vw + 1vh)",
        }}
        sizes={percents}
        onDragEnd={(newSizes) => {
          dispatch(
            setSchedule({
              adjustedSizes: newSizes,
              which: props.whichSchedule,
            })
          );
          console.log("dispatched");
          return;
        }}
      >
        {blocks.map((element, index) => {
          const color = "indigo-400";
          let colorClass = "bg-" + color + " ";
          colorClass += index % 2 === 0 ? "" : "";
          return <div key={index} className={colorClass + " "}></div>;
        })}
      </Split>
    );
  }

  return (
    <td rowSpan={hours} className="border-2 border-black p-0">
      <MultiBlockAdjust />
    </td>
  );
}
