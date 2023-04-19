import { useEffect, useState } from 'react';
import NavBar from '../../components/NavBar';
import EventGraph from '../../components/EventGraph';
import HomeDisplay from '../../components/HomeDisplay';
import TraceList from '../../components/TraceList'
import Metrics from '../../components/Metrics'
import { Route, Routes } from 'react-router-dom';
import './Dashboard.css'
import LeftBar from '../../components/LeftBar';
import sampleTraces from '../../assets/sampleTraces.json'

import homeIcon from '../../assets/home-1391-svgrepo-com.svg'
import eventGraphIcon from '../../assets/network-2-1118-svgrepo-com.svg'
import traceListIcon from '../../assets/list-svgrepo-com.svg'
import metricsIcon from '../../assets/chart-bar-svgrepo-com.svg'
import teamIcon from '../../assets/team-svgrepo-com.svg'
import settingsIcon from '../../assets/settings-svgrepo-com.svg'

const Dashboard = () => {
    const [currentPage,setCurrentPage] = useState("Home");
    const [currentTrace,setCurrentTrace] = useState(0)
    const [traceList,setTraceList] = useState({});
    const [nodeData,setNodeData] = useState(null)

    useEffect(() => {
        fetch('/getTraces',
          {
            method: 'GET',
            headers: {
              'Content-type':'application/json'
            },
          })
          .then(result => result.json())
          .then(data => {
            console.log('Fetched ',data)
            if (data.length) {
              setNodeData(data[currentTrace]);
              setTraceList(data);
            }
            else {
              console.log('Fetched nothing, defaulting to placeholder data')
              setNodeData(sampleTraces[currentTrace]);
              setTraceList(sampleTraces);
            }
          })
          .catch(err => console.log(err))
      },[currentTrace]);
    

    function Body(){
        return(
            <div className='body'>
                {currentPage === "Home" && <HomeDisplay traces={traceList} currentTrace={currentTrace} />}
                {currentPage === "EventGraph" && <EventGraph nodeData={nodeData}/>}
                {currentPage === "TraceList" && <TraceList traces={traceList} currentTrace={currentTrace} setCurrentTrace={setCurrentTrace}/>}
                {currentPage === "Metrics" && <Metrics />}
            </div>
        )
    }
    return (
        <div>
            <NavBar />
            <div id='dashboardBody'>
                <div id='sideBar'>
                    <button onClick={()=>setCurrentPage("Home")}><img src={homeIcon} width='16px'></img></button>
                    <button onClick={()=>setCurrentPage("EventGraph")}><img src={eventGraphIcon} width='16px'></img></button>
                    <button onClick={()=>setCurrentPage("TraceList")}><img src={traceListIcon} width='16px'></img></button>
                    <button onClick={()=>setCurrentPage("Metrics")}><img src={metricsIcon} width='16px'></img></button>
                    <button><img src={teamIcon} width='16px'></img></button>
                    <button><img src={settingsIcon} width='16px'></img></button>
                </div>
                <div id='bodyContent'>
                    <Body/>
                </div>
            </div>
        </div>
    )
}

export default Dashboard;