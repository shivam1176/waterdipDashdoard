import React from 'react';
import Chart from 'react-apexcharts';

const VisitorPerDay = ({ data }) => {
  // Prepare the series data for the ApexChart
  const formattedData = data.map(booking => {
    const totalVisitors = parseInt(booking.adults || 0, 10) + parseInt(booking.children || 0, 10) + parseInt(booking.babies || 0, 10);
    
    // Return null if no visitors for that day
    if (!totalVisitors) {
      return { x: new Date(booking.arrival_date_year, new Date(Date.parse(booking.arrival_date_month + " 1")).getMonth(), booking.arrival_date_day_of_month).getTime(), y: null };
    }

    return {
      x: new Date(
        booking.arrival_date_year,
        new Date(Date.parse(booking.arrival_date_month + " 1")).getMonth(),
        booking.arrival_date_day_of_month
      ).getTime(), // Get time in milliseconds for x-axis (datetime)
      y: totalVisitors, // Total visitors (adults + children + babies)
    };
  });

  // ApexChart options
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
    // This prevents the weird lines by not connecting missing data points
    connectNullData: false,
  };

  return (
    <div className="chart-container">
      <Chart options={chartOptions} series={chartOptions.series} type="area" height={350} />
    </div>
  );
};

export default VisitorPerDay;
