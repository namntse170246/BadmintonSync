import React, { useState, useEffect } from "react";
import { Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { GetTotalUserInSystem } from "../../API/APIConfigure"; // Adjust the import path as needed

ChartJS.register(ArcElement, Tooltip, Legend);

const UserDoughnutChart = () => {
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
  const [stats, setStats] = useState({
    totalAdmin: 0,
    totalOwner: 0,
    totalUser: 0,
    totalAccounts: 0,
  });
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBookingData = async () => {
      try {
        const response = await GetTotalUserInSystem();
        if (response.success) {
          const { totalAdmin, totalOwner, totalUser } = response.data;
          const totalAccounts = totalAdmin + totalOwner + totalUser;

          setChartData({
            labels: ["Admin", "Owner", "User"],
            datasets: [
              {
                data: [totalAdmin, totalOwner, totalUser],
                backgroundColor: ["#FF6384", "#36A2EB", "#FFCE56"],
                hoverBackgroundColor: ["#FF6384", "#36A2EB", "#FFCE56"],
              },
            ],
          });

          setStats({ totalAdmin, totalOwner, totalUser, totalAccounts });
        } else {
          setError("Failed to fetch data");
        }
      } catch (err) {
        setError(err.message);
      }
    };

    fetchBookingData();
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
        <h2>Tổng số tài khoản: {stats.totalAccounts}</h2>
      </div>
    </div>
  );
};

export default UserDoughnutChart;
