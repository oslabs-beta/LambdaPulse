import DebugTraceDisplay from './DebugTraceDisplay'

function TraceList (props) {
    
    const traces = [];
    for (let n = 0; n < props.traces.length; n++) {
        traces.push(<button key={'tb'+Math.random()} onClick={() => props.setCurrentTrace(n)}>{props.traces[n].id}</button>)
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