import DebugTraceDisplay from './DebugTraceDisplay'
import errorImage from '../assets/error-svgrepo-com.svg'


const getFromRight = (s) => {
    console.log('checking ' + s)
    console.log(typeof s)
  let result = '';
  for (let i = s.length-1; i >= 0; i--) {
    console.log(s[i]);
    if (s[i] == '/') return result;
    result = s[i] + result;
    console.log('result is ' + result)
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
        console.log(url);
        const endpt = getFromRight(url)
        console.log(endpt);
        let errors = findErrorsInTrace(props.traces[n]);
        traces.push(<button key={'tb'+Math.random()} 
                            onClick={() => props.setCurrentTrace(n)}>
                            <span>{endpt + ' - ' + 
                                props.traces[n].id
                                }
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
        fetch('/clearTraces',
        {
            method: 'GET',
        })
        .then(result =>  {
            console.log(result);
        })
        //changes refresh which fires off useEffect(in dashboard.jsx) to fetch new data
        props.setRefresh(!props.refresh)

    }

    return (
        <div>
            <p>TraceList</p>
            <button onClick={()=>refreshData()}>Refresh Data</button>
            {traces}

            <DebugTraceDisplay trace={props.traces[props.currentTrace]} />
        </div>
    )
}
export default TraceList;