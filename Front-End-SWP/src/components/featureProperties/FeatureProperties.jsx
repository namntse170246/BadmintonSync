// eslint-disable-next-line no-unused-vars
import React from "react";
import "./featureProperties.css";
function FeatureProperties() {
  return (
    <div className="fp">
      <div className="fpItem">
        <img
          src="https://q-xx.bstatic.com/xdata/images/hotel/263x210/119467716.jpeg?k=f3c2c6271ab71513e044e48dfde378fcd6bb80cb893e39b9b78b33a60c0131c9&o="
          alt="/"
          className="fpImg"
        />
        <span className="fpName">Du khách từ Việt Nam</span>
        <span className="fpCity">Việt Nam</span>
        <span className="fpPrice">Khoảng từ 500.000VND</span>
        <div className="fpRating">
          <button>8.5</button>
          <span>Good</span>
        </div>
      </div>
      <div className="fpItem">
        <img
          src="https://q-xx.bstatic.com/xdata/images/hotel/263x210/52979454.jpeg?k=6ac6d0afd28e4ce00a8f817cc3045039e064469a3f9a88059706c0b45adf2e7d&o="
          alt="/"
          className="fpImg"
        />
        <span className="fpName">Du khách từ Việt Nam</span>
        <span className="fpCity">Việt Nam</span>
        <span className="fpPrice">Khoảng từ 670.000VND</span>
        <div className="fpRating">
          <button>9.9</button>
          <span>Good</span>
        </div>
      </div>
      <div className="fpItem">
        <img
          src="https://r-xx.bstatic.com/xdata/images/xphoto/263x210/45450058.jpeg?k=2449eb55e8269a66952858c80fd7bdec987f9514cd79d58685651b7d6e9cdfcf&o="
          alt="/"
          className="fpImg"
        />
        <span className="fpName">Du khách từ Việt Nam</span>
        <span className="fpCity">Việt Nam</span>
        <span className="fpPrice">Khoảng từ 850.000VND</span>
        <div className="fpRating">
          <button>8.9</button>
          <span>Good</span>
        </div>
      </div>
      <div className="fpItem">
        <img
          src="https://r-xx.bstatic.com/xdata/images/xphoto/263x210/45450073.jpeg?k=795a94c30433de1858ea52375e8190a962b302376be2e68aa08be345d936557d&o="
          alt="/"
          className="fpImg"
        />
        <span className="fpName">Du khách từ Việt Nam</span>
        <span className="fpCity">Việt Nam</span>
        <span className="fpPrice">Khoảng từ 950.000VND</span>
        <div className="fpRating">
          <button>8.2</button>
          <span>Good</span>
        </div>
      </div>
    </div>
  );
}

export default FeatureProperties;
