import Navbar from "../../components/navbar/Navbar";
import "./posting.css";
import {
  BASE_URL,
  CreateBooking,
  CreatePayment,
  GetTimeShareById,
} from "../../components/API/APIConfigure";
import { useState, useEffect } from "react";
import { useParams } from "react-router";
import { toast } from "react-toastify";
import axios from "axios";
import MailList from "../../components/mailList/MailList";
import Footer from "../../components/footer/Footer";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
const Posting = () => {
  const { id } = useParams();
  const userInfo = JSON.parse(localStorage.getItem("userInfo"));
  const Realestate = JSON.parse(localStorage.getItem("Realestate"));
  const imageReal = JSON.parse(localStorage.getItem("imageReal"));
  const [voucher, setVoucher] = useState("");
  const [voucherData, setVoucherData] = useState("");
  const navigate = useNavigate();
  const [timeshare, setTimeshare] = useState("");
  const [total, setTotal] = useState(0);
  const [bookData, setBookData] = useState({
    phone: "",
    fullName: "",
    paymentID: "",
    timeshareId: id,
    startDay: "",
    endDay: "",
    memberId: userInfo.id,
    amount: total,
    adult: "",
    children: "",
    status: "1",
  });
  const [error, setError] = useState({});
  const [timeshareStart, setTimeshareStart] = useState("");
  const [timeshareEnd, setTimeshareEnd] = useState("");
  const [voucherApplied, setVoucherApplied] = useState();
  const [discount, setDiscount] = useState("");
  const [totalfinal, setTotalFinal] = useState("");

  const handleVoucherChange = (event) => {
    setVoucher(event.target.value);
  };
  const handleAddVoucher = async () => {
    try {
      const response = await axios.get(
        `http://meokool-001-site1.ltempurl.com/api/Vouchers/GetbyName?name=${voucher}`
      );
      if (response.data && response.data.data != null) {
        setVoucherData(response.data);
      } else {
        toast.error("Mã giảm giá không hợp lệ");
      }
    } catch (error) {
      console.error("Error fetching voucher data", error);
    }
  };
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await GetTimeShareById(id);
        setTimeshare(response);
      } catch (error) {
        console.error("Error fetching data", error);
      }
    };

    fetchData();
  }, [id]);

  useEffect(() => {
    if (timeshare) {
      setTotal(timeshare.price);
      setTotalFinal(timeshare.price);
      setTimeshareStart(new Date(timeshare.startDay).toLocaleDateString());
      setTimeshareEnd(new Date(timeshare.endDay).toLocaleDateString());

      setBookData((prevState) => ({
        ...prevState,
        startDay: timeshare.startDay.slice(0, 10),
        endDay: timeshare.endDay.slice(0, 10),
      }));
    }
  }, [timeshare]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const updatedBookData = {
      phone: bookData.phone,
      fullName: bookData.fullName,
      timeshareId: bookData.timeshareId,
      startDay: bookData.startDay,
      endDay: bookData.endDay,
      amount: totalfinal,
      memberId: bookData.memberId,
      adult: bookData.adult,
      children: bookData.children,
      status: bookData.status,
    };

    try {
      const response = await CreateBooking(updatedBookData);
      const paymentData = {
        memberId: bookData.memberId,
        money: totalfinal,
        bookingId: response.id,
        status: "1",
        title: "Thanh toán đặt phòng",
        type: "Payment",
      };
      const responsePayment = await CreatePayment(paymentData);
      Swal.fire({
        icon: "success",
        title: "Đặt chỗ thành công",
      }).then(() => {
        navigate(`/user/checkout/${response.id}`);
      });
    } catch (err) {
      Swal.fire({
        icon: "error",
        title: "Vui lòng điền đầy đủ thông tin",
      });
    }

    setBookData({
      phone: "",
      fullName: "",
      paymentID: "",
      timeshareId: id,
      startDay: "",
      endDay: "",
      memberId: userInfo.id,
      amount: total,
      adult: "",
      children: "",
      status: "1",
    });
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setBookData({ ...bookData, [name]: value });
  };
  const isValidDate = (date, start, end) => {
    const currentDate = new Date(date);
    const startDate = new Date(start);
    const endDate = new Date(end);

    currentDate.setHours(0, 0, 0, 0);
    startDate.setHours(0, 0, 0, 0);
    endDate.setHours(0, 0, 0, 0);
    return currentDate >= startDate && currentDate <= endDate;
  };

  const handleStartDateChange = (event) => {
    const newStartDate = event.target.value;
    if (!isValidDate(newStartDate, timeshare.startDay, timeshare.endDay)) {
      event.preventDefault();
      toast.error("Ngày không nằm trong thời gian cho sẵn!");
    } else {
      const startDay = new Date(newStartDate);
      const endDay = new Date(bookData.endDay);
      if (endDay <= startDay) {
        toast.error("Ngày bắt đầu không được lớn hơn ngày kết thúc!");
        return;
      }
      setBookData({ ...bookData, startDay: newStartDate });
      startDay.setHours(0, 0, 0, 0);
      endDay.setHours(0, 0, 0, 0);
      const dayDifference = Math.round(
        (endDay - startDay) / (1000 * 60 * 60 * 24)
      );
      setTotal(dayDifference * Realestate.price);
      setTotalFinal(dayDifference * Realestate.price);
    }
  };

  const handleEndDateChange = (event) => {
    const newEndDate = event.target.value;

    if (!isValidDate(newEndDate, timeshare.startDay, timeshare.endDay)) {
      event.preventDefault();

      toast.error("Ngày không nằm trong thời gian cho sẵn!");
    } else {
      const startDay = new Date(bookData.startDay);
      const endDay = new Date(newEndDate);

      if (endDay <= startDay) {
        toast.error("Ngày kết thúc không được nhỏ hơn ngày bắt đầu!");
        return;
      }

      setBookData({ ...bookData, endDay: newEndDate });
      startDay.setHours(0, 0, 0, 0);
      endDay.setHours(0, 0, 0, 0);
      const dayDifference = Math.round(
        (endDay - startDay) / (1000 * 60 * 60 * 24)
      );
      setTotal(dayDifference * Realestate.price);
      setTotalFinal(dayDifference * Realestate.price);
    }
  };
  useEffect(() => {
    if (voucherData && voucherData.data) {
      if (voucherData.data.status === true) {
        if (voucherApplied !== voucherData.data.name) {
          toast.success("Mã giảm giá hợp lệ");
          setDiscount(voucherData.data.amount);
          setVoucherApplied(voucherData.data.name);
          setTotalFinal(total - (total / 100) * voucherData.data.amount);
        } else if (voucherApplied === voucherData.data.name) {
          toast.error("Mã đã được sử dụng");
        }
      } else {
        toast.error("Mã đã hết hạn");
      }
    }
  }, [voucherData, Realestate.price]);

  useEffect(() => {
    setTotalFinal(total - (total / 100) * discount);
  }, [totalfinal]);
  return (
    <>
      <Navbar />
      <div className="main-content">
        <div className="posting_container">
          <div className="booking-form">
            <h1 className="booking-title">Đặt lịch ở đây</h1>

            <form onSubmit={handleSubmit} className="booking-request-form">
              <div className="form-section">
                <p className="formSection_noti">
                  Thông tin liên hệ này sẽ được chia sẻ với chủ sở hữu để hoàn
                  tất việc đặt phòng của bạn.
                </p>
                <div className="form-group">
                  <label htmlFor="adults">
                    Người lớn (tối đa {Realestate.facility} người)*
                  </label>

                  <select
                    id="adults"
                    name="adult"
                    value={bookData.adult}
                    onChange={handleInputChange}
                    className="form-control"
                  >
                    <option className="from-group-option" value="">
                      - Số người lớn -
                    </option>

                    {[...Array(Number(Realestate.facility)).keys()].map(
                      (_, index) => (
                        <option key={index + 1} value={index + 1}>
                          {index + 1}
                        </option>
                      )
                    )}
                  </select>
                </div>
                <div className="form-group">
                  <label htmlFor="children">Trẻ em (Dưới 18 tuổi) *</label>
                  <select
                    id="children"
                    name="children"
                    value={bookData.children}
                    onChange={handleInputChange}
                    className="form-control"
                  >
                    <option className="from-group-option" value="">
                      - Số trẻ em -
                    </option>

                    {[
                      ...Array(
                        Number(Realestate.facility) - Number(bookData.adult) + 1
                      ).keys(),
                    ].map((_, index) => (
                      <option key={index} value={index}>
                        {index}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
              <div className="form-section">
                <h2 className="booking-title">Thông tin liên hệ của bạn </h2>
                <div className="form-group">
                  <label htmlFor="fullName">Họ và tên *</label>

                  <input
                    type="text"
                    id="fullName"
                    name="fullName"
                    placeholder="Tên của bạn"
                    value={bookData.fullName}
                    onChange={handleInputChange}
                    required
                    className="form-control"
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="telephone">Số Điện Thoại *</label>
                  <input
                    type="text"
                    id="phone"
                    name="phone"
                    value={bookData.phone}
                    onChange={handleInputChange}
                    required
                    className="form-control"
                  />
                </div>
                <div className="form-group-div-date">
                  <div className="form-group-date">
                    <label htmlFor="telephone">Ngày bắt đầu: </label>
                    <input
                      type="date"
                      id="startDay"
                      name="startDay"
                      value={bookData.startDay}
                      onChange={handleStartDateChange}
                      required
                      className="form-control"
                    />
                  </div>
                  <div className="form-group-date">
                    <label htmlFor="telephone">Ngày kết thúc: </label>
                    <input
                      type="date"
                      id="endDay"
                      name="endDay"
                      value={bookData.endDay}
                      onChange={handleEndDateChange}
                      required
                      className="form-control"
                    />
                  </div>
                </div>
              </div>

              <button type="submit" className="btn btn-primary">
                Đặt phòng
              </button>
            </form>
          </div>

          <div className="booking-summary">
            <img src={BASE_URL + imageReal[0]} alt={Realestate.name} />
            <div className="text-summary">
              <h2>Khách sạn: {Realestate.name}</h2>
              <h2>Địa điểm: {Realestate.location}</h2>
              <h2>Ngày bắt đầu: {timeshareStart}</h2>
              <h2>Ngày kết thúc: {timeshareEnd}</h2>
              <h2>
                Ngày ở:{" "}
                {Math.floor(
                  (new Date(bookData.endDay) - new Date(bookData.startDay)) /
                    (24 * 60 * 60 * 1000)
                )}{" "}
                Đêm
              </h2>
            </div>
            <div className="_linePosting"></div>
            {voucherApplied ? (
              <div>
                <h2 className="total-summary">
                  <h2>Tổng tiền: {total ? total.toLocaleString() : 0}VNĐ </h2>

                  <h2 style={{ float: "right", marginRight: "22px" }}>
                    - {((total / 100) * discount).toLocaleString()}VNĐ
                  </h2>
                  <h2 style={{ float: "right", marginRight: "22px" }}>
                    {(total - (total / 100) * discount).toLocaleString()}VNĐ
                  </h2>
                </h2>
              </div>
            ) : (
              <div className="total-summary">
                <h2 style={{ float: "right", marginRight: "22px" }}>
                  Tổng tiền: {total ? total.toLocaleString() : 0}VNĐ
                </h2>
              </div>
            )}

            <div className="form-group">
              <div className="voucherLabel">
                <div>
                  <h2 style={{ float: "left", marginTop: "4px" }}>
                    Voucher giảm giá{" "}
                  </h2>
                </div>
                <input
                  type="text"
                  id="voucher"
                  name="voucher"
                  placeholder="Voucher của bạn"
                  value={voucher}
                  onChange={handleVoucherChange}
                  required
                  className="form-control"
                />
                <button
                  type="button"
                  onClick={handleAddVoucher}
                  className="btn btn-primary"
                >
                  Thêm Voucher
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="homeContainer">
        <MailList />
        <Footer />
      </div>
    </>
  );
};

export default Posting;
