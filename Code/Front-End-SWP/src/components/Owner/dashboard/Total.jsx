import { useState, useEffect } from 'react';
import { GetAllPayment } from '../../API/APIConfigure';
import { Skeleton, Typography } from '@mui/material';
export default function Total() {
  const [payment, setPayment] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const [totalPayment, setTotalPayment] = useState(0);

  useEffect(() => {
    const fetchPayment = async () => {
      setIsLoading(true);
      try {
        let response = await GetAllPayment();
        if (!Array.isArray(response)) {
          response = [];
        }
        setPayment(response);

        const total = response.reduce(
          (sum, payment) => (payment.status === '2' ? sum + payment.money : sum),
          0
        );
        setTotalPayment(total);
      } catch (err) {
        setPayment([]);
        console.error(err);
      }
      setIsLoading(false);
    };
    fetchPayment();
  }, []);

  return (
    <div>
      <h2
        style={{
          color: '#205295',
          fontSize: '30px',
          marginTop: '20px',
          marginBottom: '20px',
          fontWeight: 'bold',
          align: 'center',
        }}
      >
        Doanh thu hiện tại
      </h2>
      {isLoading ? (
        <Skeleton animation="wave" variant="rectangular" width={500} height={300} />
      ) : (
        <Typography variant="h6">
          Tổng doanh thu: {((totalPayment / 100) * 2.5).toLocaleString()} VNĐ
        </Typography>
      )}
    </div>
  );
}
