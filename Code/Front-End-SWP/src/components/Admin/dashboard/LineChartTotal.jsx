import { useState, useEffect } from 'react';
import { GetAllPayment } from '../../API/APIConfigure';
import { LineChart } from '@mui/x-charts/LineChart';
import { toast } from 'react-toastify';
import { Skeleton } from '@mui/material';

export default function LineChartTotal() {
  const [payment, setPayment] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const today = new Date();
  const fiveDaysAgo = new Date();
  fiveDaysAgo.setDate(today.getDate() - 5);
  const formattedToday = `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(
    2,
    '0'
  )}-${String(today.getDate()).padStart(2, '0')}`;
  const formattedFiveDaysAgo = `${fiveDaysAgo.getFullYear()}-${String(
    fiveDaysAgo.getMonth() + 1
  ).padStart(2, '0')}-${String(fiveDaysAgo.getDate()).padStart(2, '0')}`;

  const [startDate, setStartDate] = useState(formattedFiveDaysAgo);
  const [endDate, setEndDate] = useState(formattedToday);
  const [dates, setDates] = useState([]);
  const [sortedAmounts, setSortedAmounts] = useState([]);

  useEffect(() => {
    fetchBookings();
  }, [startDate, endDate]);

  const fetchBookings = async () => {
    setIsLoading(true);
    try {
      const response = await GetAllPayment();
      let filteredBookings = Array.isArray(response) ? response : [];
      let datesTemp = [];
      let sortedAmountsTemp = [];
      if (startDate && endDate) {
        filteredBookings = filteredBookings.filter((booking) => {
          const bookingDate = new Date(booking.date);
          const start = new Date(startDate);
          const end = new Date(endDate);
          return bookingDate >= start && bookingDate <= end && booking.status === '2';
        });
        filteredBookings.sort((a, b) => new Date(a.date) - new Date(b.date));
      }
      filteredBookings.forEach((booking) => {
        if (booking.date && booking.money) {
          const bookingDate = new Date(booking.date);
          const formattedDate = bookingDate.toLocaleDateString();
          datesTemp.push(formattedDate);
          sortedAmountsTemp.push((booking.money / 100) * 2.5);
        }
      });
      if (filteredBookings.length === 0) {
        toast.error('Không có dữ liệu cho khoảng thời gian này.');
      } else {
        setPayment(filteredBookings);
        setDates(datesTemp);
        setSortedAmounts(sortedAmountsTemp);
      }
    } catch (err) {
      setPayment([]);
      console.error(err);
    }
    setIsLoading(false);
  };

  const handleEndDateChange = (e) => {
    const newEndDate = e.target.value;
    if (newEndDate < startDate) {
      toast.error('Ngày kết thúc không thể nhỏ hơn ngày bắt đầu!');
    } else {
      setEndDate(newEndDate);
    }
  };

  return (
    <>
      <h1>Chọn ngày</h1>
      <label>
        Ngày bắt đầu:
        <input type="date" value={startDate} onChange={(e) => setStartDate(e.target.value)} />
      </label>
      <label>
        Ngày kết thúc:
        <input type="date" value={endDate} onChange={handleEndDateChange} />
      </label>
      {isLoading ? (
        <Skeleton animation="wave" variant="rectangular" width={700} height={300} />
      ) : (
        <div style={{ marginLeft: '20px' }}>
          <LineChart
            xAxis={[{ scaleType: 'band', data: dates }]}
            series={[{ data: sortedAmounts }]}
            width={1000}
            height={450}
          />
        </div>
      )}
    </>
  );
}
