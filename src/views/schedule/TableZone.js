import Moment from "moment";
import { useSelector } from "react-redux";
import { selectStartingTime } from "../../sessiondata/pageSlice";

import Adjustment from "./Adjustment";

import { DragList } from "./DragList";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import { verticalSizes } from "../../app/App";

export function TableZone() {
  //   const expectationLock = useSelector(selectLockVal("expectation"));
  //   const realityLock = useSelector(selectLockVal("reality"));
  const startTime = useSelector(selectStartingTime);
  // function shiftedArray(size) {
  //   let array = [...Array(size).keys()];
  //   array.shift();
  //   return array;
  // }
  function createMoment(HHmmTimeString, minuteOffset) {
    const timeString = "0000-01-01T" + HHmmTimeString + ":00";
    return Moment(timeString).add(minuteOffset, "minute");
  }

  const timeSize = "calc(" + verticalSizes.navFont + " *13/24)";

  function normalRow(idx) {
    const incSize = 60; //minutes
    const formattedTime = createMoment(startTime, idx * incSize).format(
      "h:mm a"
    );

    return (
      <Box
        id="timecell"
        key={idx}
        sx={{
          // height: "calc(4 * " + timeSize + ")",
          minHeight: "calc(calc(100vh) / 13)",
          pt: "0.25em",
          px: "0.5em",
          m: "1px",
          //padding: "0 calc(" + timeSize + " / 3) 0",
          backgroundColor: "var(--spotify-3)",
        }}
      >
        <Typography
          id="timetext"
          sx={{
            // fontSize: timeSize,
            fontWeight: 400,
            width: "max-content",
            color: "white",
            margin: "0 auto 0",
          }}
        >
          {formattedTime}
        </Typography>
      </Box>
    );
  }
  function TimeTable() {
    return (
      //This column stretches on x to make the time dividers edge to edge
      <Stack
        direction="column"
        justifyContent="flex-start"
        alignItems="stretch"
      >
        {[...Array(11)].map((element, index) => normalRow(index, 11))}
      </Stack>
    );
  }
  return (
    //This row stretches columns to be as tall as possible
    <Stack
      id="schedulezone"
      direction="row"
      justifyContent="flex-start"
      alignItems="stretch"
      sx={{ mt: 3, maxWidth: "6in", mx: "auto" }}
    >
      <TimeTable />
      <Grid container>
        <Grid item xs={1}>
          <Stack
            direction="row"
            justifyContent="center"
            alignItems="stretch"
            height={1}
            width={1}
          >
            <Adjustment lockState={false} whichSchedule={"expectation"} />
          </Stack>
        </Grid>
        <Grid item xs={11}>
          <Stack
            direction="row"
            justifyContent="center"
            alignItems="stretch"
            height={1}
            width={1}
          >
            <DragList whichSchedule={"expectation"} lockState={false} />
          </Stack>
        </Grid>
        {/* <Grid item xs={0.5}>
          <Stack
            direction="row"
            justifyContent="center"
            alignItems="stretch"
            height={1}
            width={1}
          >
            <Adjustment lockState={false} whichSchedule={"reality"} />
          </Stack>
        </Grid>
        <Grid item xs={5.5}>
          <Stack
            direction="row"
            justifyContent="center"
            alignItems="stretch"
            height={1}
            width={1}
          >
            <DragList whichSchedule={"reality"} lockState={false} />
          </Stack>
        </Grid> */}
      </Grid>
    </Stack>
  );
}
