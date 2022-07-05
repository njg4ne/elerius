import { useSelector } from "react-redux";
import {
  selectHoursVisible,
  selectIncrementsPerHour,
} from "../../sessiondata/pageSlice";
import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";
import { verticalSizes } from "../../app/App.js";

export default function Scale(props) {
  const hours = useSelector(selectHoursVisible);
  const incrementsPerHour = useSelector(selectIncrementsPerHour);
  function numBoxes(string) {
    const howMany = incrementsPerHour * hours;
    return string ? Number(howMany).toString() : howMany;
  }

  const oneBox = (idx) => {
    return (
      <Box
        id="timecell"
        key={idx}
        borderTop={idx !== 0 ? 2 : 0}
        sx={{
          height: "calc(100% / " + numBoxes(true) + ")",
          width: verticalSizes.navFont,
        }}
      ></Box>
    );
  };
  return (
    <Stack
      minHeight={1}
      direction="column"
      justifyContent="flex-start"
      alignItems="stretch"
      backgroundColor="var(--spotify-2)"
      borderRight={2}
    >
      {[...Array(numBoxes(false))].map((element, index) => oneBox(index))}
    </Stack>
  );
}
