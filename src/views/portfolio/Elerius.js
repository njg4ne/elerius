import {
  CardHeader,
  CardMedia,
  CardContent,
  Card,
  Box,
  Paper,
  Typography,
  Chip,
  Stack,
} from "@mui/material";

import { projectData } from "../home/Previews/projectData.js";
import WorkPreview from "../home/Previews/WorkPreview";
import { Project } from "../home/Previews/WorkPreview";

export default function EleriusProject(props) {
  return (
    <Box sx={{ m: 2 }}>
      <Card elevation={4}>
        <Stack
          direction="column"
          justifyContent="flex-start"
          alignItems="stretch"
          spacing={2}
          sx={{ w: 1, p: 2 }}
        >
          <Project data={projectData[2].projects[0]} />
        </Stack>
        <Paper sx={{ p: 1.5, m: 2 }} elevation={1}>
          <Typography variant="h6" sx={{ m: 1, mb: 0.5 }}>
            Overview
          </Typography>
          <Typography sx={{ m: 1, mb: 0.5 }}>
            You are currently accessing www.elerius.ga, a public website hosted
            by Nicholas Gardella. Originally written using Angular, Elerius has
            been fully converted to React.js.
          </Typography>
          <Typography variant="h6" sx={{ m: 1, mb: 0.5 }}>
            Construction
          </Typography>
          <Typography sx={{ m: 1, mb: 0.5 }}>
            Elerius GA is built using nginx and is containerized using Docker.
            Reverse proxying protects the server from attacks and HTTPS security
            is enforced end-to-end.
          </Typography>
          <Typography variant="h6" sx={{ m: 1, mb: 0.5 }}>
            Purpose
          </Typography>
          <Typography sx={{ m: 1, mb: 0.5 }}>
            This application provides a location for publicly accessible tools
            produced by Nicholas Gardella. Additionally, you can peruse other
            work products not related to web development.
          </Typography>
        </Paper>
      </Card>
    </Box>
  );
}
