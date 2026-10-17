import { Routes, Route, Link, NavLink, Navigate } from "react-router-dom";
import { useAuth } from "./AuthContext.jsx";
import Home from "./pages/Home.jsx";
import PropertyDetail from "./pages/PropertyDetail.jsx";
import Login from "./pages/Login.jsx";
import Register from "./pages/Register.jsx";
import AddProperty from "./pages/AddProperty.jsx";
import MyListings from "./pages/MyListings.jsx";

function Navbar() {
  const { user, logout } = useAuth();
  return (
    <nav className="navbar">
      <Link to="/" className="logo">🏠 HomeFinder</Link>
      <div className="nav-links">
        <NavLink to="/" end>Browse</NavLink>
        {user ? (
          <>
            <NavLink to="/add">Add Property</NavLink>
            <NavLink to="/my-listings">My Listings</NavLink>
            <span className="muted">Hi, {user.name}</span>
            <button className="btn small" onClick={logout}>Logout</button>
          </>
        ) : (
          <>
            <NavLink to="/login">Login</NavLink>
            <NavLink to="/register">Register</NavLink>
          </>
        )}
      </div>
    </nav>
  );
}

// Pages that need login
function Protected({ children }) {
  const { user } = useAuth();
  return user ? children : <Navigate to="/login" />;
}

export default function App() {
  return (
    <>
      <Navbar />
      <main className="container">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/property/:id" element={<PropertyDetail />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/add" element={<Protected><AddProperty /></Protected>} />
          <Route path="/my-listings" element={<Protected><MyListings /></Protected>} />
        </Routes>
      </main>
      <footer className="footer">© {new Date().getFullYear()} HomeFinder · Find your dream home</footer>
    </>
  );
}
