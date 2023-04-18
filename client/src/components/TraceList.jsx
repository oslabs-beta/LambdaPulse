

function TraceList (props) {
    console.log(props.traces);

    const traces = [];
    for (let n = 0; n < props.traces.length; n++) {
        traces.push(<button onClick={() => props.setCurrentTrace(n)}>{props.traces[n].id}</button>)
    }

    function clearRedis() {
        fetch('/clearTraces',
          {
            method: 'GET',
          })
          .then(result =>  {
            console.log(result);
            result})
    }

    return (
        <div>
            <p>TraceList</p>
            <button onClick={()=>clearRedis()}>Clear TraceList</button>
            {traces}
        </div>
    )
}
export default TraceList;