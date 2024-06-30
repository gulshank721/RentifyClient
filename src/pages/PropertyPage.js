import React, { useState, useEffect } from 'react';
import axios from 'axios';

const PropertyPage = ({ match }) => {
  const [property, setProperty] = useState(null);

  useEffect(() => {
    const fetchProperty = async () => {
      const { data } = await axios.get(`/api/properties/${match.params.id}`);
      setProperty(data);
    };

    fetchProperty();
  }, [match.params.id]);

  if (!property) return <div>Loading...</div>;

  return (
    <div>
      <h1>{property.title}</h1>
      <p>{property.place}</p>
      <p>{property.area} sq ft</p>
      <p>{property.bedrooms} Bedrooms</p>
      <p>{property.bathrooms} Bathrooms</p>
      <p>Nearby: {property.nearby.join(', ')}</p>
      <p>Price: {property.price}</p>
      <p>Seller: {property.seller.firstName} {property.seller.lastName}</p>
      <p>Contact: {property.seller.email} / {property.seller.phone}</p>
    </div>
  );
};

export default PropertyPage;
