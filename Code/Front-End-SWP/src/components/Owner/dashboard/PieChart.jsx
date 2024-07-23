import React, { useState, useEffect } from "react";
import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend, Title } from "chart.js";
import { GetBookingCancellationPercentage } from "../../API/APIConfigure";

ChartJS.register(ArcElement, Tooltip, Legend, Title);

const PieChart = () => {
  const [cancelRate, setCancelRate] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCancelRate = async () => {
      try {
        const response = await GetBookingCancellationPercentage();
        setCancelRate(response);
      } catch (err) {
        setError(err.message);
      }
    };

    fetchCancelRate();
  }, []);

  if (error) {
    return <div>Error: {error}</div>;
  }

  const data = {
    labels: ["Canceled", "Booked Successfully"],
    datasets: [
      {
        data: cancelRate !== null ? [cancelRate, 100 - cancelRate] : [0, 100],
        backgroundColor: ["#FF6384", "#36A2EB"],
        hoverOffset: 4,
      },
    ],
  };

  const options = {
    plugins: {
      title: {
        display: true,
        text: "",
      },
      legend: {
        display: false, // Disable the default legend
      },
    },
  };

  const customLegend = [
    {
      label: "Canceled",
      color: "#FF6384",
      value: cancelRate !== null ? cancelRate : 0,
    },
    {
      label: "Booked Successfully",
      color: "#36A2EB",
      value: cancelRate !== null ? 100 - cancelRate : 100,
    },
  ];

  return (
    <div style={{ textAlign: "center" }}>
      <Pie data={data} options={options} />
      <div style={{ marginTop: "20px" }}>
        {customLegend.map((item, index) => (
          <div
            key={index}
            style={{
              display: "inline-block",
              margin: "0 10px",
              textAlign: "center",
            }}
          >
            <div style={{ display: "flex", alignItems: "center" }}>
              <div
                style={{
                  width: "10px",
                  height: "10px",
                  backgroundColor: item.color,
                  marginRight: "5px",
                }}
              ></div>
              <span>{item.label}</span>
              <br />
              <span>: {item.value}%</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PieChart;
