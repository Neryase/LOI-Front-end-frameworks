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
import InspectionsOverview from "./pages/InspectionsOverview.jsx";
import InspectionsDetails from "./pages/InspectionsDetails.jsx";

export default function App() {
  return (
    <>
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
      <main>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/planned" element={<InspectionsOverview />} />
            <Route path="/details/:id" element={<InspectionsDetails />} />
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
    </>
  );
}
