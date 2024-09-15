import { useState } from 'react'
import './App.css'
/* images */
import realEstateCareLogo from './assets/logocompletewhite.svg'

/*components */
import DashboardCard from './dashboardcard.jsx';

/* material-ui */
import Link from '@mui/material/Link';
import Badge from '@mui/material/Badge';

import SearchIcon from '@mui/icons-material/Search';
import SettingsIcon from '@mui/icons-material/SettingsRounded';
import BuildRoundedIcon from '@mui/icons-material/BuildRounded';
import MessageIcon from '@mui/icons-material/Message';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';



export default function App() {
  return (
    <>
    <nav><img src={realEstateCareLogo}/><Link href="#"><Badge badgeContent={4} color="primary"><MessageIcon/></Badge></Link><Link href="#"><SettingsIcon/></Link></nav>
    <main>
    <DashboardCard url="#" icon="Schedule"> </DashboardCard>
    <DashboardCard url="#" icon="Completed"> </DashboardCard>
    <DashboardCard url="#" icon="KnowledgeBase"> </DashboardCard>
    <DashboardCard url="#" icon="Settings"> </DashboardCard>
    </main>
    <footer>
    <Link href="#"><BuildRoundedIcon/></Link>
    <Link href="#"><SearchIcon/></Link>
    <Link href="#"><AccountCircleIcon /></Link>
    </footer>
    </>
  )
}
