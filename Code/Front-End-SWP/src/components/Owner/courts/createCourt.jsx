import React, { useState, useEffect } from "react";
import { TextField, Button } from "@mui/material";
import { CreatedCourt, GetAllCourts } from "../../API/APIConfigure";
import { toast } from "react-toastify";

const CreateCourt = ({ fetchCourts, onClose }) => {
  const [courtData, setCourtData] = useState({
    courtName: "",
    ownerId: "",
    location: "",
    phone: "",
    openingHours: "",
    announcement: "",
  });

  const [formFiles, setFormFiles] = useState([]);
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
    setFormFiles(files); // Lưu các tệp đã chọn vào trạng thái
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
formData.append('courtName', courtData.courtName);
formData.append('location', courtData.location);
formData.append('phone', courtData.phone);
formData.append('openingHours', courtData.openingHours);
formData.append('announcement', courtData.announcement);
formData.append('ownerId', courtData.ownerId);

// Thêm tất cả các tệp hình ảnh vào FormData
formFiles.forEach((file, index) => {
  formData.append('formFiles', file); // Lưu ý: không cần chỉ định tên tệp cho index
});

// Debug FormData
for (let pair of formData.entries()) {
  console.log(pair[0], pair[1]);
}


    // Thêm tất cả các tệp hình ảnh vào FormData
    formFiles.forEach((file, index) => {
      formData.append(`formFiles[${index}]`, file);
    });

    try {
      console.log(formData);
      const response = await CreatedCourt(formData);

      if (response.success) {
        toast.success("Court created successfully!");
        fetchCourts();
        onClose();
      } else {
        toast.error(response.message || "Failed to create court!");
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