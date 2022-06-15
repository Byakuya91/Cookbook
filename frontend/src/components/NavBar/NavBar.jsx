import React from "react";
import { useContext } from "react";
import { useNavigate, Link } from "react-router-dom";
import AuthContext from "../../context/AuthContext";
import "./NavBar.css";

const Navbar = () => {
  const { logoutUser, user } = useContext(AuthContext);
  const navigate = useNavigate();
  return (
    <div className="navBar">
      <ul>
        <li className="brand">
          <Link to="/" style={{ textDecoration: "none", color: "white" }}>
            <b>Cook book Collective</b>
          </Link>
        </li>
        <li>
          <Link to="/" style={{ textDecoration: "none", color: "white" }}>
            <b>Home</b>
          </Link>
        </li>
        <li>
          <Link
            to="/friends"
            style={{ textDecoration: "none", color: "white" }}
          >
            <b> Recipes</b>
          </Link>
        </li>
        <li>
          <Link
            to="/favoriteRecipes"
            style={{ textDecoration: "none", color: "white" }}
          >
            <b>Favorite Recipes</b>
          </Link>
        </li>
        <li>
          {user ? (
            <button onClick={logoutUser}>Logout</button>
          ) : (
            <button onClick={() => navigate("/login")}>Login</button>
          )}
        </li>
      </ul>
    </div>
  );
};

export default Navbar;
