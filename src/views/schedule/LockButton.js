import { useDispatch } from "react-redux";
import { setLock } from "../../sessiondata/pageSlice";
import { IconButton } from "../controlbar/ControlBar";

export function LockButton(props) {
  const dispatch = useDispatch();
  function click() {
    dispatch(setLock({ which: props.whichLock }));
  }
  return <IconButton onClick={click} googleIconName="lock" />;
}
