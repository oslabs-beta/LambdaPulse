import { useEffect, useState } from 'react';
import './custom-tree.css';

const NodeDetail = (props) => {
  return (
    <div className='node__detail' style={props.nds}>
      <h3>Name goes here</h3>
      <div className='log__list'>
        <div>Log #1</div>
        <div>Log #2</div>
        <div>Log #3</div>
      </div>
    </div>
  )
};

export default NodeDetail;
