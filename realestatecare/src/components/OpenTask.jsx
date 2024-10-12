import {
  Card,
  CardContent,
  FormControlLabel,
  FormLabel,
  Grid2,
  Radio,
  RadioGroup,
  Stack,
  TextareaAutosize,
  TextField,
} from "@mui/material";
import PropTypes from "prop-types";
import { Task } from "../models/Task";

export default function OpenTask({ task }) {
  return (
    <Grid2 size={4}>
      <Card>
        <CardContent>
          <Stack spacing={2}>
            <h3>{task.type}</h3>
            <FormLabel id="demo-radio-buttons-group-label">
              Action required?
            </FormLabel>
            <RadioGroup
              row
              aria-labelledby="demo-radio-buttons-group-label"
              defaultValue={task.actionRequired}
              name="radio-buttons-group"
              disabled
            >
              <FormControlLabel
                value="yes"
                control={<Radio disabled />}
                label="Yes"
              />
              <FormControlLabel
                value="no"
                control={<Radio disabled />}
                label="No"
              />
            </RadioGroup>

            <TextField
              id="standard-basic"
              label="Reported by"
              disabled
              defaultValue={task.reportedBy || "Tenant"}
            />

            <TextField
              id="standard-basic"
              label="Location"
              variant="standard"
              disabled
              defaultValue={task.location}
            />

            <TextField
              id="standard-basic"
              variant="standard"
              type="datetime-local"
              disabled
              defaultValue={task.date}
            />

            <TextareaAutosize minRows={5} defaultValue={task.description} />
          </Stack>
        </CardContent>
      </Card>
    </Grid2>
  );
}

OpenTask.propTypes = {
  task: PropTypes.instanceOf(Task).isRequired,
};
