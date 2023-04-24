import React, { useState }  from "react"
import DatePicker from 'react-datepicker';
//import 'react-calendar/dist/Calendar.css';
//import 'react-clock/dist/Clock.css';
import "react-datepicker/dist/react-datepicker.css"

const TraceFilters = (props) => {
  const [value, onChange] = useState(new Date());

  return (
    <div style={{width: '200px'}}>
      <DatePicker
                    selected={value}
                    onChange={onChange}
                    showTimeSelect
                    timeFormat="HH:mm"
                    timeIntervals={15}
                    timeCaption="time"
                    dateFormat="MMMM d, yyyy h:mm aa"
                />
    </div>
  )
};

export default TraceFilters;
