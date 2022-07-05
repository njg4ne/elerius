import { useDispatch, useSelector } from "react-redux";
import {
  selectBlocks,
  selectHoursVisible,
  selectIncrementsPerHour,
  selectSizes,
  setSchedule,
  selectDurations,
  setDurations,
} from "../../sessiondata/pageSlice";
import Box from "@mui/material/Box";
import Slider from "@mui/material/Slider";
export default function Adjustment(props) {
  const blocks = useSelector(selectBlocks(props.whichSchedule));
  const dispatch = useDispatch();
  const hours = useSelector(selectHoursVisible);
  const incrementsPerHour = useSelector(selectIncrementsPerHour);
  const sizes = useSelector(selectDurations(props.whichSchedule));

  if (props.lockState) return <></>;
  return (
    <Box minHeight={1}>
      <Slider
        sx={{
          color: "var(--spotify-2)",
          borderRadius: "0px",
          margin: "0px -2px",
        }}
        orientation="vertical"
        value={sizes}
        disableSwap={true}
        track={false}
        step={1}
        min={0}
        max={44}
        onChange={(event, val) => {
          var t = val.reverse();
          const total = incrementsPerHour * hours;
          t = t.map((e) => total - e);
          var s = [...t];
          s.unshift(0);
          s.pop();
          t = t.map((e, i) => e - s[i]);
          const sum = t.reduce((l, r) => l + r);
          t.push(total - sum);
          if (t.includes(0)) {
            return;
          }
          dispatch(
            setDurations({
              which: props.whichSchedule,
              durations: t,
            })
          );
        }}
      />
    </Box>
  );
}
