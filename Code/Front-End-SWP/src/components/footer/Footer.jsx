import "./footer.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faSquareFacebook,
  faSquareYoutube,
  faLinkedin,
  faInstagram,
} from "@fortawesome/free-brands-svg-icons";

function Footer() {
  return (
    <div className="Footer">
      <div className="block_footer">
        <div className="FLists">
          <h3>CourtSync</h3>
          <ul className="FList">
            <li className="fListItem">Điện thoại: 0944056171</li>
            <li className="fListItem">
              Email:<a href="#">nguyentrungnam01n@gmail.com</a>
            </li>
            <li className="fListItem">
              Địa chỉ: 447, Lê Văn Việt, Tp. Thủ Đức
            </li>
          </ul>
        </div>

        <div className="FLists">
          <h3>Chăm sóc khách hàng</h3>
          <ul className="FList">
            <li className="fListItem">
              <a href="#">Trung tâm trợ giúp</a>
            </li>
            <li className="fListItem">
              <a href="#">Bảo mật</a>
            </li>
            <li className="fListItem">
              <a href="#">Chính sách & Điều kiện</a>
            </li>
          </ul>
        </div>

        <div className="FLists">
          <h3>Giới thiệu</h3>
          <ul className="FList">
            <li className="fListItem">
              <a href="#">Giới thiệu nền tảng</a>
            </li>
            <li className="fListItem">
              <a href="#">Cộng đồng cầu lông</a>
            </li>
          </ul>
        </div>

        <div className="FLists">
          <h3>Theo dõi chúng tôi</h3>
          <ul className="FList">
            <li className="fListItem">
              <FontAwesomeIcon className="logo_Insta" icon={faInstagram} />
              <a className="text1" href="#">
                {" "}
                Instagram
              </a>
            </li>
            <li className="fListItem">
              <FontAwesomeIcon className="logo_Linkedin" icon={faLinkedin} />
              <a className="text1" href="#">
                {" "}
                LinkedIn
              </a>
            </li>
            <li className="fListItem">
              <FontAwesomeIcon
                className="logo_Youtube"
                icon={faSquareYoutube}
              />
              <a className="text1" href="#">
                {" "}
                Youtube
              </a>
            </li>
            <li className="fListItem">
              <FontAwesomeIcon className="logo_Fa" icon={faSquareFacebook} />
              <a className="text1" href="#">
                {" "}
                Facebook
              </a>
            </li>
          </ul>
        </div>

        <div className="FLists">
          <h3>Phương thức thanh toán</h3>
          <ul className="FList">
            <li className="fListItem">
              <img
                style={{
                  height: "40px",
                  marginRight: "10px",
                  marginTop: "10px",
                }}
                src="./src/assets/img/vnPay.png"
                alt="VnPay"
              />
              <span className="text1">VnPay</span>
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
