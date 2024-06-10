import { useState } from "react";
import { TextField, Button, Select, MenuItem } from "@mui/material";

import { CreateVouchers } from "../../API/APIConfigure";
import { toast } from "react-toastify";
const CreateVoucher = ({ isOpen, onClose, fetchUser }) => {
  const [voucher, setVoucher] = useState({
    name: "",
    amount: 0,
    type: "",
    startDay: "",
    endDay: "",
    status: true,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setVoucher((prevVoucher) => ({
      ...prevVoucher,
      [name]: name === "status" ? value === "true" : value,
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
        name="name"
        label="Mã code"
        value={voucher.name}
        onChange={handleChange}
        required
      />
      <TextField
        name="amount"
        label="Giảm %"
        type="number"
        value={voucher.amount}
        onChange={handleChange}
        required
      />
      <TextField
        name="type"
        label="Loại"
        value={voucher.type}
        onChange={handleChange}
        required
      />
      <TextField
        name="startDay"
        label="Ngày bắt đầu"
        type="date"
        value={voucher.startDay}
        onChange={handleChange}
        required
        InputLabelProps={{
          shrink: true,
        }}
      />
      <TextField
        name="endDay"
        label="Ngày kết thúc"
        type="date"
        value={voucher.endDay}
        onChange={handleChange}
        required
        InputLabelProps={{
          shrink: true,
        }}
      />
      <Select
        label="Trạng thái"
        name="status"
        value={voucher.status.toString()}
        onChange={handleChange}
        required
      >
        <MenuItem value="true">Hoạt động</MenuItem>
        <MenuItem value="false">Không hoạt động</MenuItem>
      </Select>
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
