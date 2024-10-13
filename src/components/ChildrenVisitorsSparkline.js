import React, { useEffect } from 'react';
import ApexCharts from 'apexcharts';

// Helper function to get the date in milliseconds for grouping by date
const getDateInMillis = (year, month, day) => {
  return new Date(year, new Date(Date.parse(month + " 1")).getMonth(), day).getTime();
};

const ChildrenVisitorsSparkline = ({ data }) => {

  useEffect(() => {
    // Group the data by date and sum the number of children for each day
    const childrenByDate = data.reduce((acc, booking) => {
      // Create a unique key for each date (year, month, day)
      const dateKey = getDateInMillis(
        booking.arrival_date_year,
        booking.arrival_date_month,
        booking.arrival_date_day_of_month
      );

      // Get the number of children for the current booking
      const children = parseInt(booking.children || 0, 10);

      // If the date already exists, add the children to the existing total
      if (acc[dateKey]) {
        acc[dateKey] += children;
      } else {
        acc[dateKey] = children;
      }

      return acc;
    }, {});

    // Convert the grouped data into an array for the chart
    const childrenData = Object.values(childrenByDate); // Only care about the summed values for the chart

    // Calculate the total number of children for the title
    const totalChildren = childrenData.reduce((acc, value) => acc + value, 0);

    const options = {
      series: [{
        data: childrenData // Summed data for children per day
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
        text: `${totalChildren}`, // Display total number of children
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
