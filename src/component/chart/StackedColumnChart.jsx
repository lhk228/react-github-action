import React from "react";
import Chart from "react-apexcharts";

const StackedColumnChart = (props) => {
  const Data = props.stackedChart;

  const series = Data?.map((i) => ({
    name: i.name,
    data: i.data,
  }));

  const options = {
    chart: {
      type: "bar",
      stacked: true,
      toolbar: {
        show: false,
      },
    },
    colors: ["#3e68d8", "#ff8311", "#b6b9c7", "#ffc803"],
    plotOptions: {
      bar: {
        horizontal: false,
        columnWidth: "40%",
      },
    },
    dataLabels: {
      enabled: false,
    },
    legend: {
      position: "top",
      fontSize: "13px",
      fontFamily: "PretendardM, Helvetica, Arial, sans-serif",
    },
    xaxis: {
      type: "category",
      categories: ["A", "B", "C"],
      labels: {
        show: true,
        style: {
          fontSize: "13px",
          fontFamily: "PretendardM, Helvetica, Arial, sans-serif",
          fontWeight: 400,
          cssClass: "apexcharts-xaxis-label",
        },
        offsetX: 0,
        offsetY: 0,
      },
    },
    yaxis: {
      labels: {
        show: true,
        style: {
          fontSize: "13px",
          fontFamily: "PretendardM, Helvetica, Arial, sans-serif",
          fontWeight: 400,
          cssClass: "apexcharts-xaxis-label",
        },
      },
    },
  };
  return <Chart options={options} series={series} type="bar" height={320} width={320} />;
};

export default StackedColumnChart;
