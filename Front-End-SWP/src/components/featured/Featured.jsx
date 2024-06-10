import { Link } from "react-router-dom";
import "./featured.css";
const Featured = ({ homeTitleRef }) => {
  return (
    <div className="block block-vinpearl-content block-homepage-exp-block">
      <div className="block-content">
        <div className="exp-block">
          <div className="home-container">
            <h2 className="homepage-tit wow animate__animated animate__fadeInUp">
              Địa điểm nổi bật
            </h2>
            <div className="exp-content wow animate__animated animate__fadeInUp">
              <div className="exp-item exp-item-1 _741x500">
                <div className="img-wrapper_1">
                  <img
                    className="img1"
                    src="./src/assets/img/image1.jpg"
                    alt=""
                  />
                </div>
                <div className="info-wrapper">
                  <div className="exp-item-tit eb-garamond three_dots_1">
                    Sân mới được thêm 🎉
                  </div>
                  <div className="exp-item-des three_dots_1">
                    Mang đến sự trải nghiệm tốt nhất !
                  </div>
                  <div className="exp-item-cta">
                    <Link to="/hotels" className="eb-garamond three_dots_1">
                      Khám phá
                    </Link>
                  </div>
                </div>
              </div>
              <div className="exp-item exp-item-2 _409x500" ref={homeTitleRef}>
                <div className="img-wrapper_2">
                  <img
                    className="img2"
                    src="./src/assets/img/image2.jpg"
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
                    Không gian thoải mái với trang thiết bị hiện đại !
                  </div>
                  <div className="exp-item-cta">
                    <Link to="/hotels" className="eb-garamond three_dots_1">
                      Khám phá
                    </Link>
                  </div>
                </div>
              </div>
              <div className="exp-item exp-item-4 _741x500">
                <div className="img-wrapper_1">
                  <img
                    className="img1"
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
