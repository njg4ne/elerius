import * as React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { useState } from "react";
import { ColorPicker } from "material-ui-color";
export function ColorDialog(props) {
  const [color, setColor] = useState("purple");
  return (
    <Dialog
      open={props.open}
      onClose={props.handleClose}
      disableTextfield={true}
    >
      <DialogTitle>Update Color</DialogTitle>
      <DialogContent>
        <DialogContentText>Click the box to choose a color.</DialogContentText>
        <ColorPicker
          inputFormats={["hsl", "hex"]}
          disableAlpha={true}
          hideTextfield={true}
          value={color}
          onChange={(color) => setColor(color)}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={props.handleClose}>Cancel</Button>
        <Button
          disabled={color === "purple"}
          onClick={() => {
            var colorJSON = { h: 0, s: 0, l: 0 };
            console.log(color);
            colorJSON.h = color.hsl[0];
            colorJSON.s = color.hsl[1];
            colorJSON.l = color.hsl[2];
            props.onCommit(colorJSON);
            props.handleClose();
          }}
        >
          Update
        </Button>
      </DialogActions>
    </Dialog>
  );
}
