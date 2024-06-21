import { useEffect, useRef, useState } from "react";
import Search from "../../components/Search/Search";
import "./list.css";
import { GetAllRealestates } from "../../components/API/APIConfigure";
import Navbar from "../../components/navbar/Navbar";
import SearchItem from "../../components/searchItem/SearchItem";
import Filter from "../Filter/Filter";
import LoadingPage from "../../components/LoadingPage/LoadingPage";

const List = () => {
  const [searchResult, setSearchResult] = useState([]);
  const [searchValue, setSearchValue] = useState("");
  const [isSearchValueLoaded, setIsSearchValueLoaded] = useState(false);
  const [dateDropdown, setDateDropdown] = useState(false);
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [showLoadingPage, setShowLoadingPage] = useState(false);

  const dropdownRef = useRef(null);
  const dateDropdownRef = useRef(null);
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target) &&
        dateDropdownRef.current &&
        !dateDropdownRef.current.contains(event.target)
      ) {
        setDateDropdown(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const toggleDropdown = (dropdown) => {
    if (dropdown === "date") {
      setDateDropdown(!dateDropdown);
    }
  };

  useEffect(() => {
    const storedSearchTerm = localStorage.getItem("searchkey");
    if (storedSearchTerm) {
      const searchTerm = JSON.parse(storedSearchTerm);
      setSearchValue(searchTerm.location);
      setIsSearchValueLoaded(true);
    }
    getData();
  }, []);

  useEffect(() => {
    if (isSearchValueLoaded) {
      getData();
    }
  }, [isSearchValueLoaded]);

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    try {
      setShowLoadingPage(true);
      const response = await GetAllRealestates();
      if (response === null) {
        throw new Error("Network response was not ok");
      }
      setTimeout(() => {
        setShowLoadingPage(false);
        setSearchResult(response.data);
        console.log(response);
      }, 3000);
      setSearchResult(response);
    } catch (error) {
      console.log(error);
      setShowLoadingPage(false);
    }
  };

  const handleSearch = (searchValue) => {
    setShowLoadingPage(true);
    const searchTerm = {
      location: searchValue,
    };
    console.log(searchTerm);
    localStorage.setItem("searchkey", JSON.stringify(searchTerm));
    setSearchValue(searchValue);
    getData();
  };

  return (
    <div className="main-section">
      <div className="container-header">
        <Navbar />
      </div>
      <Search onSearch={handleSearch} searchValue={searchValue} setSearchValue={setSearchValue} />
      <Filter
        dropdownRef={dropdownRef}
        dateDropdownRef={dateDropdownRef}
        dateDropdown={dateDropdown}
        toggleDropdown={toggleDropdown}
        startDate={startDate}
        setStartDate={setStartDate}
        endDate={endDate}
        setEndDate={setEndDate}
      />
      {showLoadingPage ? (
        <LoadingPage />
      ) : (
        <>
          {searchResult.length === 0 ? (
            <>
              <img
                style={{
                  display: "block",
                  marginLeft: "auto",
                  marginRight: "auto",
                  textAlign: "center",
                  width: "40%",
                }}
                src="https://cdni.iconscout.com/illustration/premium/thumb/search-not-found-6275834-5210416.png"
                alt="Không tìm thấy kết quả trùng khớp"
              />
              <div
                style={{
                  display: "block",
                  marginLeft: "auto",
                  marginRight: "auto",
                  textAlign: "center",
                  fontSize: "30px",
                  fontWeight: "bold",
                }}
              >
                Không tìm thấy kết quả trùng khớp
              </div>
            </>
          ) : (
            <SearchItem searchResult={searchResult} />
          )}
        </>
      )}
    </div>
  );
};

export default List;
