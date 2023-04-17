import { useEffect, useState } from 'react';

const LogPanel = (props) => {
  const logs = [];
  for (let i = 0; i < props.lData.logs.length; i++) {
    logs.push(<div>{props.lData.logs[i]}</div>)
  }

  return (
    <div className='LogPanel'>
      <h3>Log Detail:</h3>
      {logs}
    </div>
  )
};

export default LogPanel;
