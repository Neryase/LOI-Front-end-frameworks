import { Stack } from "@mui/material";
import data from "../assets/db.json";
import InspectionRow from "../components/InspectionRow";
import { Inspection } from "../models/Inspection";

const inspections = data.inspections.map((d) => new Inspection(d));

export default function InspectionsOverview() {
  return (
    <Stack style={{ width: "100%" }}>
      <h1>Planned inspections</h1>
      <div className="tiles">
        {inspections.map((d, i) => (
          <InspectionRow key={i} inspection={d} />
        ))}
      </div>
    </Stack>
  );
}
