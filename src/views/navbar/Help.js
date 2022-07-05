import { verticalSizes } from "../../app/App";

import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { IconButton } from "@mui/material";
import InfoIcon from "@mui/icons-material/Info";
import { Tooltip } from "@mui/material/";

export function HelpButton(props) {
  return (
    <Tooltip title="Instructions">
      <IconButton onClick={props.onOpen} aria-label="help">
        <InfoIcon />
      </IconButton>
    </Tooltip>
  );
}

export function HelpDialog(props) {
  return (
    <Dialog
      open={props.open}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">
        {"Saving Your Schedule"}
      </DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          The save button saves the schedule you see to your browser's local
          storage. When you come back in the future, use the load button to load
          that schedule. To clear the schedule saved in your browser, use the
          clear button.
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={props.onClose}>got it!</Button>
      </DialogActions>
    </Dialog>
  );
}
