import React from "react";
import "../../styles/sidebar/sidebar.css";
import { Link, useLocation } from "react-router-dom";
import {
  FaChevronCircleRight,
  FaHome,
  FaStickyNote,
  FaCog,
  FaSignOutAlt,
  FaUserCircle,
} from "react-icons/fa";

const Sidebar = () => {
  const [openBar, setOpenBar] = React.useState("close");

  // Verificar se há usuário logado
  const userData = localStorage.getItem("user");
  const user = userData ? JSON.parse(userData) : null;
  const isLoggedIn = user && user.username;

  const location = useLocation();

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    window.location.href = "/login";
  };

  const toggleSidebar = () => {
    setOpenBar(openBar === "open" ? "close" : "open");
  };

  // Não renderizar se não houver usuário logado
  if (!isLoggedIn) {
    return null;
  }

  return (
    <div className={`sidebar-container ${openBar}`}>
      <button className="sidebar-toggle" onClick={toggleSidebar}>
        <FaChevronCircleRight
          className={`sidebar-icon ${openBar === "open" ? "open" : ""}`}
        />
      </button>

      <div className="sidebar-content">
        <div className="sidebar-header">
          <div className="user-info">
            <FaUserCircle className="user-avatar" />
            <div>
              <h2>Olá, {user.username}</h2>
              {user.email && <p className="user-email">{user.email}</p>}
            </div>
          </div>
        </div>

        <div className="sidebar-links">
          <Link
            to="/"
            className={`sidebar-link ${
              location.pathname === "/" ? "active" : ""
            }`}
          >
            <FaHome className="link-icon" />
            <span>Início</span>
          </Link>

          <Link
            to="/"
            className={`sidebar-link ${
              location.pathname.startsWith("/notes") ? "active" : ""
            }`}
          >
            <FaStickyNote className="link-icon" />
            <span>Minhas Notas</span>
          </Link>

          <Link
            to="/"
            className={`sidebar-link ${
              location.pathname === "/settings" ? "active" : ""
            }`}
          >
            <FaCog className="link-icon" />
            <span>Configurações</span>
          </Link>
        </div>

        <div className="sidebar-footer">
          <button className="logout-button" onClick={handleLogout}>
            <FaSignOutAlt className="icon" />
            <span>Sair da conta</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
