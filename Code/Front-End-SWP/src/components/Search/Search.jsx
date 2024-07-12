import SearchIcon from "@mui/icons-material/Search";
import { useEffect, useState } from "react";
const Search = ({ onSearch, searchValue, setSearchValue }) => {
  useEffect(() => {
    const storedSearchTerm = localStorage.getItem("searchkey");
    if (storedSearchTerm) {
      setSearchValue(JSON.parse(storedSearchTerm).location);
    }
  }, []);
  const handleSearch = () => {
    onSearch(searchValue);
  };

  const handleChange = (e) => {
    const value = e.target.value;
    setSearchValue(value);
    localStorage.setItem("searchkey", JSON.stringify({ location: value }));
  };
  return (
    <div className="booking-search-block ht_tablet_hide">
      <div className="bs-done">
        <div className="bs-wrapper desktop search-container">
          <div className="bs-item-desktop n_des">
            <SearchIcon />
            <div className="input-wrapper">
              <input
                placeholder="Searching for a place you want to play now?"
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
            <span className="submit-btn_click">Search</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Search;
