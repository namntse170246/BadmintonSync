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
        title: "You need login to book court!",
        showConfirmButton: true,
        confirmButtonText: "Login",
        showCancelButton: true,
        cancelButtonText: "Cancel",
      }).then((result) => {
        if (result.isConfirmed) {
          navigate("/login-register");
        }
      });
      console.log("Bạn cần Login để xem Hotels.");
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
        console.error("Error fetching data", error);
      }
    };

    fetchData();
  }, [id]);

  localStorage.setItem("Court", JSON.stringify(data));

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
    // Handle photo URLs
    const photoUrls = data ? data.image.split(",") : [];

    // Save to local storage
    useEffect(() => {
      localStorage.setItem("imageReal", JSON.stringify(photoUrls));
    }, [photoUrls]);

    // Handle image click
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
              <p className="announcementTitle">Announcement</p>
              <p className="announcementContent">{data.announcement}</p>
            </div>
            <HotelImages data={data} />
            <div className="CourtInfor">
              <h1 className="hotelTitle">{data.courtName}</h1>
              <div className="infor">
                <FontAwesomeIcon icon={faHouseChimney} className="inforIcon" />
                <div className="inforText">
                  <p>Address</p>
                  <span>{data.location}</span>
                </div>
              </div>
              <div className="infor">
                <FontAwesomeIcon icon={faPhone} className="inforIcon" />
                <div className="inforText">
                  <p>Phone Number</p>
                  <span>{data.phone}</span>
                </div>
              </div>
              <div className="infor">
                <FontAwesomeIcon icon={faHeart} className="inforIcon" />
                <div className="inforText">
                  <p>Social Media</p>
                  <a
                    target="_blank"
                    href="https://www.facebook.com/hungtran0706/"
                    rel="noreferrer"
                  >
                    <FontAwesomeIcon icon={faFacebook} className="inforIcon" />
                  </a>
                </div>
              </div>
              <p className="hotelTitle">Openning Hours</p>
              <div className="infor">
                <FontAwesomeIcon icon={faClock} className="inforIcon" />
                <div className="inforText">
                  <p>Daily</p>
                  <p>{data.openingHours}</p>
                </div>
              </div>
              <p className="hotelTitle">Pricing</p>
            </div>
            <div className="infor">
              <FontAwesomeIcon icon={faSackDollar} className="inforIcon" />
              <div className="inforText">
                <p>Every Day</p>
                <p>{data.subCourts[0].pricePerHour}$ /hour</p>
              </div>
            </div>
            <div>
              <div className="Viewinfor" onClick={PolicyClick}>
                <FontAwesomeIcon icon={faBook} className="ViewinforIcon" />
                <div>View Policy</div>
                <FontAwesomeIcon
                  icon={faAngleRight}
                  className="ViewinforIcon"
                />
              </div>
              {showPopup && (
                <div className="popup-overlay">
                  <div className="popup-content">
                    <h2>Policy</h2>
                    <hr className="header-line" />
                    <h3>Booking & Reschedule Rules</h3>
                    <ul>
                      <li>No refunds or carry forward of unused sessions.</li>
                      <li>
                        Changes to booking time require 48 hours notice and are
                        subject to court availability.
                      </li>
                      <li>
                        Non-seasonal bookings can be rescheduled once only.
                      </li>
                      <li>
                        Seasonal bookings are not eligible for rescheduling.
                      </li>
                    </ul>
                    <h3>Centre Policy</h3>
                    <ul>
                      <li>
                        Only non-marking shoes are allowed on the badminton
                        court.
                      </li>
                      <li>
                        Players are responsible for any damages caused to the
                        facility during play.
                      </li>
                      <li>
                        Do not leave valuables unattended; we are not
                        responsible for theft.
                      </li>
                      <li>
                        Onsite parking is available; park in designated areas at
                        your own risk.
                      </li>
                      <li>
                        Violations may result in warnings, fines, suspension, or
                        expulsion.
                      </li>
                      <li>Management decisions on penalties are final.</li>
                    </ul>
                    <button className="closeButton" onClick={ClosePolicyClick}>
                      Close
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
                Booking
              </Link>
            </button>
            <FeedBack courtId={data.courtId} />
          </div>
        )}
        <FeatureProperties excludeId={id} />
        <MailList />
        <Footer />
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
          Close
        </button>
      </Modal>
    </div>
  );
};

export default Court;
