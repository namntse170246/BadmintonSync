import React, { useState, useEffect } from "react";
import { GetTotalUserByRoleType3 } from "../../API/APIConfigure"; // Adjust the import path as needed

const TotalUserCount = () => {
  const [totalUsers, setTotalUsers] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTotalUsers = async () => {
      try {
        const response = await GetTotalUserByRoleType3();
        if (response.success) {
          setTotalUsers(response.data);
        } else {
          setError("Failed to fetch data");
        }
      } catch (err) {
        setError(err.message);
      }
    };

    fetchTotalUsers();
  }, []);

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div>{totalUsers !== null ? <p> {totalUsers}</p> : <p>Loading...</p>}</div>
  );
};

export default TotalUserCount;
