import React, { useEffect, useState } from 'react';
import { GetAllBookingsByMemberID } from '../../components/API/APIConfigure';
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

// Đối tượng ánh xạ trạng thái
const statusTexts = {
  0: "Pending",
  1: "Confirmed",
  2: "Cancelled",
  3: "Check-in",
  4: "Checked",
};

function ChartPaymentUser() {
  const [data, setData] = useState([]);
  const [totalPayment, setTotalPayment] = useState(0); // State to hold the total payment amount
  const userInfo = JSON.parse(localStorage.getItem('userInfo'));

  useEffect(() => {
    const fetchPaymentData = async () => {
      try {
        const response = await GetAllBookingsByMemberID(userInfo.id);
        console.log(response);

        // Sort the data by createDate in increasing order
        response.data.sort((a, b) => new Date(a.createDate) - new Date(b.createDate));

        // Extracting payment data from response
        const paymentData = response.data.map((item) => ({
          date: new Date(item.createDate).toLocaleDateString('en-US'),
          amount: item.amount,
          status: statusTexts[item.status] || "Unknown", // Sử dụng statusTexts để ánh xạ trạng thái
        }));

        // Filter payments to exclude "Cancelled" and "Pending"
        const filteredPayments = paymentData.filter(item =>
          item.status !== "Cancelled" && item.status !== "Pending"
        );

        setData(filteredPayments);
        console.log(filteredPayments);

        // Calculate total payment amount for filtered payments
        const totalAmount = filteredPayments.reduce((acc, curr) => acc + curr.amount, 0);
        setTotalPayment(totalAmount);
      } catch (error) {
        console.error(error);
      }
    };

    fetchPaymentData();
  }, [userInfo.id]);

  // Custom formatter function for XAxis ticks
  const formatXAxis = (tickItem) => {
    // Format tickItem to mm/dd/yyyy
    const date = new Date(tickItem);
    return `${date.getMonth() + 1}/${date.getDate()}/${date.getFullYear()}`;
  };

  // Custom formatter function for Y-axis ticks
  const formatMoney = (value) => {
    // Format value to include commas for thousands and add VND
    return `${value.toLocaleString()} VNĐ`;
  };

  return (
    <div>
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
            data={data}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" tickFormatter={formatXAxis} />
            <YAxis tickFormatter={formatMoney} />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="amount" stroke="#28a61d" activeDot={{ r: 8 }} />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

export default ChartPaymentUser;
