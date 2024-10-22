import { Button, Card, CardContent, Chip, Stack } from "@mui/material";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useInspectionStore } from "../stores/useInspectionStore";
import { useGetObjectivesForInspection } from "../stores/useObjectiveStore";
import { useEffect, useState } from "react";
import ObjectiveCard from "../components/ObjectiveCard";
import NewObjectiveDialog from "../components/NewObjectiveDialog";

export default function InspectionsDetails() {
  const [open, setOpen] = useState(false);
  const { id } = useParams();
  const navigate = useNavigate();
  const inspection = useInspectionStore((state) =>
    state.inspections.find((i) => i.id === id),
  );
  const iLoading = useInspectionStore((state) => state.loading);
  const closeInspection = useInspectionStore((state) => state.closeInspection);

  // Redirect if inspection did not exist in the global store
  // Should only happen on hard refresh by user on the
  // detail page
  useEffect(() => {
    if (!inspection) navigate("/");
  }, [inspection, navigate]);

  const [objectives, loading] = useGetObjectivesForInspection(id);

  if (loading || !inspection) return <h1>Loading...</h1>;

  return (
    <Stack spacing={4} style={{ width: "100%" }}>
      <Link to={inspection.status === "finished" ? "/finished" : "/planned"}>
        Back to overview
      </Link>
      <Stack spacing={2}>
      <Stack
        direction={"row"}
        spacing={4}
        sx={{
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <h1>Inspections of: #{id}</h1>
        <Chip
          variant="filled"
          label={inspection?.status}
          color={inspection?.status === "finished" ? "success" : "primary"}
        />
        
      </Stack>
      {inspection?.status !== "finished" && (
          <Button
            onClick={() => closeInspection(inspection?.id)}
            disabled={iLoading}
          >
            Close the inspection
          </Button>
        )}
      </Stack>

      <Card>
        <CardContent>
          <Stack spacing={1}>
            <h2>Address</h2>
            <span>{inspection?.address}</span>
            <span>
              {inspection?.postalCode} {inspection?.city}
            </span>
          </Stack>
        </CardContent>
      </Card>
      <Stack direction="row" spacing={4}>
        <h2>Inspection objectives</h2>
        {inspection.status === "planned" && (
          <Button onClick={() => setOpen(true)}>Add new objective</Button>
        )}
      </Stack>
      <div className="tiles">
        {objectives.map((o, i) => (
          <ObjectiveCard key={i} inspection={inspection} objective={o} />
        ))}
      </div>
      <NewObjectiveDialog
        open={open}
        onClose={() => setOpen(false)}
        id={inspection?.id}
      />
    </Stack>
  );
}
