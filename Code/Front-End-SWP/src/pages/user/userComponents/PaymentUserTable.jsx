import React, { useEffect, useState } from 'react';
import { GetPaymentByUserID } from '../../../components/API/APIConfigure';
import { Link } from 'react-router-dom';
import './PaymentUserTable.css';

function PaymentUserTable() {
  const [data, setData] = useState([]);
  const userInfo = JSON.parse(localStorage.getItem('userInfo'));

  useEffect(() => {
    const fetchPaymentData = async () => {
      try {
        const response = await GetPaymentByUserID(userInfo.id);
        // Sort the data by date in descending order
        response.sort((a, b) => new Date(b.date) - new Date(a.date));
        setData(response);
      } catch (error) {
        console.error(error);
      }
    };

    fetchPaymentData();
  }, [userInfo.id]);

  const statusText = {
    1: { text: 'Chờ thanh toán', button: 'Thanh toán ' },
    2: { text: 'Đã thanh toán', button: 'Trả phòng' },
  };

  const statusColor = {
    1: 'red',
    2: 'green',
  };

  return (
    <div>
      <div>
        <h2>Lịch sử thanh toán</h2>
      </div>
      <table width={{ width: '100%' }}>
        <thead>
          <tr>
            <th>Đặt</th>
            <th>Ngày</th>
            <th>Trạng Thái</th>
            <th>Giá Tiền</th>
            <th>Thanh Toán</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item, index) => (
            <tr key={index}>
              <td>{item.title}</td>
              <td style={{ padding: '0 30px' }}>
                {new Date(item.date).toLocaleDateString('vi-VN')}
              </td>
              <td style={{ padding: '20px 30px', color: statusColor[item.status] }}>
                {statusText[item.status].text}
              </td>
              <td style={{ padding: '0 30px' }}>{item.money.toLocaleString()}VNĐ</td>
              <td>
                {item.title !== 'Nâng cấp thành viên' && (
                  <Link to={`/user/checkout/${item.bookingId}`}>
                    <button className="btn-payment" style={{ color: statusColor[item.status] }}>
                      {statusText[item.status].button}
                    </button>
                  </Link>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default PaymentUserTable;
