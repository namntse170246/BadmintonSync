import React, { useState, useEffect } from "react";
import { TextField, Button, Dialog, DialogTitle, DialogContent } from "@mui/material";
import {  } from "../../API/APIConfigure"; // Ensure this API function is created
import { toast } from "react-toastify";

const EditCourt = ({ open, onClose, court, fetchCourts }) => {
  const [formData, setFormData] = useState({
    courtName: "",
    location: "",
    phone: "",
    openingHours: "",
    announcement: ""
  });

  useEffect(() => {
    if (court) {
      setFormData({
        courtName: court.courtName,
        location: court.location,
        phone: court.phone,
        openingHours: court.openingHours,
        announcement: court.announcement
      });
    }
  }, [court]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await UpdateCourt(court.courtId, formData); // Adjust according to your API
      if (response.success) {
        toast.success("Court updated successfully!");
        fetchCourts();
        onClose();
      } else {
        toast.error("Failed to update court!");
      }
    } catch (error) {
      console.error("Error occurred:", error);
      toast.error("Failed to update court!");
    }
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="md">
      <DialogTitle
        style={{
          textAlign: "center",
          fontSize: "30px",
          fontWeight: "bold",
          color: "#003580",
        }}
      >
        Edit Court
      </DialogTitle>
      <DialogContent>
        <form
          style={{ display: "flex", flexDirection: "column", gap: "16px" }}
          onSubmit={handleSubmit}
        >
          <TextField
            name="courtName"
            label="Court Name"
            value={formData.courtName}
            onChange={handleChange}
            required
          />
          <TextField
            name="location"
            label="Location"
            value={formData.location}
            onChange={handleChange}
            required
          />
          <TextField
            name="phone"
            label="Phone"
            value={formData.phone}
            onChange={handleChange}
            required
          />
          <TextField
            name="openingHours"
            label="Opening Hours"
            value={formData.openingHours}
            onChange={handleChange}
          />
          <TextField
            name="announcement"
            label="Announcement"
            value={formData.announcement}
            onChange={handleChange}
          />
          <Button
            type="submit"
            variant="contained"
            color="primary"
            style={{ alignSelf: "flex-end", marginTop: "16px" }}
          >
            Update
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default EditCourt;
