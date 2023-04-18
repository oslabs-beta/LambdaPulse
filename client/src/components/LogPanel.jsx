import { useEffect, useState } from 'react';
import DataTable from 'react-data-table-component'
import sampleLog from '../assets/sampleLog'

const columns = [
  {
    name: '"@timestamp"',
    selector: row => row["@timestamp"],
  },
  {
    name: '@message',
    selector: row => row["@message"],
  },
  {
    name: '@logstream',
    selector: row => row['@logstream'],
  },
  {
    name: '"@log"',
    selector: row => row["@log"]
  },
];

const data = [
  {
      id: 1,
      title: 'Beetlejuice',
      year: '1988',
  },
  {
      id: 2,
      title: 'Ghostbusters',
      year: '1984',
  },
]

const LogPanel = (props) => {
  const logs = [];
  for (let i = 0; i < props.lData.logs.length; i++) {
    logs.push(<div key={'lp' + Math.random()}>{props.lData.logs[i]}</div>)
  }

  return (
    <div className='LogPanel'>
      <h3>Log Detail:</h3>
      {logs}
      <DataTable
            columns={columns}
            data={sampleLog}
        />
    </div>
  )
};

export default LogPanel;
