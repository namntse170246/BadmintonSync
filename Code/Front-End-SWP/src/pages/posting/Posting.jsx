import Navbar from "../../components/navbar/Navbar";
import "./posting.css";
import {
  CreateBooking,
  GetAllTimeSlot,
  GetVoucherByCode,
  GetBookedSubCourts, // Import the function to fetch booked courts
} from "../../components/API/APIConfigure";
import { useState, useEffect } from "react";
import { useParams } from "react-router";
import { toast } from "react-toastify";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

const Posting = () => {
  const { id } = useParams();
  const userInfo = JSON.parse(localStorage.getItem("userInfo"));
  const [subCourts, setSubCourts] = useState([]);
  const [timeSlots, setTimeSlots] = useState([]);
  const [BookedSubCourts, setBookedSubCourts] = useState([]); // State to store booked courts
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedTimeSlot, setSelectedTimeSlot] = useState("");
  const [selectedCourt, setSelectedCourt] = useState("");
  const [voucher, setVoucher] = useState("");
  const [voucherData, setVoucherData] = useState("");
  const [total, setTotal] = useState(0);
  const [voucherApplied, setVoucherApplied] = useState(false);
  const [discount, setDiscount] = useState(0);
  const [totalFinal, setTotalFinal] = useState(0);
  const navigate = useNavigate();
  const DataCourt = localStorage.getItem("CourtDetails");
  const CourtInfo = JSON.parse(DataCourt);

  useEffect(() => {
    window.scrollTo(0, 0); // Cuộn lên đầu trang khi trang được tải
  }, []);

  useEffect(() => {
    const fetchSubCourtsAndTimeSlots = async () => {
      try {
        const subCourtResponse = CourtInfo.subCourts;
        setSubCourts(subCourtResponse);
        const timeSlotResponse = await GetAllTimeSlot();
        setTimeSlots(timeSlotResponse.data);
      } catch (error) {
        console.error("Error fetching data", error);
      }
    };

    fetchSubCourtsAndTimeSlots();
  }, [id]);

  useEffect(() => {
    const fetchBookedSubCourts = async () => {
      if (selectedDate && selectedTimeSlot) {
        try {
          const response = await GetBookedSubCourts(selectedDate, selectedTimeSlot);
          if (response.success && response.data) {
            const filteredSubCourts = response.data.filter(booking => booking.status !== 2);
            console.log(filteredSubCourts);
            setBookedSubCourts(filteredSubCourts);
          } else {
            setBookedSubCourts([]);
          }
        } catch (error) {
          console.error("Error fetching booked courts", error);
        }
      }
    };

    fetchBookedSubCourts();
  }, [selectedDate, selectedTimeSlot]);

  const handleVoucherChange = (event) => {
    setVoucherData(null);
    setVoucherApplied(false);
    setDiscount(0);
    setTotalFinal(total);
    setVoucher(event.target.value);
  };

  const handleAddVoucher = async () => {
    try {
      const response = await GetVoucherByCode(voucher);
      console.log(response.data.courtId);
      console.log(id);
      if (response.success && response.statusCode === 0) {
        if (response.data.courtId == id) {
          setVoucherData(response.data);
          toast.success("Applied voucher successfully!");
        } else {
          toast.error("Voucher not valid for this court");
        }
      } else {
        toast.error("Invalid voucher code");
      }
    } catch (error) {
      console.error("Error fetching voucher data", error);
    }
  };

  useEffect(() => {
    if (voucherData) {
      const { percentage } = voucherData;
      if (!voucherApplied) {
        toast.success("Voucher applied Successfully");
        setDiscount(percentage);
        setVoucherApplied(true);
        setTotalFinal(total - (total * percentage) / 100);
      }
    }
  }, [voucherData, total, voucherApplied]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const createDate = new Date().toISOString();
    const updatedBookingData = {
      userId: userInfo.id,
      subCourtId: selectedCourt,
      createDate: createDate,
      bookingDate: selectedDate,
      timeSlotId: parseInt(selectedTimeSlot, 10),
      amount: totalFinal,
      promotionCode: voucher
    };

    try {
      console.log(updatedBookingData);
      const response = await CreateBooking(updatedBookingData);
      Swal.fire({
        icon: "success",
        title: "Booking successful",
      }).then(() => {
        navigate(`/user/checkout/${response.data.bookingId}`);
      });
    } catch (err) {
      Swal.fire({
        icon: "error",
        title: "Please fill in all the details",
      });
    }
  };

  const handleDateChange = (event) => {
    setSelectedDate(event.target.value);
  };

  const handleTimeSlotChange = (event) => {
    setSelectedTimeSlot(event.target.value);
  };

  const handleCourtSelection = (courtId, price) => {
    setSelectedCourt(courtId);
    setTotal(price);
    setTotalFinal(price - (price / 100) * discount);
  };

  const getTimeSlotString = (timeSlotId) => {
    switch (parseInt(timeSlotId)) {
      case 1:
        return "5:00-7:00";
      case 2:
        return "7:00-9:00";
      case 3:
        return "9:00-11:00";
      case 4:
        return "13:00-15:00";
      case 5:
        return "15:00-17:00";
      case 6:
        return "17:00-19:00";
      case 7:
        return "19:00-21:00";
      default:
        return "";
    }
  };

  const firstImageUrl = CourtInfo.image
    ? CourtInfo.image.split(",")[0].trim()
    : "";

  const todayDate = new Date().toISOString().split("T")[0];

  return (
    <>
      <Navbar />
      <div className="background">
        <div className="posting_container">
          <div className="booking-form">
            <h1 className="booking-title">Booking Details</h1>

            <form className="booking-request-form">
              <div className="form-section">
                <label htmlFor="bookingDate">Select a date</label>
                <input
                  type="date"
                  id="bookingDate"
                  name="bookingDate"
                  value={selectedDate}
                  onChange={handleDateChange}
                  required
                  className="form-control"
                  min={todayDate}
                />
              </div>

              <div className="form-section">
                <label htmlFor="timeSlot">
                  Select a start time and duration
                </label>
                <select
                  id="timeSlot"
                  name="timeSlot"
                  value={selectedTimeSlot}
                  onChange={handleTimeSlotChange}
                  required
                  className="form-control"
                >
                  <option value="">- Select time slot -</option>
                  {timeSlots.map((slot) => (
                    <option key={slot.timeSlotId} value={slot.timeSlotId}>
                      {slot.startTime} - {slot.endTime}
                    </option>
                  ))}
                </select>
              </div>

              <div className="form-section court-list">
                <label htmlFor="court">Select your preferred court(s)</label>
                {selectedTimeSlot &&
                  selectedDate &&
                  subCourts
                    .filter(
                      (court) =>
                        court.timeSlotId.toString() === selectedTimeSlot
                    )
                    .filter(
                      (court) =>
                        !BookedSubCourts.some(
                          (bookedCourt) =>
                            bookedCourt.subCourtId === court.subCourtId
                        )
                    )
                    .map((court) => (
                      <div key={court.subCourtId} className="court-option">
                        <p>{court.name}</p>
                        <p>{court.pricePerHour}$</p>
                        <button
                          type="button"
                          onClick={() =>
                            handleCourtSelection(
                              court.subCourtId,
                              court.pricePerHour
                            )
                          }
                          className={`btn ${
                            selectedCourt === court.subCourtId
                              ? "btn-primary"
                              : "btn-secondary"
                          }`}
                        >
                          {selectedCourt === court.subCourtId
                            ? "Added to Cart"
                            : "Add to Cart"}
                        </button>
                      </div>
                    ))}
              </div>
            </form>
          </div>

          <form onSubmit={handleSubmit} className="booking-summary">
            <h2>Booking Summary</h2>
            <div className="court-image">
              <div className="court-info">
                <p> {CourtInfo.courtName}</p>
                <p style={{ fontSize: "12px" }}>{CourtInfo.location}</p>
              </div>
              <img
                className="img-fluid"
                src={`https://localhost:7155/Uploads/${firstImageUrl}`}
                alt={CourtInfo.courtName}
              />
            </div>
            <p>Date: {selectedDate}</p>
            <p>Time: {getTimeSlotString(selectedTimeSlot)}</p>
            <p>
              Court:{" "}
              {
                subCourts.find((court) => court.subCourtId === selectedCourt)
                  ?.name
              }
            </p>
            <p className="total">Price: {total.toLocaleString()}</p>
            {voucherApplied && (
              <div>
                <p>Discount: {discount.toLocaleString()}%</p>
                <p>Final Total: {totalFinal.toLocaleString()}</p>
              </div>
            )}
            <div className="form-group">
              <label htmlFor="voucher">Discount Voucher</label>
              <input
                type="text"
                id="voucher"
                name="voucher"
                placeholder="Enter voucher"
                value={voucher}
                onChange={handleVoucherChange}
                className="form-control"
              />
              <button
                type="button"
                onClick={handleAddVoucher}
                className="btn btn-primary"
              >
                Apply
              </button>
            </div>
            <button type="submit" className="btn btn-primary" id="bookBtn">
              Book Court
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default Posting;
