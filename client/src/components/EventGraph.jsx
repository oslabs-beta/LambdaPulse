import React, { useEffect, useState } from 'react';
import NodeTree from './NodeTree';
import NodeDetail from './NodeDetail';
import LogPanel from './LogPanel';
import NavBar from './NavBar';
import TraceList from './TraceList';
import './event-graph.css';

const EventGraph = (props) => {
  const [nodeDetailState,setNodeDetailState] = useState({left: 150, top:150, display: 'none', curNode: null});

  return (
    <div>
      <div className='EventGraph'>
        <div className='EventPanelContainer'>
          <NodeTree setNds={setNodeDetailState} nData={props.nodeData} />
          <NodeDetail nds={nodeDetailState} />
        </div>
        <LogPanel traceLogData={props.traceLogData}/>
      </div>
    </div>
  )
};

export default EventGraph;
