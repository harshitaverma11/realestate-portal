const express = require("express");
const Property = require("../models/Property");
const auth = require("../middleware/auth");

const router = express.Router();

// GET /api/properties?city=&listingType=&propertyType=&minPrice=&maxPrice=&bedrooms=
router.get("/", async (req, res) => {
  try {
    const { city, listingType, propertyType, minPrice, maxPrice, bedrooms } = req.query;
    const filter = {};

    if (city) filter.city = new RegExp(city.trim(), "i");
    if (listingType) filter.listingType = listingType;
    if (propertyType) filter.propertyType = propertyType;
    if (bedrooms) filter.bedrooms = { $gte: Number(bedrooms) };
    if (minPrice || maxPrice) {
      filter.price = {};
      if (minPrice) filter.price.$gte = Number(minPrice);
      if (maxPrice) filter.price.$lte = Number(maxPrice);
    }

    const properties = await Property.find(filter).sort({ createdAt: -1 });
    res.json(properties);
  } catch (err) {
    res.status(500).json({ message: "Could not load properties" });
  }
});

// GET /api/properties/mine  (must be above "/:id")
router.get("/mine", auth, async (req, res) => {
  try {
    const properties = await Property.find({ owner: req.userId }).sort({ createdAt: -1 });
    res.json(properties);
  } catch (err) {
    res.status(500).json({ message: "Could not load your listings" });
  }
});

// GET /api/properties/:id
router.get("/:id", async (req, res) => {
  try {
    const property = await Property.findById(req.params.id).populate("owner", "name email phone");
    if (!property) return res.status(404).json({ message: "Property not found" });
    res.json(property);
  } catch (err) {
    res.status(404).json({ message: "Property not found" });
  }
});

// POST /api/properties
router.post("/", auth, async (req, res) => {
  try {
    const { title, price, city } = req.body;
    if (!title || !price || !city) {
      return res.status(400).json({ message: "Title, price and city are required" });
    }
    const property = await Property.create({ ...req.body, owner: req.userId });
    res.status(201).json(property);
  } catch (err) {
    res.status(500).json({ message: "Could not create listing" });
  }
});

// DELETE /api/properties/:id  (only the owner can delete)
router.delete("/:id", auth, async (req, res) => {
  try {
    const property = await Property.findById(req.params.id);
    if (!property) return res.status(404).json({ message: "Property not found" });
    if (property.owner.toString() !== req.userId) {
      return res.status(403).json({ message: "You can only delete your own listings" });
    }
    await property.deleteOne();
    res.json({ message: "Listing deleted" });
  } catch (err) {
    res.status(500).json({ message: "Could not delete listing" });
  }
});

module.exports = router;
