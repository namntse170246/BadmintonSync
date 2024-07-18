import React, { useState, useEffect } from "react";
import { TextField, Button, MenuItem } from "@mui/material";
import { CreateSubCourts, GetAllCourts } from "../../API/APIConfigure";
import { toast } from "react-toastify";

const CreateSubCourtComponent = ({ fetchSubCourts, onClose }) => {
  const [subCourtData, setSubCourtData] = useState({
    courtId: "",
    name: "",
    pricePerHour: 0,
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
      toast.error("Failed to fetch courts.");
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setSubCourtData((prevData) => ({
      ...prevData,
      [name]: name === "pricePerHour" ? parseInt(value, 10) : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const dataToSubmit = {
        ...subCourtData,
        pricePerHour: parseInt(subCourtData.pricePerHour, 10),
      };
      console.log(dataToSubmit);
      const response = await CreateSubCourts(dataToSubmit);
      console.log(response); // Logs individual fields
      
      if (response.success) {
        toast.success("Sub-court created successfully!");
        fetchSubCourts();
        onClose();
      } else {
        toast.error("Failed to create sub-court!");
      }
    } catch (error) {
      console.error("Error occurred:", error);
      toast.error("Failed to create sub-court!");
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
        label="Sub-Court Name"
        value={subCourtData.name}
        onChange={handleChange}
        required
      />
      <TextField
        name="courtId"
        label="Court"
        select
        value={subCourtData.courtId}
        onChange={handleChange}
        required
      >
        {courtIds.map((court) => (
          <MenuItem key={court.courtId} value={court.courtId}>
            {court.courtName}
          </MenuItem>
        ))}
      </TextField>
      <TextField
        name="pricePerHour"
        label="Price Per Hour"
        type="number"
        value={subCourtData.pricePerHour}
        onChange={handleChange}
        required
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

export default CreateSubCourtComponent;
