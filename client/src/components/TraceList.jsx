import DebugTraceDisplay from './DebugTraceDisplay'


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


function TraceList (props) {
    
    const traces = [];
    for (let n = 0; n < props.traces.length; n++) {
        const url = props.traces[n].fullData.Document.http.request.url;
        console.log(url);
        const endpt = getFromRight(url)
        console.log(endpt);
        traces.push(<button key={'tb'+Math.random()} onClick={() => props.setCurrentTrace(n)}>{endpt + ' - ' + props.traces[n].id}</button>)
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