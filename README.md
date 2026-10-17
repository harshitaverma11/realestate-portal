# HomeFinder – Simple MERN Real Estate Portal

A beginner-friendly real estate listing site.

**Features**
- Register / login (JWT)
- Add a property (title, price, city, bedrooms, image URL, etc.)
- Browse all listings with filters: city, buy/rent, type, price range, bedrooms
- Property detail page with owner contact
- "My Listings" page where you can delete your own listings

**Tech:** MongoDB, Express, React (Vite), Node.js. Plain JavaScript and plain CSS. Images are pasted as URLs, so there is no upload setup.

## Folder structure

```
realestate-portal/
├── server/                 # Express API
│   ├── index.js            # starts the server + connects to MongoDB
│   ├── models/             # User.js, Property.js
│   ├── routes/             # auth.js, properties.js
│   └── middleware/auth.js  # checks the login token
└── client/                 # React app
    └── src/
        ├── pages/          # Home, PropertyDetail, Login, Register, AddProperty, MyListings
        ├── components/     # PropertyCard
        ├── App.jsx         # navbar + routes
        ├── AuthContext.jsx # keeps logged-in user
        └── api.js          # axios setup
```

## How to run

You need Node.js and MongoDB (local, or a free MongoDB Atlas cluster).

**1. Backend**
```bash
cd server
npm install
cp .env.example .env     # on Windows: copy .env.example .env
# edit .env and set MONGO_URI (Atlas link or local) and JWT_SECRET
npm run dev
```
Server runs on http://localhost:5000

**2. Frontend** (open a second terminal)
```bash
cd client
npm install
npm run dev
```
Open http://localhost:5173

## API

| Method | URL | Login needed | What it does |
|---|---|---|---|
| POST | /api/auth/register | no | create account |
| POST | /api/auth/login | no | login, returns token |
| GET | /api/properties | no | list (supports filters) |
| GET | /api/properties/:id | no | one property |
| GET | /api/properties/mine | yes | your listings |
| POST | /api/properties | yes | add listing |
| DELETE | /api/properties/:id | yes (owner) | delete listing |

## Ideas for later
Edit listing, favorites, image upload (Cloudinary), pagination, map view.
