import React from "react";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import Button from "@mui/material/Button";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import { InputLabel, Typography } from "@mui/material";
import "./popup.css";

const PopupStatus = ({
  open,
  handleClose,
  handleUpdateStatus,
  currentUserId,
}) => {
  const [status, setStatus] = React.useState("");
  const [fullWidth, setFullWidth] = React.useState(true);
  const [maxWidth, setMaxWidth] = React.useState("md");

  const handleChange = (event) => {
    setStatus(event.target.value);
  };

  const handleUpdate = () => {
    handleUpdateStatus(status);
  };

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      className="popupStatus"
      fullWidth={fullWidth}
      maxWidth={maxWidth}
    >
      <DialogTitle
        style={{
          textAlign: "center",
          backgroundColor: "#f2f2f2",
          fontSize: "30px",
          fontWeight: "bold",
          color: "#003580",
        }}
      >
        Edit
      </DialogTitle>
      <DialogContent style={{ backgroundColor: "#fff" }}>
        <Typography
          variant="h6"
          style={{ display: "flex", alignItems: "center" }}
        >
          <p style={{ fontWeight: "bold", marginRight: "10px" }}>Username:</p>
          {currentUserId?.userName}
        </Typography>
        <Typography
          variant="h6"
          style={{ display: "flex", alignItems: "center" }}
        >
          <p style={{ fontWeight: "bold", marginRight: "10px" }}>Full Name:</p>{" "}
          {currentUserId?.fullName}
        </Typography>
        <Typography
          variant="h6"
          style={{ display: "flex", alignItems: "center" }}
        >
          <p style={{ fontWeight: "bold", marginRight: "10px" }}>
            Phone:
          </p>{" "}
          {currentUserId?.phone}
        </Typography>
        <Typography
          variant="h6"
          style={{ display: "flex", alignItems: "center" }}
        >
          <p style={{ fontWeight: "bold", marginRight: "10px" }}>Email:</p>{" "}
          {currentUserId?.email}
        </Typography>
        <Typography
          variant="h6"
          style={{ display: "flex", alignItems: "center" }}
        >
          <p style={{ fontWeight: "bold", marginRight: "10px" }}>
            Role:
          </p>{" "}
          {currentUserId?.roleType}
        </Typography>
        <InputLabel id="status-select-label">Choose Status</InputLabel>
        <Select
          labelId="status-select-label"
          id="status-select"
          value={status}
          label="Chọn trạng thái"
          onChange={handleChange}
        >
          <MenuItem value="active">Active</MenuItem>
          <MenuItem value="inactive">Disable</MenuItem>
        </Select>
      </DialogContent>
      <DialogActions style={{ backgroundColor: "#f2f2f2" }}>
        <Button
          onClick={handleUpdate}
          color="primary"
          style={{
            color: "#fff",
            backgroundColor: "#3f51b5",
            fontSize: "18px",
          }}
        >
          Update
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default PopupStatus;
