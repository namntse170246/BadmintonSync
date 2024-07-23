import React, { useState, useEffect } from "react";
import { Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { GetTotalCourtsInSystem } from "../../API/APIConfigure"; // Adjust the import path as needed

ChartJS.register(ArcElement, Tooltip, Legend);

const generateRandomColor = () => {
  // Generate a random color in hex format
  const randomColor = `#${Math.floor(Math.random() * 16777215).toString(16)}`;
  return randomColor;
};

const TotalCourtsDoughnutChart = () => {
  const [chartData, setChartData] = useState({
    labels: [],
    datasets: [
      {
        data: [],
        backgroundColor: [],
        hoverBackgroundColor: [],
      },
    ],
  });
  const [totalCourts, setTotalCourts] = useState(0);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await GetTotalCourtsInSystem();
        if (response.success) {
          const ownersData = response.data;

          const labels = ownersData.map((owner) => owner.ownerName);
          const data = ownersData.map((owner) => owner.totalCourt);
          const backgroundColor = ownersData.map(() => generateRandomColor());
          const hoverBackgroundColor = backgroundColor;

          const total = data.reduce((sum, current) => sum + current, 0);
          setTotalCourts(total);

          setChartData({
            labels: labels,
            datasets: [
              {
                data: data,
                backgroundColor: backgroundColor,
                hoverBackgroundColor: hoverBackgroundColor,
              },
            ],
          });
        } else {
          setError("Failed to fetch data");
        }
      } catch (err) {
        setError(err.message);
      }
    };

    fetchData();
  }, []);

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div>
      <Doughnut data={chartData} />
      <div className="legend">
        {chartData.labels &&
          chartData.labels.map((label, index) => (
            <div key={index} className="legend-item">
              <span
                className="legend-color"
                style={{
                  backgroundColor: chartData.datasets[0].backgroundColor[index],
                }}
              ></span>
            </div>
          ))}
      </div>
      <div className="stats">
        <p>Total Courts: {totalCourts}</p>
      </div>
    </div>
  );
};

export default TotalCourtsDoughnutChart;
