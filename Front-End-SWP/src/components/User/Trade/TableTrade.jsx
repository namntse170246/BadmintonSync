import React, { useEffect, useState } from "react";
import { BASE_URL, GetAllRealestatesByMemberID } from "../../API/APIConfigure";
import "./tabletrade.css";
import { useParams, useNavigate, Link } from "react-router-dom";
import Rating from "@mui/material/Rating";

const TableTrade = ({ idUser }) => {
  const { id } = useParams();
  const [data, setData] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await GetAllRealestatesByMemberID(idUser);
        setData(response);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [id]);

  const handleClick = (itemId) => {
    navigate(`/trade/confirm/${itemId}`);
  };

  return (
    <div className="homeContainer">
      <div className="tradeTitle">
        <h1>Bất động sản của bạn đang sở hữu</h1>
      </div>
      {data
        .filter((item) => item.status === "2")
        .map((item, index) => (
          <div key={item.id} className="searchItem">
            <img
              src={BASE_URL + item.photo.split(",")[0]}
              alt="Time Share"
              className="siImg"
            />

            <div className="siDesc">
              <h1 className="siTitle">{item.name}</h1>
              <span className="siDistance">
                Cách 500m tới trung tâm thành phố
              </span>
              <span className="siLocation">Địa chỉ: {item.location}</span>
              <span className="siRating">
                <div className="siValue">Đánh giá:</div>
                <Rating
                  name="size-large"
                  defaultValue={5}
                  precision={0.5}
                  readOnly
                />
              </span>
            </div>
            <div className="siDetails">
              <div className="siDetailTexts">
                <button
                  className="siCheckButton"
                  onClick={() => handleClick(item.id)}
                >
                  Chọn bất động sản
                </button>
              </div>
            </div>
          </div>
        ))}
    </div>
  );
};

export default TableTrade;
