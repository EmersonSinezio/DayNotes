import React, { useEffect } from "react";
import "./styles/header_styles.css";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";

const Header = ({ logout }) => {
  const [logged, setLogged] = useState(false);
  const [showMenu, setShowMenu] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    setLogged(!!token);
  }, []);

  const handleLogout = () => {
    logout();
    localStorage.removeItem("token"); // Remove o token
    setLogged(false);
    setShowMenu(false);
    navigate("/login");
  };

  return (
    <div className="header">
      <Link to="/">
        <h1>DayNotes</h1>
      </Link>
      <div className="profile" onClick={() => setShowMenu(!showMenu)}>
        {logged ? (
          <img src="/assets/icon.jpg" alt="" className="icon" />
        ) : (
          <Link to="/login">Login</Link>
        )}
        <div className={showMenu ? "menu-open" : "menu-close"}>
          <ul className="menu">
            <li>em breve</li>
            <li onClick={handleLogout}>Encerrar sessão</li>{" "}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Header;
