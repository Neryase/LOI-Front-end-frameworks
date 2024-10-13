import { Card, CardContent, Grid2, Stack } from "@mui/material";
import PropTypes from "prop-types";
import { Task } from "../models/task.model";

export default function OpenTask({ task }) {
  return (
    <Grid2 size={4}>
      <Card>
        <CardContent>
          <Stack spacing={4}>
            <h3>{task.type}</h3>
            <Stack spacing={1}>
              <span className="field-title">Action required?</span>
              <span>Yes</span>
            </Stack>

            <Stack spacing={1}>
              <span className="field-title">Reported by</span>
              <span>{task.reportedBy}</span>
            </Stack>

            <Stack spacing={1}>
              <span className="field-title">Location</span>
              <span>{task.location}</span>
            </Stack>

            <Stack spacing={1}>
              <span className="field-title">Date</span>
              <span>{new Date(task.date).toLocaleDateString()}</span>
            </Stack>

            <Stack spacing={1}>
              <span className="field-title">Description</span>
              <p>{task.description}</p>
            </Stack>
          </Stack>
        </CardContent>
      </Card>
    </Grid2>
  );
}

OpenTask.propTypes = {
  task: PropTypes.instanceOf(Task).isRequired,
};
