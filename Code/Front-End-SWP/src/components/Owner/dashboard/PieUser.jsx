import { useState, useEffect } from 'react';
import { GetAllAccounts } from '../../API/APIConfigure';
import { PieChart } from '@mui/x-charts/PieChart';
import { Skeleton } from '@mui/material';

export default function PieUser() {
  const [user, setUser] = useState();
  const [pieData, setPieData] = useState();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchUsers = async () => {
      setIsLoading(true);
      try {
        let response = await GetAllAccounts();
        if (!Array.isArray(response)) {
          response = [];
        }
        setUser(response);
        const premiumCount = response.filter((user) => user.isPremium).length;
        const nonPremiumCount = response.length - premiumCount;
        setPieData([
          { id: 0, value: premiumCount, label: 'Thành viên' },
          { id: 1, value: nonPremiumCount, label: 'Khách' },
        ]);
      } catch (err) {
        setUser([]);
        console.error(err);
      }
      setIsLoading(false);
    };

    fetchUsers();
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
        }}
      >
        Thống kê người dùng
      </h2>
      {isLoading ? (
        <Skeleton animation="wave" variant="rectangular" width={500} height={300} />
      ) : (
        <PieChart
          series={[
            {
              data: pieData,
            },
          ]}
          width={400}
          height={200}
        />
      )}
    </div>
  );
}
