import "./footer.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSquareFacebook, faYoutube, faLinkedin, faSquareInstagram } from "@fortawesome/free-brands-svg-icons";

function Footer() {
  return (
    <div className="Footer">
      <div className="block_footer">
      <div className="FLists">
        <h3>CourtSync</h3>
        <ul className="FList">
          <li className="fListItem">Điện thoại: 0911237785</li>
          <li className="fListItem">Email:<a href="#">courtb454@gmail.com</a></li>
          <li className="fListItem">Địa chỉ: 447, Lê Văn Việt, Tp. Thủ Đức</li>
        </ul>
      </div>

      <div className="FLists">
        <h3>Chăm sóc khách hàng</h3>
        <ul className="FList">
          <li className="fListItem"><a href="#">Trung tâm trợ giúp</a></li>
          <li className="fListItem"><a href="#">Bảo mật</a></li>
          <li className="fListItem"><a href="#">Chính sách & Điều kiện</a></li>
        </ul>
      </div>

      <div className="FLists">
        <h3>Giới thiệu</h3>
        <ul className="FList">
          <li className="fListItem"><a href="#">Giới thiệu nền tảng</a></li>
          <li className="fListItem"><a href="#">Cộng đồng cầu lông</a></li>
        </ul>
      </div>

      <div className="FLists">
        <h3>Theo dõi chúng tôi trên</h3>
        <ul className="FList">
          <li className="fListItem"><FontAwesomeIcon className="logo_Insta" icon={faSquareInstagram} /><a href="#"> Instagram</a></li>
          <li className="fListItem"><FontAwesomeIcon className="logo_Linkedin" icon={faLinkedin} /><a href="#"> LinkedIn</a></li>
          <li className="fListItem"><FontAwesomeIcon className="logo_Youtube" icon={faYoutube} /><a href="#"> Youtube</a></li>
          <li className="fListItem"><FontAwesomeIcon className="logo_Fa" icon={faSquareFacebook} /><a href="#"> Facebook</a></li>
        </ul>
      </div>

      <div className="FLists">
        <h3>Phương thức thanh toán</h3>
        <ul className="FList">
          <li className="fListItem">
            <img style={{height: "40px", paddingRight: "20px"}} src="./src/assets/img/momo.png" alt="MoMo" />
            <span className="content">MOMO</span>
          </li>
          <li className="fListItem">
          <img style={{height: "40px", paddingRight: "20px", marginTop : "10px"}} src="./src/assets/img/vnPay.png" alt="VnPay" />
          <span className="content">VnPay</span>
          </li>
        </ul>
      </div>
      </div>
      <hr />
      <div className="text_copy">
        Copyright © 2003–2024 CourtSync.com™. All rights reserved.
      </div>
    </div>
  );
}

export default Footer;
