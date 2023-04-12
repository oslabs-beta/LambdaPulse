import { useEffect, useState } from 'react';
import NodeTree from './NodeTree';
import NodeDetail from './NodeDetail';


const EventGraph = (props) => {
  const [nodeDetailState,setNodeDetailState] = useState({left: 150, top:150, display: 'none'});

  return (
    <div>
      <h1>Event Flow</h1>
      <NodeTree setNds={setNodeDetailState}/>
      <NodeDetail nds={nodeDetailState} />
      <h2>test</h2>
    </div>
  )
};

export default EventGraph;
