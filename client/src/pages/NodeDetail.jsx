import { useEffect, useState } from 'react';
import './custom-tree.css';



const NodeDetail = (props) => {

  const attributes = [];
  for (const k in props.nds.curNode) {
    attributes.push(<div><b>{k + ': '}</b>{'' +  props.nds.curNode[k]}</div>)
  }

  return (
    <div className='node__detail' style={props.nds}>
      <h3>{props.nds.curNode ? props.nds.curNode.name : 'n/a'}</h3>
      <div className='log__list'>
        {attributes}
      </div>
    </div>
  )
};

export default NodeDetail;
