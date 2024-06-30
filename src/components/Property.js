import React, { useContext } from 'react';
import { AuthContext } from '../context/authContext';
import { useNavigate } from 'react-router-dom';

const Property = ({ property }) => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleClick = () => {
    if (user) {
      navigate(`/properties/${property._id}`);
    } else {
      navigate('/login');
    }
  };

  return (
    <div>
      <h2>{property.title}</h2>
      <p>{property.place}</p>
      <p>{property.area} sq ft</p>
      <p>{property.bedrooms} Bedrooms</p>
      <p>{property.bathrooms} Bathrooms</p>
      <button onClick={handleClick}>I'm Interested</button>
    </div>
  );
};

export default Property;
