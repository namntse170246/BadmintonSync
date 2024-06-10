import React, { useState } from 'react';
import PaypalPre from './PaypalPre';
import './showPlan.css';
const ShowPlan = () => {
  const premiumPlan = {
    id: 1,
    price: 120000,
    fee: (120000 / 100) * 8.4,
  };

  return (
    <div className="showPlan">
      <div className="cardPlan">
        <div key={premiumPlan.id}>
          <div className="bannerPlan">
            <h1 className="title">Gói thành viên 1 tháng</h1>
            <p className="title-children">
              Bạn sẽ được đăng bài không giới hạn trong 1 tháng, sử dụng các tính năng nổi bật của
              chúng tôi mang lại cho bạn !!!
            </p>
            <p className="title-children">Giá :{premiumPlan.price.toLocaleString()}VNĐ</p>
            <p className="title-children">
              Phí giao dịch: {Math.round(premiumPlan.fee).toLocaleString()}
              VNĐ
            </p>
            <div className="planLine"></div>
            <p className="title-total">
              Tổng cộng: {Math.round(premiumPlan.price + premiumPlan.fee).toLocaleString()}
              VNĐ
            </p>
          </div>
        </div>
        <PaypalPre amount={Math.round((premiumPlan.price + premiumPlan.fee) / 24500)} />
      </div>
    </div>
  );
};

export default ShowPlan;
