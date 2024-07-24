import { Link } from "react-router-dom";
import "./featured.css";
const Featured = ({ homeTitleRef }) => {
  return (
    <div className="block block-vinpearl-content block-homepage-exp-block">
      <div className="block-content">
        <div className="exp-block">
          <div className="home-container">
            <h2 className="homepage-tit wow animate__animated animate__fadeInUp">
              Những địa điểm nổi bật
            </h2>
            <div className="exp-content wow animate__animated animate__fadeInUp">
              <div className="exp-item exp-item-1 _741x500">
                <div className="img-wrapper_1">
                  <img
                    className="img1"
                    src="https://localhost:7155/Uploads/37ecefc9-f37c-4554-bfee-bab686d149c4.png"
                    alt=""
                  />
                </div>
                <div className="info-wrapper">
                  <div className="exp-item-tit eb-garamond three_dots_1">
                    Sân mới được thêm vào 🎉
                  </div>
                  <div className="exp-item-des three_dots_1">
                    Mang lại trải nghiệm tốt nhất!
                  </div>
                  <div className="exp-item-cta">
                    <Link to="/courts" className="eb-garamond three_dots_1">
                      Khám phá!
                    </Link>
                  </div>
                </div>
              </div>
              <div className="exp-item exp-item-2 _409x500" ref={homeTitleRef}>
                <div className="img-wrapper_2">
                  <img
                    className="img1"
                    src="https://localhost:7155/Uploads/ead8ebe3-3ea5-4a2f-ba70-2d6255735603.png"
                    alt=""
                  />
                </div>
                <div className="info-wrapper"></div>
              </div>
              <div className="exp-item exp-item-3 _409x500">
                <div className="img-wrapper_2 ">
                  <img
                    className="img2"
                    src="./src/assets/img/image32.png"
                    alt=""
                  />
                </div>
                <div className="info-wrapper">
                  <div className="exp-item-tit eb-garamond three_dots_1">
                    Khuyến mãi 😉
                  </div>
                  <div className="exp-item-des three_dots_1">
                    Không gian thoải mái với trang thiết bị hiện đại!
                  </div>
                  <div className="exp-item-cta">
                    <Link to="/courts" className="eb-garamond three_dots_1">
                      Khám phá!
                    </Link>
                  </div>
                </div>
              </div>
              <div className="exp-item exp-item-4 _741x500">
                <div className="img-wrapper_1">
                  <img
                    className="img2"
                    src="./src/assets/img/image4.png"
                    alt=""
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Featured;
