import { verticalSizes } from "../../app/App";
import { Button } from "@mui/material";
import { overwritePage } from "../../sessiondata/pageSlice";
import { store } from "../../app/store";

import { IconButton } from "@mui/material";
import UploadIcon from "@mui/icons-material/Upload";
import DownloadIcon from "@mui/icons-material/Download";
import ClearIcon from "@mui/icons-material/Clear";
import { Tooltip } from "@mui/material/";

export function LoadLocallyButton() {
  function loadLocally() {
    const saved = JSON.parse(localStorage.getItem("page"));
    console.log(saved);
    if (saved) {
      store.dispatch(overwritePage(saved));
    }
  }
  return (
    <Tooltip title="View saved schedule">
      <IconButton aria-label="load" onClick={loadLocally}>
        <UploadIcon />
      </IconButton>
    </Tooltip>
  );
}

export function SaveLocallyButton() {
  function saveLocally() {
    const json = store.getState().page;
    localStorage.setItem("page", JSON.stringify(json));

    return;
  }
  return (
    <Tooltip title="Save this schedule to my browser">
      <IconButton aria-label="save" onClick={saveLocally}>
        <DownloadIcon />
      </IconButton>
    </Tooltip>
  );
}

export function RemoveBrowserStorageButton() {
  function clear() {
    const json = store.getState().page;
    localStorage.removeItem("page");
    return;
  }
  return (
    <Tooltip title="Clear my browser storage">
      <IconButton aria-label="clear" onClick={clear}>
        <ClearIcon />
      </IconButton>
    </Tooltip>
  );
}
