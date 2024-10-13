
import React, { useEffect } from 'react';
import ApexCharts from 'apexcharts';

// Helper function to get the date in milliseconds for grouping by date
const getDateInMillis = (year, month, day) => {
  return new Date(year, new Date(Date.parse(month + " 1")).getMonth(), day).getTime();
};

const AdultVisitorsSparkline = ({ data }) => {

  useEffect(() => {
    // Group the data by date and sum the number of adults for each day
    const adultsByDate = data.reduce((acc, booking) => {
      // Create a unique key for each date (year, month, day)
      const dateKey = getDateInMillis(
        booking.arrival_date_year,
        booking.arrival_date_month,
        booking.arrival_date_day_of_month
      );

      // Get the number of adults for the current booking
      const adults = parseInt(booking.adults || 0, 10);

      // If the date already exists, add the adults to the existing total
      if (acc[dateKey]) {
        acc[dateKey] += adults;
      } else {
        acc[dateKey] = adults;
      }

      return acc;
    }, {});

    // Convert the grouped data into an array for the chart
    const adultsData = Object.values(adultsByDate); // Only care about the summed values for the chart

    // Calculate the total number of adults for the title
    const totalAdults = adultsData.reduce((acc, value) => acc + value, 0);

    const options = {
      series: [{
        data: adultsData // Summed data for adults per day
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
        text: `${totalAdults}`, // Display total number of adults
        offsetX: 0,
        style: {
          fontSize: '24px',
        }
      },
      subtitle: {
        text: 'Total Adults',
        offsetX: 0,
        style: {
          fontSize: '14px',
        }
      }
    };

    const chart = new ApexCharts(document.querySelector("#adults-sparkline-chart"), options);
    chart.render();

    // Cleanup on unmount
    return () => {
      chart.destroy();
    };
  }, [data]);

  return (
    <div id="adults-sparkline-chart"></div>
  );
};

export default AdultVisitorsSparkline;
