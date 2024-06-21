import React, { useState, useEffect } from 'react';
import './propertyList.css';
import { GetAllRealestates } from '../../components/API/APIConfigure'; // Import hàm để lấy dữ liệu từ API

function PropertyList() {
  const [properties, setProperties] = useState([]);

  useEffect(() => {
    const fetchProperties = async () => {
      try {
        const response = await GetAllRealestates(); // Gọi hàm để lấy dữ liệu từ API
        setProperties(response.data); // Lưu dữ liệu vào state
      } catch (error) {
        console.error('Error fetching properties', error);
      }
    };

    fetchProperties();
  }, []);

  return (
    <div>
      <div className="pList">
        {properties.map((property, index) => (
          <div className="pListItem" key={index}>
            <img src={property.image} alt="/" className="pListImg" />
            <div className="pListTitles">
              <h1>{property.type}</h1>
              <h2>{property.count} Hotels</h2>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default PropertyList;
