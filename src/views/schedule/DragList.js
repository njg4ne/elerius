import { useDispatch, useSelector } from "react-redux";
import calcBaseSize from "./calculator.js";
import {
  selectHoursVisible,
  selectIncrementsPerHour,
  selectBlocks,
  selectSizes,
  deleteBlock,
  reorderSchedule,
  splitBlock,
} from "../../features/pageSlice";
import { useState, useEffect } from "react";
import {
  Menu,
  Item,
  // Separator,
  // Submenu,
  // MenuProvider,
  useContextMenu,
} from "react-contexify";
import "react-contexify/dist/ReactContexify.css";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
//import Modal from "@mui/material/Modal";

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
  const [scale, setScale] = useState({
    base: calcBaseSize(hours, incrementsPerHour, window.innerHeight),
  });
  useEffect(() => {
    function handleResize() {
      setScale({
        base: calcBaseSize(hours, incrementsPerHour, window.innerHeight),
      });
    }
    window.addEventListener("resize", handleResize);
    return (_) => {
      window.removeEventListener("resize", handleResize);
    };
  });
  const BLOCKWISE_MODS = "blockwise_mods";
  const { show } = useContextMenu({
    id: BLOCKWISE_MODS,
  });

  function handleContextMenu(event, idx) {
    event.preventDefault();
    show(event, {
      props: {
        index: idx,
        which: props.whichSchedule,
      },
    });
  }

  function dispatchDelete(schedule, index) {
    if (percents.length === 1) {
      return;
    }
    dispatch(
      deleteBlock({
        which: schedule,
        index: index,
        sizes: percents,
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

  const handleItemClick = ({ event, props }) => {
    switch (event.currentTarget.id) {
      case "delete":
        dispatchDelete(props.which, props.index);
        break;
      case "split":
        dispatchSplit(props.which, props.index);
        console.log("yay slpit");
        break;
      case "steal":
        break;
      default:
        break;
    }
  };
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

  function BlockContent(props) {
    return (
      <div
        className={"border border-black flex flex-col " + props.color}
        style={{
          height: "100%",
          fontSize: "calc(1vh)",
        }}
      >
        <div className="bg-white px-1 m-auto rounded border border-black font-medium">
          {props.description}
        </div>
      </div>
    );
  }

  function Block(props) {
    return (
      <div
        style={{
          height:
            Number(
              ((scale.base * hours * incrementsPerHour) / 100) *
                parseFloat(percents[props.index])
            ).toString() + "px",
          fontSize: "calc(1vh)",
          minWidth: "20vw",
        }}
        onContextMenu={(event) => handleContextMenu(event, props.index)}
      >
        <BlockContent
          description={props.data.description}
          color={props.color}
        />
        <Menu id={BLOCKWISE_MODS}>
          <Item id="rename" onClick={console.log("clicked")}>
            Modify Description
          </Item>
          <Item id="delete" onClick={handleItemClick}>
            Delete
          </Item>
          <Item id="split" onClick={handleItemClick}>
            Split
          </Item>
          <Item id="steal" onClick={handleItemClick}>
            Add- steal from here
          </Item>
        </Menu>
      </div>
    );
  }
  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Droppable droppableId="list">
        {(provided) => (
          <div
            ref={provided.innerRef}
            {...provided.droppableProps}
            style={{
              height:
                Number(scale.base * hours * incrementsPerHour).toString() +
                "px",
            }}
          >
            {blocks.map((element, index) => {
              const colorClass = "bg-red-100";
              return (
                <Draggable
                  key={uuidv4()}
                  draggableId={Number(index).toString()}
                  index={index}
                  isDragDisabled={locked}
                >
                  {(provided2) => (
                    <div
                      ref={provided2.innerRef}
                      {...provided2.draggableProps}
                      {...provided2.dragHandleProps}
                    >
                      <Block data={element} index={index} color={colorClass} />
                    </div>
                  )}
                </Draggable>
              );
            })}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </DragDropContext>
  );
}
