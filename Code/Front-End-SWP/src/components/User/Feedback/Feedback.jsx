import React, { useEffect, useState } from "react";
import "react-toastify/dist/ReactToastify.css";
import { toast } from "react-toastify";
import { GetbyCourtID } from "../../API/APIConfigure";
import TableFeedback from "./TableFeedBack";

const Feedback = ({ courtId }) => {
  const [feedback, setFeedback] = useState([]);

  useEffect(() => {
    const fetchFeedback = async () => {
      try {
        const response = await GetbyCourtID(courtId);
        console.log("FB: ", response);
        if (Array.isArray(response.data.evaluates)) {
          setFeedback(response.data.evaluates);
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

  return (
    <div>
      <TableFeedback data={feedback} />
    </div>
  );
};

export default Feedback;
