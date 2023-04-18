import { useEffect, useState } from 'react';
import NodeTree from './NodeTree';
import NodeDetail from './NodeDetail';
import LogPanel from './LogPanel';
import NavBar from './NavBar';
import LeftBar from './LeftBar';
import './event-graph.css';

const EventGraph = (props) => {

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
        setNodeData(data[1]);
      })
      .catch(err => console.log(err))
  },[]);

  const [nodeDetailState,setNodeDetailState] = useState({left: 150, top:150, display: 'none', curNode: null});
  const [nodeData,setNodeData] = useState(null)
  const [logData,setLogData] = useState({logs:['LogX','LogY','LogZ']})

  return (
    <div>
      <div className='EventGraph'>
        <div className='EventPanelContainer'>
          <NodeTree setNds={setNodeDetailState} setLData={setLogData} nData={null} />
          <NodeDetail nds={nodeDetailState} />
        </div>
        <LogPanel lData={logData}/>
      </div>
    </div>
  )
};

export default EventGraph;
