import "./hotel.css";
import Navbar from "../../components/navbar/Navbar";
import Header from "../../components/header/Header";
import MailList from "../../components/mailList/MailList";
import Footer from "../../components/footer/Footer";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCircleArrowLeft,
  faCircleArrowRight,
  faCircleXmark,
  faLocationDot,
} from "@fortawesome/free-solid-svg-icons";
import { useState, useEffect } from "react";
import FeatureProperties from "../../components/featureProperties/FeatureProperties";
import { GetbyRealestateID, BASE_URL } from "../../components/API/APIConfigure";
import { Link, useParams } from "react-router-dom";
import FeedBack from "../../components/User/Feedback/Feedback";

const Hotel = ({}) => {
  const { id } = useParams();
  const [data, setData] = useState(null);
  const [slideNumber, setSlideNumber] = useState(0);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await GetbyRealestateID(id);
        setData(response);
      } catch (error) {
        console.error("Error fetching data", error);
      }
    };

    fetchData();
  }, [id]);

  localStorage.setItem("Realestate", JSON.stringify(data));

  const handleOpen = (i) => {
    setSlideNumber(i);
    setOpen(true);
  };

  const handleMove = (direction) => {
    let newSlideNumber;

    if (direction === "l") {
      newSlideNumber =
        slideNumber === 0 ? photoUrls.length - 1 : slideNumber - 1;
    } else {
      newSlideNumber =
        slideNumber === photoUrls.length - 1 ? 0 : slideNumber + 1;
    }

    setSlideNumber(newSlideNumber);
  };

  const photoUrls = data ? data.photo.split(",") : [];
  localStorage.setItem("imageReal", JSON.stringify(photoUrls));

  return (
    <div>
      <Navbar isListNavbar={true} />
      {/* <Header type="list" /> */}
      <div className="hotelContainer">
        {open && (
          <div className="slider">
            <FontAwesomeIcon
              icon={faCircleXmark}
              className="close"
              onClick={() => setOpen(false)}
            />
            <FontAwesomeIcon
              icon={faCircleArrowLeft}
              className="arrow"
              onClick={() => handleMove("l")}
            />
            <div className="sliderWrapper">
              {data && (
                <img
                  src={BASE_URL + photoUrls[slideNumber]}
                  alt=""
                  className="sliderImg"
                />
              )}
            </div>
            <FontAwesomeIcon
              icon={faCircleArrowRight}
              className="arrow"
              onClick={() => handleMove("r")}
            />
          </div>
        )}
        {data && (
          <div className="hotelWrapper">
            <button className="bookNow">
              <Link to={`/timeshare/${data.id}`}>
                Timeshare hoặc Booking Ngay !!!
              </Link>
            </button>
            <h1 className="hotelTitle">{data.name}</h1>
            <div className="hotelAddress">
              <FontAwesomeIcon icon={faLocationDot} />
              <span>{data.location}</span>
            </div>
            <span className="hotelDistance">
              Vị trí tuyệt vời – cách 800m đến trung tâm
            </span>
            <span className="hotelPriceHighlight">
              Đặt phòng trên 3.000.00VNĐ tại khách sạn này và nhận taxi sân bay
              miễn phí!
            </span>
            <div className="hotelImages">
              {photoUrls.map((photoUrl, i) => (
                <div className="hotelImgWrapper" key={i}>
                  <img
                    onClick={() => handleOpen(i)}
                    src={BASE_URL + photoUrl}
                    alt=""
                    className="hotelImg"
                  />
                </div>
              ))}
            </div>
            <div className="hotelDetails">
              <div className="hotelDetailsTexts">
                <h1 className="hotelTitle">Mô tả chỗ ở: {data.name}</h1>
                <p className="hotelDesc">{data.description}</p>
              </div>
              <div className="hotelDetailsPrice">
                <h1>Bắt đầu cuộc hành trình mới!</h1>
                <span>
                  Chỗ ở này nằm ngay trung tâm thành phố TP. Hồ Chí Minh, bắt
                  đầu hành trình với chúng tôi
                </span>
                <h2>
                  <b>{data.price}VNĐ</b> /1 Đêm
                </h2>
                <button>Reserve or Book Now!</button>
              </div>
            </div>
            <FeedBack realetatesID={id} />
          </div>
        )}
        <FeatureProperties />
        <MailList />
        <Footer />
      </div>
    </div>
  );
};

export default Hotel;
