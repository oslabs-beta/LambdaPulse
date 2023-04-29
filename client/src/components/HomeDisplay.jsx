import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import SimpleDataDisplay from './SimpleDataDisplay';
import { PieChart } from 'react-minimal-pie-chart';
import spinner from '../assets/pulse-1.1s-200px.svg';
import './HomeDisplay.css';

const getStartLocale = (startSec) => {
  let start = new Date(0);
  start.setUTCSeconds(startSec);
  return start.toLocaleString();
};

const flattenTrace = (trace) => {
  const result = [];
  if (!trace) return;

  const process = (node) => {
    const nr = {};
    const n = node.fullData.Document;

    if (n['start_time']) nr.start_time = getStartLocale(n['start_time']);
    if (n['start_time'] && n['end_time'])
      nr.duration = Math.floor((n['end_time'] - n['start_time']) * 1000) / 1000;
    nr.name = n['name'];
    if (n.http && n.http.response) nr.status = n.http.response.status;
    if (n.cause) {
      nr.cause = n.cause.message;
      for (const e in n.cause.exceptions) {
        nr.cause += n.cause.exceptions[e].message;
      }
    }
    if (n.error) nr.error = 'yes';
    if (n.origin) nr.origin = n.origin;
    if (n.subsegments) {
      let c = 0;
      for (let i = 0; i < n.subsegments.length; i++) {
        c++;
      }
      nr.subsegments = c;
    }

    for (const c in node.children) {
      process(node.children[c]);
    }

    result.push(nr);
  };

  process(trace);

  return result;
};

const tallyOrigins = (flattenedTrace) => {
  const result = {};

  for (const f in flattenedTrace) {
    let origin = flattenedTrace[f].origin;
    if (result[origin]) result[origin]++;
    else result[origin] = 1;
  }

  return result;
};

/*
                  { title: 'One', value: 10, color: '#E38627' },
                  { title: 'Two', value: 15, color: '#C13C37' },
                  { title: 'Three', value: 20, color: '#6A2135' },
*/
const tallyToCircle = (tally) => {
  const result = [];
  const colors = ['#E38627', '#C13C37', '#6A2135'];
  let curColor = 0;
  for (const k in tally) {
    const r = {};
    r.title = k;
    r.value = tally[k];
    r.color = colors[curColor];
    curColor++;
    if (curColor >= colors.length) curColor = 0;
    result.push(r);
  }
  return result;
};

const HomeDisplay = (props) => {
  //invications
  //successful
  //errors
  //line chart of invocations across time?

    const invocationCount = props.traces ? props.traces.length : 0;
    let successCount = 0;
    let errorCount = 0;
    for (const t in props.traces) {
      const n = props.traces[t];
      if (n.http && n.http.response && n.http.response.status >= 200 && n.http.response.status < 300) successCount++;
      else if (n.http && n.http.response && ( n.http.response.status <200 || n.http.response.status >= 300)) errorCount++;
    }

    let sumDuration = 0;
    let countDuration = 0;
    for (const t in props.traces) {
      const n = props.traces[t];
      if (n.averageTime) {
        sumDuration += n.averageTime;
        countDuration++;
      }
    }
    const avgDuration = sumDuration > 0 ? Math.floor(sumDuration / countDuration * 1000)/1000 : 0;
  
    const origins = tallyToCircle(tallyOrigins(flattenTrace(props.traces[props.currentTrace])));
    
    

    return (
        <div className={'metrics__home__container'}>
            {props.loading && (<img className='loading-spinner' src={spinner} alt='Loading' />)}
            <SimpleDataDisplay label={'Invocations'} metric={invocationCount} />
            <SimpleDataDisplay label={'Successful'} metric={successCount} />
            <SimpleDataDisplay label={'Errors'} metric={errorCount} />
            <SimpleDataDisplay label={'Avg Duration'} metric={avgDuration} />
            <div className={'metrics__visual__display'}>
              <PieChart
                data={origins}
                viewBoxSize={[100,100]}
                center={[50,50]}
                labelPosition={50}
                lengthAngle={360}
                lineWidth={35}
                paddingAngle={0}
                radius={50}
                startAngle={0}
                label={(props) => {return props.dataEntry.title} }
                labelStyle={{
                    fill: 'white',
                    fontSize: '4px'
               }}
                />
            </div>

        </div>
    )
}

export default HomeDisplay;
