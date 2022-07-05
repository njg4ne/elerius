import React from "react";

import "./App.css";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Box from "@mui/material/Box";
import BottomNavigation from "@mui/material/BottomNavigation";
import BottomNavigationAction from "@mui/material/BottomNavigationAction";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import Stack from "@mui/material/Stack";
import { NavBar } from "../views/navbar/NavBar";
import CssBaseline from "@mui/material/CssBaseline";
import { ThemeProvider, createTheme } from "@mui/material/styles";

import { TopBar, Home } from "../views/home/Home.js";
import { Typography } from "@mui/material";

import { useState } from "react";
import { TableZone } from "../views/schedule/TableZone.js";
import { Icon } from "@mui/material";
import EleriusProject from "../views/portfolio/Elerius";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const navHeight = "clamp(9mm, 8vh, 18mm)";
const tabHeight = "clamp(7mm, 6vh, 14mm)";
const titleFontSize = "clamp(4mm, 3vh, 8mm)";
const buttonFontSize = "clamp(3mm, 2vh, 4mm)";

export function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}

export const verticalSizes = {
  nav: navHeight,
  tab: tabHeight,
  navFont: titleFontSize,
  buttonFont: buttonFontSize,
};

function ActiveTab(props) {
  return (
    <Box
      sx={{
        width: 1,
      }}
    >
      {props.element}
    </Box>
  );
}

function TabBar(props) {
  return (
    <Paper
      id="mainnavtabs"
      sx={{
        position: "fixed",
        bottom: 0,
        left: 0,
        right: 0,
      }}
      elevation={5}
    >
      <BottomNavigation
        showLabels
        sx={{ height: tabHeight }}
        value={props.value}
        onChange={(event, newValue) => {
          props.setValue(newValue);
        }}
      >
        <BottomNavigationAction
          label="Today"
          icon={<Icon>calendar_today</Icon>}
        />
        <BottomNavigationAction
          label="Now"
          icon={<Icon>calendar_view_day</Icon>}
        />
        <BottomNavigationAction label="Settings" icon={<Icon>settings</Icon>} />
      </BottomNavigation>
    </Paper>
  );
}

function ContentFrame(props) {
  const [value, setValue] = useState(0);
  return (
    <Stack
      direction="column"
      justifyContent="flex-start"
      alignItems="stretch"
      id="rootview"
      style={{
        width: "100%",
        height: "100%",
        backgroundColor: "whitesmoke",
      }}
    >
      <NavBar />
      <ActiveTab element={props.contents[value]} />
      <TabBar value={value} setValue={setValue} />
    </Stack>
  );
}

function MainContent() {
  return (
    <Grid
      id="maincanvas"
      container
      direction="row"
      justifyContent="center"
      alignItems="flex-start"
      sx={{
        width: "max(100%, 5cm)",
        minHeight:
          "calc(100vh - " + verticalSizes.tab + " - " + verticalSizes.nav + ")",
        backgroundColor: "var(--spotify-5)",
        paddingBottom: verticalSizes.tab,
      }}
    >
      <TableZone></TableZone>
    </Grid>
  );
}

function Page(props) {
  const [value, setValue] = useState(1);

  function Tabs() {
    return (
      <BottomNavigation
        showLabels
        value={value}
        sx={{
          position: "fixed",
          bottom: 0,
          left: 0,
          right: 0,
          bgcolor: "var(--spotify-3)",
        }}
        elevation={3}
        onChange={(event, newValue) => {
          setValue(newValue);
        }}
      >
        <BottomNavigationAction
          sx={{ color: "white" }}
          label="Today"
          icon={<Icon>calendar_today</Icon>}
        />
        <BottomNavigationAction
          sx={{ color: "white" }}
          label="Now"
          icon={<Icon>calendar_view_day</Icon>}
        />
        <BottomNavigationAction
          sx={{ color: "white" }}
          label="Settings"
          icon={<Icon>settings</Icon>}
        />
      </BottomNavigation>
    );
  }

  function TabNav() {
    return (
      <Stack
        direction="column"
        sx={{
          width: 1,
          height: "100vh",
        }}
      >
        <Box
          sx={{
            width: 1,
            minHeight: "100vh",
            bgcolor: "var(--spotify-4)",
            px: 2,
            pt: 0,
            pb: "72px",
            height: "auto",
          }}
        >
          {props.contents[value]}
        </Box>
        <Tabs></Tabs>
      </Stack>
    );
  }

  return TabNav();
}

const darkTheme = createTheme({
  palette: {
    mode: "dark",
  },
});

function App() {
  function Contents() {
    const tab1 = TableZone();
    return [tab1, tab1, tab1];
  }

  function ComingSoonMsg() {
    return <Typography sx={{ m: 2 }}>Coming soon!</Typography>;
  }

  return (
    <ThemeProvider theme={darkTheme}>
      <Router>
        <CssBaseline />
        <ScrollToTop />
        <Paper sx={{ w: 1, minHeight: "100vh" }}>
          <TopBar />
          <Routes>
            <Route exact strict path="/time" element={TableZone()}></Route>
            <Route
              exact
              strict
              path="/about"
              element={EleriusProject()}
            ></Route>
            <Route exact strict path="/" element={Home()} />
            <Route exact strict path="/*" element={ComingSoonMsg()} />
          </Routes>
        </Paper>
      </Router>
    </ThemeProvider>
  );
}

export default App;
