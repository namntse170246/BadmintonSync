import React, { useEffect, useState } from 'react';
import { BASE_URL, GetTradeByID, GetUserByID, GetbyRealestateID } from '../../API/APIConfigure';
import './tabletrade.css';
import { useParams } from 'react-router-dom';
import ConfirmTrade from '../Trade/ConfirmTrade';
import UpdateStatus from './UpdateStatus';
import './showTradeDetail.css';
const ShowTradeDetails = () => {
  const { id } = useParams();
  const [trade, setTrade] = useState(null);
  const [dataReal1, setDataReal1] = useState(null);
  const [dataReal2, setDataReal2] = useState(null);
  const [member1, setMember1] = useState(null);
  const [member2, setMember2] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const tradeResponse = await GetTradeByID(id);
        setTrade(tradeResponse);

        if (tradeResponse) {
          const real1Response = await GetbyRealestateID(tradeResponse.timeshareId1);
          setDataReal1(real1Response);

          const real2Response = await GetbyRealestateID(tradeResponse.timeshareId2);
          setDataReal2(real2Response);

          const member1Response = await GetUserByID(tradeResponse.memberId1);
          setMember1(member1Response);

          const member2Response = await GetUserByID(tradeResponse.memberId2);
          setMember2(member2Response);
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchData();
  }, [id]);

  function getStatus(status) {
    switch (status) {
      case '1':
        return { className: 'status-1', text: 'Chờ xác nhận' }; // Return class name and text for status 1
      case '2':
        return { className: 'status-2', text: 'Đã xác nhận' }; // Return class name and text for status 2
      case '3':
        return { className: 'status-3', text: 'Hủy' }; // Return class name and text for status 3
      default:
        return { className: '', text: 'Trạng thái không xác định' }; // Return default class name and text for undefined status
    }
  }

  return (
    <div className="homeContainer">
      <div className="tradeWapperTradeDetail">
        <h1 className="tradeTitleDetail">Thông tin chi tiết về trao đổi của bạn</h1>
        <div className="tradeCard">
          {trade && (
            <div className="trade1">
              <h2>Bất động sản của bạn</h2>
              {dataReal1 && (
                <img
                  className="img-trade"
                  src={BASE_URL + dataReal1.photo.split(',')[0]}
                  alt={trade.name}
                />
              )}
              <h1>Tên khách sạn: {dataReal1 && dataReal1.name}</h1>
              <h1>Địa chỉ: {dataReal1 && dataReal1.location}</h1>
            </div>
          )}
          <div className="trade2">
            <h2>Bất động sản muốn trao đổi</h2>
            {dataReal2 && (
              <img
                className="img-trade"
                src={BASE_URL + dataReal2.photo.split(',')[0]}
                alt={dataReal2.name}
              />
            )}

            <h1>Tên khách sạn: {dataReal2 && dataReal2.name}</h1>
            <h1>Địa chỉ: {dataReal2 && dataReal2.location}</h1>
          </div>
        </div>
        {trade && trade.status === '2' && member1 && member2 && (
          <div className="tradeInfor">
            <h1 className="tradeInforTitle">Thông tin trao đổi</h1>
            <div className="tradeInforDetail">
              <div className="tradeInfor1">
                <h1>Thông tin chủ của : {dataReal1.name}</h1>
                <h1>Tên: {member1.fullName}</h1>
                <h1>Số điện thoại: {member1.phone}</h1>
                <h1>Địa chỉ: {member1.address}</h1>
              </div>
              <div className="tradeInfor2">
                <h1>Thông tin chủ của : {dataReal2.name}</h1>
                <h1>Tên: {member2.fullName}</h1>
                <h1>Số điện thoại: {member2.phone}</h1>
                <h1>Địa chỉ: {member2.address}</h1>
              </div>
            </div>
          </div>
        )}
        <div className="statusTrade">
          <button className={`statusTradeDetail ${getStatus(trade && trade.status).className}`}>
            {trade && getStatus(trade.status).text}
          </button>
          <button>
            <UpdateStatus idTrade={id} status={trade && trade.status} datamem2={member2} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ShowTradeDetails;
