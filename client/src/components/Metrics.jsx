import React from "react"
import { PieChart } from 'react-minimal-pie-chart';

const Metrics = (props) => {
  return (
    <div>
      <div style={{'width': '200px','margin':'20px'}}>
      

        <PieChart
          data={[
            { title: 'One', value: 10, color: '#E38627' },
            { title: 'Two', value: 15, color: '#C13C37' },
            { title: 'Three', value: 20, color: '#6A2135' },
          ]}
          viewBoxSize={[100,100]}
          center={[50,50]}
          labelPosition={50}
          lengthAngle={360}
          lineWidth={35}
          paddingAngle={0}
          radius={50}
          startAngle={0}
          
        />;
      </div>
    </div>
  )
};

export default Metrics;
