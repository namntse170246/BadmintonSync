import { Link } from "react-router-dom";
import bg1 from "../../assets/img/wall1.jpg";
import bg2 from "../../assets/img/wall2.jpg";
import bg3 from "../../assets/img/wall3.jpg";

import "./header.css";

const Header = ({ isUnVisible }) => {
  return (
    <div className={`header-element-contain ${isUnVisible ? "visible" : ""}`}>
      <div className="block block-vinpearl-content block-homepage-banner-block">
        <div className="block-content">
          <div className="banner-block ht_relative">
            <div className="banner-wrapper">
              <div className="banner-container">
                <div className="banner-info">
                  <div className="banner-tit">Chào mừng đến với CourtSync</div>
                  <div className="banner-des">
                    Chơi nhiều hơn, tận hưởng nhiều hơn!
                  </div>
                  <div className="banner-cta">
                    <Link to="/courts">Khám phá!</Link>
                  </div>
                </div>
              </div>
              <img className="banner-image image1" src={bg1} alt="bg1" />
              <img className="banner-image image2" src={bg2} alt="bg2" />
              <img className="banner-image image3" src={bg3} alt="bg3" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
