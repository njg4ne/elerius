import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import { verticalSizes } from "../../app/App";
import {
  SaveLocallyButton,
  LoadLocallyButton,
  RemoveBrowserStorageButton,
} from "./BrowserStorageButtons";

import { useState } from "react";
import { HelpButton, HelpDialog } from "./Help";

export function ScheduleSaveControls() {
  const [helpDialogOpen, setHelpDialogOpen] = useState(false);
  return (
    <Stack direction="row" width="max-content" ml="auto">
      <SaveLocallyButton />
      <LoadLocallyButton />
      <RemoveBrowserStorageButton />
      <HelpButton onOpen={() => setHelpDialogOpen(true)} />
      <HelpDialog
        open={helpDialogOpen}
        onClose={() => setHelpDialogOpen(false)}
      />
    </Stack>
  );
}

export function NavBar() {
  return (
    <Paper
      id="mainnavbar"
      sx={{
        backgroundColor: "var(--spotify-3)",
        height: verticalSizes.nav,
      }}
      square={true}
      elevation={3}
    >
      <Stack
        direction="row"
        justifyContent="flex-start"
        alignItems="center"
        sx={{
          height: 1,
          px: "clamp(3mm, 2vw, 6mm)",
        }}
      >
        <Typography
          sx={{
            color: "white",
            fontSize: verticalSizes.navFont,
            fontWeight: 400,
            width: "max-content",
          }}
        >
          Block Scheduler
        </Typography>

        <ScheduleSaveControls />
      </Stack>
    </Paper>
  );
}
