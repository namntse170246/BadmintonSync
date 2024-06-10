import { useState, useEffect } from "react";
import axios from "axios";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import Button from "@mui/material/Button";
import { Typography } from "@mui/material";
import Swal from "sweetalert2";
import { BASE_URL } from "../../API/APIConfigure";

function CreateTimeShare({
  onCreateSuccess,
  realestateId: initialRealestateId,
  priceReal,
}) {
  const [open, setOpen] = useState(false);
  const [realestatId, setRealestateId] = useState("");
  const userInfo = JSON.parse(localStorage.getItem("userInfo"));
  const [price, setPrice] = useState(""); 
  const [errors, setErrors] = useState({
    startDay: "",
    endDay: "",
    price: "",
  });
const [differenceInDays, setDifferenceInDays] = useState(0);
  useEffect(() => {
    setRealestateId(initialRealestateId || "");
  }, [initialRealestateId]);

  const handleValidate = () => {
    let formErrors = {};

    if (!startDay) {
      formErrors.startDay = "Vui lòng chọn ngày bắt đầu.";
    } else {
      formErrors.startDay = "";
    }

    if (!endDay) {
      formErrors.endDay = "Vui lòng chọn ngày kết thúc.";
    } else {
      formErrors.endDay = "";
    }

    if (!price) {
      formErrors.price = "Vui lòng nhập giá.";
    } else {
      formErrors.price = "";
    }

    setErrors(formErrors);

    return Object.values(formErrors).every((error) => error === ""); // Check if all errors are empty
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!handleValidate()) {
      return;
    }

    const timeShareData = {
      realestateId: initialRealestateId,
      memberId: userInfo.id,
      startDay,
      endDay,
      status: "1",
      price,
    };

    try {
      const response = await axios.post(
        BASE_URL + "API/TimeShares/CreateTimeShare",
        timeShareData
      );
      Swal.fire({
        icon: "success",
        title: "Tạo mới thành công !!!",
      });
      setOpen(false);
      if (onCreateSuccess) {
        onCreateSuccess();
      }
    } catch (error) {
      console.error(error);
      Swal.fire({
        icon: "error",
        title: "Tạo mới thất bại, vui lòng thử lại!!!",
      });
    }
  };

  const handleStartDayChange = (value) => {
    setStartDay(value);
    let today = new Date();
    today.setHours(0, 0, 0, 0);
  
    if (new Date(value) < today) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        startDay: "Ngày bắt đầu không thể nhỏ hơn hôm nay",
      }));
    } else if (new Date(value) > new Date(endDay)) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        startDay: "Ngày bắt đầu không thể lớn hơn ngày kết thúc",
      }));
    
    } else {
      setErrors((prevErrors) => ({ ...prevErrors, startDay: "" }));
    }
  
    const startDayDate = new Date(value);
    const endDayDate = new Date(endDay);
    const differenceInMilliseconds = endDayDate - startDayDate;
    const differenceInDays = Math.floor(differenceInMilliseconds / (1000 * 60 * 60 * 24));
    setDifferenceInDays(differenceInDays);
    setPrice(priceReal * differenceInDays);
  };
  
  const handleEndDayChange = (value) => {
    setEndDay(value);
    let today = new Date();
    today.setHours(0, 0, 0, 0);
  
    if (new Date(value) < new Date(startDay)) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        endDay: "Ngày kết thúc không thể nhỏ hơn ngày bắt đầu",
      }));
    } else {
      setErrors((prevErrors) => ({ ...prevErrors, endDay: "" }));
    }
  
    const startDayDate = new Date(startDay);
    const endDayDate = new Date(value);
    const differenceInMilliseconds = endDayDate - startDayDate;
    const differenceInDays = Math.floor(differenceInMilliseconds / (1000 * 60 * 60 * 24));
    setDifferenceInDays(differenceInDays);
    setPrice(priceReal * differenceInDays);
  };
  
  let today = new Date();
let dd = String(today.getDate()).padStart(2, '0');
let mm = String(today.getMonth() + 1).padStart(2, '0');
let yyyy = today.getFullYear();

today = yyyy + '-' + mm + '-' + dd;

const [endDay, setEndDay] = useState(today);
const [startDay, setStartDay] = useState(today);

  return (
    <div className="create-time-share">
      <Button variant="contained" color="primary" onClick={() => setOpen(true)}>
        Tạo timeshare
      </Button>
      <Dialog
        open={open}
        onClose={() => setOpen(false)}
        fullWidth={true}
        maxWidth="md"
      >
        <DialogTitle className="dialog-title">
          Tạo thời gian cho thuê
        </DialogTitle>
        <DialogContent className="dialog-content">
          <form onSubmit={handleSubmit} className="form">
            <Typography variant="h6" className="form-field">
              <label htmlFor="startDay" className="form-label">
                Ngày bắt đầu:
              </label>
              <input
              min={today}
                type="date"
                value={startDay}
                onChange={(e) => handleStartDayChange(e.target.value)}
              />
              {errors.startDay && (
                <span className="error-message">{errors.startDay}</span>
              )}
            </Typography>
            <Typography variant="h6" className="form-field">
              <label htmlFor="endDay" className="form-label">
                Ngày kết thúc:
              </label>
              <input
              min={startDay}
                type="date"
                value={endDay}
                onChange={(e) => handleEndDayChange(e.target.value)}
              />
              {errors.endDay && (
                <span className="error-message">{errors.endDay}</span>
              )}
            </Typography>
            <Typography variant="h6" className="form-field">
              <label htmlFor="price" className="form-label">
                Số ngày cho thuê:
              </label>
              {" "} {differenceInDays < 0 ? 0 : differenceInDays} ngày
            </Typography>
            <Typography variant="h6" className="form-field">
              <label htmlFor="price" className="form-label">
                Giá cho thuê:
              </label>
              {" "}{price < 0 ? 0 : price.toLocaleString()} VNĐ
            </Typography>
            <Button
              className="form-field"
              type="submit"
              variant="contained"
              color="primary"
            >
              Gửi
            </Button>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default CreateTimeShare;
