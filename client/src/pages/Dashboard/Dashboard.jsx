import { useEffect, useState } from 'react';
import NavBar from '../../components/NavBar';
import EventGraph from '../../components/EventGraph';
import HomeDisplay from '../../components/HomeDisplay';
import TraceList from '../../components/TraceList';
import Metrics from '../../components/Metrics';
import Settings from '../../components/Settings';
import { Route, Routes } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import './Dashboard.css';
import LeftBar from '../../components/LeftBar';
import sampleTraces from '../../assets/sampleTraces.json';

import homeIcon from '../../assets/home-1391-svgrepo-com.svg';
import eventGraphIcon from '../../assets/network-2-1118-svgrepo-com.svg';
import traceListIcon from '../../assets/list-svgrepo-com.svg';
import metricsIcon from '../../assets/chart-bar-svgrepo-com.svg';
import teamIcon from '../../assets/team-svgrepo-com.svg';
import settingsIcon from '../../assets/settings-svgrepo-com.svg';

const Dashboard = () => {
  const [currentPage, setCurrentPage] = useState('Home');
  const [currentTrace, setCurrentTrace] = useState(0);
  const [traceList, setTraceList] = useState({});
  const [nodeData, setNodeData] = useState(null);
  const [refresh, setRefresh] = useState(false);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();


  useEffect(() => {
    console.log('FIRED OFF USEFFECT');
    setLoading(true);
    fetch('/getTraces', {
      method: 'GET',
      headers: {
        'Content-type': 'application/json',
      },
    })
      .then((result) => {
        if (result.status === 419) {
          navigate('/');
        }
        return result.json()
      })
      .then((data) => {
        setLoading(false);
        if (data.length) {
          setNodeData(data[currentTrace]);
          setTraceList(data);
        } else {
          console.log('Fetched nothing, defaulting to placeholder data');
          setNodeData(sampleTraces[currentTrace]);
          setTraceList(sampleTraces);
        }
      })
      .catch((err) => console.log(err));
  }, [refresh]);

  useEffect(() => {
    setNodeData(traceList[currentTrace]);
  }, [currentTrace]);

  function logout() {
    fetch('/logout', {
      method: 'GET',
      headers: {
        'Content-type': 'application/json',
      },
    })
    .then((response) => {
      if(response.status === 200) {
        navigate('/');
      }
    })
  }

  function Body() {
    return (
      <div className='body'>
        {currentPage === 'Home' && (
          <HomeDisplay traces={traceList} currentTrace={currentTrace} loading={loading} />
        )}
        {currentPage === 'EventGraph' && (
          <EventGraph
            nodeData={nodeData}
            traceLogData={traceList[currentTrace].logs}
          />
        )}
        {currentPage === 'TraceList' && (
          <TraceList
            traces={traceList}
            setCurrentTrace={setCurrentTrace}
            setRefresh={setRefresh}
            refresh={refresh}
            loading={loading}
            currentTrace={currentTrace}
          />
        )}
        {currentPage === 'Settings' && (
          <Settings/>
        )}
      </div>
    );
  }
  return (
    <div>
      <NavBar />
      <div id='dashboardBody'>
        <div id='sideBar'>
          <button onClick={() => setCurrentPage('Home')}>
            <img src={homeIcon} width='16px'></img>
          </button>
          <button onClick={() => setCurrentPage('EventGraph')}>
            <img src={eventGraphIcon} width='16px'></img>
          </button>
          <button onClick={() => setCurrentPage('TraceList')}>
            <img src={traceListIcon} width='16px'></img>
          </button>
          <button onClick={() => setCurrentPage('Metrics')}>
            <img src={metricsIcon} width='16px'></img>
          </button>
          <button>
            <img src={teamIcon} width='16px'></img>
          </button>
          <button onClick={() => setCurrentPage('Settings')}>
            <img src={settingsIcon} width='16px'></img>
          </button>
          <button onClick={()=>logout()}>Logout</button>
        </div>
        <div id='bodyContent'>
          <Body />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
