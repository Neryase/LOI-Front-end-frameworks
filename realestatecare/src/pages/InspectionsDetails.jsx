import { Stack } from "@mui/material";
import { useParams } from "react-router-dom";
import OpenTask from "../components/OpenTask";
import { useServiceHook } from "../services/serviceHook";
import { InspectionService } from "../services/inspection.service";
import { TaskService } from "../services/task.service";

export default function InspectionsDetails() {
  const { id } = useParams();

  const [inspection, iLoading] = useServiceHook(
    async () => await new InspectionService().getById(id),
  );

  const [tasks, tLoading] = useServiceHook(
    async () => await new TaskService().getAllTasksForInspection(id),
  );

  if (iLoading || tLoading) return <h1>Loading...</h1>;

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
