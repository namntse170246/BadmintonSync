import PlaceOutlinedIcon from "@mui/icons-material/PlaceOutlined";
import { useEffect, useState } from "react";
import LoadingPage from "../LoadingPage/LoadingPage";
const Search = ({ onSearch, searchValue, setSearchValue }) => {
  useEffect(() => {
    const storedSearchTerm = localStorage.getItem("searchkey");
    if (storedSearchTerm) {
      setSearchValue(JSON.parse(storedSearchTerm).destination);
    }
  }, []);
  const handleSearch = () => {
    onSearch(searchValue);
  };

  const handleChange = (e) => {
    const value = e.target.value;
    setSearchValue(value);
    localStorage.setItem("searchkey", JSON.stringify({ destination: value }));
  };
  return (
    <div className="booking-search-block ht_tablet_hide">
      <div className="bs-done">
        <div className="bs-wrapper desktop search-container">
          <div className="bs-item-desktop n_des">
            <PlaceOutlinedIcon />
            <div className="input-wrapper">
              <input
                placeholder="Tìm kiếm nơi bạn muốn chơi ngay ?"
                type="text"
                value={searchValue}
                className="bs-tit-desktop bs-info-desktop"
                onChange={handleChange}
              />
            </div>
          </div>
          <button
            onClick={handleSearch}
            className="bs-item-desktop submit ht_mirror"
          >
            <span className="submit-btn_click">Tìm kiếm</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Search;
