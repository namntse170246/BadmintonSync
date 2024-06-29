import React, { useEffect, useState } from "react";

import "react-toastify/dist/ReactToastify.css";
import { toast } from "react-toastify";
import { GetFeebackbyRealestate, GetUserByID, GetbyRealestateID } from "../../API/APIConfigure";
import TableFeedback from "./TableFeedBack";

const Feedback = ({ courtId }) => {
  const [feedback, setFeedback] = useState([]);
  const [userDetails, setUserDetails] = useState({});

  useEffect(() => {
    const fetchFeedback = async () => {
      try {
        const response = await GetbyRealestateID(courtId);
        console.log(response);
        if (Array.isArray(response.evaluates)) {
          setFeedback(response);
        } else {
          setFeedback([]);
          toast.error("Invalid response format");
        }
      } catch (err) {
        toast.error("Failed to fetch feedback");
        console.error(err);
      }
    };
    fetchFeedback();
  }, [courtId]);

  const fetchUserDetails = async (feedback) => {
    const userIds = feedback.map((item) => item.userId);
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
      <TableFeedback data={feedback} userDetails={userDetails} />
    </div>
  );
};

export default Feedback;
