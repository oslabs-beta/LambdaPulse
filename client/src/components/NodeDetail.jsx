import React, { useEffect, useState } from 'react';
import './custom-tree.css';



const NodeDetail = (props) => {

  const attrs = [];

  if (props.nds.curNode) {

    const nodeDetails = [];
    const cn = props.nds.curNode;
    if (cn.id) nodeDetails.push(<div className='nd__attribute'><b>id: </b>{cn.id}</div>);
    if (cn.origin) nodeDetails.push(<div className='nd__attribute'><b>origin: </b>{cn.origin}</div>);
    if (cn.http && cn.http.request) nodeDetails.push(<div className='nd__attribute'><b>req url: </b>{cn.http.request.url}</div>);
    if (cn.http && cn.http.request) nodeDetails.push(<div className='nd__attribute'><b>req method: </b>{cn.http.request.method}</div>);
    if (cn.http && cn.http.response) nodeDetails.push(<div className='nd__attribute'><b>res status: </b>{cn.http.response.status}</div>);
    if (cn.time_taken) nodeDetails.push(<div className='nd__attribute'><b>time taken ms: </b>{cn.time_taken}</div>);
    if (cn.averageTime) nodeDetails.push(<div className='nd__attribute'><b>average time ms: </b>{cn.averageTime}</div>);
    if (cn.cold_start) nodeDetails.push(<div className='nd__attribute'><b>cold start: </b>{cn.cold_start}</div>);
    if (cn.fullData && cn.fullData.Document.error) nodeDetails.push(<div className='nd__attribute'><b>error: </b>{cn.fullData.Document.error? 'yes' : 'no'}</div>);
    if (cn.fullData && cn.fullData.Document.cause) {
      nodeDetails.push(<div className='nd__attribute'><b>cause: </b>{cn.fullData.Document.cause.message}</div>);
      for (const e in cn.fullData.Document.cause.exceptions) {
        nodeDetails.push(<div className='nd__attribute' key={'exc'+Math.random()}><b>exception: </b>{cn.fullData.Document.cause.exceptions[e].message}</div>);
      }
    }


    const subSegments = [];
    for (const s in props.nds.curNode.subsegments) {
      const curSubSeg = props.nds.curNode.subsegments[s];
      let start = new Date(0);
      start.setUTCSeconds(curSubSeg.start_time);
      start = start.toLocaleString()
      let duration = curSubSeg.end_time - curSubSeg.start_time;
      subSegments.push(<div key={'subSeg' + Math.random()} className='nd__subsegment__container'>
        <div className='nd__subsegment'><b>subsegment name: </b>{curSubSeg.name}</div>
        <div className='nd__subsegment'><b>start time: </b>{start}</div>
        <div className='nd__subsegment'><b>duration: </b>{duration}</div>
        </div>)
    }

    const subsegmentBox = <div>{subSegments}</div>
    nodeDetails.push(subsegmentBox);

    const nodeDetailBox = <div>{nodeDetails}</div>
    attrs.push(nodeDetailBox);
  }

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
