import "./App.css";
/* images */
import realEstateCareLogo from "./assets/logocompletewhite.svg";

/* material-ui */
import Link from "@mui/material/Link";
import Badge from "@mui/material/Badge";

import SearchIcon from "@mui/icons-material/Search";
import SettingsIcon from "@mui/icons-material/SettingsRounded";
import BuildRoundedIcon from "@mui/icons-material/BuildRounded";
import MessageIcon from "@mui/icons-material/Message";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Dashboard from "./pages/Dashboard.jsx";
import Settings from "./pages/Settings.jsx";
import KnowledgeBase from "./pages/KnowledgeBase.jsx";
import ScheduledInspectionsOverview from "./pages/ScheduledInspections.jsx";
import FinishedInspectionsOverview from "./pages/FinishedInspections.jsx";
import InspectionsDetails from "./pages/InspectionsDetails.jsx";
import Login from "./pages/Login.jsx";
import PrivateRoute from "./components/PrivateRoute.jsx";
import { useSettings } from "./stores/useSettings.js";
import { ThemeProvider, createTheme } from "@mui/material/styles";

export default function App() {
  const darkmode = useSettings((state) => state.darkmode);

  // create a darkTheme function to handle dark theme using createTheme
  const darkTheme = createTheme({
    palette: {
      mode: darkmode ? "dark" : "light",
    },
  });

  return (
    <ThemeProvider theme={darkTheme}>
      <nav>
        <a href="/">
          <img src={realEstateCareLogo} />
        </a>
        <Link href="#">
          <Badge badgeContent={4} color="primary">
            <MessageIcon />
          </Badge>
        </Link>
        <Link href="#">
          <SettingsIcon />
        </Link>
      </nav>
      <main data-darkmode={darkmode}>
        <BrowserRouter>
          <Routes>
            <Route
              path="/"
              element={
                <PrivateRoute>
                  <Dashboard />
                </PrivateRoute>
              }
            />
            <Route path="/login" element={<Login />} />
            <Route
              path="/planned"
              element={
                <PrivateRoute>
                  <ScheduledInspectionsOverview />
                </PrivateRoute>
              }
            />
            <Route
              path="/finished"
              element={
                <PrivateRoute>
                  <FinishedInspectionsOverview />
                </PrivateRoute>
              }
            />
            <Route
              path="/settings"
              element={
                <PrivateRoute>
                  <Settings />
                </PrivateRoute>
              }
            />
            <Route
              path="/knowledgebase"
              element={
                <PrivateRoute>
                  <KnowledgeBase />
                </PrivateRoute>
              }
            />
            <Route
              path="/finished"
              element={
                <PrivateRoute>
                  <FinishedInspectionsOverview />
                </PrivateRoute>
              }
            />
            <Route
              path="/details/:id"
              element={
                <PrivateRoute>
                  <InspectionsDetails />
                </PrivateRoute>
              }
            />
          </Routes>
        </BrowserRouter>
      </main>
      <footer>
        <Link href="#">
          <BuildRoundedIcon />
        </Link>
        <Link href="#">
          <SearchIcon />
        </Link>
        <Link href="#">
          <AccountCircleIcon />
        </Link>
      </footer>
    </ThemeProvider>
  );
}
