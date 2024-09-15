import EventNoteOutlinedIcon from '@mui/icons-material/EventNoteOutlined';
import CheckCircleOutlineOutlinedIcon from '@mui/icons-material/CheckCircleOutlineOutlined';
import StorageOutlinedIcon from '@mui/icons-material/StorageOutlined';
import SettingsIcon from '@mui/icons-material/SettingsRounded';
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';

export default function DashboardCard({url, icon}) {
    return (
      <a href={url}><div class="DashboardCard"><CardIcon icon={icon}/></div></a>

    )
};


const CardIcon = ({icon}) => {
    switch (icon) {
        case 'Schedule':
            return <div><EventNoteOutlinedIcon/><p>Scheduled</p></div>;
            break;
        case 'Completed':
            return <div><CheckCircleOutlineOutlinedIcon/><p>Completed</p></div>;
            break;
        case 'KnowledgeBase':
            return <div><StorageOutlinedIcon/><p>Knowledge base</p></div>;
            break;
        case 'Settings':
            return <div><SettingsOutlinedIcon/><p>Settings</p></div>;
            break;
        default:
            break;
    }
}

