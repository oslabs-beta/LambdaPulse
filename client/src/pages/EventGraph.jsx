import { useEffect, useState } from 'react';
import NodeTree from './NodeTree';
import NodeDetail from './NodeDetail';
import LogPanel from './LogPanel';
import NavBar from './NavBar';
import LeftBar from './LeftBar';
import './event-graph.css';

const sampleData = {
  name: 'GetSharedUnicorn',
  color: "orange",
  icon: 'lambdaFunc',
  logs: ['LogA','LogB','LogC'],
  children: [
      {
      name: 'sharedUnicorns',
      color: "blue",
      icon: 'dynamoDB',
      logs: ['LogD','LogE','LogF'],
      attributes: {
          department: 'Fabrication',
      },
      children: [],
      },
      {
      name: 'wildrydes-prod-unicornDispatched',
      color: 'pink',
      icon: 'simpleNotification',
      logs: ['LogG','LogH','LogI'],
      attributes: {
          department: 'Assembly',
      },
      children: [
          {
          name: 'wildrydes-prod-uploadReceipt',
          color: "orange",
          icon: 'lambdaFunc',
          logs: ['LogJ','LogK','LogL'],
          children: []
          },
          {
          name: 'wildrydes-prod-recordRide',
          color: "orange",
          icon: 'lambdaFunc',
          logs: ['LogM','LogN','LogO'],
          children: []
          },
      ],
      },
  ],
};


const EventGraph = (props) => {
  const [nodeDetailState,setNodeDetailState] = useState({left: 150, top:150, display: 'none'});
  const [nodeData,setNodeData] = useState(sampleData)
  const [logData,setLogData] = useState({logs:['LogX','LogY','LogZ']})

  return (
    <div className='EventGraph' >
      <NavBar />
      <div className='EventPanelContainer'>
        <LeftBar />
        <NodeTree setNds={setNodeDetailState} setLData={setLogData} nData={nodeData} />
        <LogPanel lData={logData}/>
      </div>
      <NodeDetail nds={nodeDetailState} />
      
      <h2>test</h2>
    </div>
  )
};

export default EventGraph;
