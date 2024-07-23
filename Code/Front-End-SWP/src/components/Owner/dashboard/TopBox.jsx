import React, { useState, useEffect } from "react";
import "./topBox.css";
import { GetTop5PeopleUseMostAmount } from "../../API/APIConfigure";

const TopBox = () => {
  const [topDealUsers, setTopDealUsers] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTopDealUsers = async () => {
      try {
        const response = await GetTop5PeopleUseMostAmount();
        if (response.success) {
          setTopDealUsers(response.data);
        } else {
          setError("Failed to fetch data");
        }
      } catch (err) {
        setError(err.message);
      }
    };

    fetchTopDealUsers();
  }, []);

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="topBox">
      <div className="list">
        {topDealUsers.map((user) => (
          <div className="listItem" key={user.userId}>
            <div className="user">
              <img src={`./src/assets/img/User.png`} alt="" />
              <div className="userTexts">
                <span className="username">{user.userName}</span>
                <span className="email">{user.email}</span>
              </div>
            </div>
            <span className="amount">{user.totalAmount}.000VNĐ</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TopBox;
