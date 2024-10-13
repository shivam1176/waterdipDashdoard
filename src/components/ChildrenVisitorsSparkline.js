import React, { useEffect } from 'react';
import ApexCharts from 'apexcharts';

const ChildrenVisitorsSparkline = ({ data }) => {

  useEffect(() => {
    // Process the data to get the total number of adults over time
    const childrenData = data.map(booking => parseInt(booking.children, 10));
    
    // Calculate the total number of adults for the title
    const totalchildren = childrenData.reduce((acc, value) => acc + value, 0);

    const options = {
      series: [{
        data: childrenData // Data for adults
      }],
      chart: {
        type: 'area',
        height: 160,
        sparkline: {
          enabled: true
        },
      },
      stroke: {
        curve: 'straight'
      },
      fill: {
        opacity: 0.8,
      },
      yaxis: {
        min: 0
      },
      colors: ['#0991e3'],
      title: {
        text: `${totalchildren}`, // Display total number of adults
        offsetX: 0,
        style: {
          fontSize: '24px',
        }
      },
      subtitle: {
        text: 'Total children',
        offsetX: 0,
        style: {
          fontSize: '14px',
        }
      }
    };

    const chart = new ApexCharts(document.querySelector("#children-sparkline-chart"), options);
    chart.render();

    // Cleanup on unmount
    return () => {
      chart.destroy();
    };
  }, [data]);

  return (
    <div id="children-sparkline-chart"></div>
  );
};

export default ChildrenVisitorsSparkline;
