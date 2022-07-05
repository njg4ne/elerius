import {
  CardHeader,
  CardMedia,
  CardContent,
  Card,
  Box,
  CardActionArea,
} from "@mui/material";
import { Link } from "react-router-dom";
import profile from "./Assets/profile.jpg";
export default function ProfilePreview(props) {
  return (
    <Box sx={props.sx}>
      <CardActionArea href="https://elerius.ga/Nicholas-Gardella.pdf">
        <Card elevation={4}>
          <CardHeader
            title="Nicholas Gardella"
            sx={{ m: 2, mb: 0, p: 0 }}
          ></CardHeader>
          <Box sx={{ display: "flex" }}>
            <CardMedia
              sx={{ width: "3cm", borderRadius: "10px", m: 2 }}
              component="img"
              src={profile}
            ></CardMedia>
            <CardContent>
              Nicholas is a PhD student in Systems Engineering at University of
              Virginia under Dr. Sara Riggs. His current research area is
              psychophysics.
            </CardContent>
          </Box>
        </Card>
      </CardActionArea>
    </Box>
  );
}
