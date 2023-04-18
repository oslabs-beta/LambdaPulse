import React from "react"
import  DataTable, { createTheme } from 'react-data-table-component'

const columns = [
  {
    name: 'id',
    selector: row => row["id"],
    width:"200px",
  },
  {
    name: 'trace name',
    selector: row => row["traceName"],
    width:"200px",
    sortable: true,
  },
  {
    name: 'origin',
    selector: row => row["traceOrigin"],
    width:"200px",
    sortable: true,
  },
  {
    name: 'name',
    selector: row => row["name"],
    width:"200px",
    sortable: true,
  },
  {
    name: 'start time',
    selector: row => row["start_time"],
    width:"200px",
    sortable: true,
  },
  {
    name: 'end time',
    selector: row => row["end_time"],
    width:"200px",
    sortable: true,
  },
  {
    name: 'url',
    selector: row => row["url"],
    width:"200px",
    sortable: true,
  },
  {
    name: 'method',
    selector: row => row["method"],
    width:"200px",
    sortable: true,
  },
  {
    name: 'status',
    selector: row => row["status"],
    width:"200px",
    sortable: true,
  },
  {
    name: 'fulldata',
    selector: row => row["fullData"],
    width:"200px",
    sortable: true,
  },

  //{
  //  name: 'subsegments',
  //  selector: row => row["subsegments"],
  //  width:"200px",
  //},
]

createTheme('dark', {
    text: {
      primary: '#dddddd',
      secondary: '#2aa198',
    },
    background: {
      default: '#222222',
    },
    context: {
      background: '#cb4b16',
      text: '#FFFFFF',
    },
    divider: {
      default: '#073642',
    },
    action: {
      button: 'rgba(0,0,0,.54)',
      hover: 'rgba(0,0,0,.08)',
      disabled: 'rgba(0,0,0,.12)',
    },
  }, 'dark');
  

const flattenTrace = (trace) => { 
  const result = [];
  console.log('flattening ' + trace)
  
  const process = (node) => {
    for (const c in node.children) {
      process(node.children[c]);
    }

    for (const s in node.subsegments) {
      let subSeg = {};
      subSeg = Object.assign(subSeg,node);
      subSeg = Object.assign(subSeg,node.subsegments[s])
      subSeg.traceName = node.name;
      subSeg.traceOrigin = node.origin;
      if (subSeg.start_time) {
        let start = new Date(0);
        start.setUTCSeconds(subSeg.start_time);
        subSeg.start_time = start.toLocaleString()
      }
      if (subSeg.end_time) {
        let end = new Date(0);
        end.setUTCSeconds(subSeg.end_time);
        subSeg.end_time = end.toLocaleString()
      }
      if (subSeg.http) {
        if (subSeg.http.request) {
          subSeg.url = subSeg.http.request.url;
          subSeg.method = subSeg.http.request.method;
        }
        if (subSeg.http.response) {
          subSeg.status = subSeg.http.response.status;
        }
      }
      subSeg.fullData = JSON.stringify(node.fullData);
      result.push(subSeg);
    }
  }

  process(trace);

  return result;
}

const DebugTraceDisplay = (props) => {
  console.log(props);

  console.log(flattenTrace(props.trace))

  return (
    <div >
      <h3>Subsegment Detail:</h3>
      <DataTable
        columns={columns}
        data={flattenTrace(props.trace)}
        theme="dark"
        //customStyles={customStyles}
       />
    </div>
  )
};

export default DebugTraceDisplay;
