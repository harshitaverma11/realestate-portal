const mongoose = require("mongoose");

const propertySchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true },
    description: { type: String, default: "" },
    price: { type: Number, required: true },
    listingType: { type: String, enum: ["sale", "rent"], default: "sale" },
    propertyType: {
      type: String,
      enum: ["house", "apartment", "plot", "shop"],
      default: "house",
    },
    bedrooms: { type: Number, default: 0 },
    bathrooms: { type: Number, default: 0 },
    area: { type: Number, default: 0 }, // in sq ft
    city: { type: String, required: true, trim: true },
    address: { type: String, default: "" },
    image: { type: String, default: "" }, // image URL
    owner: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Property", propertySchema);
