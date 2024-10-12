import { Stack } from "@mui/material";
import InspectionRow from "../components/InspectionRow";
import { InspectionService } from "../services/inspection.service";
import { useServiceHook } from "../services/serviceHook";

export default function InspectionsOverview() {
  const [data, loading] = useServiceHook(
    async () => await new InspectionService().getAll(),
  );

  if (loading) return <h1>Loading...</h1>;

  return (
    <Stack style={{ width: "100%" }}>
      <h1>Planned inspections</h1>
      <div className="tiles">
        {data.map((d, i) => (
          <InspectionRow key={i} inspection={d} />
        ))}
      </div>
    </Stack>
  );
}
