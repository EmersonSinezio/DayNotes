import React, { useEffect } from "react";
import "./styles/header_styles.css";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";

const Header = ({ logout }) => {
  const [logged, setLogged] = useState(false);
  const [showMenu, setShowMenu] = useState(false);
  const [changeBtn, setChangeBtn] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    setLogged(!!token);
  }, []);

  const handleLogout = () => {
    logout();
    localStorage.removeItem("token");
    setLogged(false);
    setShowMenu(false);
    navigate("/login");
  };

  const changeButton = () => {
    setChangeBtn(!changeBtn);
    if (changeBtn) {
      navigate("/login");
    } else {
      navigate("/register");
    }
  };

  return (
    <div className="header">
      <Link to="/">
        <h1>DayNotes</h1>
      </Link>
      <div className="profile" onClick={() => setShowMenu(!showMenu)}>
        {logged ? (
          <p>{JSON.parse(localStorage.getItem("user")).username}</p>
        ) : null}
        {logged ? (
          <img src="/assets/icon.jpg" alt="" className="icon" />
        ) : changeBtn ? (
          <button className="profile_btn" onClick={() => changeButton()}>
            Entrar
          </button>
        ) : (
          <button className="profile_btn" onClick={() => changeButton()}>
            Cadastrar
          </button>
        )}

        <div
          className={
            logged ? (showMenu ? "menu-open" : "menu-close") : "menu-close"
          }
        >
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
