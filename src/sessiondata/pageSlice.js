import { createSlice } from "@reduxjs/toolkit";
import initialState from "../mockdata/page.json";

function updateExpectation(
  oldExpectation,
  visibleMinutes,
  incMinutes,
  newSizes
) {
  var newExpectation = [...oldExpectation];
  for (let i = 0; i < Math.min(newSizes.length, oldExpectation.length); i++) {
    const minutesLong =
      (visibleMinutes * Number(parseFloat(newSizes[i]))) / 100;
    const incsLong = minutesLong / incMinutes;
    newExpectation[i].duration = incsLong.valueOf();
  }
  return newExpectation;
}

function snapPercents(percentsArray, visibleMinutes, incMinutes) {
  return [...percentsArray].map((percent) => {
    const oneIncPercent = (incMinutes / visibleMinutes) * 100;
    let approxNumIncs = Math.round(percent / oneIncPercent);
    approxNumIncs += approxNumIncs === 0 ? 1 : 0;
    return approxNumIncs * oneIncPercent;
  });
}

const pageSlice = createSlice({
  name: "page",
  initialState,
  reducers: {
    setStartingTime: (state, action) => {
      state.document.startTime = action.payload.time;
    },
    setSchedule: (state, action) => {
      const oldSchedule = state.document.schedule;
      const visibleMinutes = state.document.hoursVisible * 60;
      const incMinutes = state.document.incMinutes;
      const newPercents = snapPercents(
        action.payload.adjustedSizes,
        visibleMinutes,
        incMinutes
      );
      const newSchedule = updateExpectation(
        action.payload.which === "reality"
          ? oldSchedule.reality
          : oldSchedule.expectation,
        visibleMinutes,
        incMinutes,
        newPercents
      );
      if (action.payload.which === "reality") {
        state.document.schedule.reality = newSchedule;
      } else {
        state.document.schedule.expectation = newSchedule;
      }
    },
    deleteBlock: (state, action) => {
      const whichToDelete = action.payload.index;
      const schedule =
        action.payload.which === "reality"
          ? state.document.schedule.reality
          : state.document.schedule.expectation;
      if (schedule.length === 1) return;
      let redistributeMe = schedule[whichToDelete].duration;
      schedule.splice(whichToDelete, 1);
      for (
        let idx = 0;
        redistributeMe > 0;
        idx = idx === schedule.length - 1 ? 0 : idx + 1
      ) {
        schedule[idx].duration++;
        redistributeMe--;
      }
      if (action.payload.which === "reality") {
        state.document.schedule.reality = schedule;
      } else {
        state.document.schedule.expectation = schedule;
      }
    },
    reorderSchedule: (state, action) => {
      const schedule =
        action.payload.which === "reality"
          ? state.document.schedule.reality
          : state.document.schedule.expectation;
      const [removed] = schedule.splice(action.payload.move[0], 1);
      schedule.splice(action.payload.move[1], 0, removed);
      if (action.payload.which === "reality") {
        state.document.schedule.reality = schedule;
      } else {
        state.document.schedule.expectation = schedule;
      }
    },
    splitBlock: (state, action) => {
      const src =
        action.payload.which === "reality"
          ? state.document.schedule.reality
          : state.document.schedule.expectation;
      var schedule = [...src];
      const idx = action.payload.index;
      const block = schedule[idx];
      if (block.duration === 1) {
        return;
      }
      let durationToSplit = block.duration;
      schedule.splice(idx, 0, JSON.parse(JSON.stringify(block)));

      schedule[idx].duration = 0;
      schedule[idx + 1].duration = 0;
      if (durationToSplit % 2 !== 0) {
        schedule[idx].duration++;
        durationToSplit--;
      }
      durationToSplit /= 2;
      schedule[idx].duration += durationToSplit;
      schedule[idx + 1].duration += durationToSplit;

      if (action.payload.which === "reality") {
        state.document.schedule.reality = schedule;
      } else {
        state.document.schedule.expectation = schedule;
      }
    },

    setLock: (state, action) => {
      const reality = action.payload.which === "reality";
      const index = reality ? 1 : 0;
      const currentVal = state.document.locks[index];
      state.document.locks[index] = !currentVal;
    },
    overwritePage: (state, action) => {
      //console.log("received", action.payload.document);
      state.document = action.payload.document;
    },
    setDurations: (state, action) => {
      const schedule =
        action.payload.which === "reality"
          ? state.document.schedule.reality
          : state.document.schedule.expectation;
      schedule.map((e, i) => {
        e.duration = action.payload.durations[i];
        return e;
      });
      if (action.payload.which === "reality") {
        state.document.schedule.reality = schedule;
      } else {
        state.document.schedule.expectation = schedule;
      }
    },
    updateLabel: (state, action) => {
      const schedule =
        action.payload.which === "reality"
          ? state.document.schedule.reality
          : state.document.schedule.expectation;
      schedule[action.payload.index].description = action.payload.value;
    },
    updateColor: (state, action) => {
      const schedule =
        action.payload.which === "reality"
          ? state.document.schedule.reality
          : state.document.schedule.expectation;
      schedule[action.payload.index].color = action.payload.value;
    },
  },
});

