import React, { useEffect, useState } from "react";

import "react-toastify/dist/ReactToastify.css";
import { toast } from "react-toastify";
import { GetFeebackbyRealestate, GetUserByID } from "../../API/APIConfigure";
import TableFeedback from "./TableFeedBack";

const Feedback = ({ realetatesID }) => {
  const [feedback, setFeedback] = useState([]);
  const [userDetails, setUserDetails] = useState([]);

  useEffect(() => {
    const fetchFeedback = async () => {
      try {
        const response = await GetFeebackbyRealestate(realetatesID);
        setFeedback(response ? response : []);
      } catch (err) {
        toast.error("Failed to fetch feedback");
        console.error(err);
      }
    };
    fetchFeedback();
  }, []);

  const fetchUserDetails = async (feedback) => {
    const userIds = feedback.map((item) => item.memberId);
    const uniqueUserIds = Array.from(new Set(userIds));

    uniqueUserIds.forEach(async (id) => {
      try {
        const userData = await GetUserByID(id);
        setUserDetails((prevDetails) => ({
          ...prevDetails,
          [id]: userData.username,
        }));
      } catch (error) {
        console.error("Failed to fetch user details", error);
        toast.error(`Failed to fetch user details for ID: ${id}`);
      }
    });
  };
  useEffect(() => {
    if (feedback.length > 0) {
      fetchUserDetails(feedback);
    }
  }, [feedback]);
  return (
    <div>
      <TableFeedback
        data={feedback}
        fetchUserDetails={fetchUserDetails}
        userDetails={userDetails}
      />
    </div>
  );
};

export default Feedback;
