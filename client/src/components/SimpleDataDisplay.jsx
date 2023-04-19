import React from "react"

const SimpleDataDisplay = (props) => {
  return (
    <div className='metrics__info__display'>
      <h3>{props.label}:</h3>
      <h2>{props.metric}</h2>
    </div>
  )
};

export default SimpleDataDisplay;
