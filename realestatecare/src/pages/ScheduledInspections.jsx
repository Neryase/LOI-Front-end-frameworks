import { Stack } from "@mui/material";
import InspectionCard from "../components/InspectionCard";
import { useGetInspections } from "../stores/useInspectionStore";

export default function ScheduledInspectionsOverview() {
  const [inspections, loading] = useGetInspections();
  const _inspections = inspections.filter((i) => i.status === "planned");

  if (loading) return <h1>Loading...</h1>;

  return (
    <Stack style={{ width: "100%" }}>
      <h1>Scheduled inspections</h1>
      <div className="tiles">
        {_inspections.map((d, i) => (
          <InspectionCard key={i} inspection={d} />
        ))}
      </div>
    </Stack>
  );
}
