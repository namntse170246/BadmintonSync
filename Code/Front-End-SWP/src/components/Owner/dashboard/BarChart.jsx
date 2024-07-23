import React, { useState, useEffect } from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { GetMonthlyBookingTotals } from "../../API/APIConfigure"; // Adjust the import path as needed

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const BarChart = () => {
  const [bookingData, setBookingData] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBookingData = async () => {
      try {
        const response = await GetMonthlyBookingTotals();
        if (response.success) {
          setBookingData(response.data);
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

  const data = {
    labels: [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ],
    datasets: [
      {
        label: "Bookings",
        data: bookingData.length ? bookingData : Array(12).fill(0), // Default to zeros if no data
        backgroundColor: "rgba(54, 162, 235, 0.2)",
        borderColor: "rgba(54, 162, 235, 1)",
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: "",
      },
    },
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };

  return <Bar data={data} options={options} />;
};

export default BarChart;
