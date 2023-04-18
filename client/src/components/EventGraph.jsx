import { useEffect, useState } from 'react';
import NodeTree from './NodeTree';
import NodeDetail from './NodeDetail';
import LogPanel from './LogPanel';
import NavBar from './NavBar';
import LeftBar from './LeftBar';
import TraceList from './TraceList';
import './event-graph.css';

const EventGraph = (props) => {
  const [nodeDetailState,setNodeDetailState] = useState({left: 150, top:150, display: 'none', curNode: null});
  const [logData,setLogData] = useState({logs:['LogX','LogY','LogZ']})

  return (
    <div>
      <div className='EventGraph'>
        <div className='EventPanelContainer'>
          <NodeTree setNds={setNodeDetailState} setLData={setLogData} nData={props.nodeData} />
          <NodeDetail nds={nodeDetailState} />
        </div>
        <LogPanel lData={logData}/>
      </div>
    </div>
  )
};

export default EventGraph;
