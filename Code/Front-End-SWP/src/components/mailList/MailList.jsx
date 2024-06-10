import "./mailList.css";

function MailList() {
  return (
    <div className="mailContainer">
      <div className="mail">
        <h1 className="mailTitle">Tiết kiệm thời gian và tiền bạc!</h1>
        <span className="mailDesc">
          Hãy đăng ký và chúng tôi sẽ gửi những ưu đãi tốt nhất cho bạn
        </span>
        <div className="mailInputContainer">
          <input type="text" placeholder="Địa chỉ e-mail của bạn" />
          <button>Đăng ký</button>
        </div>
      </div>
      <div className="mailDangky">
        <div className="mailDangkyText">Hợp tác với chúng tôi ?</div>
      </div>
      <div className="mailOptions">
        <ul className="ulOptions">
          <li className="liOption">Phiên bản di động</li>
          <li className="liOption">Tài khoản của bạn</li>
          <li className="liOption">Dịch vụ khách hàng</li>
          <li className="liOption">Trở thành đối tác của nhà phân phối</li>
          <li className="liOption">Booking for business</li>
        </ul>
      </div>
    </div>
  );
}

export default MailList;
