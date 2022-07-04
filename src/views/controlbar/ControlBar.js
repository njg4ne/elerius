import { selectFolder } from "../../features/filesystemSlice";
import { setStartingTime, selectStartingTime } from "../../features/pageSlice";
import { permitFSAccess, showDirContents } from "../../features/utilities";
import { useDispatch, useSelector } from "react-redux";
import Moment from "moment";

let userDir;

function timesArray(whichFormat) {
  const pretty = whichFormat === "pretty";
  const hoursInAday = 24;
  const timeForIndex = (idx) => {
    const mom = Moment("0000-01-01T04:00:00").add(idx, "hour");
    return pretty ? mom.format("LT") : mom.format("HH:mm");
  };
  return [...Array(hoursInAday)].map((element, index) => timeForIndex(index));
}

export function IconButton(props) {
  return (
    <button
      className={"iconbutton rounded " + props.className}
      onClick={props.onClick}
    >
      <div className="material-icons icon">{props.googleIconName}</div>
    </button>
  );
}

export function ControlBar() {
  const startTime = useSelector(selectStartingTime);
  const dirAvailable = useSelector(selectFolder);
  const dispatch = useDispatch();
  function setTime(event) {
    dispatch(
      setStartingTime({
        time: event.target.value,
      })
    );
  }

  const oneDropdownItem = (idx) => {
    return (
      <option key={idx} id={idx} value={timesArray("data")[idx]}>
        {timesArray("pretty")[idx]}
      </option>
    );
  };
  return (
    <div className="flex flex-col afternav">
      <div className="">
        <div className="marg1 pad1 bg-pink-400 border-2 border-black text-center font-medium ">
          Controls
        </div>
      </div>

      <select value={startTime} onChange={setTime} className="marg1 pad1">
        {[...Array(16)].map((element, index) => oneDropdownItem(index))}
      </select>

      <IconButton
        className="marg1"
        onClick={() => {
          userDir = permitFSAccess();
        }}
        googleIconName={dirAvailable ? "check" : "folder"}
      />

      <IconButton
        className="marg1"
        onClick={() => {
          showDirContents(userDir);
        }}
        googleIconName="list"
      />
    </div>
  );
}
