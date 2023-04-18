import { useEffect, useState } from 'react';
import NavBar from '../../components/NavBar';
import EventGraph from '../../components/EventGraph';
import HomeDisplay from '../../components/HomeDisplay';
import { Route, Routes } from 'react-router-dom';
import './Dashboard.css'
import LeftBar from '../../components/LeftBar';

const Dashboard = () => {
    const [currentPage,setCurrentPage] = useState("Home");

    function Body(){
        return(
            <div className='body'>
                {currentPage === "Home" && <HomeDisplay/>}
                {currentPage === "EventGraph" && <EventGraph/>}
            </div>
        )
    }
    return (
        <div>
            <NavBar />
            <div id='dashboardBody'>
                <div id='sideBar'>
                    <button onClick={()=>setCurrentPage("Home")}>Home</button>
                    <button onClick={()=>setCurrentPage("EventGraph")}>Event Graph</button>
                    <button>Metrics Stretch</button>
                    <button>Manage Team Stretch</button>
                    <button>Settings Stretch</button>
                </div>
                <div id='bodyContent'>
                    <Body/>
                </div>
            </div>
        </div>
    )
}

export default Dashboard;