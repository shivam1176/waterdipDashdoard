
import React, { useEffect } from 'react';
import ApexCharts from 'apexcharts';

const getDateInMillis = (year, month, day) => {
  return new Date(year, new Date(Date.parse(month + " 1")).getMonth(), day).getTime();
};
const AdultVisitorsSparkline = ({ data }) => {
  useEffect(() => {
    const adultsByDate = data.reduce((acc, booking) => {
      const dateKey = getDateInMillis(
        booking.arrival_date_year,
        booking.arrival_date_month,
        booking.arrival_date_day_of_month
      );
      const adults = parseInt(booking.adults || 0, 10);
      if (acc[dateKey]) {
        acc[dateKey] += adults;
      } else {
        acc[dateKey] = adults;
      }
      return acc;
    }, {});

    const adultsData = Object.values(adultsByDate); 
    const totalAdults = adultsData.reduce((acc, value) => acc + value, 0);

    const options = {
      series: [{
        data: adultsData 
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
        text: `${totalAdults}`, 
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

    return () => {
      chart.destroy();
    };
  }, [data]);

  return (
    <div id="adults-sparkline-chart"></div>
  );
};

export default AdultVisitorsSparkline;
