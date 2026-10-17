import { useEffect, useState } from "react";
import api from "../api";
import PropertyCard from "../components/PropertyCard.jsx";

const emptyFilters = {
  city: "",
  listingType: "",
  propertyType: "",
  minPrice: "",
  maxPrice: "",
  bedrooms: "",
};

export default function Home() {
  const [filters, setFilters] = useState(emptyFilters);
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const load = async (f = filters) => {
    setLoading(true);
    setError("");
    try {
      // only send filters that have a value
      const params = Object.fromEntries(Object.entries(f).filter(([, v]) => v !== ""));
      const { data } = await api.get("/properties", { params });
      setProperties(data);
    } catch (err) {
      setError("Could not load properties. Is the server running?");
    }
    setLoading(false);
  };

  useEffect(() => {
    load(emptyFilters);
  }, []);

  const change = (e) => setFilters({ ...filters, [e.target.name]: e.target.value });

  const submit = (e) => {
    e.preventDefault();
    load();
  };

  const reset = () => {
    setFilters(emptyFilters);
    load(emptyFilters);
  };

  return (
    <>
      <section className="hero">
        <h1>Find your next home 🏡</h1>
        <p>Browse houses, apartments, plots and shops for sale or rent.</p>
      </section>

      <form className="filters" onSubmit={submit}>
        <input name="city" placeholder="City" value={filters.city} onChange={change} />
        <select name="listingType" value={filters.listingType} onChange={change}>
          <option value="">Buy or Rent</option>
          <option value="sale">Buy</option>
          <option value="rent">Rent</option>
        </select>
        <select name="propertyType" value={filters.propertyType} onChange={change}>
          <option value="">Any type</option>
          <option value="house">House</option>
          <option value="apartment">Apartment</option>
          <option value="plot">Plot</option>
          <option value="shop">Shop</option>
        </select>
        <input name="minPrice" type="number" placeholder="Min price" value={filters.minPrice} onChange={change} />
        <input name="maxPrice" type="number" placeholder="Max price" value={filters.maxPrice} onChange={change} />
        <input name="bedrooms" type="number" placeholder="Min bedrooms" value={filters.bedrooms} onChange={change} />
        <button className="btn" type="submit">Search</button>
        <button className="btn secondary" type="button" onClick={reset}>Reset</button>
      </form>

      {error && <p className="error">{error}</p>}
      {!loading && !error && properties.length === 0 && (
        <div className="empty">
          <span className="emoji">🔍</span>
          No properties found. Try changing your filters.
        </div>
      )}

      <div className="grid">
        {loading &&
          [1, 2, 3, 4, 5, 6].map((n) => (
            <div key={n} className="card skeleton">
              <div className="sk-img" />
              <div className="card-body">
                <div className="sk-line short" />
                <div className="sk-line" />
                <div className="sk-line short" />
              </div>
            </div>
          ))}
        {!loading &&
          properties.map((p) => <PropertyCard key={p._id} property={p} />)}
      </div>
    </>
  );
}
