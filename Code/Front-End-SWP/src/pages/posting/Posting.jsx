import Navbar from "../../components/navbar/Navbar";
import "./posting.css";
import {
  CreateBooking,
  CreatePayment,
  GetAllTimeSlot,
  GetVoucherByCode,
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
    const fetchSubCourtsAndTimeSlots = async () => {
      try {
        const subCourtResponse = CourtInfo.subCourts;
        setSubCourts(subCourtResponse);
        const timeSlotResponse = await GetAllTimeSlot();
        setTimeSlots(timeSlotResponse.data);
        console.log(timeSlots);
      } catch (error) {
        console.error("Error fetching data", error);
      }
    };

    fetchSubCourtsAndTimeSlots();
  }, [id]);

  const handleVoucherChange = (event) => {
    setVoucherData(null);
    setVoucherApplied(false);
    setDiscount(0);
    setTotalFinal(total);
    setVoucher(event.target.value);
  };

  const handleAddVoucher = async () => {
    try {
      console.log(voucher);
      const response = await GetVoucherByCode(voucher);
      console.log(response);
      if (response.success && response.statusCode === 0) {
        setVoucherData(response.data);
        console.log("Voucher: ", voucherData);
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
        toast.success("Voucher applied successfully");
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
    };

    console.log(updatedBookingData);

    try {
      const response = await CreateBooking(updatedBookingData);
      console.log(response);
      const paymentData = {
        memberId: userInfo.id,
        money: totalFinal,
        bookingId: response.id,
        status: "1",
        title: "Court Booking Payment",
        type: "Payment",
      };
      // const responsePayment = await CreatePayment(paymentData);
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
    console.log(selectedTimeSlot);
  };

  const handleCourtSelection = (courtId, price) => {
    setSelectedCourt(courtId);
    setTotal(price);
    setTotalFinal(price - (price / 100) * discount);
  };
  const firstImageUrl = CourtInfo.image
    ? CourtInfo.image.split(",")[0].trim()
    : "";

  const todayDate = new Date().toISOString().split("T")[0];

  return (
    <>
      <Navbar />
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
              <label htmlFor="timeSlot">Select a start time and duration</label>
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
              {subCourts
                .filter(
                  (court) => court.timeSlotId.toString() === selectedTimeSlot
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
          <p>Time: {selectedTimeSlot}</p>
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
    </>
  );
};

export default Posting;
