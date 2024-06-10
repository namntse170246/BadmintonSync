import { useState } from "react";
import axios from "axios";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";

import Button from "@mui/material/Button";
import { Typography } from "@mui/material";

import "./CreateReal.css";
import { BASE_URL } from "../../API/APIConfigure";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

function CreateReal({ Premium, onCreateSuccess }) {
    const navigate = useNavigate();
    const [open, setOpen] = useState(false);
    const [name, setName] = useState("");
    const [location, setLocation] = useState("");
    const [description, setDescription] = useState("");
    const [facility, setFacility] = useState("");
    const [price, setPrice] = useState("");
    const [imageFiles, setImageFiles] = useState([]);
    const [previewImages, setPreviewImages] = useState([]);
    const [errors, setErrors] = useState({
        name: "",
        location: "",
        description: "",
        facility: "",
        price: "",
        image: "",
    });
    const [hasImage, setHasImage] = useState(false);

    const userInfo = JSON.parse(localStorage.getItem("userInfo"));

    const handleImageChange = (e) => {
        setImageFiles(Array.from(e.target.files));
        let files = Array.from(e.target.files);
        let filePreviews = files.map((file) => URL.createObjectURL(file));
        setPreviewImages(filePreviews);
        setHasImage(files.length > 0);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        let formErrors = {};
        if (!name) {
            formErrors.name = "Vui lòng nhập tên";
        }
        if (!location) {
            formErrors.location = "Vui lòng nhập địa điểm";
        }
        if (!description) {
            formErrors.description = "Vui lòng nhập mô tả";
        }
        if (!facility) {
            formErrors.facility = "Vui lòng nhập facility";
        }
        if (!price) {
            formErrors.price = "Vui lòng nhập giá";
        } else if (isNaN(Number(price))) {
            formErrors.price = "Giá tiền phải là một số";
        } else if (Number(price) < 1000) {
            formErrors.price = "Giá tiền phải lớn hơn 1.000VND";
        }
        if (!hasImage) {
            formErrors.image = "Vui lòng chọn ít nhất một hình ảnh";
        }
        setErrors(formErrors);
        if (Object.keys(formErrors).length > 0) {
            return;
        }
        const formData = new FormData();
        formData.append("Name", name);
        formData.append("Location", location);
        formData.append("Description", description);
        formData.append("Facility", facility);
        formData.append("Price", price);
        formData.append("memberID", userInfo.id);
        imageFiles.forEach((file) => {
            formData.append("imageFiles", file);
        });

        try {
            setName("");
            setLocation("");
            setDescription("");
            setFacility("");
            setPrice("");
            setImageFiles([]);
            setPreviewImages([]);
            setErrors({});
            setHasImage(false);
            const response = await axios.post(BASE_URL + "API/Realestates/CreateRealestate", formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            });
            Swal.fire({
                icon: "success",
                title: "Tạo mới thành công, vui lòng chờ xác nhận !!!",
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
    const handlePriceChange = (e) => {
        const { value } = e.target;
        const formattedValue = parseInt(value.replace(/\D/g, ""), 10);
        setPrice(formattedValue);
    };
    const handleFacilityChange = (e) => {
        const { value } = e.target;
        const formattedValue = parseInt(value.replace(/\D/g, ""), 10);
        setFacility(formattedValue);
    };

    return (
        <div className="create-real-estate">
            <Button
                variant="contained"
                color="primary"
                onClick={() => {
                    if (!Premium) {
                        Swal.fire({
                            icon: "error",
                            title: "Bạn phải mua gói thành viên để có thể tạo mới!!!",
                            showCancelButton: true,
                            confirmButtonText: "Mua gói thành viên",
                            cancelButtonText: "Hủy",
                        }).then((result) => {
                            if (result.isConfirmed) {
                                navigate("/premium");
                            }
                        });
                        return;
                    }
                    setOpen(true);
                }}
            >
                Tạo mới
            </Button>
            <Dialog open={open} onClose={() => setOpen(false)} className="dialog-form">
                <h1 className="createRealTitle">Create Real Estate</h1>
                <DialogContent className="dialog-content">
                    <form onSubmit={handleSubmit} className="createRealTitle_Form">
                        <label htmlFor="name" className="form-label">
                            Tên:
                        </label>
                        <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
                        {errors.name && <Typography color="error">{errors.name}</Typography>}

                        <label htmlFor="location" className="form-label">
                            Địa điểm:
                        </label>
                        <input type="text" value={location} onChange={(e) => setLocation(e.target.value)} />
                        {errors.location && <Typography color="error">{errors.location}</Typography>}

                        <label htmlFor="description" className="form-label">
                            Mô tả:
                        </label>
                        <input type="text" value={description} onChange={(e) => setDescription(e.target.value)} />
                        {errors.description && <Typography color="error">{errors.description}</Typography>}

                        <label htmlFor="facility" className="form-label">
                            Số người tối đa:
                        </label>
                        <input type="text" value={facility} onChange={handleFacilityChange} />
                        {errors.facility && <Typography color="error">{errors.facility}</Typography>}

                        <label htmlFor="price" className="form-label">
                            Giá thuê một ngày:
                        </label>
                        <input type="text" value={price.toLocaleString("VND")} onChange={handlePriceChange} />
                        {errors.price && <Typography color="error">{errors.price}</Typography>}

                        <label htmlFor="imageFiles" className="form-label">
                            Hình Ảnh
                        </label>
                        <input type="file" multiple onChange={handleImageChange} />
                        {errors.image && <Typography color="error">{errors.image}</Typography>}
                        {previewImages.map((preview, index) => (
                            <img key={index} src={preview} alt="preview" style={{ width: "200px", height: "100px" }} />
                        ))}

                        <Button className="form-field" type="submit" variant="contained" color="primary">
                            Gửi
                        </Button>
                    </form>
                </DialogContent>
            </Dialog>
        </div>
    );
}

export default CreateReal;
