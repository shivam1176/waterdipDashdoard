import React, { useEffect } from 'react';
import ApexCharts from 'apexcharts';

const getDateInMillis = (year, month, day) => {
  return new Date(year, new Date(Date.parse(month + " 1")).getMonth(), day).getTime();
};

const ChildrenVisitorsSparkline = ({ data }) => {

  useEffect(() => {
    const childrenByDate = data.reduce((acc, booking) => {
      const dateKey = getDateInMillis(
        booking.arrival_date_year,
        booking.arrival_date_month,
        booking.arrival_date_day_of_month
      );
      const children = parseInt(booking.children || 0, 10);

      if (acc[dateKey]) {
        acc[dateKey] += children;
      } else {
        acc[dateKey] = children;
      }
      return acc;
    }, {});
    const childrenData = Object.values(childrenByDate);
    const totalChildren = childrenData.reduce((acc, value) => acc + value, 0);
    const options = {
      series: [{
        data: childrenData 
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
        text: `${totalChildren}`, 
        offsetX: 0,
        style: {
          fontSize: '24px',
        }
      },
      subtitle: {
        text: 'Total Children',
        offsetX: 0,
        style: {
          fontSize: '14px',
        }
      }
    };
    const chart = new ApexCharts(document.querySelector("#children-sparkline-chart"), options);
    chart.render();
    return () => {
      chart.destroy();
    };
  }, [data]);

  return (
    <div id="children-sparkline-chart"></div>
  );
};
export default ChildrenVisitorsSparkline;
