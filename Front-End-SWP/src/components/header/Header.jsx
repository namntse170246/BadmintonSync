import { Link } from "react-router-dom";
import bg1 from "../../assets/img/banner.png";
import "./header.css";

const Header = ({ isUnVisible }) => {
  return (
    <div className={`header-element-contain ${isUnVisible ? "visible" : ""}`}>
      <div className="block block-vinpearl-content block-homepage-banner-block">
        <div className="block-content">
          <div className="banner-block ht_relative">
            <div className="banner-wrapper">
              <img
                src={bg1}
                alt="bg"
                width={"100%"}
                height={"100%"}
                style={{ objectFit: "cover" }}
              />
              <div className="banner-container">
                <div className="banner-info">
                  <div className="banner-tit">Chào mừng đến CourtSync</div>
                  <div className="banner-des">
                    Why play less, when you can play more !
                  </div>
                  <div className="banner-cta">
                    <Link to="/hotels">Khám phá ! </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
