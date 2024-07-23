import React, { useState, useEffect } from "react";
import { TextField, Button, MenuItem } from "@mui/material";
import { CreateSubCourts, GetAllCourts } from "../../API/APIConfigure";
import { toast } from "react-toastify";

const CreateCourt = ({ fetchCourts, onClose }) => {
  const [courtData, setCourtData] = useState({
    courtName: "",
    ownerId: "",
    location: "",
    phone: "",
    openingHours: "",
    image: "",
    announcement: "",
    formFiles: []
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
      setCourtData(prevData => ({ ...prevData, ownerId }));
    } catch (error) {
      console.error("Error fetching courtIds:", error);
      toast.error("Failed to fetch courts.");
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCourtData((prevData) => ({
      ...prevData,
      [name]: value
    }));
  };

  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    setCourtData((prevData) => ({
      ...prevData,
      formFiles: files
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const dataToSubmit = {
        ...courtData,
        formFiles: courtData.formFiles // You might need to handle file uploads separately
      };

      // Remove the following line if `CreateSubCourts` doesn't handle file uploads
      // const response = await CreateSubCourts(dataToSubmit);

      console.log(dataToSubmit); // Logs individual fields

      // Example response handling, adjust according to your API
      if (/* response.success */ true) {
        toast.success("Court created successfully!");
        fetchCourts();
        onClose();
      } else {
        toast.error("Failed to create court!");
      }
    } catch (error) {
      console.error("Error occurred:", error);
      toast.error("Failed to create court!");
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
        name="courtName"
        label="Court Name"
        value={courtData.courtName}
        onChange={handleChange}
        required
      />
      <TextField
        name="location"
        label="Location"
        value={courtData.location}
        onChange={handleChange}
        required
      />
      <TextField
        name="phone"
        label="Phone"
        value={courtData.phone}
        onChange={handleChange}
        required
      />
      <TextField
        name="openingHours"
        label="Opening Hours"
        value={courtData.openingHours}
        onChange={handleChange}
      />
      <TextField
        name="image"
        label="Image URL"
        value={courtData.image}
        onChange={handleChange}
      />
      <TextField
        name="announcement"
        label="Announcement"
        value={courtData.announcement}
        onChange={handleChange}
      />
      <input
        type="file"
        name="formFiles"
        multiple
        onChange={handleFileChange}
      />
      <Button
        type="submit"
        variant="contained"
        color="primary"
        style={{ alignSelf: "flex-end", marginTop: "16px" }}
      >
        Create
      </Button>
    </form>
  );
};

export default CreateCourt;
