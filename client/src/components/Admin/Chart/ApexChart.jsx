import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import ReactApexChart from 'react-apexcharts';

 export const ApexChart = ({xData,yData}) => {
  
  const [chartData, setChartData] = useState({
    series: [{
      name: 'Sales',
      data: yData,
    }],
    options: {
      chart: {
        height: 350,
        type: 'line',
        dropShadow: {
            enabled: true,
            color: '#000',
            top: 18,
            left: 7,
            blur: 10,
            opacity: 0.2
          },
          toolbar: {
            show: false
          }
      },
      // forecastDataPoints: {
      //   count: 7
      // },
      stroke: {
        width: 5,
        curve: 'smooth'
      },
      markers: {
        size: 1
      },
      xaxis: {
        type: 'datetime',
        // categories:  xData,
        categories: ['1/11/2000', '2/11/2000', '3/11/2000', '4/11/2000', '5/11/2000', '6/11/2000', '7/11/2000', '8/11/2000', '9/11/2000', '10/11/2000', '11/11/2000', '12/11/2000', '1/11/2001', '2/11/2001'],
        tickAmount: 10,
        labels: {
          formatter: function(value, timestamp, opts) {
            return opts.dateFormatter(new Date(timestamp), 'dd MMM')
          }
        }
      },
      legend: {
        position: 'top',
        horizontalAlign: 'right',
        floating: true,
        offsetY: -25,
        offsetX: -5
      },
      title: {
        text: 'Forecast',
        align: 'left',
        style: {
          fontSize: "16px",
          color: '#666'
        }
      },
      // fill: {
      //   type: 'gradient',
      //   gradient: {
      //     shade: 'dark',
      //     gradientToColors: [ '#FDD835'],
      //     shadeIntensity: 1,
      //     type: 'horizontal',
      //     opacityFrom: 1,
      //     opacityTo: 1,
      //     stops: [0, 100, 100, 100]
      //   },
      // },
      dataLabels: {
        style: {
          colors: ['#F44336', '#E91E63', '#9C27B0']
        }
      },
      
      yaxis: {
        min: -10,
        max: 40
      }
    }
  });

  return (
    <div id="chart">
      <ReactApexChart  options={chartData.options} series={chartData.series} type="line" height={350} />
    </div>
  );
};

export default ApexChart;

