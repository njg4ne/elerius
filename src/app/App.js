import React from "react";

import "./App.css";
import Schedule from "../views/schedule/Schedule.js";
import { LoginButton } from "../auth/LoginButton";
import { ControlBar } from "../views/controlbar/ControlBar";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

const PageStructure = (props) => {
  return (
    <div id="wholepage" className="roboto flex flex-col">
      <div
        id="navbar"
        key="1"
        className="flex bg-indigo-400 font-medium nav border-b-2 border-blue-700"
      >
        <span className="brand">Block Scheduler</span>
        <LoginButton />
      </div>
      <div
        id="afternavbar"
        key="2"
        className="flex bg-black page min-h-screen afternav"
      >
        {/* <div className="w-1/6 bg-gray-100">
          <div className="flex flex-col justify-around">
            <div className="marg1 pad1 bg-pink-400 border-2 border-black text-center font-medium ">
              Notes
            </div>
            {props.notes}
          </div>
        </div> */}
        <div key="1" className="bg-gray-100 w-max">
          <ControlBar />
        </div>
        <div key="2" className="w-full bg-gray-200">
          <div>
            <div className="flex flex-col justify-around text-center">
              <div className="marg1 pad1 bg-pink-400 border-2 border-black font-medium">
                Schedule
              </div>
              {props.schedule}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

function App() {
  return (
    <Router>
      <Routes>
        <Route
          path="/time"
          element={
            <PageStructure
              notes={<div></div>}
              schedule={<Schedule />}
            ></PageStructure>
          }
        ></Route>
        <Route
          path="/"
          element={
            <PageStructure
              notes={<div></div>}
              schedule={<Schedule />}
            ></PageStructure>
          }
        ></Route>
      </Routes>
    </Router>
  );
}

export default App;
