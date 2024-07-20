import { useEffect, useRef, useState } from "react";
import Search from "../../components/Search/Search";
import "./list.css";
import { GetAllCourts } from "../../components/API/APIConfigure";
import Navbar from "../../components/navbar/Navbar";
import SearchItem from "../../components/searchItem/SearchItem";
import Filter from "../Filter/Filter";
import LoadingPage from "../../components/LoadingPage/LoadingPage";
import MailList from "../../components/mailList/MailList";
import mapImage from "../../../src/assets/img/map1.jpg";
import Footer from "../../components/footer/Footer";

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
      setSearchValue(searchTerm.searchValue);
      setIsSearchValueLoaded(true);
    }
    getData();
  }, []);

  useEffect(() => {
    if (isSearchValueLoaded) {
      getData();
    }
  }, [isSearchValueLoaded]);

  const keepDiacritics = (str) => {
    return str.normalize("NFD");
  };

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    try {
      setShowLoadingPage(true);
      const response = await GetAllCourts();
      if (!response || !response.data) {
        throw new Error("Network response was not ok");
      }

      const normalizedSearchValue = keepDiacritics(searchValue.toLowerCase());
      const filteredResults = response.data.filter((item) => {
        return (
          (item.courtName &&
            keepDiacritics(item.courtName.toLowerCase()).includes(
              normalizedSearchValue
            )) ||
          (item.location &&
            keepDiacritics(item.location.toLowerCase()).includes(
              normalizedSearchValue
            ))
        );
      });

      setTimeout(() => {
        setShowLoadingPage(false);
        setSearchResult(filteredResults);
        console.log(filteredResults);
      }, 3000);
    } catch (error) {
      console.log(error);
      setShowLoadingPage(false);
    }
  };

  const handleSearch = (searchValue) => {
    setShowLoadingPage(true);
    const searchTerm = {
      searchValue: searchValue,
    };
    localStorage.setItem("searchkey", JSON.stringify(searchTerm));
    setSearchValue(searchValue);
    getData();
  };

  return (
    <div className="main-section">
      <div className="container-header">
        <Navbar />
      </div>
      <Search
        onSearch={handleSearch}
        searchValue={searchValue}
        setSearchValue={setSearchValue}
      />
      <Filter
        setSearchResult={setSearchResult}
        setShowLoadingPage={setShowLoadingPage}
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
                alt="No matching search results found"
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
                No matching search results found
              </div>
            </>
          ) : (
            <SearchItem searchResult={searchResult} />
          )}
        </>
      )}

      <div className="main-home-container">
        <MailList />
        <div className="map">
          <img src={mapImage} alt="Map" />
        </div>

        <div className="homeContainer" style={{ marginTop: "50px" }}>
          <Footer />
        </div>
      </div>
    </div>
  );
};

export default List;
