import { Link } from "react-router-dom";

export const PLACEHOLDER =
  "https://placehold.co/600x400?text=No+Image";

export const formatPrice = (p) => "₹" + Number(p).toLocaleString("en-IN");

export default function PropertyCard({ property }) {
  const p = property;
  return (
    <Link to={`/property/${p._id}`} className="card">
      <img src={p.image || PLACEHOLDER} alt={p.title} />
      <div className="card-body">
        <span className={`tag ${p.listingType}`}>For {p.listingType}</span>
        <h3>{p.title}</h3>
        <p className="price">
          {formatPrice(p.price)}
          {p.listingType === "rent" && <small> /month</small>}
        </p>
        <p className="muted">📍 {p.city}</p>
        <p className="muted">
          🛏 {p.bedrooms} &nbsp; 🛁 {p.bathrooms} &nbsp; 📐 {p.area} sq ft
        </p>
      </div>
    </Link>
  );
}
