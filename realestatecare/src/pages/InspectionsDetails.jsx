import { Stack } from "@mui/material";
import { useParams } from "react-router-dom";
import data from "../assets/db.json";
import OpenTask from "../components/OpenTask";
import { Task } from "../models/Task";
import { Inspection } from "../models/Inspection";

export default function InspectionsDetails() {
  const { id } = useParams();

  const inspection = new Inspection(
    data.inspections.find((d) => d.taskId === id),
  );
  const tasks = data.tasks
    .filter((t) => t.inspectionId === id)
    .map((t) => new Task(t));

  return (
    <Stack spacing={4} style={{ width: "100%" }}>
      <h1>Inspections of: #{id}</h1>

      <Stack spacing={1}>
        <h2>Address</h2>
        <span>{inspection?.address}</span>
        <span>
          {inspection?.postalCode} {inspection?.city}
        </span>
      </Stack>
      <h2>Open tasks (#{tasks.length})</h2>
      <div className="tiles">
        {tasks.map((t, i) => (
          <OpenTask key={i} task={t} />
        ))}
      </div>
    </Stack>
  );
}
