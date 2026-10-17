import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api";

export default function AddProperty() {
  const [form, setForm] = useState({
    title: "",
    description: "",
    price: "",
    listingType: "sale",
    propertyType: "house",
    bedrooms: "",
    bathrooms: "",
    area: "",
    city: "",
    address: "",
    image: "",
  });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const change = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const submit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      const { data } = await api.post("/properties", form);
      navigate(`/property/${data._id}`);
    } catch (err) {
      setError(err.response?.data?.message || "Could not add property");
    }
  };

  return (
    <form className="form wide" onSubmit={submit}>
      <h1>Add a property</h1>
      {error && <p className="error">{error}</p>}

      <input name="title" placeholder="Title (e.g. 3 BHK flat near station)" value={form.title} onChange={change} required />
      <textarea name="description" placeholder="Description" rows="4" value={form.description} onChange={change} />

      <div className="row">
        <select name="listingType" value={form.listingType} onChange={change}>
          <option value="sale">For Sale</option>
          <option value="rent">For Rent</option>
        </select>
        <select name="propertyType" value={form.propertyType} onChange={change}>
          <option value="house">House</option>
          <option value="apartment">Apartment</option>
          <option value="plot">Plot</option>
          <option value="shop">Shop</option>
        </select>
      </div>

      <input name="price" type="number" placeholder="Price (₹)" value={form.price} onChange={change} required />

      <div className="row">
        <input name="bedrooms" type="number" placeholder="Bedrooms" value={form.bedrooms} onChange={change} />
        <input name="bathrooms" type="number" placeholder="Bathrooms" value={form.bathrooms} onChange={change} />
        <input name="area" type="number" placeholder="Area (sq ft)" value={form.area} onChange={change} />
      </div>

      <div className="row">
        <input name="city" placeholder="City" value={form.city} onChange={change} required />
        <input name="address" placeholder="Address / locality" value={form.address} onChange={change} />
      </div>

      <input name="image" placeholder="Image URL (paste a link to a photo)" value={form.image} onChange={change} />

      <button className="btn" type="submit">Publish listing</button>
    </form>
  );
}
