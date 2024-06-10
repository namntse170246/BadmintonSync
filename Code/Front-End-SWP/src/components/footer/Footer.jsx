import "./footer.css";

function Footer() {
  return (
    <div className="Footer">
      <div className="FLists">
        <ul className="FList">
          <li className="fListItem">Các quốc gia</li>
          <li className="fListItem">Khu vực</li>
          <li className="fListItem">Thành Phố</li>
          <li className="fListItem">Quận</li>
        </ul>
        <ul className="FList">
          <li className="fListItem">Sân bóng</li>
          <li className="fListItem">Shop phụ kiện cầu lông</li>
          <li className="fListItem">Cộng đồng cầu lông thủ</li>
        </ul>

        <ul className="FList">
          <li className="fListItem">Dịch vụ khách hàng</li>
          <li className="fListItem">Trợ giúp đối tác</li>
          <li className="fListItem">Careers</li>
          <li className="fListItem">Trung tâm thông tin bảo mật</li>
          <li className="fListItem">Điều khoản và điều kiện</li>
          <li className="fListItem">Liên hệ công ty</li>
        </ul>
      </div>
      <div className="text">
        Bản quyền © 2003–2024 CourtSync.com™. Bảo lưu mọi quyền.
      </div>
    </div>
  );
}

export default Footer;
