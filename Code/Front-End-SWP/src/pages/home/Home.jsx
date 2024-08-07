import { useEffect, useRef, useState } from "react";
import TrendPlace from "../../components/Components_LandingPages/trendPlace/TrendPlace";
import Search from "../../components/Search/Search";
import Featured from "../../components/featured/Featured";
import Footer from "../../components/footer/Footer";
import Header from "../../components/header/Header";
import Navbar from "../../components/navbar/Navbar";
import mapImage from "../../../src/assets/img/map1.jpg";
import "./home.css";
import { useNavigate } from "react-router-dom";

function Home() {
  const navigate = useNavigate();
  const [searchValue, setSearchValue] = useState("");
  const [isScrolled, setIsScrolled] = useState(false);
  const [isHomeTitleVisible, setIsHomeTitleVisible] = useState(false);
  const homeTitleRef = useRef(null);
  const [isHomePage] = useState(true);

  useEffect(() => {
    const handleScroll = () => {
      // const currentScrollPos = window.pageYOffset;
      const currentScrollPos = window.scrollY;
      setIsScrolled(currentScrollPos > 0);

      const homeTitleTop = homeTitleRef.current.getBoundingClientRect().top;
      setIsHomeTitleVisible(homeTitleTop <= window.innerHeight / 2);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const handleSearch = (searchValue) => {
    const searchTerm = {
      location: searchValue,
    };
    localStorage.setItem("searchkey", JSON.stringify(searchTerm));
    navigate("/courts");
  };
  return (
    <div
      className={`path-frontpage ${isScrolled ? "header-scroll" : ""} ${
        isHomeTitleVisible ? "fixed-bs" : ""
      }`}
    >
      <Navbar className={isHomePage} />
      <Header />
      <Search
        onSearch={handleSearch}
        searchValue={searchValue}
        setSearchValue={setSearchValue}
      />

      <div className="main-home-container">
        <Featured homeTitleRef={homeTitleRef} />

        {/* <MailList /> */}
        <div className="map">
          <img src={mapImage} alt="Map" />
        </div>
        <div className="homeContainer" style={{ marginTop: "50px" }}>
          <Footer />
        </div>
      </div>
    </div>
  );
}

export default Home;
