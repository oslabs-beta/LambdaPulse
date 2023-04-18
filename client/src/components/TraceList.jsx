

function TraceList (props) {
    console.log(props.traces);

    const traces = [];
    for (let n = 0; n < props.traces.length; n++) {
        traces.push(<button onClick={() => props.setCurrentTrace(n)}>{props.traces[n].id}</button>)
    }

    return (
        <div>
            <p>TraceList</p>
            {traces}
        </div>
    )
}
export default TraceList;