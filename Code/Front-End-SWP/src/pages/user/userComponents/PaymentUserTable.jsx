import React, { useEffect, useState } from 'react';
import { GetAllBookingsByMemberID } from '../../../components/API/APIConfigure';
import { Link } from 'react-router-dom';
import './PaymentUserTable.css';

function PaymentUserTable() {
  const [data, setData] = useState([]);
  const userInfo = JSON.parse(localStorage.getItem('userInfo'));

  useEffect(() => {
    const fetchPaymentData = async () => {
      try {
        const response = await GetAllBookingsByMemberID(userInfo.id);

        // Sort the data by createDate in descending order
        response.data.sort((a, b) => new Date(b.createDate) - new Date(a.createDate));
        setData(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchPaymentData();
  }, [userInfo.id]);

  // Đối tượng ánh xạ trạng thái
  const statusText = {
    0: { text: 'Chờ thanh toán', button: 'Thanh toán' },
    1: { text: 'Đã thanh toán', button: 'Trả phòng' },
    2: { text: 'Đã hủy', button: 'N/A' }, // Example for "Cancelled" status, button not used
    3: { text: 'Check-in', button: 'N/A' }, // Example for "Check-in" status, button not used
  };

  const statusColor = {
    0: 'red',
    1: 'green',
    2: 'gray', // Color for "Cancelled"
    3: 'blue', // Color for "Check-in"
  };

  return (
    <div>
      <div>
        <h2>Lịch sử thanh toán</h2>
      </div>
      <table width="100%">
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
              <td>{item.promotionCode || 'N/A'}</td> {/* Thay đổi tiêu đề cột nếu cần */}
              <td style={{ padding: '0 30px' }}>
                {new Date(item.createDate).toLocaleDateString('vi-VN')}
              </td>
              <td style={{ padding: '20px 30px', color: statusColor[item.status] }}>
                {statusText[item.status]?.text || 'Unknown'}
              </td>
              <td style={{ padding: '0 30px' }}>{item.amount.toLocaleString()} VNĐ</td>
              <td>
                {(item.status === 0 || item.status === 1) && (
                  <Link to={`/user/checkout/${item.bookingId}`}>
                    <button className="btn-payment" style={{ color: statusColor[item.status] }}>
                      {statusText[item.status]?.button || 'N/A'}
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
