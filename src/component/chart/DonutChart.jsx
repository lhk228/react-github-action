import React from "react";
import Chart from "react-apexcharts";

const DonutChart = (props) => {
  const options = {
    chart: {
      type: "donut",
      fontFamily: "PretendardR",
      toolbar: {
        show: false,
      },
    },
    legend: {
      show: false,
      position: "right",
      fontSize: "13px",
      fontFamily: "PretendardM, Helvetica, Arial, sans-serif",
    },
    labels: ["1", "2", "3", "4", "5"],
    colors: ["#00a2ff", "#1de72e", "#ffdb1f", "#ff7134", "#f31f1f"],
    plotOptions: {
      pie: {
        donut: {
          size: "50%",
          labels: {
            show: true,
            total: {
              fontFamily: "PretendardB",
              show: true,
              showAlways: true,
              fontSize: "20px",
              label: "위험도",
              formatter: function () {
                return "";
              },
            },
          },
        },
      },
    },
    dataLabels: {
      enabled: true,
      formatter: function (val, { seriesIndex, dataPointIndex, w }) {
        return w.config.series[seriesIndex];
      },
      textAnchor: "middle",
      style: {
        fontSize: "14px",
        fontFamily: "PretendardM, Helvetica, Arial, sans-serif",
        fontWeight: "bold",
        colors: ["#ffffff"],
      },
    },
    tooltip: {
      enabled: false,
    },
  };

  return <Chart options={options} series={props.donutchart} type="donut" width={380} />;
};

export default DonutChart;
