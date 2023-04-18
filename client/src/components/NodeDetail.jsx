import { useEffect, useState } from 'react';
import './custom-tree.css';



const NodeDetail = (props) => {

  const attributes = [];
  for (const k in props.nds.curNode) {
    attributes.push(<div key={'nds' + Math.random()}><b>{k + ': '}</b>{'' +  props.nds.curNode[k]}</div>)
  }

  const subSegments = [];
  if (props.nds.curNode) {
    for (const s in props.nds.curNode.subsegments) {
      const curSubSeg = props.nds.curNode.subsegments[s];
      let start = new Date(0);
      start.setUTCSeconds(curSubSeg.start_time);
      start = start.toLocaleString()
      let end = new Date(0);
      end.setUTCSeconds(curSubSeg.end_time);
      end = end.toLocaleString();
      subSegments.push(<div key={'subSeg' + Math.random()} className='nd__subsegment__container'>
        <div className='nd__subsegment'><b>subsegment name: </b>{curSubSeg.name}</div>
        <div className='nd__subsegment'><b>start time: </b>{start}</div>
        <div className='nd__subsegment'><b>end time: </b>{end}</div>
        </div>)
    }
  }
  else console.log('No traces found');

  const cn = props.nds.curNode;
  let attrs;
  if (cn) {
    console.log(cn);
    attrs = <div>
      <div className='nd__attribute'><b>id: </b>{cn.id}</div>
      <div className='nd__attribute'><b>origin: </b>{cn.origin}</div>
      <div className='nd__attribute'><b>req url: </b>{cn.http && cn.http.request? cn.http.request.url : ''}</div>
      <div className='nd__attribute'><b>req method: </b>{cn.http && cn.http.request? cn.http.request.method: ''}</div>
      <div className='nd__attribute'><b>res status: </b>{cn.http && cn.http.response? cn.http.response.status: ''}</div>
      {subSegments}
    </div>
  }
  else attrs = <div>No data found</div>

  return (
    <div className='node__detail' style={props.nds}>
      <h3>{props.nds.curNode ? props.nds.curNode.name : 'n/a'}</h3>
      <div className='log__list'>
        {attrs}
      </div>
    </div>
  )
};

export default NodeDetail;
