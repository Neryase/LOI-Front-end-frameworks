import { Stack } from "@mui/material";
import { useParams } from "react-router-dom";
import { useInspectionStore } from "../stores/useInspectionStore";
import { useGetObjectivesForInspection } from "../stores/useObjectiveStore";

export default function InspectionsDetails() {
  const { id } = useParams();
  const inspection = useInspectionStore((state) =>
    state.inspections.find((i) => i.id === id),
  );

  const [objectives, loading] = useGetObjectivesForInspection(id);

  if (loading) return <h1>Loading...</h1>;

  console.log(objectives);

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
    </Stack>
  );
}
