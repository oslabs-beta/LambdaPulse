import { useEffect, useState } from 'react';
import DataTable, { createTheme } from 'react-data-table-component';
import sampleLog from '../assets/sampleLog';

const columns = [
  {
    name: '@timestamp',
    selector: (row) => row['timestamp'],
    width: '200px',
    accessor: d => {
      return Moment(d.timestamp)
        .local()
        .format("DD-MM-YYYY hh:mm:ss a")
    }
  },
  {
    name: '@message',
    selector: (row) => row['message'],
    width: '800px',
    wrap: true
  },
  {
    name: '@logStream',
    selector: (row) => row['logStream'],
    width: '350px',
  },
  {
    name: '@log',
    selector: row => row["log"],
    width:"350px"
  },
];

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


const customStyles = {
  rows: {
    style: {
      minHeight: '72px', // override the row height
    },
  },
  headCells: {
    style: {
      paddingLeft: '8px', // override the cell padding for head cells
      paddingRight: '8px',
    },
  },
  cells: {
    style: {
      paddingLeft: '8px', // override the cell padding for data cells
      paddingRight: '8px',
    },
  },
};



const LogPanel = (props) => {
  console.log('logPanel logs: ', props)

  return (
    <div className='LogPanel'>
      <h3>Log Detail:</h3>
      <DataTable
            columns={columns}
            data={props.traceLogData}
            theme="dark"
            //customStyles={customStyles}
        />
    </div>
  );
};

export default LogPanel;
