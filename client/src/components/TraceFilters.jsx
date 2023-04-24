import React, { useState }  from "react"
import DatePicker from 'react-datepicker';
//import 'react-calendar/dist/Calendar.css';
//import 'react-clock/dist/Clock.css';
import "react-datepicker/dist/react-datepicker.css"
import refreshIcon from '../assets/refresh-svgrepo-com.svg'

const TraceFilters = (props) => {
  const [start_value, onChangeStart] = useState(new Date());
  const [end_value, onChangeEnd] = useState(new Date());

  return (
    <div style={{width: '100%', verticalAlign: 'baseline'}}>
      <h3>Filters</h3>

      <span className='filter__container'>
        <span className='filter__label'>Start Time:</span>
        <DatePicker
                      className='datepicker__override'
                      popperClassName='datepicker__popper__override'
                      selected={start_value}
                      onChange={onChangeStart}
                      showTimeSelect
                      timeFormat="HH:mm"
                      timeIntervals={1}
                      timeCaption="time"
                      dateFormat="MMMM d, yyyy h:mm aa"
                  />
      </span>
      <span className='filter__container'>
        <span className='filter__label'>End Time:</span>
        <DatePicker
                      className='datepicker__override'
                      popperClassName='datepicker__popper__override'
                      selected={end_value}
                      onChange={onChangeEnd}
                      showTimeSelect
                      timeFormat="HH:mm"
                      timeIntervals={1}
                      timeCaption="time"
                      dateFormat="MMMM d, yyyy h:mm aa"
                  />
      </span>
      <span className='filter__container'>
        <span className='filter__label'>Refresh:</span>
        <button onClick={props.handleRefreshData} style={{display: 'inline-block'}}>
         <img src={refreshIcon} width='24px'></img>
        </button>
      </span>
    </div>
  )
};

export default TraceFilters;
