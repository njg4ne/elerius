import {
  CardHeader,
  CardMedia,
  CardContent,
  Card,
  Chip,
  Box,
  CardActionArea,
} from "@mui/material";
import { Link } from "react-router-dom";

export default function TimeBlockPreview(props) {
  const tags = ["Time Block Planner", "Cal Newport", "Time Blocking"];
  return (
    <Box>
      <CardActionArea component={Link} to="/time">
        <Card elevation={4} sx={{ bgcolor: "blueviolet" }}>
          <CardHeader
            title="Interactve Demo App"
            sx={{ m: 2, mb: 0, p: 0 }}
          ></CardHeader>
          <Box sx={{ display: "flex" }}>
            <CardContent>
              Try the Time Blocking tool to build your daily schedule. It
              utilizes browser storage to save your schedule and is built on
              React Redux. It is still under development as of January 2022.
            </CardContent>
          </Box>
          <Box sx={{ m: 2, mt: 0 }}>
            {tags.map((l) => {
              return <Chip label={l} sx={{ m: 0.5 }} />;
            })}
          </Box>
        </Card>
      </CardActionArea>
    </Box>
  );
}
