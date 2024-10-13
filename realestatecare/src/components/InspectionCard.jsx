import { Card, CardContent, Grid2, Stack } from "@mui/material";
import PropTypes from "prop-types";
import { Inspection } from "../models/inspection";
import { Link } from "react-router-dom";

export default function InspectionCard({ inspection }) {
  return (
    <Grid2 size={4}>
      <Card>
        <CardContent>
          <Stack spacing={2}>
            <h2>#{inspection.id}</h2>

            <Stack spacing={1}>
              <span>{inspection.address}</span>
              <span>
                {inspection.postalCode} {inspection.city}
              </span>
            </Stack>
            <Link to={`/details/${inspection.id}`}>View details</Link>
          </Stack>
        </CardContent>
      </Card>
    </Grid2>
  );
}

InspectionCard.propTypes = {
  inspection: PropTypes.instanceOf(Inspection),
};
