import DebugTraceDisplay from './DebugTraceDisplay'

function TraceList (props) {
    
    const traces = [];
    for (let n = 0; n < props.traces.length; n++) {
        traces.push(<button key={'tb'+Math.random()} onClick={() => props.setCurrentTrace(n)}>{props.traces[n].id}</button>)
    }

    return (
        <div>
            <p>TraceList</p>
            {traces}

            <DebugTraceDisplay trace={props.traces[props.currentTrace]} />
        </div>
    )
}
export default TraceList;