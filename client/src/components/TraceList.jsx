import {useEffect,useState} from 'react';
import DebugTraceDisplay from './DebugTraceDisplay'
import spinner from '../assets/pulse-1.1s-200px.svg';
import './HomeDisplay.css';
import TraceSelector from './TraceSelector'
import TraceFilters from './TraceFilters';

function TraceList (props) {

  const [start_value, onChangeStart] = useState(new Date()-1000*60*60*24*7);
  const [end_value, onChangeEnd] = useState(new Date());

  function refreshData() {
    //clears Traces table from redis
    fetch('/clearTraces', {
      method: 'GET',
    }).then((result) => {
      console.log(result);
    });
    //changes refresh which fires off useEffect(in dashboard.jsx) to fetch new data
    props.setRefresh(!props.refresh);
  }
  return (
    <div className='trace-list-container'>
      <div >
        {props.loading && (
          <img className='loading-spinner' src={spinner} alt='Loading' />
        )}
      </div>
      <TraceSelector traces={props.traces}
                start_value={start_value}
                end_value={end_value} 
                setCurrentTrace = {props.setCurrentTrace} />
      <div style={{flexDirection: 'column', width: '100%'}}>
        <TraceFilters handleRefreshData={refreshData} 
              start_value={start_value} onChangeStart={onChangeStart}
              end_value={end_value} onChangeEnd={onChangeEnd}/>
        <DebugTraceDisplay trace={props.traces[props.currentTrace]} />
      </div>
    </div>
  );
}
export default TraceList;
