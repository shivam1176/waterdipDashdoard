import React from 'react';
import Chart from 'react-apexcharts';

const getDateInMillis = (year, month, day) => {
  return new Date(year, new Date(Date.parse(month + " 1")).getMonth(), day).getTime();
};
const VisitorPerDay = ({ data }) => {
  
  const visitorsByDate = data.reduce((acc, booking) => {  
  const dateKey = getDateInMillis(
      booking.arrival_date_year,
      booking.arrival_date_month,
      booking.arrival_date_day_of_month
    );

    const totalVisitors = parseInt(booking.adults || 0, 10) + parseInt(booking.children || 0, 10) + parseInt(booking.babies || 0, 10); 
    if (acc[dateKey]) {
      acc[dateKey] += totalVisitors;
    } else {
      acc[dateKey] = totalVisitors;
    }
    return acc;
  }, {});
  
  const formattedData = Object.keys(visitorsByDate).map(dateKey => ({
    x: parseInt(dateKey, 10), 
    y: visitorsByDate[dateKey], 
  }));


  const chartOptions = {
    series: [{
      name: 'Visitors',
      data: formattedData,
    }],
    chart: {
      type: 'area',
      stacked: false,
      height: 350,
      zoom: {
        type: 'x',
        enabled: true,
        autoScaleYaxis: true,
      },
      toolbar: {
        autoSelected: 'zoom',
      },
    },
    dataLabels: {
      enabled: false,
    },
    markers: {
      size: 0,
    },
    title: {
      text: 'Number of Visitors per Day',
      align: 'left',
    },
    fill: {
      type: 'gradient',
      gradient: {
        shadeIntensity: 1,
        inverseColors: false,
        opacityFrom: 0.5,
        opacityTo: 0,
        stops: [0, 90, 100],
      },
    },
    yaxis: {
      labels: {
        formatter: function (val) {
          return val.toFixed(0); // Format visitor count
        },
      },
      title: {
        text: 'Number of Visitors',
      },
    },
    xaxis: {
      type: 'datetime',
      title: {
        text: 'Date',
      },
    },
    tooltip: {
      shared: false,
      y: {
        formatter: function (val) {
          return val.toFixed(0); // Display visitor count in tooltip
        },
      },
    },
    stroke: {
      curve: 'smooth',
    },
    // Prevent connecting null data points
    connectNullData: false,
  };

  return (
    <div className="chart-container">
      <Chart options={chartOptions} series={chartOptions.series} type="area" height={350} />
    </div>
  );
};

export default VisitorPerDay;
