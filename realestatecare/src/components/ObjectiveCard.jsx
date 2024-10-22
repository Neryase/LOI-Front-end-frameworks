import PropTypes from "prop-types";
import { Inspection } from "../models/inspection";
import { Objective } from "../models/objective";
import { Card, CardContent, Chip, Stack } from "@mui/material";
import ObjectiveDialog from "./ObjectiveDialog";
import { useState } from "react";

export default function ObjectiveCard({ objective }) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Card
        onClick={() => setOpen(true)}
        className="clickable"
        role="button"
        aria-label={`Clickable card to open de dialog to update the details of objective ${objective.id}`}
        tabIndex={0}
      >
        <CardContent>
          <Stack spacing={2}>
            <Stack spacing={2} direction={"row"}>
              <Chip label={objective.type} />
              <Chip
                label={objective.status}
                color={objective.status === "closed" ? "success" : "primary"}
              />
            </Stack>

            <Stack spacing={1}>
              <span className="field-title">Location</span>
              <span>{objective.location}</span>
            </Stack>
          </Stack>
        </CardContent>
      </Card>
      <ObjectiveDialog
        open={open}
        onClose={() => setOpen(false)}
        objective={objective}
      ></ObjectiveDialog>
    </>
  );
}

ObjectiveCard.propTypes = {
  objective: PropTypes.instanceOf(Objective),
  inspection: PropTypes.instanceOf(Inspection),
};
