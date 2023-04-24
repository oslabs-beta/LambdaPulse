import DebugTraceDisplay from './DebugTraceDisplay'
import spinner from '../assets/pulse-1.1s-200px.svg';
import './HomeDisplay.css';
import errorImage from '../assets/error-svgrepo-com.svg';
import TraceFilters from './TraceFilters';


const getFromRight = (s) => {
  let result = '';
  for (let i = s.length-1; i >= 0; i--) {
    if (s[i] == '/') return result;
    result = s[i] + result;
  }
  return result;
}

const findErrorsInTrace = (trace) => {
  let errors = 0;

  const process = (node) => {
    if (node.fullData && node.fullData.Document.error) errors++;
    if (node.children) node.children.forEach((n) => {process(n)})
  }

  process(trace);
  return errors;
}


function TraceList (props) {
    
    const traces = [];
    for (let n = 0; n < props.traces.length; n++) {
        const url = props.traces[n].fullData.Document.http.request.url;
        const endpt = getFromRight(url)
        let errors = findErrorsInTrace(props.traces[n]);
        traces.push(<button key={'tb'+Math.random()} 
                            onClick={() => props.setCurrentTrace(n)}
                            style={{fontSize: 'small'}}>
                            <span>{endpt + ' - '
                                }
                            </span>
                            <span style={{fontSize: 'x-small'}}>
                             {props.traces[n].id}
                            </span>
                            <span style={{marginLeft: '4px'}}>
                                {
                                    (errors ? (<img src={errorImage} width='16px'></img>) : '')
                                }
                            </span>
                            <span style={{color: 'white', fontSize: 'x-small'}}>
                                {
                                    (errors ? (' (' + errors + ' errors )') : '')
                                }
                            </span>
                        </button>)
    }

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
      <div className='trace-list-traces'>
        <p>TraceList</p>
        {props.loading && (
          <img className='loading-spinner' src={spinner} alt='Loading' />
        )}
        <button onClick={() => refreshData()}>Refresh Data</button>
        {traces}
      </div>
      <div style={{flexDirection: 'column', width: '100%'}}>
        <TraceFilters handleRefreshData={refreshData} />
        <DebugTraceDisplay trace={props.traces[props.currentTrace]} />
      </div>
    </div>
  );
}
export default TraceList;
