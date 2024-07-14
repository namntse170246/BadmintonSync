import React, { useState, useEffect } from "react";
import "./featureProperties.css";
import { GetAllCourts } from "../../components/API/APIConfigure";
import { GetbyCourtID } from "../API/APIConfigure";
import { Link, useNavigate } from "react-router-dom";

function FeatureProperties() {
  const [featureProperties, setFeatureProperties] = useState([]);
  const navigate = useNavigate();
  const handleViewCourt = async (courtId) => {
    try {
      const response = await GetbyCourtID(courtId);
      const courtDetails = response.data;

      localStorage.setItem("CourtDetails", JSON.stringify(courtDetails));
      const photoUrls = courtDetails.image ? courtDetails.image.split(",") : [];
      localStorage.setItem("imageCourt", JSON.stringify(photoUrls));

      // Điều hướng tới trang chi tiết sân và tải lại trang
      navigate(`/court/${courtId}`);
      window.location.reload();
      window.scrollTo(0, 0); // Cuộn lên đầu trang
    } catch (error) {
      console.error("Error fetching court details", error);
    }
  };

  useEffect(() => {
    const fetchFeatureProperties = async () => {
      try {
        const response = await GetAllCourts();
        console.log(response.data);
        setFeatureProperties(response.data);
      } catch (error) {
        console.error("Error fetching feature properties", error);
      }
    };

    fetchFeatureProperties();
  }, []);

  // Chỉ hiển thị 4 card đầu tiên nếu có nhiều hơn
  const displayedProperties = featureProperties.slice(-5);

  return (
    <div className="fp">
      {displayedProperties.map((property, index) => {
        // Split the image string to get the first image
        const photoUrls = property.image ? property.image.split(",") : [];
        const firstImageUrl = photoUrls.length > 0 ? photoUrls[0].trim() : "";
        const fullImageUrl = firstImageUrl
          ? `https://localhost:7155/Uploads/${firstImageUrl}`
          : "";

        return (
          <div className="fpItem" key={index}>
            <button
              className="fpBtn"
              onClick={() => handleViewCourt(property.courtId)}
            >
              <img
                src={fullImageUrl}
                alt={property.courtName}
                className="fpImg"
              />
              <div className="fpDesc">
                <span className="fpName">{property.courtName}</span>
                <br />
                <span className="fpPhone">{property.phone}</span>
                <br />
                <span className="fpCity">{property.location}</span>
              </div>
            </button>
          </div>
        );
      })}
    </div>
  );
}

export default FeatureProperties;
