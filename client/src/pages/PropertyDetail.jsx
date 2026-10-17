import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../api";
import { PLACEHOLDER, formatPrice } from "../components/PropertyCard.jsx";

export default function PropertyDetail() {
  const { id } = useParams();
  const [p, setP] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    api
      .get(`/properties/${id}`)
      .then((res) => setP(res.data))
      .catch(() => setError("Property not found"));
  }, [id]);

  if (error) return <p className="error">{error}</p>;
  if (!p) return <p>Loading...</p>;

  return (
    <div className="detail">
      <img src={p.image || PLACEHOLDER} alt={p.title} />
      <div>
        <span className={`tag ${p.listingType}`}>For {p.listingType}</span>
        <h1>{p.title}</h1>
        <p className="price big">
          {formatPrice(p.price)}
          {p.listingType === "rent" && <small> /month</small>}
        </p>
        <p className="muted">📍 {p.address ? `${p.address}, ` : ""}{p.city}</p>

        <ul className="facts">
          <li>Type: {p.propertyType}</li>
          <li>Bedrooms: {p.bedrooms}</li>
          <li>Bathrooms: {p.bathrooms}</li>
          <li>Area: {p.area} sq ft</li>
        </ul>

        {p.description && (
          <>
            <h3>About this property</h3>
            <p>{p.description}</p>
          </>
        )}

        <div className="contact">
          <h3>Contact owner</h3>
          <p>{p.owner?.name}</p>
          {p.owner?.phone && <p>📞 {p.owner.phone}</p>}
          <p>✉️ <a href={`mailto:${p.owner?.email}`}>{p.owner?.email}</a></p>
        </div>
      </div>
    </div>
  );
}
