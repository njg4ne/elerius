import Moment from "moment";
import { useSelector } from "react-redux";
import {
  selectStartingTime,
  selectHoursVisible,
  selectIncrementsPerHour,
  selectLockVal,
} from "../../features/pageSlice";

import Adjustment from "./Adjustment";
import Scale from "./Scale";
import { LockButton } from "./LockButton";
import { DragList } from "./DragList";

export function ScheduleTable() {
  const expectationLock = useSelector(selectLockVal("expectation"));
  const realityLock = useSelector(selectLockVal("reality"));
  const startTime = useSelector(selectStartingTime);
  const hours = useSelector(selectHoursVisible);
  const incrementsPerHour = useSelector(selectIncrementsPerHour);
  function shiftedArray(size) {
    let array = [...Array(size).keys()];
    array.shift();
    return array;
  }
  function createMoment(HHmmTimeString, minuteOffset) {
    const timeString = "0000-01-01T" + HHmmTimeString + ":00";
    return Moment(timeString).add(minuteOffset, "minute");
  }
  function topRow() {
    const indexForTopRow = 0;
    const firstTime = createMoment(startTime, indexForTopRow).format("LT");
    const rowsToSpan = Number(hours).toString();
    return (
      <tr>
        <td className="border-2 border-black pad1 bg-gray-100 timecell">
          {firstTime}
        </td>
        <Scale
          rowSpan={rowsToSpan}
          numIncs={incrementsPerHour * hours}
          show={indexForTopRow}
        />
        <Adjustment lockState={expectationLock} whichSchedule={"expectation"} />
        {/* <Blocks rowSpan={hours} whichSchedule={"expectation"} /> */}
        <td rowSpan={hours} className="border-2 border-black p-0">
          <DragList whichSchedule={"expectation"} lockState={expectationLock} />
        </td>
        <Scale rowSpan={rowsToSpan} numIncs={incrementsPerHour * hours} />
        <Adjustment lockState={realityLock} whichSchedule={"reality"} />
        {/* <Blocks rowSpan={hours} whichSchedule={"reality"} /> */}
        <td rowSpan={hours} className="border-2 border-black p-0">
          <DragList whichSchedule={"reality"} lockState={realityLock} />
        </td>
      </tr>
    );
  }
  const normalRow = (idx) => {
    const incSize = 60; //minutes
    const formattedTime = createMoment(startTime, idx * incSize).format("LT");
    const totalIncs = Number(hours).toString();

    return (
      <tr key={idx}>
        <td className="border-2 border-black pad1 bg-gray-100 timecell">
          {formattedTime}
        </td>
      </tr>
    );
  };
  return (
    <table className="border-2 border-black border-collapse">
      <thead>
        <tr className="bg-gray-300">
          <th className="">Time</th>
          <th colSpan={expectationLock ? "1" : "2"}>
            <LockButton whichLock="expectation" />
          </th>
          <th className="px-2">Expectation</th>
          <th colSpan={realityLock ? "1" : "2"}>
            <LockButton whichLock="reality" />
          </th>
          <th className="px-2">Reality</th>
        </tr>
      </thead>
      <tbody>
        {topRow(hours)}
        {shiftedArray(hours).map((element) => normalRow(element))}
      </tbody>
    </table>
  );
}
