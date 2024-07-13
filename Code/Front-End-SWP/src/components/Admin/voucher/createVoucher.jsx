import { useState } from "react";
import { TextField, Button, Select, MenuItem } from "@mui/material";
import { CreateVouchers } from "../../API/APIConfigure";
import { toast } from "react-toastify";

const CreateVoucher = ({ isOpen, onClose, fetchUser }) => {
  const [voucher, setVoucher] = useState({
    promotionCode: "",
    description: "",
    percentage: 0,
    startDate: "",
    endDate: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setVoucher((prevVoucher) => ({
      ...prevVoucher,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(voucher);
    try {
      const response = await CreateVouchers(voucher);
      console.log(response);
      if (response === null) {
        toast.error("Tạo voucher thất bại!");
      } else {
        toast.success("Tạo thành công!");
        onClose();
        fetchUser();
      }
    } catch (error) {
      console.error("Đã xảy ra lỗi:", error);
    }
  };

  return (
    <form
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "16px",
        marginTop: "20px",
      }}
      onSubmit={handleSubmit}
    >
      <TextField
        name="promotionCode"
        label="Mã code"
        value={voucher.promotionCode}
        onChange={handleChange}
        required
      />
      <TextField
        name="description"
        label="Mô tả"
        value={voucher.description}
        onChange={handleChange}
        required
      />
      <TextField
        name="percentage"
        label="Giảm %"
        type="number"
        value={voucher.percentage}
        onChange={handleChange}
        required
      />
      <TextField
        name="startDate"
        label="Ngày bắt đầu"
        type="date"
        value={voucher.startDate}
        onChange={handleChange}
        required
        InputLabelProps={{
          shrink: true,
        }}
      />
      <TextField
        name="endDate"
        label="Ngày kết thúc"
        type="date"
        value={voucher.endDate}
        onChange={handleChange}
        required
        InputLabelProps={{
          shrink: true,
        }}
      />
      <Button
        type="submit"
        variant="contained"
        color="primary"
        style={{ alignSelf: "flex-end", marginTop: "16px" }}
      >
        Tạo Voucher
      </Button>
    </form>
  );
};

export default CreateVoucher;
