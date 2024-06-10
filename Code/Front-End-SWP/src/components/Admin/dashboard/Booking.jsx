import { useState, useEffect } from 'react';
import { GetAllBookings } from '../../API/APIConfigure';
import { BarChart } from '@mui/x-charts/BarChart';
import { toast } from 'react-toastify';
import { Skeleton } from '@mui/material';

export default function Booking() {
  const [bookings, setBookings] = useState([]);
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

  useEffect(() => {
    fetchBookings();
  }, [startDate, endDate]);

  const fetchBookings = async () => {
    setIsLoading(true);
    try {
      const response = await GetAllBookings();
      let filteredBookings = Array.isArray(response) ? response : [];
      if (startDate && endDate) {
        filteredBookings = filteredBookings.filter((booking) => {
          const bookingDate = new Date(booking.createdDay);
          const start = new Date(startDate);
          const end = new Date(endDate);

          bookingDate.setHours(0, 0, 0, 0);
          start.setHours(0, 0, 0, 0);
          end.setHours(0, 0, 0, 0);

          return bookingDate >= start && bookingDate <= end;
        });
      }
      if (filteredBookings.length === 0) {
        toast.error('Không có dữ liệu cho khoảng thời gian này.');
      } else {
        setBookings(filteredBookings);
      }
    } catch (err) {
      setBookings([]);
      console.error(err);
    }
    setIsLoading(false);
  };

  const convertToDate = (dateString) => {
    const date = new Date(dateString);
    return `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`;
  };

  let bookingsPerDay = {};

  bookings.forEach((booking) => {
    const date = convertToDate(booking.createdDay);
    bookingsPerDay[date] = (bookingsPerDay[date] || 0) + 1;
  });

  // Convert this object to an array to use in `BarChart`.
  const dates = Object.keys(bookingsPerDay);
  dates.sort(
    (a, b) =>
      new Date(a.split('-').reverse().join('-')) - new Date(b.split('-').reverse().join('-'))
  );
  const sortedCounts = dates.map((date) => bookingsPerDay[date]);

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
      <h1
        style={{
          color: '#205295',
          fontSize: '30px',
          marginTop: '20px',
          marginBottom: '20px',
          fontWeight: 'bold',
        }}
      >
        Số lượng đặt hàng
      </h1>
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
        <Skeleton animation="wave" variant="rectangular" width={500} height={300} />
      ) : (
        <>
          <BarChart
            xAxis={[{ scaleType: 'band', data: dates.slice(0, 10) }]}
            series={[{ data: sortedCounts.slice(0, 10) }]}
            width={500}
            height={300}
          />
        </>
      )}
    </>
  );
}
