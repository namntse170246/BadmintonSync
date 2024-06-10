import React from 'react';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';
import { CreateTrade } from '../../API/APIConfigure';

function ConfirmTrade({ yourReal, theirReal, startDay, endDay }) {
  const navigate = useNavigate();
  const handleSubmit = async () => {
    if (yourReal.memberID === theirReal.memberID) {
      Swal.fire({
        icon: 'error',
        title: 'Lỗi',
        text: 'Không thể tạo yêu cầu trao đổi với địa điểm bạn sở hữu',
      });
      return;
    }
    try {
      const tradeData = {
        memberId1: yourReal.memberID,
        memberId2: theirReal.memberID,
        timeshareId1: yourReal.id,
        timeshareId2: theirReal.id,
        startDay: startDay,
        endDay: endDay,
        status: '1',
      };
      const response = await CreateTrade(tradeData);
      Swal.fire({
        icon: 'success',
        title: 'Thành công',
        text: 'Đã tạo yêu cầu trao đổi',
      }).then(() => {
        navigate(`/trade/detail/${response.exchangeId}`);
      });
    } catch (error) {
      console.error(error);
      Swal.fire({
        icon: 'error',
        title: 'Lỗi',
        text: 'Lỗi khi tạo yêu cầu trao đổi',
      });
    }
  };

  return (
    <div>
      <button className="button-6" onClick={handleSubmit}>
        Submit
      </button>
    </div>
  );
}

export default ConfirmTrade;
