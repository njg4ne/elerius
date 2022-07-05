import { useDispatch, useSelector } from "react-redux";
import {
  selectHoursVisible,
  selectIncrementsPerHour,
  selectBlocks,
  selectSizes,
  deleteBlock,
  reorderSchedule,
  splitBlock,
  updateLabel,
  updateColor,
} from "../../sessiondata/pageSlice";
import { useState } from "react";
import Tooltip from "@mui/material/Tooltip";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import { verticalSizes } from "../../app/App";
import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";

import { RenameDialog } from "./RenameDialog";
import { ColorDialog } from "./ColorDialog";

function uuidv4() {
  return ([1e7] + -1e3 + -4e3 + -8e3 + -1e11).replace(/[018]/g, (c) =>
    (
      c ^
      (crypto.getRandomValues(new Uint8Array(1))[0] & (15 >> (c / 4)))
    ).toString(16)
  );
}

export function DragList(props) {
  const locked = props.lockState;
  const dispatch = useDispatch();
  const hours = useSelector(selectHoursVisible);
  const incrementsPerHour = useSelector(selectIncrementsPerHour);
  const blocks = useSelector(selectBlocks(props.whichSchedule));
  const percents = useSelector(selectSizes(props.whichSchedule));

  const [openDialog, setOpenDialog] = useState(null);

  const [renameDialogOpen, setRenameDialogOpen] = useState(false);
  const [colorDialogOpen, setColorDialogOpen] = useState(false);
  const [selectedBlock, setSelectedBlock] = useState({
    which: null,
    index: null,
  });

  function handleRenameCommit(newLabel) {
    var payload = {};
    for (var k in selectedBlock) payload[k] = selectedBlock[k];
    payload["value"] = newLabel;
    console.log(payload);
    dispatch(updateLabel(payload));
  }

  const handleRenameDialogClose = () => {
    console.log(renameDialogOpen);
    console.log(colorDialogOpen);
    setRenameDialogOpen(false);
  };

  function handleColorCommit(newColor) {
    var payload = {};
    for (var k in selectedBlock) payload[k] = selectedBlock[k];
    payload["value"] = newColor;
    console.log(payload);
    dispatch(updateColor(payload));
  }

  const handleColorDialogClose = () => {
    setColorDialogOpen(false);
  };

  const [contextMenu, setContextMenu] = useState(null);
  const [contextIndex, setContextIndex] = useState(null);

  const handleContextMenu = (event, idx) => {
    event.preventDefault();
    setContextIndex(idx);
    console.log(idx);
    setContextMenu(
      contextMenu === null
        ? {
            mouseX: event.clientX - 2,
            mouseY: event.clientY - 4,
          }
        : // repeated contextmenu when it is already open closes it with Chrome 84 on Ubuntu
          // Other native context menus might behave different.
          // With this behavior we prevent contextmenu from the backdrop to re-locale existing context menus.
          null
    );
  };

  const handleClose = (action) => {
    if (contextIndex !== null) {
      const i = contextIndex;
      const which = props.whichSchedule;
      switch (action) {
        case "delete":
          dispatchDelete(which, i);
          break;
        case "split":
          dispatchSplit(which, i);
          break;
        case "rename":
          setSelectedBlock({ which: which, index: i });
          setOpenDialog(action);
        case "colorize":
          setSelectedBlock({ which: which, index: i });
          setOpenDialog(action);
        default:
          break;
      }
    }
    setContextMenu(null);
  };

  function dispatchDelete(schedule, index) {
    if (percents.length === 0) {
      return;
    }
    dispatch(
      deleteBlock({
        which: schedule,
        index: index,
      })
    );
  }

  function dispatchSplit(schedule, index) {
    if (blocks[index].duration === 1) {
      return;
    }
    dispatch(
      splitBlock({
        which: schedule,
        index: index,
      })
    );
  }

  // const handleItemClick = ({ event, props }) => {
  //   switch (event.currentTarget.id) {
  //     case "delete":
  //       dispatchDelete(props.which, props.index);
  //       break;
  //     case "split":
  //       dispatchSplit(props.which, props.index);
  //       console.log("yay slpit");
  //       break;
  //     case "steal":
  //       break;
  //     case "rename":
  //       setSelectedBlock({ which: props.which, index: props.index });
  //       setRenameDialogOpen(true);
  //     default:
  //       break;
  //   }
  // };
  function onDragEnd(result) {
    if (!result.destination) {
      return;
    }
    if (result.destination.index === result.source.index) {
      return;
    }
    dispatch(
      reorderSchedule({
        which: props.whichSchedule,
        move: [result.source.index, result.destination.index],
      })
    );
  }
  function BoxContent(props) {
    const contrastNeexs = props.color.l / 2 > 30;
    const palette = {
      textColor: props.color.l / 2 > 30 ? "black" : "white",
      contrastColor: hslString(props.color.h, props.color.s, props.color.l / 2),
    };

    function Text() {
      return (
        <Typography
          hidden={props.length < 2}
          id="desc"
          sx={{
            fontSize: "14px",
            color: palette.textColor,
            overflow: "hidden",
            fontWeight: 400,
            width: "max-content",
            px: 0.75,
            py: 0.25,
            m: 0.75,
            position: "absolute",
            bgcolor: palette.contrastColor,
            borderRadius: "8px",
            border: 1,
            borderColor: "black",
            // display: { xs: "none", sm: "block" },
          }}
        >
          {props.data.description}
        </Typography>
      );
    }
    function Backdrop(props) {
      function MeteredBlock() {
        return (
          <Stack
            direction="column"
            sx={{
              width: 1,
              height: 1,
              position: "absolute",
            }}
          >
            {[...Array(props.length)].map((e, i) => {
              const heightRatio = 1 / props.length;
              const first = i === 0;
              return (
                <Box
                  borderTop={first ? 0 : 1}
                  borderStyle="dotted"
                  borderColor="black"
                  sx={{
                    width: 1,
                    height: heightRatio,
                    borderStyle: "dotted",
                  }}
                />
              );
            })}
          </Stack>
        );
      }

      return <MeteredBlock />;
    }
    return (
      <Stack
        direction="row"
        sx={{
          width: "100%",
          height: "100%",
        }}
      >
        <ColorDialog
          open={openDialog === "colorize"}
          handleClose={() => setOpenDialog(null)}
          onCommit={handleColorCommit}
        />

        <Stack
          direction="column"
          sx={{
            width: 1,
            position: "relative",
          }}
        >
          <RenameDialog
            open={openDialog === "rename"}
            handleClose={() => setOpenDialog(null)}
            onCommit={handleRenameCommit}
          />
          <Backdrop length={props.length} />
        </Stack>
        <Text />
      </Stack>
    );
  }

  function numBoxes(string) {
    const howMany = incrementsPerHour * hours;
    return string ? Number(howMany).toString() : howMany;
  }

  const oneBox = (elem, idx) => {
    const colorString = hslString.apply(null, Object.values(elem.color));
    // const contrastColorString = (ratio) => {
    //   var newColor = {};
    //   Object.assign(newColor, elem.color);
    //   newColor.l *= ratio;
    //   return hslString.apply(null, Object.values(newColor));
    // };
    // const lighterColorString = (l) => {
    //   var newColor = {};
    //   Object.assign(newColor, elem.color);
    //   newColor.l = l;
    //   return hslString.apply(null, Object.values(newColor));
    // };

    return (
      <Draggable
        key={uuidv4()}
        draggableId={Number(idx).toString()}
        index={idx}
        isDragDisabled={locked}
      >
        {(provided2) => (
          <Tooltip title={elem.description}>
            <Box
              ref={provided2.innerRef}
              {...provided2.draggableProps}
              {...provided2.dragHandleProps}
              id="timecell"
              border={1}
              borderColor="black"
              // borderColor="var(--spotify-5)"
              sx={{
                bgcolor: colorString,
                m: "1px",
                height:
                  "calc(100% / " +
                  numBoxes(true) +
                  " * " +
                  Number(elem.duration).toString() +
                  " - 2px)",
              }}
              onContextMenu={(event) => handleContextMenu(event, idx)}
            >
              <BoxContent
                data={elem}
                length={elem.duration}
                color={elem.color}
              />
              <Menu
                open={contextMenu !== null}
                onClose={handleClose}
                anchorReference="anchorPosition"
                anchorPosition={
                  contextMenu !== null
                    ? { top: contextMenu.mouseY, left: contextMenu.mouseX }
                    : undefined
                }
              >
                <MenuItem onClick={() => handleClose("rename")}>
                  Rename
                </MenuItem>
                <MenuItem onClick={() => handleClose("split")}>Split</MenuItem>
                <MenuItem onClick={() => handleClose("delete")}>
                  Delete
                </MenuItem>
                <MenuItem onClick={() => handleClose("colorize")}>
                  Change Color
                </MenuItem>
              </Menu>
            </Box>
          </Tooltip>
        )}
      </Draggable>
    );
  };
  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Droppable droppableId={props.whichSchedule}>
        {(provided) => (
          <Stack
            ref={provided.innerRef}
            {...provided.droppableProps}
            sx={{ width: 1 }}
            minHeight={1}
            direction="column"
            alignItems="stretch"
          >
            {blocks.map(oneBox)}
          </Stack>
        )}
      </Droppable>
    </DragDropContext>
  );
}

export function hslString(h, s, l) {
  var toRet = "hsl(";
  toRet += h + ",";
  toRet += s + "%,";
  toRet += l + "%)";
  return toRet;
}
