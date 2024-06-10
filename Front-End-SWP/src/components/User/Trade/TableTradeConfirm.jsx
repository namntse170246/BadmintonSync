import React, { useEffect, useState } from "react";
import { BASE_URL, GetbyRealestateID } from "../../API/APIConfigure";
import "./tabletrade.css";
import { useParams } from "react-router-dom";
import ConfirmTrade from "../Trade/ConfirmTrade";
import "./tableTradeConfirm.css";
const TableTradeConfirm = () => {
  const { id } = useParams();
  const [dataReal, setDataReal] = useState(null);
  const [startDay, setStartDay] = useState("");
  const [endDay, setEndDay] = useState("");
  const Realestate = JSON.parse(localStorage.getItem("Realestate"));

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await GetbyRealestateID(id);
        setDataReal(response);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [id]);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    if (name === "startDay") {
      setStartDay(value);
    } else if (name === "endDay") {
      setEndDay(value);
    }
  };

  return (
    <div className="homeContainer">
      <div className="tradeWapper">
        <h1 className="trade title">Đăng ký trao đổi</h1>
        <div className="tradeCard">
          <div className="trade1">
            {dataReal && (
              <div>
                <div>
                  <h2>Bất động sản của bạn</h2>
                  <img
                    className="img-trade"
                    src={BASE_URL + dataReal.photo.split(",")[0]}
                    alt={dataReal.name}
                  />
                </div>
                <h1>Tên khách sạn: {dataReal.name}</h1>
                <h1>Địa chỉ: {dataReal.location}</h1>
              </div>
            )}
          </div>
          <div className="trade2">
            <div>
              <h2>Bất động sản muốn trao đổi</h2>
              <img
                className="img-trade"
                src={BASE_URL + Realestate.photo.split(",")[0]}
                alt={Realestate.name}
              />
            </div>
            <h1>Tên khách sạn:{Realestate.name}</h1>
            <h1>Địa chỉ:{Realestate.location}</h1>
          </div>
        </div>
        <div className="tradeTime">
          <div className="formTrade">
            <label htmlFor="startDay" className="formTradeTitle">
              Ngày bắt đầu:{" "}
            </label>
            <input
              type="date"
              id="startDay"
              name="startDay"
              value={startDay}
              onChange={handleInputChange}
              required
              className="form-control"
            />
          </div>
          <div className="formTrade">
            <label htmlFor="endDay" className="formTradeTitle">
              Ngày kết thúc:{" "}
            </label>
            <input
              type="date"
              id="endDay"
              name="endDay"
              value={endDay}
              onChange={handleInputChange}
              required
              className="form-control"
            />
          </div>
        </div>
        <div className="btn-confirmTrade">
          <ConfirmTrade
            yourReal={dataReal}
            theirReal={Realestate}
            startDay={startDay}
            endDay={endDay}
          />
        </div>
      </div>
    </div>
  );
};

export default TableTradeConfirm;
