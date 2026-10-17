import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../api";
import { formatPrice } from "../components/PropertyCard.jsx";

export default function MyListings() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  const load = () =>
    api
      .get("/properties/mine")
      .then((res) => setItems(res.data))
      .finally(() => setLoading(false));

  useEffect(() => {
    load();
  }, []);

  const remove = async (id) => {
    if (!window.confirm("Delete this listing?")) return;
    await api.delete(`/properties/${id}`);
    load();
  };

  if (loading) return <p>Loading...</p>;

  return (
    <>
      <h1>My listings</h1>
      {items.length === 0 && (
        <p className="muted">You have not added any property yet. <Link to="/add">Add one</Link></p>
      )}
      <div className="list">
        {items.map((p) => (
          <div key={p._id} className="list-item">
            <div>
              <Link to={`/property/${p._id}`}><strong>{p.title}</strong></Link>
              <p className="muted">{p.city} · {formatPrice(p.price)} · For {p.listingType}</p>
            </div>
            <button className="btn danger small" onClick={() => remove(p._id)}>Delete</button>
          </div>
        ))}
      </div>
    </>
  );
}
