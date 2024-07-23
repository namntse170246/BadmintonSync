import { useState, useEffect } from "react";
import { TextField, Button, MenuItem } from "@mui/material";
import { CreateVouchers, GetAllCourts } from "../../API/APIConfigure";
import { toast } from "react-toastify";

const CreateVoucher = ({ fetchVouchers, onClose, ownerId }) => {
  const [voucher, setVoucher] = useState({
    promotionCode: "",
    description: "",
    percentage: 0,
    startDate: "",
    endDate: "",
    courtId: "", // To be populated dynamically
  });

  const [courtIds, setCourtIds] = useState([]);

  useEffect(() => {
    fetchCourtIds();
  }, []);

  const fetchCourtIds = async () => {
    try {
      const ownerId = JSON.parse(localStorage.getItem("userInfo")).id;
      const response = await GetAllCourts();
      const ownedCourts = response.data.filter((court) => court.ownerId === ownerId);
      setCourtIds(ownedCourts);
    } catch (error) {
      console.error("Error fetching courtIds:", error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    // Ensure percentage is not negative
    if (name === "percentage" && value < 0) {
      toast.error("Percentage cannot be negative!");
      return;
    }

    setVoucher((prevVoucher) => ({
      ...prevVoucher,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(voucher);
    try {
      const response = await CreateVouchers({ ...voucher, ownerId });
      console.log(response);
      if (response === null) {
        toast.error("Failed to create voucher!");
      } else {
        toast.success("Created successfully!");
        onClose();
        fetchVouchers();
      }
    } catch (error) {
      console.error("Error occurred:", error);
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
        label="Code"
        value={voucher.promotionCode}
        onChange={handleChange}
        required
      />
      <TextField
        name="description"
        label="Description"
        value={voucher.description}
        onChange={handleChange}
        required
      />
      <TextField
        name="percentage"
        label="%"
        type="number"
        value={voucher.percentage}
        onChange={handleChange}
        required
      />
      <TextField
        name="startDate"
        label="Start Date"
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
        label="End Date"
        type="date"
        value={voucher.endDate}
        onChange={handleChange}
        required
        InputLabelProps={{
          shrink: true,
        }}
      />
      <TextField
        name="courtId"
        label="Court"
        select
        value={voucher.courtId}
        onChange={handleChange}
        required
      >
        {courtIds.map((court) => (
          <MenuItem key={court.courtId} value={court.courtId}>
            {court.courtName}
          </MenuItem>
        ))}
      </TextField>
      <Button
        type="submit"
        variant="contained"
        color="primary"
        style={{ alignSelf: "flex-end", marginTop: "16px" }}
      >
        Create Voucher
      </Button>
    </form>
  );
};

export default CreateVoucher;
