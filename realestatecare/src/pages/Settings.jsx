import {
  Button,
  FormControl,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
  Stack,
  TextField,
} from "@mui/material";
import { useEffect, useState } from "react";
import { useSettings } from "../stores/useSettings";
import { useNavigate } from "react-router-dom";

export default function Settings() {
  const navigate = useNavigate();
  const darkmode = useSettings((state) => state.darkmode);
  const updateDarkmode = useSettings((state) => state.updateDarkmode);
  const [user, setUser] = useState({
    firstname: "John",
    lastname: "Doe",
    username: "",
    notifications: "yes",
    darkmode: darkmode ? "yes" : "no",
  });

  useEffect(() => {
    const _user = JSON.parse(localStorage.getItem("user"));
    setUser({ ...user, username: _user.username });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function handleDarkmode(e) {
    const value = e.target.value;
    localStorage.setItem("darkmode", value);
    updateDarkmode(value);
    setUser({ ...user, darkmode: value });
  }

  function logout() {
    localStorage.clear();
    updateDarkmode("no");
    navigate("/login");
  }

  return (
    <Stack spacing={2}>
      <h1>Settings</h1>
      <TextField
        label="First name"
        value={user.firstname}
        onChange={(event) => {
          setUser({ ...user, firstname: event.target.value });
        }}
      />
      <TextField
        label="Last name"
        value={user.lastname}
        onChange={(event) => {
          setUser({ ...user, lastname: event.target.value });
        }}
      />
      <TextField
        label="Username"
        value={user.username}
        onChange={(event) => {
          setUser({ ...user, username: event.target.value });
        }}
      />
      <FormControl>
        <FormLabel id="demo-controlled-radio-buttons-group">
          Receive notifications?
        </FormLabel>
        <RadioGroup
          aria-labelledby="demo-controlled-radio-buttons-group"
          name="controlled-radio-buttons-group"
          value={user.notifications}
          onChange={(e) => setUser({ ...user, notifications: e.target.value })}
        >
          <FormControlLabel value="yes" control={<Radio />} label="Yes" />
          <FormControlLabel value="no" control={<Radio />} label="No" />
        </RadioGroup>
      </FormControl>

      <FormControl>
        <FormLabel id="demo-controlled-radio-buttons-group">Darkmode</FormLabel>
        <RadioGroup
          aria-labelledby="demo-controlled-radio-buttons-group"
          name="controlled-radio-buttons-group"
          value={user.darkmode}
          onChange={handleDarkmode}
        >
          <FormControlLabel value="yes" control={<Radio />} label="Yes" />
          <FormControlLabel value="no" control={<Radio />} label="No" />
        </RadioGroup>
      </FormControl>
      <Button onClick={logout}>Logout</Button>
    </Stack>
  );
}
