import {
  CardHeader,
  CardMedia,
  CardContent,
  CardActionArea,
  Card,
  Box,
  Paper,
  Typography,
  Chip,
  Stack,
} from "@mui/material";
export function Project(props) {
  const url = "https://elerius.ga" + props.data.path;
  return (
    <Paper sx={{ p: 1.5, bgcolor: "inherit" }} elevation={1}>
      <Paper elevation={4} sx={{ width: "max-content", bgcolor: "inherit" }}>
        <CardActionArea href={url}>
          <Typography
            variant="h6"
            sx={{
              m: 1,
              mt: 0,
              py: 1,
              px: 0.75,
            }}
          >
            {props.data.title}
          </Typography>
        </CardActionArea>
      </Paper>
      <Typography sx={{ m: 1, mb: 0.5 }}>{props.data.subtitle}</Typography>
      <Box>
        {props.data.tags.map((l) => {
          return <Chip label={l} sx={{ m: 0.5 }} />;
        })}
      </Box>
    </Paper>
  );
}

export default function WorkPreview(props) {
  return (
    <Box sx={props.sx}>
      <Card elevation={4} sx={{ bgcolor: props.color }}>
        <Stack direction="row">
          <CardHeader
            title={props.name}
            sx={{ m: 2, mb: 1, p: 0 }}
          ></CardHeader>
          <Typography
            variant="h7"
            sx={{
              mt: 2.75,
              ml: 1,
            }}
          >
            Project Portfolio
          </Typography>
        </Stack>

        <Stack
          direction="column"
          justifyContent="flex-start"
          alignItems="stretch"
          spacing={2}
          sx={{ w: 1, p: 2 }}
        >
          {props.projects.map((proj) => {
            return <Project data={proj} />;
          })}
        </Stack>
      </Card>
    </Box>
  );
}
