import React, { useState, useEffect } from 'react';
import ApexCharts from 'apexcharts';

const VisitorsPerCountryChart = ({ data }) => {
  const [chartData, setChartData] = useState({
    series: [],
    categories: []
  });

  useEffect(() => {
    if (data.length > 0) {
      // Create a map to count visitors per country
      const countryVisitorMap = {};
      data.forEach(booking => {
        const country = booking.country;
        const totalVisitors = parseInt(booking.adults, 10) + parseInt(booking.children, 10);

        if (countryVisitorMap[country]) {
          countryVisitorMap[country] += totalVisitors;
        } else {
          countryVisitorMap[country] = totalVisitors;
        }
      });

      // Prepare the series and categories for the chart
      const countries = Object.keys(countryVisitorMap);
      const visitors = Object.values(countryVisitorMap);

      setChartData({
        series: [{
          name: 'Visitors',
          data: visitors
        }],
        categories: countries
      });
    }
  }, [data]);

  useEffect(() => {
    const options = {
      series: chartData.series,
      chart: {
        height: 350,
        type: 'bar',
      },
      plotOptions: {
        bar: {
          borderRadius: 10,
          dataLabels: {
            position: 'top', // Show data label on top
          },
        }
      },
      dataLabels: {
        enabled: true,
        formatter: function (val) {
          return val;
        },
        offsetY: -20,
        style: {
          fontSize: '12px',
          colors: ["#304758"]
        }
      },
      xaxis: {
        categories: chartData.categories,
        position: 'top',
        axisBorder: {
          show: false
        },
        axisTicks: {
          show: false
        },
        crosshairs: {
          fill: {
            type: 'gradient',
            gradient: {
              colorFrom: '#D8E3F0',
              colorTo: '#BED1E6',
              stops: [0, 100],
              opacityFrom: 0.4,
              opacityTo: 0.5,
            }
          }
        },
        tooltip: {
          enabled: true,
        }
      },
      yaxis: {
        axisBorder: {
          show: false
        },
        axisTicks: {
          show: false,
        },
        labels: {
          show: false,
        }
      },
      title: {
        text: 'Number of Visitors per Country',
        floating: true,
        offsetY: 330,
        align: 'center',
        style: {
          color: '#444'
        }
      }
    };

    const chart = new ApexCharts(document.querySelector("#visitors-per-country-chart"), options);
    chart.render();

    // Cleanup on unmount
    return () => {
      chart.destroy();
    };
  }, [chartData]);

  return (
    <div id="visitors-per-country-chart"></div>
  );
};

export default VisitorsPerCountryChart;
