import * as React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { useState } from "react";

export function RenameDialog(props) {
  const [text, setText] = useState("");
  const [error, setError] = useState(true);
  function handleTextChange(event) {
    setText(event.target.value.trim());
    if (event.target.value.trim() === "") {
      setError(true);
    } else {
      setError(false);
    }
  }
  return (
    <Dialog open={props.open} onClose={props.handleClose}>
      <DialogTitle>Update Label</DialogTitle>
      <DialogContent>
        <DialogContentText>
          Enter your new label and click update.
        </DialogContentText>
        <TextField
          error={error}
          helperText={
            error ? "The label cannot be blank" : "Click update to save"
          }
          autoFocus
          margin="dense"
          id="name"
          label="New Label"
          type="email"
          fullWidth
          variant="standard"
          value={text}
          onChange={handleTextChange}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={props.handleClose}>Cancel</Button>
        <Button
          disabled={error}
          onClick={() => {
            props.onCommit(text);
            props.handleClose();
          }}
        >
          Update
        </Button>
      </DialogActions>
    </Dialog>
  );
}
