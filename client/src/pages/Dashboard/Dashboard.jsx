import { useEffect, useState } from 'react';
import NavBar from '../../components/NavBar';
import EventGraph from '../../components/EventGraph';
import HomeDisplay from '../../components/HomeDisplay';
import TraceList from '../../components/TraceList'
import { Route, Routes } from 'react-router-dom';
import './Dashboard.css'
import LeftBar from '../../components/LeftBar';

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
            setNodeData(data[currentTrace]);
            setTraceList(data);
          })
          .catch(err => console.log(err))
      },[currentTrace]);
    

    function Body(){
        return(
            <div className='body'>
                {currentPage === "Home" && <HomeDisplay/>}
                {currentPage === "EventGraph" && <EventGraph nodeData={nodeData}/>}
                {currentPage === "TraceList" && <TraceList traces={traceList} setCurrentTrace={setCurrentTrace}/>}
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
                    <button onClick={()=>setCurrentPage("TraceList")}>Trace List</button>
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