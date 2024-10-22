import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import {
  FormControl,
  FormControlLabel,
  FormLabel,
  InputLabel,
  MenuItem,
  Radio,
  RadioGroup,
  Select,
  Stack,
  TextField,
} from "@mui/material";
import { useState } from "react";
import PropTypes from "prop-types";
import { useObjectiveStore } from "../stores/useObjectiveStore";

const INIT = { status: "open" };

export default function NewObjectiveDialog({ open, onClose, id }) {
  const add = useObjectiveStore((state) => state.add);
  const loading = useObjectiveStore((state) => state.loading);
  const [item, setItem] = useState({ ...INIT, installationId: id });
  const [errors, setErrors] = useState({});
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("sm"));

  async function handleSubmit() {
    if (!item.type) {
      setErrors({ type: "Required" });
      return;
    }

    if (!item.location) {
      setErrors({ location: "Required" });
      return;
    }

    await add(item);
    setItem({ ...INIT, installationId: id });
    setErrors({});
    onClose();
  }

  return (
    <Dialog fullScreen={fullScreen} open={open} onClose={onClose}>
      <DialogTitle id="alert-dialog-title">Objective details</DialogTitle>
      <DialogContent>
        <Stack spacing={2} style={{ minWidth: "15rem" }}>
          {loading ? "LOADING" : ""}
          <FormControl fullWidth>
            <InputLabel id="type-of-damage-label">Type of objective</InputLabel>
            <Select
              error={errors.type}
              labelId="type-of-damage-label"
              id="type-of-damage"
              label="Type of objective"
              value={item.type || ""}
              onChange={(e) => setItem({ ...item, type: e.target.value })}
            >
              <MenuItem value="damage">Damage</MenuItem>
              <MenuItem value="maintenance">Maintenance</MenuItem>
              <MenuItem value="installation">Installation</MenuItem>
              <MenuItem value="modification">Modification</MenuItem>
            </Select>
          </FormControl>

          <TextField
            error={errors.location}
            label="Location"
            helperText={errors.location ? "Required" : ""}
            value={item.location || ""}
            onChange={(event) => {
              setItem({ ...item, location: event.target.value });
            }}
          />

          {item.type === "damage" && (
            <FormControl fullWidth>
              <InputLabel id="type-of-damage-label">Type of Damage</InputLabel>
              <Select
                labelId="type-of-damage-label"
                id="type-of-damage"
                label="Type of damage"
                value={item.typeOfDamage || ""}
                onChange={(e) =>
                  setItem({ ...item, typeOfDamage: e.target.value })
                }
              >
                <MenuItem value="moedwillig">Moedwillig</MenuItem>
                <MenuItem value="slijtage">Slijtage</MenuItem>
                <MenuItem value="geweld">Geweld</MenuItem>
                <MenuItem value="normaal gebruik">Normaal gebruik</MenuItem>
                <MenuItem value="calamiteit">Calamiteit</MenuItem>
                <MenuItem value="anders">Anders</MenuItem>
              </Select>
            </FormControl>
          )}

          {item.type === "maintenance" && (
            <FormControl fullWidth>
              <InputLabel id="type-of-maintenance-label">
                Type of maintenance
              </InputLabel>
              <Select
                labelId="type-of-maintenance-label"
                label="Type of maintenance"
                value={item.typeOfMaintenance || ""}
                onChange={(e) =>
                  setItem({ ...item, typeOfMaintenance: e.target.value })
                }
              >
                <MenuItem value="schilderwerk">Schilderwerk</MenuItem>
                <MenuItem value="houtrot">Houtrot</MenuItem>
                <MenuItem value="elektra">Elektra</MenuItem>
                <MenuItem value="leidingwerk">Leidingwerk</MenuItem>
                <MenuItem value="beglazing">Beglazing</MenuItem>
              </Select>
            </FormControl>
          )}

          {item.type === "installation" && (
            <FormControl fullWidth>
              <InputLabel id="type-of-installation-label">
                Type of installation
              </InputLabel>
              <Select
                labelId="type-of-installation-label"
                label="Type of installation"
                value={item.typeOfInstallation || ""}
                onChange={(e) =>
                  setItem({ ...item, typeOfInstallation: e.target.value })
                }
              >
                <MenuItem value="koeling">Koeling</MenuItem>
                <MenuItem value="verwarming">Verwarming</MenuItem>
                <MenuItem value="luchtverversing">Luchtverversing</MenuItem>
              </Select>
            </FormControl>
          )}

          {item.type === "damage" && (
            <FormControl>
              <FormLabel id="demo-controlled-radio-buttons-group">
                New damage
              </FormLabel>
              <RadioGroup
                aria-labelledby="demo-controlled-radio-buttons-group"
                name="controlled-radio-buttons-group"
                value={item.newDamage || ""}
                onChange={(e) =>
                  setItem({ ...item, newDamage: e.target.value })
                }
              >
                <FormControlLabel value="yes" control={<Radio />} label="Yes" />
                <FormControlLabel value="no" control={<Radio />} label="No" />
              </RadioGroup>
            </FormControl>
          )}

          {(item.type === "maintenance" || item.type === "damage") && (
            <FormControl>
              <FormLabel id="demo-controlled-radio-buttons-group">
                Immediate action required
              </FormLabel>
              <RadioGroup
                aria-labelledby="demo-controlled-radio-buttons-group"
                name="controlled-radio-buttons-group"
                value={item.immediateActionRequired || ""}
                onChange={(e) =>
                  setItem({
                    ...item,
                    immediateActionRequired: e.target.value,
                  })
                }
              >
                <FormControlLabel value="yes" control={<Radio />} label="Yes" />
                <FormControlLabel value="no" control={<Radio />} label="No" />
              </RadioGroup>
            </FormControl>
          )}

          {item.type === "modification" && (
            <FormControl fullWidth>
              <InputLabel id="type-of-executed-label">Executed by</InputLabel>
              <Select
                labelId="type-of-executed-label"
                label="Executed by"
                value={item.executedBy || ""}
                onChange={(e) =>
                  setItem({ ...item, executedBy: e.target.value })
                }
              >
                <MenuItem value="huurder">Huurder</MenuItem>
                <MenuItem value="aannemer">Aannemer</MenuItem>
                <MenuItem value="onbekend">Onbekend</MenuItem>
              </Select>
            </FormControl>
          )}

          {item.type === "modification" && (
            <FormControl fullWidth>
              <InputLabel id="type-of-action-label">Type of action</InputLabel>
              <Select
                labelId="type-of-action-label"
                label="Type of action"
                value={item.action || ""}
                onChange={(e) => setItem({ ...item, action: e.target.value })}
              >
                <MenuItem value="accepteren">Accepteren</MenuItem>
                <MenuItem value="keuren">Laten keuren</MenuItem>
                <MenuItem value="verwijderen">Laten verwijderen</MenuItem>
                <MenuItem value="aanpassen">Laten aanpassen en keuren</MenuItem>
              </Select>
            </FormControl>
          )}

          {item.type === "installation" && (
            <FormControl>
              <FormLabel id="demo-controlled-radio-buttons-group">
                Approved
              </FormLabel>
              <RadioGroup
                aria-labelledby="demo-controlled-radio-buttons-group"
                name="controlled-radio-buttons-group"
                value={item.approved || ""}
                onChange={(e) => setItem({ ...item, approved: e.target.value })}
              >
                <FormControlLabel value="yes" control={<Radio />} label="Yes" />
                <FormControlLabel value="no" control={<Radio />} label="No" />
              </RadioGroup>
            </FormControl>
          )}

          {item.type === "installation" && (
            <TextField
              label="Reported malfunction"
              value={item.reportedMalfunctions || ""}
              onChange={(event) => {
                setItem({
                  ...item,
                  reportedMalfunctions: event.target.value,
                });
              }}
            />
          )}

          <TextField
            label="Description"
            value={item.description || ""}
            onChange={(event) => {
              setItem({ ...item, description: event.target.value });
            }}
          />

          {item.type === "installation" && (
            <Stack spacing={1}>
              <span className="field-title">Test procedure</span>
              <a href="https://test.com">Click here</a>
            </Stack>
          )}

          {item.type === "modification" && (
            <Stack spacing={1}>
              <span className="field-title">Situation report</span>
              <a href="https://test.com">Click here</a>
            </Stack>
          )}
        </Stack>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleSubmit} disabled={loading}>
          Submit
        </Button>
        <Button onClick={onClose} autoFocus>
          Cancel
        </Button>
      </DialogActions>
    </Dialog>
  );
}

NewObjectiveDialog.propTypes = {
  open: PropTypes.bool,
  onClose: PropTypes.func,
  id: PropTypes.string,
};
