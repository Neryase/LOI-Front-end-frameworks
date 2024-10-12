import EventNoteOutlinedIcon from "@mui/icons-material/EventNoteOutlined";
import CheckCircleOutlineOutlinedIcon from "@mui/icons-material/CheckCircleOutlineOutlined";
import StorageOutlinedIcon from "@mui/icons-material/StorageOutlined";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import PropTypes from "prop-types";

export default function DashboardCard({ url, icon }) {
  return (
    <a href={url}>
      <div className="DashboardCard">
        <CardIcon icon={icon} />
      </div>
    </a>
  );
}

DashboardCard.propTypes = {
  url: PropTypes.string,
  icon: PropTypes.string,
};

const CardIcon = ({ icon }) => {
  switch (icon) {
    case "Schedule":
      return (
        <div>
          <EventNoteOutlinedIcon />
          <p>Scheduled</p>
        </div>
      );
    case "Completed":
      return (
        <div>
          <CheckCircleOutlineOutlinedIcon />
          <p>Completed</p>
        </div>
      );
    case "KnowledgeBase":
      return (
        <div>
          <StorageOutlinedIcon />
          <p>Knowledge base</p>
        </div>
      );
    case "Settings":
      return (
        <div>
          <SettingsOutlinedIcon />
          <p>Settings</p>
        </div>
      );
    default:
      break;
  }
};

CardIcon.propTypes = {
  icon: PropTypes.string,
};
