import React, { useState, useEffect, useRef } from "react";
import { GetAllCourts } from "../../components/API/APIConfigure";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLocationDot } from "@fortawesome/free-solid-svg-icons";
import "./Filter.css";

// List of districts in Ho Chi Minh City
const districts = [
  "Quận 1",
  "Quận 2",
  "Quận 3",
  "Quận 4",
  "Quận 5",
  "Quận 6",
  "Quận 7",
  "Quận 8",
  "Quận 9",
  "Quận 10",
  "Quận 11",
  "Quận 12",
  "Bình Tân",
  "Bình Thạnh",
  "Gò Vấp",
  "Phú Nhuận",
  "Tân Bình",
  "Tân Phú",
  "Thủ Đức",
];

const Filter = ({ setSearchResult, setShowLoadingPage }) => {
  const [selectedDistrict, setSelectedDistrict] = useState("");
  const [items, setItems] = useState([]);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    getData();
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [dropdownRef]);

  const getData = async () => {
    try {
      setShowLoadingPage(true);
      const response = await GetAllCourts();
      if (!response || !response.data) {
        throw new Error("Network response was not ok");
      }

      setItems(response.data); // Save all data from API to items state
      setSearchResult(response.data); // Pass all data to List
      setShowLoadingPage(false);
    } catch (error) {
      console.log(error);
      setShowLoadingPage(false);
    }
  };

  const handleFilterChange = (district) => {
    setSelectedDistrict(district);

    if (district) {
      const filtered = items.filter((item) =>
        item.location.split(", ").includes(district)
      );
      setSearchResult(filtered); // Pass filtered results to List
    } else {
      setSearchResult(items);
    }

    setDropdownOpen(false);
  };

  return (
    <div className="filter-container" ref={dropdownRef}>
      <label className="filter-label">Chọn vị trí: </label>
      <div className="dropdown" onClick={() => setDropdownOpen(!dropdownOpen)}>
        <div className="dropdown-selected">
          {selectedDistrict || "Tất cả vị trí"}
        </div>
        {dropdownOpen && (
          <div className="dropdown-menu">
            <div
              className="dropdown-item"
              onClick={() => handleFilterChange("")}
            >
              Tất cả vị trí
            </div>
            {districts.map((district) => (
              <div
                key={district}
                className="dropdown-item"
                onClick={() => handleFilterChange(district)}
              >
                <FontAwesomeIcon icon={faLocationDot} /> {district}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Filter;
