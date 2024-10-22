import { Button, Card, CardContent, Stack, TextField } from "@mui/material";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const navigate = useNavigate();
  const [user, setUser] = useState({
    username: "",
    password: "",
    code: "",
    state: "initial",
  });

  function to2fa() {
    if (!user.username || !user.password) return;
    setUser({ ...user, state: "2fa" });
  }

  function submit() {
    if (!user.code) return;
    localStorage.setItem("user", JSON.stringify(user));
    navigate("/");
  }

  return (
    <Card>
      <CardContent>
        <h1>Login</h1>
        {user.state === "initial" && (
          <Stack spacing={2}>
            <TextField
              label="Username"
              value={user.username}
              onChange={(event) => {
                setUser({ ...user, username: event.target.value });
              }}
            />
            <TextField
              label="Password"
              type="password"
              value={user.password}
              onChange={(event) => {
                setUser({ ...user, password: event.target.value });
              }}
            />
            <Button onClick={to2fa}>Submit</Button>
          </Stack>
        )}
        {user.state === "2fa" && (
          <Stack spacing={2}>
            <TextField
              label="Google Authenticator code"
              value={user.code}
              onChange={(event) => {
                setUser({ ...user, code: event.target.value });
              }}
            />

            <Button onClick={submit}>Login</Button>
          </Stack>
        )}
      </CardContent>
    </Card>
  );
}