export const {
  setStartingTime,
  setSchedule,
  deleteBlock,
  reorderSchedule,
  splitBlock,
  setLock,
  overwritePage,
  setDurations,
  updateLabel,
  updateColor,
} = pageSlice.actions;
export const selectLockVal = (whichSchedule) => (state) => {
  const reality = whichSchedule === "reality";
  return state.page.document.locks[reality ? 1 : 0];
};
export const selectStartingTime = (state) => state.page.document.startTime;
export const selectHoursVisible = (state) => state.page.document.hoursVisible;
export const selectIncrementsPerHour = (state) => {
  return 60 / state.page.document.incMinutes;
};
export const selectBlocks = (whichSchedule) => (state) => {
  const schedule = state.page.document.schedule;
  return whichSchedule === "reality" ? schedule.reality : schedule.expectation;
};

export const selectDurations = (whichSchedule) => (state) => {
  const schedule = state.page.document.schedule;
  const reality = whichSchedule === "reality";
  const subSchedule = reality ? schedule.reality : schedule.expectation;
  const sizes = subSchedule.map((e) => e.duration);
  const newArray = [...Array(sizes.length)];
  for (let i = 0; i < sizes.length; i++) {
    if (i === 0) {
      newArray[0] = sizes[0];
    } else {
      newArray[i] = sizes[i] + newArray[i - 1];
    }
  }
  newArray.pop();
  newArray.reverse();
  const totalIncs =
    state.page.document.hoursVisible * (60 / state.page.document.incMinutes);
  return newArray.map((e) => totalIncs - e);
};

export const selectSizes = (whichSchedule) => (state) => {
  var sizes = [];
  var totalMinutes = 0;
  const visibleMinutes = state.page.document.hoursVisible * 60;
  let percentTotal = 0.0;
  const schedule = state.page.document.schedule;
  const reality = whichSchedule === "reality";
  for (let block of reality ? schedule.reality : schedule.expectation) {
    const change = block.duration * state.page.document.incMinutes;
    if (!(totalMinutes + change > visibleMinutes)) {
      totalMinutes += change;
      const percent = (change / visibleMinutes) * 100;
      sizes.push(percent);
      percentTotal += percent;
    } else {
      const left = 100.0 - percentTotal;
      percentTotal += left;
      sizes.push(left);
      break;
    }
  }
  if (percentTotal < 100) {
    percentTotal -= sizes.pop();
    const left = 100.0 - percentTotal;
    sizes.push(left);
  }
  const newArray = [...Array(sizes.length)];
  for (let i = 0; i < sizes.length; i++) {
    if (i === 0) {
      newArray[0] = sizes[0];
    } else {
      newArray[i] = sizes[i] + newArray[i - 1];
    }
  }
  newArray.pop();
  newArray.reverse();
  return newArray.map((percent) => 100 - percent);
};
export default pageSlice.reducer;
