import {
  Toolbar,
  AppBar,
  IconButton,
  Box,
  Stack,
  Typography,
  Card,
  Paper,
  Grid,
  CssBaseline,
} from "@mui/material";
import { Link } from "react-router-dom";
import ProfilePreview from "./Previews/ProfilePreview";
import TimeBlockPreview from "./Previews/TimeBlockPreview";
import WorkPreview from "./Previews/WorkPreview";
import { projectData } from "./Previews/projectData";
import { ScheduleSaveControls } from "../navbar/NavBar";
import { Route, Routes } from "react-router-dom";

export function Home() {
  const [uva, vt, personal] = [...projectData];
  return (
    <Grid container spacing={2} sx={{ p: 2 }} justifyContent="center">
      <Grid item xs={12} md={6} lg={4.5}>
        <Stack direction="column" spacing={2}>
          <ProfilePreview />
          {TimeBlockPreview()}
          {WorkPreview(uva)}
        </Stack>
      </Grid>
      <Grid item xs={12} md={6} lg={4.5}>
        <Stack direction="column" spacing={2}>
          {WorkPreview(personal)}
          {WorkPreview(vt)}
        </Stack>
      </Grid>
    </Grid>
    // <Grid container spacing={2} sx={{ p: 2 }}>
    //   <Grid item xs={12} md={6} lg={4}>
    //     <ProfilePreview />
    //   </Grid>
    //   <Grid item xs={12} md={6} lg={4}>
    //     {TimeBlockPreview()}
    //   </Grid>
    //   {projectData.map((proj) => {
    //     return (
    //       <Grid item xs={12} md={6} lg={4}>
    //         {WorkPreview(proj)}
    //       </Grid>
    //     );
    //   })}
    // </Grid>
  );
}

export function TopBar() {
  return (
    <AppBar position="static">
      <Toolbar>
        {/* <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
            <Menu />
          </IconButton> */}
        <Typography
          variant="h5"
          component="div"
          sx={{ flexGrow: 1 }}
          component={Link}
          to="/"
        >
          Elerius
        </Typography>
        <Routes>
          <Route path="/time" element={ScheduleSaveControls()} />
        </Routes>
      </Toolbar>
    </AppBar>
  );
}
