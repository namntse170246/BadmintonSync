import React, { useEffect, useState } from 'react';
import { GetPaymentByUserID } from '../../components/API/APIConfigure';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';

function ChartPaymentUser() {
  const [data, setData] = useState([]);
  const [statusUSER, setStatusUSER] = useState([]);
  const [totalPayment, setTotalPayment] = useState(0); // State to hold the total payment amount
  const userInfo = JSON.parse(localStorage.getItem('userInfo'));

  useEffect(() => {
    const fetchPaymentData = async () => {
      try {
        const response = await GetPaymentByUserID(userInfo.id);

        // Sort the data by date in increasing order
        response.sort((a, b) => new Date(a.date) - new Date(b.date));

        setData(response);

        // Extract status values
        const statusValues = response.map((item) => item.status);
        setStatusUSER(statusValues);

        // Calculate total payment amount for transactions with statusUSER equal to '2'
        const filteredPayments = response.filter((item, index) => statusValues[index] === '2');
        const totalAmount = filteredPayments.reduce((acc, curr) => acc + curr.money, 0);
        setTotalPayment(totalAmount);
      } catch (error) {
        console.error(error);
      }
    };

    fetchPaymentData();
  }, [userInfo.id]);

  // Extracting dates and money from the data for chart
  const chartData = data.map((item) => ({
    date: new Date(item.date).toLocaleDateString('en-US'),
    Tiền: item.money,
  }));

  // Filter chartData based on statusUSER
  const filteredChartData = chartData.filter((item, index) => statusUSER[index] === '2');

  // Custom formatter function for Y-axis ticks
  const formatMoney = (value) => {
    // Format value to include commas for thousands and add VND
    return `${value.toLocaleString()} VNĐ`;
  };

  return (
    <div>
      <h2>Thống kê thanh toán</h2>
      <div>
        <div style={{ marginBottom: '20px' }}>
          Tổng tiền đã thanh toán : {formatMoney(totalPayment)}
        </div>
        <ResponsiveContainer width="100%" height={400}>
          <LineChart
            margin={{
              top: 30,
              right: 30,
              left: 50,
              bottom: 5,
            }}
            data={filteredChartData}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" />
            <YAxis tickFormatter={formatMoney} style={{ marginLeft: '500px' }} />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="Tiền" stroke="#28a61d" activeDot={{ r: 8 }} />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

export default ChartPaymentUser;
