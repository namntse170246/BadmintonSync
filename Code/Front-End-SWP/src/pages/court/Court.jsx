import "./court.css";
import Navbar from "../../components/navbar/Navbar";
import MailList from "../../components/mailList/MailList";
import Footer from "../../components/footer/Footer";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCircleArrowLeft,
  faCircleArrowRight,
  faCircleXmark,
  faHouseChimney,
  faPhone,
  faHeart,
  faClock,
  faSackDollar,
  faAngleRight,
  faBook,
} from "@fortawesome/free-solid-svg-icons";
import { faFacebook } from "@fortawesome/free-brands-svg-icons";
import { useState, useEffect } from "react";
import FeatureProperties from "../../components/featureProperties/FeatureProperties";
import { GetbyCourtID } from "../../components/API/APIConfigure";
import { Link, useNavigate, useParams } from "react-router-dom";
import FeedBack from "../../components/User/Feedback/Feedback";
import Modal from "react-modal";
import { useAuth } from "../../hook/AuthContext";
import Swal from "sweetalert2";
import mapImage from "../../../src/assets/img/map1.jpg";

Modal.setAppElement("#root");

const Court = () => {
  const { id } = useParams();
  const [data, setData] = useState(null);
  const [slideNumber, setSlideNumber] = useState(0);
  const [open, setOpen] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState("");
  const navigate = useNavigate();
  const { isLoggedIn } = useAuth();
  const [userLoggedIn, setUserLoggedIn] = useState(isLoggedIn);

  useEffect(() => {
    setUserLoggedIn(isLoggedIn);
  }, [isLoggedIn]);

  const handleBookingClick = (e) => {
    console.log("Check Login");
    if (!userLoggedIn) {
      e.preventDefault();
      Swal.fire({
        icon: "error",
        title: "Bạn cần đăng nhập để đặt sân!",
        showConfirmButton: true,
        confirmButtonText: "Đăng nhập",
        showCancelButton: true,
        cancelButtonText: "Hủy",
      }).then((result) => {
        if (result.isConfirmed) {
          navigate("/login-register");
        }
      });
    }
  };

  const PolicyClick = () => {
    setShowPopup(true);
  };

  const ClosePolicyClick = () => {
    setShowPopup(false);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await GetbyCourtID(id);
        setData(response.data);
      } catch (error) {
        console.error("Lỗi khi lấy dữ liệu", error);
      }
    };

    fetchData();
  }, [id]);

  localStorage.setItem("Court", JSON.stringify(data));
  console.log(data);

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

  const HotelImages = ({ data }) => {
    // Xử lý URL ảnh
    const photoUrls = data ? data.image.split(",") : [];

    // Lưu vào local storage
    useEffect(() => {
      localStorage.setItem("imageReal", JSON.stringify(photoUrls));
    }, [photoUrls]);

    // Xử lý khi nhấp vào ảnh
    const handleImageClick = (index) => {
      setSelectedImage(
        "https://localhost:7155/Uploads/" + photoUrls[index].trim()
      );
      setModalIsOpen(true);
    };

    return (
      <div className="hotelImages">
        {photoUrls.map((photoUrl, i) => (
          <div className="hotelImgWrapper" key={i}>
            <img
              onClick={() => handleImageClick(i)}
              src={"https://localhost:7155/Uploads/" + photoUrl.trim()}
              alt={`Hotel ${i}`}
              className="hotelImg"
            />
          </div>
        ))}
      </div>
    );
  };

  return (
    <div>
      <Navbar isListNavbar={true} />
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
            <FontAwesomeIcon
              icon={faCircleArrowRight}
              className="arrow"
              onClick={() => handleMove("r")}
            />
          </div>
        )}
        {data && (
          <div>
            <div className="announcement">
              <p className="announcementTitle">Thông báo</p>
              <p className="announcementContent">{data.announcement}</p>
            </div>
            <HotelImages data={data} />
            <div className="CourtInfor">
              <h1 className="hotelTitle">{data.courtName}</h1>
              <div className="infor">
                <FontAwesomeIcon icon={faHouseChimney} className="inforIcon" />
                <div className="inforText">
                  <p>Địa chỉ</p>
                  <span>{data.location}</span>
                </div>
              </div>
              <div className="infor">
                <FontAwesomeIcon icon={faPhone} className="inforIcon" />
                <div className="inforText">
                  <p>Số điện thoại</p>
                  <span>{data.phone}</span>
                </div>
              </div>
              <div className="infor">
                <FontAwesomeIcon icon={faHeart} className="inforIcon" />
                <div className="inforText">
                  <p>Mạng xã hội</p>
                  <a
                    target="_blank"
                    href="https://www.facebook.com/hungtran0706/"
                    rel="noreferrer"
                  >
                    <FontAwesomeIcon icon={faFacebook} className="inforIcon" />
                  </a>
                </div>
              </div>
              <p className="hotelTitle">Giờ mở cửa</p>
              <div className="infor">
                <FontAwesomeIcon icon={faClock} className="inforIcon" />
                <div className="inforText">
                  <p>Hàng ngày</p>
                  <p>{data.openingHours}</p>
                </div>
              </div>
              <p className="hotelTitle">Giá</p>
            </div>
            <div className="infor">
              <FontAwesomeIcon icon={faSackDollar} className="inforIcon" />
              <div className="inforText">
                <p>Mỗi ngày</p>
                <p>{data.subCourts[0].pricePerHour},000 VND</p>
              </div>
            </div>
            <div>
              <div className="Viewinfor" onClick={PolicyClick}>
                <FontAwesomeIcon icon={faBook} className="ViewinforIcon" />
                <div>Xem Chính sách</div>
                <FontAwesomeIcon
                  icon={faAngleRight}
                  className="ViewinforIcon"
                />
              </div>
              {showPopup && (
                <div className="popup-overlay">
                  <div className="popup-content">
                    <h2>Chính sách</h2>
                    <hr className="header-line" />
                    <h3>Quy định đặt chỗ & thay đổi lịch</h3>
                    <ul>
                      <li>
                        Không hoàn tiền hoặc chuyển nhượng phiên chưa sử dụng.
                      </li>
                      <li>
                        Thay đổi thời gian đặt chỗ cần thông báo trước 48 giờ và
                        phụ thuộc vào tình trạng sẵn có của sân.
                      </li>
                      <li>
                        Đặt chỗ không theo mùa có thể thay đổi một lần duy nhất.
                      </li>
                      <li>Đặt chỗ theo mùa không đủ điều kiện thay đổi.</li>
                    </ul>
                    <h3>Chính sách trung tâm</h3>
                    <ul>
                      <li>
                        Chỉ cho phép sử dụng giày không để lại dấu trên sân
                        badminton.
                      </li>
                      <li>
                        Người chơi chịu trách nhiệm về bất kỳ thiệt hại nào gây
                        ra cho cơ sở trong quá trình chơi.
                      </li>
                      <li>
                        Không để tài sản quý giá không được trông coi; chúng tôi
                        không chịu trách nhiệm về việc mất trộm.
                      </li>
                      <li>
                        Có bãi đậu xe tại chỗ; đậu xe ở khu vực được chỉ định là
                        rủi ro của bạn.
                      </li>
                      <li>
                        Vi phạm có thể dẫn đến cảnh cáo, phạt tiền, đình chỉ
                        hoặc khai trừ.
                      </li>
                      <li>
                        Quyết định của ban quản lý về hình phạt là cuối cùng.
                      </li>
                    </ul>
                    <button className="closeButton" onClick={ClosePolicyClick}>
                      Đóng
                    </button>
                  </div>
                </div>
              )}
            </div>

            <button className="bookNow">
              <Link
                to={`/booking/${data.courtId}`}
                onClick={handleBookingClick}
              >
                Đặt sân
              </Link>
            </button>
            <FeedBack courtId={data.courtId} />
          </div>
        )}

        <div className="main-home-container">
          <FeatureProperties excludeId={id} />

          <div className="map">
            <img src={mapImage} alt="Map" />
          </div>
          <div className="homeContainer" style={{ marginTop: "50px" }}>
            <Footer />
          </div>
        </div>
      </div>
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={() => setModalIsOpen(false)}
        contentLabel="Image Modal"
        className="Modal"
        overlayClassName="Overlay"
      >
        <img src={selectedImage} alt="Selected" style={{ width: "100%" }} />
        <button className="closeButton" onClick={() => setModalIsOpen(false)}>
          Đóng
        </button>
      </Modal>
    </div>
  );
};

export default Court;
