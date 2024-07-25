import React, { useState } from "react";
import { toast } from "react-toastify";
import { DeleteVoucherByID } from "../../API/APIConfigure"; // Make sure you have the DeleteVoucherByID function in your APIConfigure file
import { Button } from "@mui/material";

const DeleteVoucher = ({ voucherId, fetchVouchers }) => {
  const handleDeleteVoucher = async () => {
    try {
      console.log(voucherId);
      const response = await DeleteVoucherByID(voucherId);
      toast.success("Xóa voucher thành công");
      fetchVouchers(); // Refresh the vouchers list after deletion
    } catch (error) {
      console.error(error);
      toast.error("Xóa voucher thất bại");
    }
  };

  return (
    <div>
      <Button
        variant="contained"
        onClick={handleDeleteVoucher}
        style={{ backgroundColor: "red", color: "white" }}
      >
        Xóa
      </Button>
    </div>
  );
};

export default DeleteVoucher;
